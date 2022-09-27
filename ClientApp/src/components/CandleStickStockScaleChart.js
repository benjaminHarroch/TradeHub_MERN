
import React, { useEffect } from 'react'


import axios from 'axios';




export const CandleStickStockScaleChart = () => {


	useEffect(()=>{
	const encodedParams = new URLSearchParams();
    encodedParams.append("symbol", "FLNC");

   const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '74be6b9229msh5867c40d09f13eep14472bjsn89ae26ed14e3',
		'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
	},
	body: encodedParams
  };

fetch('https://yahoo-finance97.p.rapidapi.com/stock-info', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
},[]);

  return (
	<div >
		
	</div>
  )
}
