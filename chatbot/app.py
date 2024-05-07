import openai
from flask import Flask, request, jsonify, session
from openai import OpenAI
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'
CORS(app)
# Initialize OpenAI client
client = OpenAI(api_key="sk-proj-ZfvPZtv4zaACG8bv7mkJT3BlbkFJHKxRna41iiBFMhzobuOa")
asisstantid = "asst_puDlUSRrR2Syumv29bObohRk"


@app.route('/start', methods=['GET'])
def start_conversation():
    thread = client.beta.threads.create_and_run(
        assistant_id=asisstantid,
    )
    return jsonify({'thread_id': thread.thread_id})


@app.route('/ask', methods=['POST'])
def ask_therapist():
    user_input = request.json.get('question', '')
    thread_id = request.json.get('thread_id', '')

    if not thread_id:
        return jsonify({'error': 'No active conversation. Please start a conversation first.'}), 400

    try:
        # Create a message in the thread
        message = client.beta.threads.messages.create(
            thread_id=thread_id,
            role='user',
            content=user_input
        )

        # Run the thread with the assistant
        run = client.beta.threads.runs.create(
            thread_id=thread_id,
            assistant_id=asisstantid
        )

        while run.status != "completed":
            run = client.beta.threads.runs.retrieve(
                thread_id=thread_id,
                run_id=run.id
            )
            if run.status == "completed":
                break
        all_messages = list(client.beta.threads.messages.list(
            thread_id=thread_id
        ))

        return jsonify({'response': all_messages[0].content[0].text.value})

    except openai.NotFoundError as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 404


if __name__ == '__main__':
    app.run(debug=True)
