import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './css/JournalTrader.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StrategyPerformanceChart = ({ data }) => {
  // Prepare data for the chart
  const chartData = {
    labels: data?.map(item => item.strategy),
    datasets: [
      {
        label: 'Wins',
        data: data?.map(item => item.wins),
        backgroundColor: 'rgba(82, 202, 157, 0.6)',
        borderColor: 'rgba(82, 202, 157, 1)',
        borderWidth: 1,
      },
      {
        label: 'Losses',
        data: data?.map(item => item.losses),
        backgroundColor: 'rgba(136, 132, 216, 0.6)',
        borderColor: 'rgba(136, 132, 216, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="strategy-performance-chart">
      <h2>Strategy Performance</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StrategyPerformanceChart;