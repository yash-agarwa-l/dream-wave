from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import tensorflow as tf
from ast import literal_eval

app = Flask(__name__)

# --- Load components from their source files ---
try:
    # 1. Load the Keras model from the .h5 file
    model = tf.keras.models.load_model("dream_model.h5", compile=False)
    
    # 2. Load the DreamBank data from the .csv file
    processed_dreams = pd.read_csv('processed_dreams.csv')
    
    # The list columns are saved as strings, so we must convert them back to lists
    list_columns = ['emotions', 'settings', 'characters', 'objects', 'activities', 'colors', 'themes']
    for col in list_columns:
        processed_dreams[col] = processed_dreams[col].apply(literal_eval)

    print("✅ Model and DreamBank data loaded successfully.")

except FileNotFoundError:
    print("❌ Error: Make sure 'dream_model.h5' and 'processed_dreams.csv' are in the same folder.")
    model = None
    processed_dreams = None

# 3. Hardcode the list of physiological features
physiology_features = [
    'eeg_theta_power', 'eeg_gamma_power', 'eeg_delta_power',
    'heart_rate_bpm', 'hrv_ms', 'rem_bursts', 'chin_emg',
    'respiration_rate', 'resp_irregularity', 'skin_conductance'
]

# --- Helper function for finding similar dreams ---
def find_similar_dreams(target_valence, target_arousal, n_dreams=3):
    if processed_dreams is None or processed_dreams.empty:
        return pd.DataFrame() # Return empty DataFrame
    valence_diff = (processed_dreams['mood_valence'] - target_valence) ** 2
    arousal_diff = (processed_dreams['mood_arousal'] - target_arousal) ** 2
    affect_distance = np.sqrt(valence_diff + arousal_diff)
    similar_indices = affect_distance.nsmallest(n_dreams).index
    return processed_dreams.loc[similar_indices]


@app.route("/generate_dream", methods=["POST"])
def generate_dream():
    if not model:
        return jsonify({"error": "Model not loaded. Check server logs."}), 500
        
    try:
        data = request.get_json()
        
        # 1. Prepare physiological data from the request
        features_list = [data[key] for key in physiology_features]
        features = np.array([features_list], dtype=np.float32)
        
        # Create a sequence of 10
        sequence = np.tile(features, (10, 1))
        sequence_reshaped = sequence.reshape((1, 10, len(physiology_features)))

        # !!! IMPORTANT WARNING !!!
        # The original model was trained on SCALED data. By removing the scaler,
        # the model's predictions will be inaccurate. For correct results,
        # you should retrain a new model without using a scaler.
        # This code will RUN, but the valence/arousal output will be unreliable.

        # 2. Use the ML model to predict the emotion
        prediction = model.predict(sequence_reshaped) # Using unscaled data
        valence, arousal = float(prediction[0][0]), float(prediction[0][1])

        # 3. Find similar dreams from DreamBank
        similar_dreams = find_similar_dreams(valence, arousal)

        # 4. Build a simple prompt from the similar dreams
        if not similar_dreams.empty:
            top_theme = similar_dreams['themes'].explode().mode().values[0]
            top_setting = similar_dreams['settings'].explode().mode().values[0]
            top_emotion = similar_dreams['emotions'].explode().mode().values[0]
            
            prompt = f"A dreamlike, surreal scene about '{top_theme}' taking place in a '{top_setting}'. The atmosphere feels '{top_emotion}'."
        else:
            prompt = "A mysterious and surreal dreamscape with neutral emotions."

        # 5. Return the final JSON response
        return jsonify({
            "prompt": prompt,
            "predicted_emotion": {
                "valence": valence,
                "arousal": arousal
            }
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True, port=5000)