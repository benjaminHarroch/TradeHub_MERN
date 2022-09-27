// CommonJs
const finviz = require('finviz-screener');
const axios = require("axios");



//get data from finviz api ---return an array of tikers for momentum stocks
const getData=  async ()=>{

   const options = {
    // Maximum number of pages to fetch. Set to `0` to disable. Default is 1
    pageLimit: 0,
    // Number of milliseconds to wait between requests. Default is 1000
    requestTimeout: 1000,
  }

   const  tickers = await finviz(options)
    .change('Up 5%')
    .averageVolume('Over 300K')
    .relativeVolume('Over 2')
    .sharesOutstanding('Under 100M')
    .scan()

   console.log(tickers) //=> ['AAPL', 'MSFT', 'IBM', ... ]
}

getData();

//the yahoo api return me all the data about one tickers 
const options = {
    method: 'GET',
    url: 'https://candlestick-chart.p.rapidapi.com/binance',
    params: {symbol: 'BTCUSDT', interval: '1m', limit: '16', lastPrice: '57500'},
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '74be6b9229msh5867c40d09f13eep14472bjsn89ae26ed14e3',
      'X-RapidAPI-Host': 'candlestick-chart.p.rapidapi.com'
    }
  };
  
  
  
  axios.request(options).then(function (response) {
      console.log(response.data);
      
  }).catch(function (error) {
      console.error(error);
  });
