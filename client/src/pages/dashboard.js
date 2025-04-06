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
        <Sidebar />
        
        <div className="fixed top-[80px] left-64 pl-4 right-0 bottom-0 overflow-y-auto">
        <div className='flex gap-8 mt-4'>
            <p className='text-white font-Roboto underline'>Dashboard</p>
            <a href="/analysis" className='text-white font-Roboto hover:underline text-[#E7C0BC]'>Analysis</a>
        </div>
        <div className="flex space-x-4 mt-16"> {/* This creates a flex container with spacing between items */}
            {/* First Column */}
            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl">
                <h1 className="text-white font-Roboto">Overall Tower Health</h1>
                <GaugeComponent score={80} maxScore={100} title="Tower Health" />
                
            </div>

            {/* Second Column */}
            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl">
                <h1 className="text-white font-weight-700 font-[Roboto Mono] text-bold">Tower Type</h1>
                <div className="flex gap-8">
                    <img src="/logo192.png" alt="Logo" />
                    <img src="/logo192.png" alt="Logo" />
                </div>
            </div>

            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl">
                <p className='text-white'>Antenna</p>
                <p className='text-white'>Azimuth Angle: {123}º</p>
                <p className='text-white'> Optimal Placement</p>
                <p className='text-white'> Latitude: 8.25606, Longitude: -165.93653</p>
            </div>

            </div>

            {/* Green Div - Full Width */}
            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 mt-8 rounded-3xl">
              <h1 className="text-white">Obstruction</h1>
              <Carousel />
            </div>
          </div>
        </div>

        </div>
        

  );
}

export default dashboard;
