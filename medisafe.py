import openai
import pyttsx3
from pydub import AudioSegment
import os

# Replace 'your_openai_api_key' with your actual OpenAI API key
openai.api_key = 'your_openai_api_key'

def generate_meditation_script(description, duration):
    """
    Generates a meditation script based on the user's mood and desired duration.
    """
    prompt = f"Create a guided meditation script for {duration} minutes based on the mood: {description}"
    response = openai.Completion.create(
        engine="text-davinci-003",  # or whichever is the latest and most appropriate for your use case
        prompt=prompt,
        temperature=0.7,
        max_tokens=1000,  # Adjust based on the expected script length
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    return response.choices[0].text.strip()

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




