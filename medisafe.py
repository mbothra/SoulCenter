from openai import OpenAI
import pyttsx3
from pydub import AudioSegment
import os

client = OpenAI(api_key = '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')

# Replace 'your_openai_api_key' with your actual OpenAI API key
def generate_meditation_script(description, duration):
    """
    Generates a meditation script based on the user's mood and desired duration.
    """
    prompt = f"Create a guided meditation script for {duration} minutes based on the mood: {description} with pauses integrated"
    messages = [
    # system message to set the behavior of the assistant
            {"role": "system", "content": "Hi ChatGPT, You are a Meditation guru!"},
            {"role": "user", "content": prompt},
        ]
    response = client.chat.completions.create(model="gpt-3.5-turbo", messages=messages)
    return response.choices[0].message.content.strip()

def text_to_speech(text, filename):
    """
    Converts text to speech and saves it as an MP3 file.
    """
    engine = pyttsx3.init()
    engine.save_to_file(text, filename)
    engine.runAndWait()

def overlay_background_music(speech_file, music_file, output_file):
    """
    Overlays the speech on background music and saves the output.
    """
    speech = AudioSegment.from_file(speech_file)
    background = AudioSegment.from_file(music_file).lower()
    # Adjust the background music length to match the speech length
    background = background[:len(speech)]
    combined = speech.overlay(background)
    combined.export(output_file, format='mp3')

def create_guided_meditation(description, duration, music_file):
    """
    Full process to create a guided meditation audio file.
    """
    script = generate_meditation_script(description, duration)
    speech_file = "meditation_speech.mp3"
    text_to_speech(script, speech_file)
    output_file = "guided_meditation.mp3"
    overlay_background_music(speech_file, music_file, output_file)
    print(f"Guided meditation created: {output_file}")

# Example usage
if __name__ == "__main__":
    mood_description = "calm and focused"
    duration = 5  # Duration in minutes
    background_music_file = "path_to_your_background_music.mp3"
    create_guided_meditation(mood_description, duration, background_music_file)




