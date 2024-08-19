import React,{useState , useEffect } from 'react'
import LeftSideHomePage from './LeftSideHomePage'
import TradeJournal from './TradeJournal'
import RightSideHomePage from './RightSideHomePage'
import aggregateData from './utils/aggregateData'

function JournalTraderPage() {

   
  const [rows,setRows] = useState([])

  function createData(Sticker, entries, exit, strategy, position, date) {
    let result = position === 'long' ? exit - entries : entries - exit;
    let color = result > 0 ? 'green' : 'red';
    
    // Assuming you want to count wins and losses
    let win = result > 0 ? 1 : 0;
    let loss = result <= 0 ? 1 : 0;
    
    // Create a new trade object
    let newTrade = { Sticker, entries, exit, strategy, position, date, result, color, win, loss };
  
    // Update the rows state with the new trade
    setRows(prevRows => [...prevRows, newTrade]);
  }
  
  useEffect(()=>{

    createData('AAPL', 132, 142, 'ABC', 'long', '17/08/2024')
    createData('MSFT', 300, 330, 'cat in the bag', 'long', '17/08/2024')
    createData('NFLX', 262, 400, 'swing 2 week open', 'long', '17/08/2024')
    createData('MRNA', 180, 170, 'news momentum', 'long', '17/08/2024')
    createData('AAPL', 132, 142, 'ABC', 'long', '17/08/2024')
    createData('MSFT', 300, 330, 'cat in the bag', 'long', '17/08/2024')
    createData('NFLX', 262, 400, 'swing 2 week open', 'long', '17/08/2024')
    createData('MRNA', 180, 170, 'news momentum', 'long', '17/08/2024')
    createData('DDG', 132, 142, 'ABC', 'long', '17/08/2024')
    createData('SPY', 500, 450, 'sort swing', 'short', '17/08/2024')
    createData('QQQ', 262, 400, 'swing 2 week open', 'long', '17/08/2024')
    createData('TSLA', 180, 170, 'news momentum', 'long', '17/08/2024')
    createData('BTC', 13200, 60000, 'investment for long duration', 'long', '17/08/2024')
    createData('NVDA', 300, 700, 'SWING', 'long', '17/08/2024')
    createData('GOOG', 262, 400, 'swing 2 week open', 'long', '17/08/2024')
    createData('META', 400, 600, 'news momentum', 'long', '17/08/2024')

  },[])


  const chartData = aggregateData(rows);
  
  // Now `rows` is sorted by date
  
  return (
    <div className='JournalTraderPageContainer'>

        <div className='HomePageContainer-LeftSideHomePageContainer'><LeftSideHomePage /></div>
        <div className='HomePageContainer-FeedSideHomePageContainer'>
          <TradeJournal traders={rows} chartData={chartData}/>
          </div>
        <div className='HomePageContainer-RightSideHomePageContainer'><RightSideHomePage /></div>
  

    </div>
  )
}

export default JournalTraderPage;