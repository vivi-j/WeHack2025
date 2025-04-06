import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const NestChart = () => {
  const data = {
    labels: ['Lattice', 'Monopole'],
    datasets: [
      {
        label: 'Bird Nest Distribution',
        data: [4.0, 2.0],
        backgroundColor: ["#99D1C7"],
        borderColor: 'grey',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        console.log(`Clicked on data point at index ${index}`);
      }
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        display: true,
      },
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
    scales: {
        x: {
          ticks: {
            color: 'white', // Sets X-axis label color to white
          },
        },
        y: {
          ticks: {
            color: 'white', // Sets Y-axis label color to white
          },
        },
      }
  };

  return (
    <div className="w-full h-[300px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default NestChart;
