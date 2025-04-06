const GaugeComponent = ({ score, maxScore, title }) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius * 0.75;
    
    const percentage = (score / maxScore) * 100;
    
    const value = (percentage * circumference) / 100;
    const dashArray = `${value} ${circumference}`;

    return (
      <div className="flex gap-8">
        <div className="relative w-60 h-60">
          <svg 
            className="w-full h-full rotate-[135deg]" 
            viewBox="0 0 36 36" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle 
              cx="18" 
              cy="18" 
              r="16" 
              fill="none" 
              className="stroke-current text-gray-200" 
              strokeWidth="2.5" 
              strokeDasharray="75 100" 
              strokeLinecap="round"
            />
  
            <circle 
              cx="18" 
              cy="18" 
              r="16" 
              fill="none" 
              className="stroke-current text-[#8B3C46]" 
              strokeWidth="2.5" 
              strokeDasharray={dashArray} 
              strokeLinecap="round"
            />
          </svg>
  
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-4xl font-bold text-[#E7C0BC]">{score}</span>
          </div>
        </div>
  
    </div>
    );
  };

  export default GaugeComponent;