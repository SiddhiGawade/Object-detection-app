# Real-Time Object Detection App

A real-time object detection mobile application powered by YOLOv8 and React Native.

## Features

- 📱 Cross-platform (Android & iOS)
- 🤖 YOLOv8 AI model integration
- 📷 Real-time camera object detection
- 🎯 80+ object classes detection
- ⚡ Optimized performance
- 🔒 Permission handling

## Tech Stack

- **Frontend**: React Native with TypeScript
- **AI Model**: YOLOv8 (You Only Look Once)
- **Camera**: react-native-vision-camera
- **ML Framework**: TensorFlow Lite / PyTorch Mobile
- **Navigation**: React Navigation
- **Permissions**: react-native-permissions

## Prerequisites

- Node.js (>= 18)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SiddhiGawade/Real_Time_Object_Detection_App.git
   cd Real_Time_Object_Detection_App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Install the YOLOv8 model**
   - Download the YOLOv8 model (.tflite format)
   - Place it in `src/assets/models/`

## Usage

### Android

1. **Start Metro bundler**
   ```bash
   npm start
   ```

2. **Run on Android**
   ```bash
   npm run android
   ```

### iOS

1. **Start Metro bundler**
   ```bash
   npm start
   ```

2. **Run on iOS**
   ```bash
   npm run ios
   ```

## Project Structure

```
src/
├── App.tsx                 # Main app component
├── screens/
│   ├── HomeScreen.tsx      # Home screen with app info
│   └── CameraScreen.tsx    # Camera screen with object detection
├── services/
│   └── YOLODetector.ts     # YOLO model service
├── utils/
│   └── permissions.ts      # Permission utilities
└── assets/
    └── models/             # AI models directory
```

## Model Integration

The app uses YOLOv8 for object detection. To integrate your own model:

1. **Convert model to mobile format**
   ```python
   # Using YOLOv8
   from ultralytics import YOLO
   
   model = YOLO('yolov8n.pt')
   model.export(format='tflite')  # For TensorFlow Lite
   model.export(format='torchscript')  # For PyTorch Mobile
   ```

2. **Update model path in YOLODetector.ts**
   ```typescript
   const modelPath = 'path/to/your/model.tflite';
   ```

## Contact

**Siddhi Gawade**
- GitHub: [@SiddhiGawade](https://github.com/SiddhiGawade)
- Project: [Real_Time_Object_Detection_App](https://github.com/SiddhiGawade/Real_Time_Object_Detection_App)

---

⭐ Star this repository if you found it helpful!