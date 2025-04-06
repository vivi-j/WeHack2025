from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv() 

app = Flask(__name__)
CORS(app)

# Configure Gemini
genai.configure(api_key=os.getenv('AIzaSyDlQwUPKZNz1ZOwIGeeIqwfqfldbOWPmn8'))
model = genai.GenerativeModel('gemini-pro')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', '')
        history = data.get('history', [])
        
        chat = model.start_chat(history=history)
        
        response = chat.send_message(message)
        
        return jsonify({
            'text': response.text,
            'history': chat.history
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)