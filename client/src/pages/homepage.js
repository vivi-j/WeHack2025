import React from 'react';
import axios from 'axios';
import NavBar from '../components/navbar';

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
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <NavBar />

      <div className="fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] overflow-visible z-[-1]">
        <video
          muted
          autoPlay
          loop
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] min-w-full min-h-full object-cover"
          style={{
            border: '1px solid #000',
            opacity: 0.7,
            filter: 'blur(10px)',
            width: '100%',
            height: 'auto'
          }}
        >
          <source src="/bgvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      </div>

      <div className="relative z-[50] -mt-[150px] h-[calc(100vh-80px)] flex items-center justify-center text-white/0">
        <header className="bg-transparent p-[40px] rounded-[10px] max-w-[800px] w-[90%] flex flex-col items-center justify-center text-center">
          <h1 className="text-white text-[100px] font-[Damion] font-normal text-center -webkit-text-stroke-[4px] -webkit-text-stroke-[#D082B1] leading-[100%] mb-2">
            Rasp Pi Test
          </h1>
          <h2 className="text-white text-[20px] font-[Roboto Mono] font-normal text-center pt-8 leading-[100%] mb-2">
            I love raspberries. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <div className="button-container flex gap-5 mt-8 items-center">
            {/*<button
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
            </button>*/}
          </div>
        </header>
      </div>

      <link
        href="https://fonts.googleapis.com/css2?family=Damion&family=Roboto+Mono&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default Homepage;
