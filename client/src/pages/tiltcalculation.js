// dashboard.js
import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import GaugeComponent from '../components/gauge'
import Numbers from '../components/numbers'
import Carousel from '../components/carousel'

const Tiltcalculation = () => {
  return (
    <div className='bg-[#0B0003] h-screen'>
      <Navbar />
    
      <div className="flex h-full">
        <Sidebar />
        
        <div className="flex flex-col justify-center items-center pl-4 mt-[80px] right-0 bottom-0 overflow-y-auto text-center">
          <div 
            className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl"
            onClick={() => window.location.href = "/tiltcalculation"}
          >
            <h1 className="text-white text-[24px] font-montserrat">Tilt Calculator</h1>
            <img src="/Population_density_of_Texas_counties_28202029-2.png" className='w-full' alt="Tilt Calculation" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tiltcalculation;
