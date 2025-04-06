import React from 'react';
import axios from 'axios';
import NavBar from '../components/navbar';
import {useAuth} from '../contexts/authContext';

/*const turnOn = async () => {
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
};*/

const Homepage = () => {
  const { userLoggedIn } = useAuth();

  const handleGetStarted = () => {
    if (userLoggedIn) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden text-center">
      <NavBar />

      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <video
          muted
          autoPlay
          loop
          className="w-full h-full object-cover opacity-70 blur-sm"
        >
          <source src="/bgvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      </div>

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] pt-[80px] text-white">
        <header className="p-10 rounded-lg max-w-[800px] w-[90%] flex flex-col items-center justify-center">
          <h1 className="text-white text-[125px] font-[Damion] drop-shadow-[0_8px_1.2px_rgba(222,87,152,0.8)] leading-none mb-4">
            Soul Signal
          </h1>
          <h2 className="text-white text-[30px] font-montserrat font-normal pt-4 leading-tight mb-6">
            I love raspberries. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <button className="mt-4 bg-[#E7C0BC] cursor-custom text-[#8B3C46] text-[24px] px-[30px] py-[15px] rounded-full transition-all duration-300 hover:bg-[#d19ca3] font-[Farro] font-bold"
           onClick={handleGetStarted}>
            Get Started

          </button>
        </header>
      </div>

      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Damion&family=Roboto+Mono&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default Homepage;


/*<button
              className="on-button bg-[#E7C0BC] text-[#8B3C46] text-[24px] px-[30px] py-[15px] rounded-[50px] transition-all ease-in-out duration-300 hover:bg-[#d19ca3] font-[Farro] font-bold text-center"
              onClick={turnOn}
            >
              Turn On
            </button>
            <button
              className="off-button bg-[#E7C0BC] text-[#8B3C46] text-[24px] px-[30px] py-[15px] rounded-[50px] transition-all ease-in-out duration-300 hover:bg-[#d19ca3] font-[Farro] font-bold text-center"
              onClick={turnOff}
            >
              Turn Off
            </button>*/
