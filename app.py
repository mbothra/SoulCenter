from flask import Flask, request, jsonify
from medisafe import create_guided_meditation, get_all_video_links # Import your function
import threading
from flask_cors import CORS
from uuid import uuid4

tasks = {}

app = Flask(__name__)
CORS(app)

@app.route('/api/generate_meditation', methods=['POST'])
def generate_meditation():
    response = jsonify({"message": "Meditation script generation started."})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    task_id = str(uuid4())
    tasks[task_id] = {"status": "started"}

    print(request.json)
    data = request.json
    description = data['mood']
    experience = data['level']
    sound = data['sound']
    condition = data['condition']
    environment = data['env']
    output_file = data['name']
    accent = data['accent']
    uname = data['uname']
    gender = data['gender']

    def task():
        try:
            create_guided_meditation(description, experience, sound, condition, environment, output_file, accent, uname, gender)  # your parameters here
            tasks[task_id]["status"] = "completed"
        except Exception as e:
            tasks[task_id] = {"status": "failed", "error": str(e)}

    # Run the meditation script generation in a separate thread to not block the API response
    thread = threading.Thread(target=task)
    thread.start()
    
    return jsonify({"message": "Meditation script generation started.", "task_id": task_id})

@app.route('/api/library', methods=['GET'])
def generate_library():
    print("")
    video_links = get_all_video_links()  # your parameters here    
    return jsonify(video_links)


if __name__ == '__main__':
    app.run(debug=True)
