import {Platform, PermissionsAndroid, Alert} from 'react-native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to camera to detect objects',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      return result === RESULTS.GRANTED;
    }
  } catch (error) {
    console.error('Permission error:', error);
    Alert.alert('Permission Error', 'Failed to request camera permission');
    return false;
  }
};

export const checkCameraPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return hasPermission;
    } else {
      // For iOS, we'll use react-native-permissions
      const {check} = await import('react-native-permissions');
      const result = await check(PERMISSIONS.IOS.CAMERA);
      return result === RESULTS.GRANTED;
    }
  } catch (error) {
    console.error('Permission check error:', error);
    return false;
  }
};
