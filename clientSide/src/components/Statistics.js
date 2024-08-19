import React from 'react';
import './css/JournalTrader.css';

const Statistics = ({data}) => {


  return (
    <div className="statistics-overview">
      <h2>Statistics Overview</h2>
      <div className="stat-item">
        <span>Total Trades:</span> {data.length}
      </div>
      <div className="stat-item">
        <span>Win Rate:</span> {50}%
      </div>
      <div className="stat-item">
        <span>Average Profit/Loss:</span> ${100}
      </div>
      <div className="stat-item">
        <span>Best Strategy:</span> {'abc'}
      </div>
    </div>
  );
};

export default Statistics;
