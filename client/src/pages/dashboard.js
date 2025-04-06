// dashboard.js
import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import GaugeComponent from '../components/gauge'
import Numbers from '../components/numbers'
import Carousel from '../components/carousel'

const dashboard = () => {
  return (
    <div className='bg-[#0B0003] h-screen'>
      <Navbar />
    
      <div className="flex h-full">
        <div className="fixed top-[80px] w-full">
          <div className='flex gap-8 pl-12 mt-4'>
            <p className='text-[#E7C0BC] bg-[#0B0003] font-montserrat  underline'>Dashboard</p>
            <a href="/analysis" className="text-white hover:text-[#E7C0BC] font-montserrat hover:underline">Analysis</a>
          </div>
          <div className="flex space-x-4 mt-8">
            {/* First Column */}
            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl">
              <h1 className="text-white text-[24px] font-montserrat ">Overall Tower Health</h1>
              <GaugeComponent score={80} maxScore={100} title="Tower Health" />
            </div>

            {/* Second Column */}
            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl">
              <h1 className="text-white text-[24px] font-montserrat ">Tower Type</h1>
              <div className="flex gap-8">
                <img src="/logo192.png" alt="Logo" />
                <img src="/logo192.png" alt="Logo" />
              </div>
            </div>

            {/* Third Column */}
            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl">
              <p className='text-white text-[24px]'>Antenna</p>
              <p className='text-white'>Azimuth Angle: {123}º</p>
              <p className='text-white'>Optimal Placement</p>
              <p className='text-white'>Latitude: 8.25606, Longitude: -165.93653</p>
            </div>
          </div>

          {/* Green Div - Full Width with New Column */}
          <div className="flex space-x-4 mt-8 absolute">
            {/* First Column in Green Div */}
            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl">
              <h1 className="text-white text-[24px] absolute top-[20px] font-montserrat">Obstruction</h1>
              <Carousel/>
            </div>

            {/* Second Column in Green Div */}
            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl"
            onClick={() => window.location.href = "/tiltcalculation"}>
              <h1 className="text-white text-[24px] absolute top-2 font-montserrat ">Tilt Calculator</h1>
              <img src="/Population_density_of_Texas_counties_28202029-2.png" className='w-1/2 mt-8'></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default dashboard;
