require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client } = require('ssh2');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3001;

// Raspberry Pi SSH credentials
const piConfig = {
  host: process.env.PI_HOST || '172.16.136.247',
  username: process.env.PI_USERNAME || 'vaish',
  password: process.env.PI_PASSWORD || 'thisisbad',
};

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Initialize Gemini AI
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAoe_7vZJfrySqL4qHm2ZiAwZg7T0vJqTw";
const genAI = new GoogleGenerativeAI(API_KEY);

// Function to execute SSH command
const executeSshCommand = (command) => {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    let output = '';

    conn.on('ready', () => {
      conn.exec(command, (err, stream) => {
        if (err) {
          conn.end();
          return reject(err);
        }

        stream.on('close', (code, signal) => {
          conn.end();
          resolve(output);
        }).on('data', (data) => {
          output += data.toString();
        }).stderr.on('data', (data) => {
          output += data.toString();
        });
      });
    }).on('error', (err) => {
      reject(err);
    }).connect(piConfig);
  });
};

// Actuator Control Endpoints
app.get('/api/on', async (req, res) => {
  try {
    const command = "python3 -c 'import RPi.GPIO as GPIO; GPIO.setmode(GPIO.BCM); GPIO.setup(14, GPIO.OUT); GPIO.output(14, GPIO.HIGH);'";
    await executeSshCommand(command);
    res.json({ status: 'on', message: 'Actuator turned on successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/off', async (req, res) => {
  try {
    const command = "python3 -c 'import RPi.GPIO as GPIO; GPIO.setmode(GPIO.BCM); GPIO.setup(14, GPIO.OUT); GPIO.output(14, GPIO.LOW);'";
    await executeSshCommand(command);
    res.json({ status: 'off', message: 'Actuator turned off successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Enhanced Chat Endpoint with conversation history
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.9
      }
    });

    const chat = model.startChat({
      history: history.map(item => ({
        role: item.role,
        parts: [{ text: item.text }]
      }))
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ 
      text,
      history: [
        ...history,
        { role: "user", text: prompt },
        { role: "model", text }
      ]
    });

  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to get response",
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Test endpoint
app.get('/api/test', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent("Hello, who are you?");
    const response = await result.response;
    res.json({ 
      status: 'Server is running',
      geminiResponse: response.text(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      hint: "Check if GEMINI_API_KEY is properly set in .env"
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`CORS configured for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});