// TowerChart.jsx
import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const TowerChart = ({ className = '' }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const labels = ['Lattice', 'Monopole', 'Guyed', 'Water'];
  const data = [54, 18, 15, 10];
  const colors = ['#DCCCEA', '#FFDAB4', '#D6E5BE', '#FFFEFD'];

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Tower Type Distribution',
          data: data,
          backgroundColor: colors,
          borderColor: 'black',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            titleColor: 'white',
            bodyColor: 'white',
          },
        },
        hover: {
          mode: 'index',
          intersect: false,
        }
      }
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, []);

  return (
    <div className={`flex items-center ${className}`}>
      {/* Chart */}
      <div className="w-[215px] h-[215px] relative">
        <canvas ref={chartRef} className="w-full h-full" />
      </div>

      {/* Vertical Legend */}
      <div className="flex flex-col space-y-2 ml-4">
        {labels.map((label, idx) => (
          <div key={label} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[idx] }} />
            <span className="text-white text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TowerChart;
