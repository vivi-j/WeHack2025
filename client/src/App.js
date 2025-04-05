import React from 'react';
import axios from 'axios';
import './App.css';
import { FaCircle, FaCloud, FaUser } from 'react-icons/fa';
import backgroundVideo from './bgvid.mp4'; // Import your video file

function App() {
  const turnOn = async () => {
    try {
      await axios.get('http://localhost:3001/api/on');
      console.log('LED turned on');
    } catch (error) {
      console.error('Error turning on LED:', error);
    }
  };

  const turnOff = async () => {
    try {
      await axios.get('http://localhost:3001/api/off');
      console.log('LED turned off');
    } catch (error) {
      console.error('Error turning off LED:', error);
    }
  };

  return (
    <div className="App">
      {/* Black Navigation Menu */}
      <nav className="black-nav">
        <div className="nav-left">
          <FaCircle className="nav-circle" />
          <button className="nav-button">About</button>
          <button className="nav-button">Contact</button>
        </div>
        
        <div className="nav-center">
          <h1 className="brand-name">[Brand Name]</h1>
        </div>
        
        <div className="nav-right">
          <button className="nav-button">
            <FaUser className="icon" /> Log in
          </button>
          <button className="nav-button sign-up">
            <FaCloud className="icon" /> Sign up
          </button>
        </div>
      </nav>

      {/* Video Background */}
      <div className="video-container">
        <video 
          autoPlay 
          loop 
          muted 
          className="background-video"
          style={{
            border: '1px solid #000',
            opacity: 0.7,
            filter: 'blur(10px)'
          }}
        >
          
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <header className="App-header">
          <h1>Rasp Pi Test</h1>
          <h2>i luv raspberries. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <div className="button-container">
            <button className="on-button" onClick={turnOn}>Turn On</button>
            <button className="off-button" onClick={turnOff}>Turn Off</button>
          </div>
        </header>
      </div>

      <link href="https://fonts.googleapis.com/css2?family=Damion&family=Roboto+Mono&display=swap" rel="stylesheet"></link>

    </div>
  );
}

export default App;