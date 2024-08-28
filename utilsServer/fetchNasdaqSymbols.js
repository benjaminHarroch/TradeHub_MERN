const Polygon = require('polygon');
const polygon = new Polygon('smPg0j4kXAb9tWkwQx5b3RITg6we_nuM'); // Replace with your actual API key

// Function to fetch all NASDAQ stocks
async function fetchNasdaqSymbols() {
  try {
    const response = await polygon.stocks.listSymbols();
    // Filter for NASDAQ stocks
    const nasdaqStocks = response.results.filter(stock => stock.exchange === 'NASDAQ');
    return nasdaqStocks.map(stock => stock.symbol);
  } catch (error) {
    console.error('Error fetching NASDAQ symbols:', error);
  }
}

module.exports=fetchNasdaqSymbols;