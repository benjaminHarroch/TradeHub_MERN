require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.POLYGON_API_KEY;
const BASE_URL = 'https://api.polygon.io';

// Function to fetch all NASDAQ stocks
async function fetchNasdaqSymbols() {
  try {
    const response = await axios.get(`${BASE_URL}/v3/reference/tickers`, {
      params: {
        apiKey: API_KEY,
        exchange: 'XNAS',
        limit:'5'
      }
    });

    console.log('Fetched NASDAQ symbols:', response.data.results.length);

    return response.data.results.map(stock => stock.symbol);
  } catch (error) {
    console.error('Error fetching NASDAQ symbols:', error);
    return [];
  }
}

// Function to check if a stock meets the criteria
async function meetsCriteria(symbol) {
  try {
    const [quote, stats, dailyBars] = await Promise.all([
      axios.get(`${BASE_URL}/v2/aggs/ticker/${symbol}/prev`, { params: { apiKey: API_KEY } }),
      axios.get(`${BASE_URL}/v2/reference/financials/${symbol}`, { params: { apiKey: API_KEY } }),
      axios.get(`${BASE_URL}/v2/aggs/ticker/${symbol}/range/1/day/2024-21-01/2024-28-25`, { params: { apiKey: API_KEY } })
    ]);

    // Logging responses for debugging
    console.log(`Checking criteria for ${symbol}`);
    console.log('Quote:', quote.data.results[0]);
    console.log('Stats:', stats.data);
    console.log('Daily Bars:', dailyBars.data.results);

    const weeklyChange = ((dailyBars.data.results[dailyBars.data.results.length - 1].c - dailyBars.data.results[0].o) / dailyBars.data.results[0].o) * 100;

    const meetsCriteria =
      stats.data.avgVolume >= 300000 &&
      quote.data.results[0].v >= 2000000 &&
      quote.data.results[0].c >= 10 &&
      stats.data.float <= 300000000 &&
      weeklyChange > 5;

    console.log(`Meets criteria: ${meetsCriteria}`);
    
    return meetsCriteria;
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
    return [];
  }
}

module.exports = screenNasdaqStocks;
