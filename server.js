
const express =require('express');
const mongoose =require('mongoose');
const cors = require("cors");
const serverResponse=require('./utilsServer/serverResponse');
//const routerUser=require('./Controllers/');
const routerPost=require('./Controllers/postsRouter');
const routerComment=require('./Controllers/commentRouter');
const auth=require('./Controllers/auth');
const finnhub = require('finnhub');
const axios = require("axios");


const app=express();


//----- midellewire for the application 
app.use(cors());
app.use(express.json());
app.use(express.static("ClientApp/build"));

app.use('/post',routerPost);
app.use('/comment',routerComment);
app.use('/auth',auth);



//--- mongoose connection -- 
mongoose.connect("mongodb://localhost:27017/JuniorTraders" ,function(err) {
  if (err) {
    console.log(err);
  }else{
    console.log("Connected to DB"); 
  }
});

app.get('/news',(req,res)=>{


  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = "ccjf0liad3i47ghodgv0ccjf0liad3i47ghodgvg"
  const finnhubClient = new finnhub.DefaultApi()

  finnhubClient.marketNews("general", {}, (error, data, response) => {

    if(error){
      return serverResponse(res,500,{error})
    }

      serverResponse(res,200,{data})

  });

  

})

/*app.get('/',(req,res)=>{

  console.log(__dirname);
  res.sendFile(__dirname + "/ClientApp/public/index.html");

})*/


/*app.get('*',(req,res)=>{

  console.log(__dirname);
  res.sendFile(__dirname + "/ClientApp/public/index.html");

})


https://www.npmjs.com/package/yahoo-stock-api


*/


/*
function getTimeConvert(UNIX_timestamp){


  var a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear();
  var month = a.getMonth()+1;
  if(month>0&&month<10){
    month='0'+month;
  }
  var date = a.getDate();
  if(date>0&&date<10){
    date='0'+date;
  }
  
  var time = year + '-' + month + '-' + date ;
  return time;

}

function getData(data){

  const arrayData=data.response;

  const newArray=arrayData.map((day)=>{

    const timeConvert=getTimeConvert(day.date);
    
    return(

      {

        time:timeConvert,
        open:day.open,
        high:day.high,
        low:day.low,
        close:day.close

      }
    )

  })

  return newArray;

}


const yahooStockAPI  = require('yahoo-stock-api');

async function main()  {
	const startDate = new Date('09/21/2022');
	const endDate = new Date('09/29/2022');
	//console.log(await yahooStockAPI.getHistoricalPrices(startDate, endDate, 'AAPL', '1d'));
  const data=await yahooStockAPI.getHistoricalPrices(startDate, endDate, 'AAPL', '1d');
  const response=getData(data);
  console.log(response);

}

main();

*/

app.listen('8000',()=>{
    console.log('the application is runnig on PORT 8000');
})