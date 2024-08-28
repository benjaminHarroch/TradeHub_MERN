const Polygon = require('polygon');
const polygon = new Polygon('smPg0j4kXAb9tWkwQx5b3RITg6we_nuM'); // Replace with your actual API key
const fetchNasdaqSymbols=require('./fetchNasdaqSymbols')

const criteria = {
  minAverageVolume: 300000,
  minCurrentVolume: 2000000,
  minPrice: 10,
  maxFloat: 300000000, // 300 million
  minWeeklyChange: 5 // 5%
};

// Function to check if a stock meets the criteria
async function meetsCriteria(symbol) {
  try {
    const [quote, stats, dailyBars] = await Promise.all([
      polygon.stocks.quote(symbol),
      polygon.stocks.stats(symbol),
      polygon.stocks.dailyOpenClose(symbol, '2024-08-01', '2024-08-25') // Adjust the date range as needed
    ]);

    // Calculate weekly percentage change
    const weekStartPrice = dailyBars[0].open;
    const weekEndPrice = dailyBars[dailyBars.length - 1].close;
    const weeklyChange = ((weekEndPrice - weekStartPrice) / weekStartPrice) * 100;

    return (
      stats.avgVolume >= criteria.minAverageVolume &&
      quote.latestVolume >= criteria.minCurrentVolume &&
      quote.latestPrice >= criteria.minPrice &&
      stats.floats <= criteria.maxFloat &&
      weeklyChange > criteria.minWeeklyChange
    );
  } catch (error) {
    console.error(`Error checking criteria for ${symbol}:`, error);
    return false;
  }
}

// Function to screen NASDAQ stocks
async function screenNasdaqStocks() {
  try {
    const symbols = await fetchNasdaqSymbols();
    const results = [];

    for (const symbol of symbols) {
      if (await meetsCriteria(symbol)) {
        results.push(symbol);
      }
    }
    console.log('Screened NASDAQ Stocks:', results);
    return results;
  } catch (error) {
    console.error('Error screening NASDAQ stocks:', error);
  }
}

// Example usage
module.default=screenNasdaqStocks;
