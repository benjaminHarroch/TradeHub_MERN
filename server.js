const express =require('express');
const mongoose =require('mongoose');
const cors = require("cors");
const serverResponse=require('./utilsServer/serverResponse');
const http = require('http');
const routerPost=require('./Controllers/postsRouter');
const routerComment=require('./Controllers/commentRouter');
const auth=require('./Controllers/auth');
const finnhub = require('finnhub');
const axios = require("axios");
const yahooStockAPI  = require('yahoo-stock-api');
const getTikerArrays=require('./utilsServer/finviz');
const routerTrade=require('./Controllers/TradeRouter');
const { Server } = require('socket.io');
const handleSocket = require('./Controllers/chatrouter'); 
const path = require('path');




const app=express();
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*", // Allow all origins, adjust as needed for security
    methods: ["GET", "POST"]
  }
});;

const allowedOrigins = [
  'https://tradehub-mern-1.onrender.com', // Add other allowed origins here if needed
  'https://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, // Replace with your frontend URL
  methods: ['GET', 'POST' ,'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

// Pass the io instance to the socket logic
handleSocket(io);


//----- midellewire for the application 
app.use(express.json());

app.use('/post',routerPost);
app.use('/comment',routerComment);
app.use('/auth',auth);
app.use('/trade',routerTrade);

// Use the correct path to the build directory
const buildPath = path.join(__dirname, './clientSide/build');

// Serve static files from the correct build directory
app.use(express.static(buildPath));

// Serve index.html for all non-API requests
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});
require("dotenv").config();
// Start the server
const PORTSERVER = 8000;
const {DB_USER,DB_PASS,DB_HOST,DB_NAME,PORT}=process.env;

mongoose.set('strictQuery', false);

let priceData;

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

app.get('/getMomentumStock',async (req,res)=>{
  
    try{

     getTikerArrays().then((response)=>{
       console.log('array ticker',response)
       return serverResponse(res,200,response);
    })
    }catch(e){

      console.log('error with the request to get the stock array');
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
	const endDate = new Date(yesterday);
	//console.log(await yahooStockAPI.getHistoricalPrices(startDate, endDate, 'AAPL', '1d'));
  try{

  
  const data=await yahooStockAPI.getHistoricalPrices(startDate, endDate, tiker, '1d');
  const response=await getData(data);
  priceData=response;
  }catch(e){
    console.log(e)

  }
}

const mongoUri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to DB');
    server.listen(PORT || 8000, () => {
      console.log(`Server is running on port ${PORT || 8000}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to DB:', err);
  });