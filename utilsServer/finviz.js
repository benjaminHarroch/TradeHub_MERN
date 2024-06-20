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

   array = await finviz(options)
    .performance('Week +20%')
    .averageVolume('Over 400K')
    //.relativeVolume('Over 2')
    .sharesOutstanding('Under 100M')
    .scan()

   return array //=> ['AAPL', 'MSFT', 'IBM', ... ]
   
}

module.exports=getData;