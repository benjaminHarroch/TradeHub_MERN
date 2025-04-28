const express =require('express');
const mongoose =require('mongoose');
const cors = require('cors');
const serverResponse=require('./utilsServer/serverResponse');
const http = require('http');
const routerPost=require('./routes/postsRouter');
const routerComment=require('./routes/commentRouter');
const auth=require('./Controllers/auth');
const finnhub = require('finnhub');
const screenNasdaqStocks=require('./utilsServer/ScreenStock');
const routerTrade=require('./routes/TradeRouter');
const { Server } = require('socket.io');
const handleSocket = require('./routes/chatrouter');
const path = require('path');




const app=express();
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*", // Allow all origins, adjust as needed for security
    methods: ["GET", "POST"]
  }
});;

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://tradehub-mern-1.onrender.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Add OPTIONS method
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow necessary headers
  preflightContinue: false,
  optionsSuccessStatus: 204  // Some legacy browsers (IE11) choke on 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight across the board


// Pass the io instance to the socket logic
handleSocket(io);


// Use the correct path to the build directory
const buildPath = path.join(__dirname, 'clientSide','build');

// Serve static files from the correct build directory
app.use(express.static(buildPath));


//----- midellewire for the application
app.use(express.json());

app.use('/post',routerPost);
app.use('/comment',routerComment);
app.use('/auth',auth);
app.use('/trade',routerTrade);


require("dotenv").config();
// Start the server
const PORTSERVER = 8000;
const {DB_USER,DB_PASS,DB_HOST,DB_NAME,PORT}=process.env;

mongoose.set('strictQuery', false);

let priceData;

// Initialize Finnhub client
const api_key = 'cqsindhr01qg43b8popgcqsindhr01qg43b8poq0';  // Replace with your Finnhub API key
const finnhubClient = new finnhub.DefaultApi();
const apiClient = finnhub.ApiClient.instance;
apiClient.authentications['api_key'].apiKey = api_key;

// Endpoint to fetch news
app.get('/news', (req, res) => {
  finnhubClient.marketNews('general', {}, (error, data, response) => {
    if (error) {
      console.error('Error fetching news:', error);
      return res.status(500).json({ error: 'Failed to fetch news' });
    }

    // Log data for debugging
    console.log('API response data:', data);

    // Send response to client
    res.status(200).json(data);
  });
});


app.get('/getMomentumStock', async (req, res) => {
  try {
    const arrayTicker = await screenNasdaqStocks();
    console.log(arrayTicker);
    res.status(200).json(arrayTicker);
  } catch (error) {
    console.error('Error with the chart data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve index.html for all non-API requests
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));

  console.log(__dirname)
});



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

