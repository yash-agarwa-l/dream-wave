import requests

url = "http://127.0.0.1:5000/predict"

data = {
    "eeg_theta_power": 91.9,
    "eeg_gamma_power": 14.8,
    "eeg_delta_power": 80.5,
    "heart_rate_bpm": 80.8,
    "hrv_ms": 41.0,
    "rem_bursts": 1,
    "chin_emg": 12.7,
    "respiration_rate": 12.3,
    "resp_irregularity": 0.041,
    "skin_conductance": 2.35,
    "dream_text": "I was falling through the sky with no end in sight."
}

response = requests.post(url, json=data)
print(response.json())
