import React,{useState , useEffect, useContext } from 'react'
import LeftSideHomePage from './LeftSideHomePage'
import TradeJournal from './TradeJournal'
import RightSideHomePage from './RightSideHomePage'
import aggregateData from './utils/aggregateData'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function JournalTraderPage() {

  const [userTrade, setUserTrade] = useState([]);
  const { id } = useParams();
  const [chartData, setChartData] = useState([]);
  
  function fetchUserFromDb() {
    axios.get(`https://tradehub-mern.onrender.com/auth/getuser/${id}`)
      .then(res => {
        const tradeIds = res?.data[0]?.trades || [];  // Extract trade IDs from the response

        // Create an array of promises to fetch each trade detail
        const tradeRequests = tradeIds.map(tradeId => 
          axios.get(`https://tradehub-mern.onrender.com/trade/gettrade/${tradeId}`)
        );

        // Wait for all trade requests to complete
        Promise.all(tradeRequests)
          .then(responses => {
            // Extract trade data from responses
            const trades = responses.map(response => response.data.trade);
            trades.forEach((trade)=>createData(
              trade.sticker, 
              trade.entries, 
              trade.exit, 
              trade.strategy, 
              trade.position, 
              trade.date
            ))
           
          })
          .catch(err => console.log("Error fetching trades", err));
      })
      .catch(err => console.log("Error fetching user", err));
}

  
  function createData(Sticker, entries, exit, strategy, position, date) {
    let result = position === 'long' ? exit - entries : entries - exit;
    let color = result > 0 ? 'green' : 'red';
    let win = result > 0 ? 1 : 0;
    let loss = result <= 0 ? 1 : 0;
  
    let newTrade = { Sticker, entries, exit, strategy, position, date, result, color, win, loss };
    
    // Update the trades state with the new trade
    setUserTrade(prevTrades => {
      const updatedTrades = [...prevTrades, newTrade];
      console.log('Updated trades: creat data', updatedTrades);
      return updatedTrades;
    });
  }
  
  useEffect(()=>{
  // Initialize with dummy data
  createData('AAPL', '132', '142', 'ABC', 'long', '17/08/2024');
  createData('MSFT', '300', '330', 'cat in the bag', 'long', '17/08/2024');

  },[])

  useEffect(() => {
    // Fetch user trades from the database after initializing dummy data
    fetchUserFromDb();
  }, [id]);
  
  useEffect(() => {
    // This useEffect will only run when userTrade changes
    if (userTrade.length > 0) {
      setChartData(aggregateData(userTrade));
      console.log('Chart data updated:', chartData);
    }
  }, [userTrade]);
  
  

  
  // Now `rows` is sorted by date
  
  return (
    <div className='JournalTraderPageContainer'>

        <div className='HomePageContainer-LeftSideHomePageContainer'><LeftSideHomePage /></div>
        <div className='HomePageContainer-FeedSideHomePageContainer'>
          <TradeJournal userTrade={userTrade} setUserTrade={setUserTrade} chartData={chartData} id={id}/>
          </div>
        <div className='HomePageContainer-RightSideHomePageContainer'><RightSideHomePage /></div>
  

    </div>
  )
}

export default JournalTraderPage;