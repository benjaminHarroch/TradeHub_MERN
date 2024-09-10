import React from 'react';
import TableJournalTrader from './TableJournalTrader';
import StatisticsOverview from './Statistics';
import StrategyPerformanceChart from './StrategyPerformanceChart';
import ExplanationSection from './ExplanationTraderPage';
import './css/JournalTrader.css';
import AddTradeButton from './AddTradeButton';

const TradeJournal = ({userTrade,setUserTrade,chartData,id}) => {

   //console.log('tradejournal',userTrade);

  return (
    <div className="trade-journal">
      <ExplanationSection />
      <StatisticsOverview  data={userTrade} setUserTrade={setUserTrade} />
      <StrategyPerformanceChart data={chartData} />
      <TableJournalTrader rows={userTrade} setUserTrade={setUserTrade} />
      <AddTradeButton setUserTrade={setUserTrade} id={id}/>
    </div>
  );
};

export default TradeJournal;
