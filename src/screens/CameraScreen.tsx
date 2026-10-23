import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {Worklets} from 'react-native-worklets-core';
import {runOnJS} from 'react-native-reanimated';
import {requestCameraPermission} from '../utils/permissions';
import {YOLODetector} from '../services/YOLODetector';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

interface Detection {
  class: string;
  confidence: number;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

const CameraScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const yoloDetector = useRef<YOLODetector | null>(null);

  useEffect(() => {
    checkCameraPermission();
    initializeYOLO();
    
    return () => {
      setIsActive(false);
    };
  }, []);

  const checkCameraPermission = async () => {
    const permission = await requestCameraPermission();
    setHasPermission(permission);
  };

  const initializeYOLO = async () => {
    try {
      yoloDetector.current = new YOLODetector();
      await yoloDetector.current.loadModel();
      setIsModelLoaded(true);
    } catch (error) {
      console.error('Failed to initialize YOLO:', error);
      Alert.alert('Error', 'Failed to load AI model');
    }
  };

  const updateDetections = Worklets.createRunOnJS((newDetections: Detection[]) => {
    setDetections(newDetections);
  });

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    
    if (!isModelLoaded || !yoloDetector.current) {
      return;
    }

    try {
      // Process frame with YOLO model
      const results = yoloDetector.current.detectObjects(frame);
      updateDetections(results);
    } catch (error) {
      console.log('Frame processing error:', error);
    }
  }, [isModelLoaded]);

  const renderDetectionBoxes = () => {
    return detections.map((detection, index) => (
      <View
        key={index}
        style={[
          styles.detectionBox,
          {
            left: detection.bbox.x * screenWidth,
            top: detection.bbox.y * screenHeight,
            width: detection.bbox.width * screenWidth,
            height: detection.bbox.height * screenHeight,
          },
        ]}>
        <Text style={styles.detectionLabel}>
          {detection.class} ({Math.round(detection.confidence * 100)}%)
        </Text>
      </View>
    ));
  };

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Camera permission is required to use this feature
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={checkCameraPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!device) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No camera device found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={isActive}
        frameProcessor={frameProcessor}
        pixelFormat="yuv"
      />
      
      {/* Detection Overlays */}
      <View style={styles.overlay}>
        {renderDetectionBoxes()}
      </View>

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>
          Model: {isModelLoaded ? '✅ Loaded' : '⏳ Loading...'}
        </Text>
        <Text style={styles.statusText}>
          Detections: {detections.length}
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, !isActive && styles.controlButtonActive]}
          onPress={() => setIsActive(!isActive)}>
          <Text style={styles.controlButtonText}>
            {isActive ? '⏸️ Pause' : '▶️ Resume'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  detectionBox: {
    position: 'absolute',
    borderColor: '#00ff00',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  detectionLabel: {
    position: 'absolute',
    top: -25,
    left: 0,
    backgroundColor: '#00ff00',
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  statusBar: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: 'rgba(33, 150, 243, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  controlButtonActive: {
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  permissionButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#f44336',
    textAlign: 'center',
  },
});

export default CameraScreen;
