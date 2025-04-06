// dashboard.js
import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import GaugeComponent from '../components/gauge'
import Numbers from '../components/numbers'
import Carousel from '../components/carousel'
import TowerChart from '../components/tower_type'
import NestChart from '../components/obstruction'

function calculateOverallHealth(param1, param2, param3, param4) {
    const weight1 = 0.4;
    const weight2 = 0.3;
    const weight3 = 0.2;
    const weight4 = 0.1;
  
    // Scale the integer inputs (range 0-100) to 0-1 by dividing by 100
    const scaledParam1 = param1 / 100;
    const scaledParam2 = param2 / 100;
    const scaledParam3 = param3 / 100;
    const scaledParam4 = param4 / 100;
  
    // Calculate the weighted sum with the scaled values
    const weightedSum = 
      (scaledParam1 * weight1) + 
      (scaledParam2 * weight2) + 
      (scaledParam3 * weight3) + 
      (scaledParam4 * weight4);
  
    // Convert the weighted sum into a percentage (scaled back to 0-100)
    const percentage = weightedSum * 100;  // Since we want percentage
    return percentage;
  }

const dashboard = () => {
  return (
    <div className='bg-[#0B0003] h-screen'>
      <Navbar />
    
      <div className="flex h-full">
        <div className="fixed top-[80px] w-full">
          <div className='flex gap-8 pl-12 mt-2'>
            <p className='text-[#E7C0BC] bg-[#483137] p-2 rounded-3xl font-montserrat underline'>Dashboard</p>
            <a href="/analysis" className="text-white p-2 rounded-3xl border-2 border-[#E7C0BC] hover:text-[#E7C0BC] font-montserrat hover:underline">Analysis</a>
          </div>
          <div className="flex space-x-4 pl-12 h-[300px] mt-8">
            {/* First Column */}
            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl">
              <h1 className="text-white text-[24px] font-montserrat ">Overall Tower Health</h1>
              <GaugeComponent score={calculateOverallHealth(100, 50, 100, 50)} maxScore={100} title="Tower Health" />
            </div>

            {/* Second Column */}
            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl">
              <h1 className="text-white text-[24px] font-montserrat h-full ">Tower Type</h1>
              <TowerChart className = 'p-4'/> 

            </div>

            {/* Third Column */}
            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl">
              <h1 className="text-white text-[24px] font-montserrat ">Obstruction Likelihood</h1>
              <NestChart/>              
            </div>
          </div>

          {/* Green Div - Full Width with New Column */}
          <div className="flex space-x-4 pl-12 mt-8 absolute">
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
