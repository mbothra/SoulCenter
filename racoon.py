import requests
import os
import base64

# Replace the empty string with your model id below
model_id = "7wl17vvq"
baseten_api_key = "YO8NYP1j.hHbgkCMZndBfzwGTHjF745ZjJON7d1A4"

data = {
    "prompts": [
      "Calm flute music with droplets of water in the background"
    ],
    "duration": 30
}

# Call model endpoint
res = requests.post(
    f"https://model-{model_id}.api.baseten.co/production/predict",
    headers={"Authorization": f"Api-Key {baseten_api_key}"},
    json=data
)

# Convert the base64 output to an audio file
print(res.json())
res = res.json()
output = res.get("data")
for idx, clip in enumerate(output):
    with open(f"musicgen_output_{idx}.wav", "wb") as f:
        f.write(base64.b64decode(clip))