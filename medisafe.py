from openai import OpenAI
from dotenv import load_dotenv
import numpy as np
import soundfile as sf
import os
from elevenlabs import generate, play, save, set_api_key, Voice, VoiceSettings
from concurrent.futures import ThreadPoolExecutor
import requests
import base64
import librosa
import re
from aws_utils import upload_file_to_s3, object_list

load_dotenv()  # This loads the environment variables from .env
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
BASETEN_API_KEY = os.getenv("BASETEN_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

set_api_key(ELEVENLABS_API_KEY)
client = OpenAI(api_key = OPENAI_API_KEY)
model_id = "232pge0q"
baseten_api_key = BASETEN_API_KEY
voice_id_map = {
    'american_female':'YK65NXwjFLtDoLlJ4UT1', 'american_male' : 'jloHSlttvBGV1I5w7KYy' , 
    'indian_female':'b4SkHFo1YolMs8InvSQZ', 'indian_male' : '6ZhpCNHTCKN5IO4zBCey', 
    'british_female':'9W4DcWvXrCyWNrDhnjoT', 'british_male' : 'wgHvco1wiREKN0BdyVx5', 
    'african_female':'6e1dGsNTC3lDc5t5s9FI', 'african_male' : 'HhAox3LJUACmg2qSCr7Z',
    'latin_female':'CoJTolOgtIv629HNctrE', 'latin_male' : 'D4pHtjhmyLCDDAMHhqgQ'
}

# secret aws L+LZTivie3lXrGBfLJ/+F5WWXQkG6vXcWnK2pO5b
# Access AKIATCKAOQN6PCLK3FF2

def parallel_tasks(transcript, duration, speech_filename, music_filename, sound, accent, gender):
    with ThreadPoolExecutor(max_workers=2) as executor:
        future_text_to_speech = executor.submit(text_to_speech, transcript, speech_filename, accent, gender)
        future_background_music = executor.submit(background_music_generator, duration, music_filename, sound)
        
        # Wait for both tasks to complete
        future_text_to_speech.result()
        print("Text to speech generation completed.")
        future_background_music.result()
        print("Background music generation completed.")

# Replace 'your_openai_api_key' with your actual OpenAI API key
def generate_meditation_script(user_feeling, duration, name, experience, condition, environment):
    """
    Generates a meditation script based on the user's mood and desired duration.
    """
    prompt = f"""Craft a meditation script that begins by warmly welcoming {name}, acknowledging their journey as a {experience} 
        level meditator. Address them with {name} through the script. Create a script conducive to best meditation practices from breathwork, progressive 
        relaxation, mindfulness, visualization, yoga nidra, body scan based on {user_feeling}. Generate a text of {0.66*duration} minutes, This session, 
        tailored for their sanctuary at {environment}, should weave in elements that resonate deeply with their current emotional state, guided by the gentle 
        wisdom of best meditation practices. Acknowledge any constraints like {condition} with grace, ensuring the script flows seamlessly around these, 
        offering alternative paths to mindfulness and relaxation. Conclude with words that soothe, uplift, and reinvigorate, leaving {name} feeling genuinely 
        nurtured and profoundly refreshed. The aim is to create an intimate, transformative experience, making them feel seen, heard, and deeply cared for. Make it 
        as unique and as personalized as possible given all the input parameters. Guide them gently into the meditation and then guide them gently out of meditation.
        Add pauses where needed such as if pause required for 5 sec write (pause 5) in the exact same format."""    
    
    messages = [
    # system message to set the behavior of the assistant
            {"role": "system", "content": "Hi ChatGPT, You are a Meditation guru!"},
            {"role": "user", "content": prompt},
        ]
    print(f"Calling open ai")
    response = client.chat.completions.create(model="gpt-3.5-turbo", messages=messages)
    return response.choices[0].message.content.strip()

# Replace 'your_openai_api_key' with your actual OpenAI API key
def text_to_speech(text, filename, accent, gender):
    try:
        print("Starting text to speech generation...")
        audio = generate(
            text=text,
            voice=Voice(
                voice_id=voice_id_map.get(f"{accent}_{gender}"),
                settings=VoiceSettings(stability=0.71, similarity_boost=0.5, style=0.0, use_speaker_boost=True)
            )
        )
        save(audio, filename)
        print("Text to speech generation completed successfully.")
    except Exception as e:
        print(f"Error in text to speech generation: {e}")

def background_music_generator(duration=20, music_filename="", sound_type=""):
    try:
        print("Starting background music generation...")
        if "AI" in sound_type:
            sound_type = "Pick most relevant sound type, for ex: rain, thunder, healing sounds"
        description = f"""Generate a meditation soundtrack that incorporates the soothing essence of {sound_type}. 
            The composition should start with a consistent integration of {sound_type}. 
            Build a harmony that evokes a sense of deep relaxation and peace.Throughout the piece, ensure the volume and intensity of {sound_type} are balanced to
            maintain a calming effect, suitable for meditation. The sounds should not be overwhelming but rather blend naturally into a cohesive soundscape that facilitates focus, relaxation, and inner tranquility.
            Please pay special attention to the quality and authenticity of the {sound_type}], ensuring it replicates the natural environment as closely as possible. The goal is to create an immersive auditory experience that transports the 
            listener to a space of serenity and mindfulness of {sound_type} sounds"""
        data = {
            "prompts": [description],
            "duration": duration
        }
        res = requests.post(
            f"https://model-{model_id}.api.baseten.co/production/predict",
            headers={"Authorization": f"Api-Key {baseten_api_key}"},
            json=data
        )
        if res.status_code != 200:
            print(f"Error in background music generation: {res.text}")
            return  # Adding this return to ensure function exits in case of error

        res = res.json()
        output = res.get("data")
        for idx, clip in enumerate(output):
            with open(music_filename, "wb") as f:
                f.write(base64.b64decode(clip))
        print("Background music generation completed successfully.")
    except Exception as e:
        print(f"Exception in background music generation: {e}")


def overlay_background_music(speech_file, music_file, output_file):
    """
    Overlays the speech on background music and saves the output.
    """
    speech, sr_speech = librosa.load(speech_file, sr=None)
    background, sr_background = librosa.load(music_file, sr=sr_speech)  # Ensure same sample rate

    # If necessary, make background the same length as speech
    background = np.tile(background, int(np.ceil(len(speech) / len(background))))
    background = background[:len(speech)]

    # Mix audio (adjust volume of background as needed)
    mixed_audio = speech + 0.5 * background  # Adjust background volume

    # Save mixed audio
    sf.write(output_file, mixed_audio, sr_speech)

def replace_pause_with_spaces(script):
    """
    Replaces "pause <number>" with spaces, where <number> is multiplied by 8.
    """
    # Replace "pause <number>" with spaces
    regex_pattern_pause = r"pause (\d+)"
    def spaces_for_pause(match):
        num_spaces = int(match.group(1)) * 20  # Multiply the number by 8
        return "--" * num_spaces  # Return the corresponding number of spaces
    script = re.sub(regex_pattern_pause, spaces_for_pause, script)
    
    # Replace brackets with spaces
    script = script.replace("(", " ").replace(")", " ")
    
    return script


def create_guided_meditation(user_feeling, experience, sound, condition, environment, output_file, accent, uname, gender):
    """
    Full process to create a guided meditation audio file.
    """
    script = generate_meditation_script(user_feeling, 1.5, uname, experience, condition, environment)[:500]
        
    # # Replace "pause <number>" with the appropriate number of spaces
    script = replace_pause_with_spaces(script)

    speech_file = "meditation_speech.mp3"
    music_file = "background_music.mp3"

    print(f"Calling tasks")   
    parallel_tasks(script, 8, speech_file, music_file, sound, accent, gender)
    output_file = f'{output_file}.mp3'
    overlay_background_music(speech_file, music_file, output_file)
    print(f"Guided meditation created: {output_file}")
    return upload_file(output_file)

def upload_file(file_name, bucket_name='teletubby'):
    print("Uploading")
    return upload_file_to_s3(file_name, bucket_name)

def get_all_video_links():
    return object_list()

# Example usage
if __name__ == "__main__":
    mood_description = "I lost $1M in stocks and i feel like committing suicide"
    duration = 1  # Duration in minutes
    create_guided_meditation(mood_description, duration)




