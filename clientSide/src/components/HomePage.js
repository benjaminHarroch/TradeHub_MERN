import React from 'react'
import LeftSideHomePage from './LeftSideHomePage'
import FeedHomePage from './FeedHomePage'
import RightSideHomePage from './RightSideHomePage'
import './css/HomePage.css'
import Whatsapp from './Whatsapp'

function HomePage() {

  
  
  return (
    <div className='HomePageContainer'>

        <Whatsapp />
        <div className='HomePageContainer-LeftSideHomePageContainer'><LeftSideHomePage /></div>
        <div className='HomePageContainer-FeedSideHomePageContainer'><FeedHomePage /></div>
        <div className='HomePageContainer-RightSideHomePageContainer'><RightSideHomePage /></div>
        
    </div>
  )
}

export default HomePage