const aggregateData = (trades) => {
    return trades.reduce((acc, trade) => {
      const existing = acc.find(item => item.strategy === trade.strategy);
      if (existing) {
        existing.wins += trade.win || 0;
        existing.losses += trade.loss || 0;
      } else {
        acc.push({
          strategy: trade.strategy,
          wins: trade.win || 0,
          losses: trade.loss || 0,
        });
      }
      return acc;
    }, []);
  };


  export default aggregateData
  