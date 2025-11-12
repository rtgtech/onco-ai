from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import tensorflow as tf
from tensorflow.keras.models import load_model, Model
from tensorflow.keras.preprocessing import image
import base64
import io

app = FastAPI(title="Cancer Classifier API")

# --- Enable CORS ---
origins = ["http://localhost:5173", "http://127.0.0.1:5173", "*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load models ---
histopathological_model = load_model('./models/resnet50_cancer_model-finetuned-version-1.keras')
MRI_model = load_model('./models/resnet50_cancer_model-MRI-finetuned-version-1.keras')

histo_class_names = [
    'Acute Lymphoblastic Leukemia_early', 'Acute Lymphoblastic Leukemia_normal',
    'Acute Lymphoblastic Leukemia_pre', 'Acute Lymphoblastic Leukemia_pro',
    'breast_malignant', 'breast_normal', 'lung_colon_Adenocarcinoma',
    'lung_colon_normal', 'lung_squamous cell carcinoma'
]

MRI_class_names = [
    'brain_glioma_tumor', 'brain_meningioma_tumor', 'brain_normal',
    'brain_pituitary_tumor', 'kidney_cyst', 'kidney_normal', 'kidney_stone',
    'kidney_tumor', 'pancreatic_normal', 'pancreatic_tumor'
]

# --- Grad-CAM function ---
def generate_gradcam(model, img_array, class_index, layer_name='conv5_block3_out'):
    grad_model = Model(
        inputs=model.inputs,
        outputs=[model.get_layer(layer_name).output, model.output[0]]
    )

    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img_array)
        loss = predictions[:, class_index]

    grads = tape.gradient(loss, conv_outputs)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    conv_outputs = conv_outputs[0].numpy()
    pooled_grads = pooled_grads.numpy()

    # Compute Grad-CAM heatmap
    heatmap = np.zeros(shape=conv_outputs.shape[:2], dtype=np.float32)
    for i in range(pooled_grads.shape[0]):
        heatmap += pooled_grads[i] * conv_outputs[:, :, i]

    heatmap = np.maximum(heatmap, 0)
    heatmap /= np.max(heatmap) + 1e-8
    heatmap_resized = cv2.resize(heatmap, (224, 224))
    heatmap_resized = 1 - heatmap_resized
    heatmap_colored = cv2.applyColorMap(np.uint8(255 * heatmap_resized), cv2.COLORMAP_JET)
    heatmap_colored = heatmap_colored[:, :, ::-1]  # BGR → RGB

    # Original image
    original_img = np.uint8(img_array[0].numpy() * 255)
    if original_img.shape[-1] == 1:
        original_img = cv2.cvtColor(original_img, cv2.COLOR_GRAY2RGB)

    # Overlay
    superimposed_img = cv2.addWeighted(original_img, 0.6, heatmap_colored, 0.4, 0)

    # Encode to base64
    def to_base64(img):
        _, buffer = cv2.imencode('.png', img)
        return base64.b64encode(buffer.tobytes()).decode('utf-8')

    return to_base64(original_img), to_base64(superimposed_img)


# --- Prediction endpoint ---
@app.post("/predict/")
async def predict(image_file: UploadFile = File(...), image_type: str = Form(...)):
    contents = await image_file.read()
    img = image.load_img(io.BytesIO(contents), target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    img_array = tf.convert_to_tensor(img_array, dtype=tf.float32)

    if image_type.lower() == "mri":
        model = MRI_model
        class_names = MRI_class_names
    elif image_type.lower() == "histo":
        model = histopathological_model
        class_names = histo_class_names
    else:
        return JSONResponse(status_code=400, content={"error": "Invalid image_type."})

    result = model.predict(img_array)
    result_class = int(np.argmax(result, axis=1)[0])
    confidence = float(result[0][result_class])
    class_name = class_names[result_class]

    original_base64, gradcam_base64 = generate_gradcam(model, img_array, result_class)

    return JSONResponse(content={
        "predicted_class": class_name,
        "confidence": confidence,
        "original_image": original_base64,
        "gradcam_image": gradcam_base64
    })