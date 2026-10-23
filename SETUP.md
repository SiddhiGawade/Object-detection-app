# Development Setup Guide

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Install React Native CLI globally** (if not already installed)
   ```bash
   npm install -g react-native-cli
   ```

3. **Install Android dependencies**
   - Download and install Android Studio
   - Set up Android SDK (API level 34)
   - Create an Android Virtual Device (AVD)

4. **For iOS** (macOS only)
   - Install Xcode from App Store
   - Install iOS Simulator
   - Run `cd ios && pod install`

## Installation Commands

```bash
# Clone the repository
git clone https://github.com/SiddhiGawade/Real_Time_Object_Detection_App.git
cd Real_Time_Object_Detection_App

# Install dependencies
npm install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..

# Start Metro bundler
npm start

# Run on Android (in a new terminal)
npm run android

# Run on iOS (in a new terminal, macOS only)
npm run ios
```

## Troubleshooting

### Common Issues

1. **Metro bundler cache issues**
   ```bash
   npm start -- --reset-cache
   ```

2. **Android build issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   npm run android
   ```

3. **iOS build issues**
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```

4. **Permission issues**
   - Make sure camera permissions are granted in device settings

## Development Environment

- Node.js 18+
- React Native 0.80.2
- TypeScript 5.0.4
- Android SDK 34
- iOS 12.0+

## Build Configuration

The project is configured for:
- **Android**: Minimum SDK 24, Target SDK 34
- **iOS**: Minimum iOS 12.0
- **Hermes**: Enabled for better performance
- **TensorFlow Lite**: Integrated for AI model support
