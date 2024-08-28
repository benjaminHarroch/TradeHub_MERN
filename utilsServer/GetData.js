const FinvizScreener = require('finviz-screener');

// Create an instance of the screener
const finviz = new FinvizScreener();

const getData = async () => {
  try {
    // Define filters for momentum stocks
    const filters = {
      performance: 'Week +20%',      // Example filter for performance
      averageVolume: 'Over 400K',    // Example filter for average volume
      sharesOutstanding: 'Under 100M' // Example filter for shares outstanding
    };

    // Fetch stock data based on filters
    const data = await finviz.getScreener(filters);

    // Extract tickers from the data
    const tickers = data.map(stock => stock.Ticker);

    return tickers;

  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
};

module.exports=getData;