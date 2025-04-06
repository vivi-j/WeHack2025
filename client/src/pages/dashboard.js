import React from 'react';
import Navbar from '../components/navbar';
import GaugeComponent from '../components/gauge';
import TowerChart from '../components/tower_type';
import NestChart from '../components/obstruction';
import Carousel from '../components/carousel';
import Papa from 'papaparse';

function mapCategoryToScore(category) {
  const mapping = {
    'nest': 30,       
    'no_nest': 100,  
    'Rainy': 60,      
    'Cloudy': 80,    
    'Sunny': 90,      
    'Clear': 100      
  };
  return mapping[category]
}

async function calculateOverallHealth(tiltPath, obstructionPath, environmentPath) {
  try {
    const responses = await Promise.all([
      fetch(tiltPath),
      fetch(obstructionPath),
      fetch(environmentPath)
    ]);
    
    if (responses.some(res => !res.ok)) {
      throw new Error('Failed to fetch CSV data');
    }
    
    const [tiltText, obstructionText, environmentText] = await Promise.all([
      responses[0].text(),
      responses[1].text(),
      responses[2].text()
    ]);
    
    const [tiltData, obstructionData, environmentData] = [
      Papa.parse(tiltText, {header: true}).data,
      Papa.parse(obstructionText, {header: true}).data,
      Papa.parse(environmentText, {header: true}).data
    ];
    
    const tiltValue = parseFloat(tiltData[0]?.Value) || 0;
    const obstructionStatus = obstructionData[0]?.Label || 'no_nest';
    const environmentStatus = environmentData[0]?.Label || 'Clear';
    
    const tiltScore = Math.max(0, 100 - (Math.min(10, Math.abs(tiltValue)) * 10));
    
    const obstructionScore = mapCategoryToScore(obstructionStatus);
    const environmentScore = mapCategoryToScore(environmentStatus);
    
    const weights = {
      tilt: 0.5,        
      obstruction: 0.3, 
      environment: 0.2  
    };
    
    const weightedScore = 
      (tiltScore * weights.tilt) + 
      (obstructionScore * weights.obstruction) + 
      (environmentScore * weights.environment);
    
    return Math.min(100, Math.max(0, Math.round(weightedScore * 100) / 100));
    
  } catch (error) {
    console.error("Error calculating tower health:", error);
  }
}

const Dashboard = () => {
  const tiltPath = '/server/tilt.csv';
  const obstructionPath = '/server/obstruction.csv';
  const environmentPath = '/server/environment.csv';
  
  const [healthScore, setHealthScore] = React.useState(75);
  const [loading, setLoading] = React.useState(true);

  const weightedSum = 
      (scaledParam1 * weight1) + 
      (scaledParam2 * weight2) + 
      (scaledParam3 * weight3) + 
      (scaledParam4 * weight4);
  
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const score = await calculateOverallHealth(
          tiltPath, 
          obstructionPath, 
          environmentPath
        );
        setHealthScore(score);
      } catch (error) {
        console.error('Failed to load health data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
    
    const interval = setInterval(loadData, 60000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-[#0B0003] h-screen'>
      <Navbar />
    
      <div className="flex h-full">
        <div className="fixed top-[80px] w-full">
          <div className='flex gap-8 pl-12 mt-2'>
            <p className='text-[#E7C0BC] bg-[#483137] cursor-custom p-2 rounded-3xl font-montserrat underline'>Dashboard</p>
            <a href="/analysis" className="text-white p-2 cursor-custom rounded-3xl border-2 border-[#E7C0BC] hover:text-[#E7C0BC] font-montserrat hover:underline">Analysis</a>
          </div>
          
          <div className="flex space-x-4 pl-12 h-[300px] mt-8">
            {/* First Column */}
            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl">
              <h1 className="text-white text-[24px] font-montserrat">Overall Tower Health</h1>
              {loading ? (
                <div className="text-white">Loading...</div>
              ) : (
                <GaugeComponent score={healthScore} maxScore={100} title="Tower Health" />
              )}
            </div>

            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl">
              <h1 className="text-white text-[24px] font-montserrat h-full">Tower Type</h1>
              <TowerChart className='p-4'/> 
            </div>

            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl">
              <h1 className="text-white text-[24px] font-montserrat">Obstruction Likelihood</h1>
              <NestChart/>              
            </div>
          </div>

          <div className="flex space-x-4 pl-12 mt-8 absolute">
            <div className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl">
              <h1 className="text-white text-[24px] absolute top-[20px] font-montserrat">Obstruction</h1>
              <h2 className="text-white text-[18px] absolute top-[60px] font-montserrat">5 images with obstructions were identified. Bird nests seem to be
                the main cause!
              </h2>
              <Carousel/>
            </div>

            <div 
              className="flex flex-col justify-center items-center bg-[#483137] border-2 border-[#E7C0BC] w-1/2 p-4 rounded-3xl cursor-pointer hover:bg-[#5a3d42] transition-colors"
              onClick={() => window.location.href = "/tiltcalculation"}
            >
              <h1 className="text-white text-[24px] absolute top-2 font-montserrat">Tilt Calculator</h1>
              <img 
                src="/Population_density_of_Texas_counties_28202029-2.png" 
                alt="Tilt Calculator Visualization"
                className='w-1/2 mt-8 rounded-lg'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;