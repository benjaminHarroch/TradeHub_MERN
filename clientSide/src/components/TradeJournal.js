import React from 'react';
import TableJournalTrader from './TableJournalTrader';
import StatisticsOverview from './Statistics';
import StrategyPerformanceChart from './StrategyPerformanceChart';
import ExplanationSection from './ExplanationTraderPage';
import './css/JournalTrader.css';
import AddTradeButton from './AddTradeButton';

const TradeJournal = ({traders,chartData}) => {


  return (
    <div className="trade-journal">
      <ExplanationSection />
      <StatisticsOverview  data={traders} />
      <StrategyPerformanceChart data={chartData} />
      <TableJournalTrader rows={traders} />
      <AddTradeButton />
    </div>
  );
};

export default TradeJournal;
