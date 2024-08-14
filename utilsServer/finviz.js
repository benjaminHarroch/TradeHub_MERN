
const axios = require('axios');
const getDataFromJsonFile=require('./getDataFromJsonFile');

//API PARAMATER FOR FINHUB
const API_KEY_FINHUB = 'cqsindhr01qg43b8popgcqsindhr01qg43b8poq0';
const BASE_URL_FINHUB = 'https://finnhub.io/api/v1';

//API PARAMATER FOR ALPHA API
const API_KEY_ALPHA = 'IBR5RK7QFA90WAQL';
const BASE_URL_ALPHA = 'https://www.alphavantage.co/query';

// Polygon.io API parameters
const API_KEY_POLYGON = 'smPg0j4kXAb9tWkwQx5b3RITg6we_nuM';
const BASE_URL_POLYGON = 'https://api.polygon.io/v3/reference/tickers';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const findStocks = async () => {
    try {
    
         //console.log('symbol', nasdaqSymbols);*/
         getDataFromJsonFile().then((res)=> {

            console.log('symbol data ', res)

           let matchingStocks = [];

           for (let i=0 ;i<25;i++) {
               const symbol = res[i];

               // Fetch daily time series data for the stock
               axios.get(BASE_URL_ALPHA, {
                  params: {
                     function: 'TIME_SERIES_DAILY',
                     symbol: symbol,
                     apikey: API_KEY_ALPHA
                  }
               }).then((response)=>{

                  const timeSeriesData = response.data['Time Series (Daily)'];
                  if (!timeSeriesData) {
                     console.error(`No time series data for ${symbol}`);
                     
                  }else{
   
                  const dates = Object.keys(timeSeriesData);
                  const volumes = dates.map(date => parseInt(timeSeriesData[date]['5. volume']));
   
                  const averageVolume = volumes.reduce((sum, vol) => sum + vol, 0) / volumes.length;
                  const lastDayVolume = volumes[volumes.length - 1];
   
                  if (averageVolume > 500000 && lastDayVolume > 2000000) {
                     matchingStocks.push(symbol);
                  }
               }
                  return matchingStocks;
               })

         }

      })


    } catch (error) {
        console.error('Error fetching stock data:', error);
        return [];
    }
};


const getNasdaqSymbols = async () => {
    try {
        let nasdaqSymbols = [];
        let nextUrl = `${BASE_URL_POLYGON}?exchange=NASDAQ&limit=1000&apiKey=${API_KEY_POLYGON}`;

        while (nextUrl) {
            const response = await axios.get(nextUrl);
            const data = response.data;

            nasdaqSymbols = nasdaqSymbols.concat(data.results);
            nextUrl = data.next_url ? `${data.next_url}&apiKey=${API_KEY_POLYGON}` : null;

            // Optional: delay between requests to avoid hitting rate limits
            await delay(1000);
        }

        const symbols = nasdaqSymbols.map(stock => stock.ticker);
        console.log('NASDAQ Symbols:', symbols);
        return symbols;
    } catch (error) {
        console.error('Error fetching NASDAQ symbols:', error);
        return [];
    }
};



module.exports = findStocks;
