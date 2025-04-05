const express = require('express');
const cors = require('cors');
const { Client } = require('ssh2');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

const piConfig = {
  host: '172.16.136.247',
  username: 'vaish',
  password: 'thisisbad',
};

const mongoURI = 'mongodb+srv://nerellasaigreeshma:tIbe85wGDmPusIXC@towerdata.cyrqhtc.mongodb.net/';
// GITHUBSTUDENT50-RYX4GK
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    username: 'nerellasaigreeshma', 
    password: 'tIbe85wGDmPusIXC',      
  }
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


const actuatorSchema = new mongoose.Schema({
  status: String,
  timestamp: { type: Date, default: Date.now }
});

const Actuator = mongoose.model('Actuator', actuatorSchema);

app.use(cors());
app.use(express.json());

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

app.get('/api/on', async (req, res) => {
  try {
    const command = "python3 -c 'import RPi.GPIO as GPIO; GPIO.setmode(GPIO.BCM); GPIO.setup(14, GPIO.OUT); GPIO.output(14, GPIO.HIGH);'";
    await executeSshCommand(command);
    await new Actuator({ status: 'on' }).save();
    res.json({ status: 'on', message: 'Actuator turned on successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/off', async (req, res) => {
  try {
    const command = "python3 -c 'import RPi.GPIO as GPIO; GPIO.setmode(GPIO.BCM); GPIO.setup(14, GPIO.OUT); GPIO.output(14, GPIO.LOW);'";
    await executeSshCommand(command);
    await new Actuator({ status: 'off' }).save();
    res.json({ status: 'off', message: 'Actuator turned off successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});