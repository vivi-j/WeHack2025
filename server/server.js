const express = require('express');
const cors = require('cors');
const { Client } = require('ssh2');
const axios = require('axios');

const app = express();
const port = 3001;

// Raspberry Pi SSH credentials
const piConfig = {
  host: '172.16.136.247',  // Replace with your Pi's IP
  username: 'vaish',       // Replace with your username
  password: 'thisisbad',   // Replace with your password
};

// Enable CORS for React development server
app.use(cors());
app.use(express.json());

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

// API endpoint to turn actuator on
app.get('/api/on', async (req, res) => {
  try {
    const command = "python3 -c 'import RPi.GPIO as GPIO; GPIO.setmode(GPIO.BCM); GPIO.setup(14, GPIO.OUT); GPIO.output(14, GPIO.HIGH);'";
    await executeSshCommand(command);
    res.json({ status: 'on', message: 'Actuator turned on successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to turn actuator off
app.get('/api/off', async (req, res) => {
  try {
    const command = "python3 -c 'import RPi.GPIO as GPIO; GPIO.setmode(GPIO.BCM); GPIO.setup(14, GPIO.OUT); GPIO.output(14, GPIO.LOW);'";
    await executeSshCommand(command);
    res.json({ status: 'off', message: 'Actuator turned off successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:5001/api/chat', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error forwarding to Gemini service:', error);
    res.status(500).json({ error: 'Error communicating with chat service' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});