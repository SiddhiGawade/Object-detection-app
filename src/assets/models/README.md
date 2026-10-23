# AI Models Directory

This directory contains the AI models used for object detection.

## Model Files

Place your YOLOv8 model files here:

- `yolov8n.tflite` - YOLOv8 Nano model (TensorFlow Lite format)
- `yolov8s.tflite` - YOLOv8 Small model (TensorFlow Lite format)
- `yolov8m.tflite` - YOLOv8 Medium model (TensorFlow Lite format)

## Model Conversion

To convert YOLOv8 models to mobile-compatible formats:

### TensorFlow Lite (Recommended for Android)
```python
from ultralytics import YOLO

# Load YOLOv8 model
model = YOLO('yolov8n.pt')

# Export to TensorFlow Lite
model.export(format='tflite', imgsz=640, int8=True)  # Quantized version
model.export(format='tflite', imgsz=640, half=True)  # FP16 version
```

### PyTorch Mobile (for iOS)
```python
from ultralytics import YOLO

# Load YOLOv8 model
model = YOLO('yolov8n.pt')

# Export to TorchScript
model.export(format='torchscript', imgsz=640)
```

### ONNX (Cross-platform)
```python
from ultralytics import YOLO

# Load YOLOv8 model
model = YOLO('yolov8n.pt')

# Export to ONNX
model.export(format='onnx', imgsz=640)
```

## Model Performance

| Model | Size | mAP | Inference Speed |
|-------|------|-----|----------------|
| YOLOv8n | 6.2MB | 37.3 | ~15-20ms |
| YOLOv8s | 21.5MB | 44.9 | ~25-30ms |
| YOLOv8m | 49.7MB | 50.2 | ~40-50ms |

## Integration

Update the model path in `src/services/YOLODetector.ts`:

```typescript
const modelPath = `${RNFS.MainBundlePath}/yolov8n.tflite`;
```

## Note

- Model files are ignored by git (see .gitignore)
- For production, consider downloading models from a server
- Use quantized models for better performance on mobile devices
