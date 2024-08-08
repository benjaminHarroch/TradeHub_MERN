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
const yahooStockAPI  = require('yahoo-stock-api');
const getTikerArrays=require('./utilsServer/finviz');
const routerTrade=require('./Controllers/TradeRouter');




const app=express();

let priceData;


//----- midellewire for the application 
app.use(cors());
app.use(express.json());
app.use(express.static("ClientApp/build"));

app.use('/post',routerPost);
app.use('/comment',routerComment);
app.use('/auth',auth);
app.use('/trade',routerTrade);

require("dotenv").config();
const {DB_USER,DB_PASS,DB_HOST,DB_NAME,PORT}=process.env;



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

app.get('/getMomentumStok',async (req,res)=>{
  
    try{

     const arrayTiker =await getTikerArrays()
     console.log(arrayTiker);
     return serverResponse(res,200,arrayTiker);
    }catch(e){

      console.log('error with the chart data');
    }

})

app.get('/getpricedata/:tiker',async (req,res)=>{
  
  const tiker=req.params.tiker;
  console.log(tiker)

    try{

     await main(tiker);
     return serverResponse(res,200,priceData);
    }catch(e){

      console.log(e+'error with the chart data');
    }

})


function getToday(){

  var today = new Date();
  today.setDate(today.getDate() - 1);
  console.log('her',today.toLocaleDateString())
 const yesterday=today.toLocaleDateString();

  return yesterday;
}

function getoneMonthAgo(){

  var d = new Date();
  d.setMonth(d.getMonth() - 2);
  console.log(d.toLocaleDateString());
  const onemonthago=d.toLocaleDateString();
  return onemonthago;
}


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
  
 // var time = `${year}-${month}-${date}` ;
  var time ={
    day:parseInt(date),
    month:parseInt(month),
    year:parseInt(year)
  }
  return time;

}

function getData(data){

  const arrayData=data.response;

  const newArray=arrayData.map((day)=>{

    const timeConvert=getTimeConvert(day.date);
    
    return(

      {

        time:timeConvert,
        open:parseFloat(day.open.toFixed(2)),
        high:parseFloat(day.high.toFixed(2)),
        low:parseFloat(day.low.toFixed(2)),
        close:parseFloat(day.close.toFixed(2))

      }
    )

  })

  return newArray;

}


async function main(tiker)  {

  const yesterday=getToday();
  
  const oneMonthAgo=getoneMonthAgo();
	const startDate = new Date(oneMonthAgo);
  //console.log(startDate);
	const endDate = new Date(yesterday);
	//console.log(await yahooStockAPI.getHistoricalPrices(startDate, endDate, 'AAPL', '1d'));
  try{

  
  const data=await yahooStockAPI.getHistoricalPrices(startDate, endDate, tiker, '1d');
  const response=await getData(data);
  priceData=response;
  }catch(e){
    console.log(e)

  }
  //console.log('pricedata1',priceData);

}





app.listen('8000',()=>{
    console.log('the application is runnig on PORT 8000');
})
/*
mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    app.listen(PORT || 8000, () => {
      console.log("err", err);
      console.log("Ani maazin!");
    });
  }
);*/