import React from 'react'
import './css/LeftSideHomePage.css'
import WatchList from './WachtList'
import Stockwatcher from './Stockwatcher'

function LeftSideHomePage() {
  return (
    <div className='LeftSideHomePageContainer'>
        {/*<Stockwatcher />*/}
        <WatchList />
    </div>
  )
}

export default LeftSideHomePage