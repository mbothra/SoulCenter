# SoulCenter.ai

## Inspiration

In a world increasingly burdened by stress and anxiety, the quest for mental wellness has never been more critical. Yet, many individuals find themselves alienated by the one-size-fits-all approach of existing meditation apps. These solutions often fail to address the unique, personal nature of stress and anxiety, leaving users feeling disconnected and unsupported. In-person personalized sessions are often prohibitively expensive. 

Presenting **SoulCenter.ai**: an innovation in personal well-being and mindfulness, a meditation experience so uniquely tailored, it feels like a journey crafted just for you, by you. Imagine stepping into a world where meditation isn't just a practice but a deeply personal voyage, meticulously designed around your emotions, your environment, and even your voice preferences.

Our mission is to democratize access to personalized meditation, recognizing the diverse challenges individuals face, including time constraints, cost barriers, and the quest for a truly intuitive experience. SoulCenter.ai is not just a platform; it's a movement towards a more empathetic, inclusive, and personalized approach to mental wellness.

## What it does

Our platform now includes enhanced features that cater to a wider array of user preferences and needs:

- **Expressive Empathy Sessions**: Users can share their emotions, mental state, and personal preferences, including voice (male, female) and accent (British, Indian, African etc.), enabling the creation of sessions that deeply resonate on a personal level.
- **Voice personalization**: Users can share their voice preference, including accent that creates a meditation experience that deeply resonates with them.
- **Inclusive Customization**: Acknowledging the importance of accessibility, users can specify any disabilities or situational constraints (e.g., being in a car), ensuring that every session is not only personalized but also accessible and safe for their specific circumstances.
- **AI-Powered Personalization**: With advanced natural language processing from ChatGPT, SoulCenter.ai adapts to a broad spectrum of emotions, preferences, and user-specific requirements, offering an unmatched level of personalization in meditation content.
- **Flexible Session Lengths**: We recognize the demands of modern life and offer meditation sessions of varying lengths to fit into any schedule, ensuring there's always time for mental wellness.
- **Accessibility and Affordability**: Our online platform breaks down financial and physical barriers to accessing quality meditation guidance, making it widely accessible to everyone.
- **Simple and Intuitive Interface**: Designed with the user's ease in mind, SoulCenter.ai facilitates a stress-free navigation experience, guiding users seamlessly to their personalized meditation session.
- **Revisiting Past Sessions**: Users can easily access and revisit their previous meditation sessions, fostering a sense of continuity and deepening their meditation practice over time.
- **Feedback Loop**: At the end of each meditation session, users are encouraged to provide feedback on their experience. This invaluable input allows us to continuously refine and improve our offerings, ensuring that SoulCenter.ai evolves in response to the needs of our community.

## How we built it

SoulCenter.ai leverages cutting-edge technology and a deep understanding of human psychology to offer a revolutionary platform for mental wellness:

- **Enhanced User Input**: We've expanded our user input capabilities to include emotional states, preferences for voice and accent, disabilities, and environmental constraints, ensuring a highly tailored meditation experience.
- **Backend Complexity, Frontend Simplicity**: Our backend algorithms have been intricately designed to process a wide range of user inputs while maintaining a simple and serene frontend experience.
- **Comprehensive AI Integration**: Using ChatGPT for dynamic content creation and incorporating Elevenlabs’ text-to-speech technologies that cater to diverse accents and voice preferences, we ensure every meditation session is both personalized and engaging.
- **Robust Cloud Infrastructure**: Our use of AWS has been optimized for scalability and efficiency, managing a vast library of unique meditation sessions accessible from anywhere, at any time.

## Requirements

1. Python 3.6 or higher
2. OpenAI open source models
3. Baseten open source model
4. Python Numpy
5. Python Soundfile to read and write soundfiles
6. Python os for pathname manipulations
7. Python re for regular expression support
8. Python base64 for data encoding
9. ElevenLabs open source customized voice models
10. Python librosa for music and audio analysis

## Setup

1.	Clone the repository

git clone https://github.com/mbothra/SoulCenter.git

2.	Set up keys in .env file

OPENAI_API_KEY=sk-[] \n
BASETEN_API_KEY=[] \n
ELEVENLABS_API_KEY=[] \n
AWS_ACCESS_KEY_ID=[] \n
AWS_SECRET_ACCESS_KEY=[] \n

3.	Create a python environment and run Flask Server

cd SoulCenter \n
python -m venv <virtual environment name> \n
source venv/bin/activate \n
pip install -r requirements.txt \n
python app.py \n

4.	Install the required frontend dependencies

cd meditation-frontend \n
npm install \n
npm run start \n

## Architecture

![WhatsApp Image 2024-02-17 at 16 25 08 (1)](https://github.com/mbothra/SoulCenter/assets/66191235/b6a5c8f4-94b5-4943-9955-92877485e4fe)


## Challenges we ran into

1. Identifying right voice manipulations for our use case of meditation.
2. Ensuring generation of background music with limited latency.
3. Merging voice and background music into a single audio file.
4. Prompting LLM in a manner that captures all of users' inputs and feelings and incorporates those into personalized meditation scripts.

## Accomplishments that we're proud of

- **Positive User Impact**: Early feedback from our enhanced platform has been overwhelmingly positive, with users expressing appreciation for the depth of personalization and the inclusivity of our offerings.
- **Unparalleled Personalization**: We've set a new standard in personalized meditation, successfully incorporating a wide range of user preferences and needs into our sessions.
- **Technological Innovation**: Our advancements in AI and text-to-speech technology have enabled us to offer a truly inclusive and accessible platform.

## What we learned

This journey has reinforced the importance of listening to our users and continuously innovating to meet their diverse needs. It has shown us the power of technology to transform lives when applied with empathy and understanding.

## What's next for SoulCenter.ai

- **Further Personalization**: We plan to introduce even more customization options, allowing users to tailor their meditation experiences to an even finer degree.
- **Community Engagement**: Developing features that enable users to connect and share their meditation experiences, fostering a supportive community around mental wellness.
- **Global Expansion**: We aim to make SoulCenter.ai available in multiple languages, reaching a global audience and bringing personalized meditation to users worldwide.
