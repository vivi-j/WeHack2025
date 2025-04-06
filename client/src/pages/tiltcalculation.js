import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import GaugeComponent from '../components/gauge';
import Numbers from '../components/numbers';
import Carousel from '../components/carousel';

const Tiltcalculation = () => {
  const [tiltAngle, setTiltAngle] = useState('0°');
  const [populationDensity, setPopulationDensity] = useState('0/sq mile');

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log(`Clicked at x: ${x}, y: ${y}`);

    // Define the bounding box for the region of interest
    const minX_blue = 578.67;
    const maxX_blue = 616.67;
    const minY_blue = 253;
    const maxY_blue = 284;

    if (x >= minX_blue && x <= maxX_blue && y >= minY_blue && y <= maxY_blue) {
      setTiltAngle('10°');
      setPopulationDensity('3950 persons/sq mile');
      console.log("here");
    }

    // Define the bounding box for the region of interest
    const minX_white = 69;
    const maxX_white = 276;
    const minY_white = 308;
    const maxY_white = 522;

    if (x >= minX_white && x <= maxX_white && y >= minY_white && y <= maxY_white) {
      setTiltAngle('0°');
      setPopulationDensity('1.5 persons/sq mile');
      console.log("here");
    }


  };

  return (
    <div className='bg-[#0B0003] h-screen'>
      <Navbar />

      <div className="flex h-full">
        <div className="flex justify-center items-start pl-4 mt-[80px] w-full">
          {/* Container for Tilt Calculator + Text */}
          <div className="flex w-2/3 bg-[#483137] border-2 border-[#E7C0BC] p-4 rounded-3xl">
            
            {/* Tilt Calculator Image Section */}
            <div 
              className="flex flex-col justify-center items-center w-2/3 cursor-pointer"
            >
              <h1 className="text-white text-[24px] font-montserrat">Tilt Calculator</h1>
              <img 
                src="/Population_density_of_Texas_counties_28202029-2.png" 
                className="w-full" 
                alt="Tilt Calculation" 
                onClick={handleImageClick}
              />
            </div>

            {/* Text Section on the Right */}
            <div className="flex flex-col justify-center items-center w-1/3 px-20 space-y-4">
              <h1 className="text-white text-[20px] font-montserrat text-center leading-snug">
                Suggested Antenna Downtilt Angle
              </h1>             


              {/* Downtilt Angle Box */}
              <div className="w-32 h-16 bg-[#E7C0BC] text-[#0B0003] font-bold text-2xl flex items-center justify-center rounded-xl shadow-md">
                {tiltAngle}
              </div>
              {/*<br/>*/}

              <h1 className="text-white text-[20px] font-montserrat text-center leading-snug">
                Population Density
              </h1>

              {/* Population Density Box */}
              <div className="w-48 h-16 bg-[#E7C0BC] text-[#0B0003] font-bold text-lg flex items-center justify-center rounded-xl shadow-md">
                {populationDensity}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiltcalculation;
