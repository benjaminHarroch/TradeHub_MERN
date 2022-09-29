import React, { useEffect, useRef } from "react";
import "../css/chart.css";

import { priceData } from "../Utils/priceData";
// import { areaData } from './areaData';
import { volumeData } from "../Utils/VolumData";

import { createChart, CrosshairMode } from "lightweight-charts";


export default function CandleStickStockScaleChart() {

  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: 250,//chartContainerRef.current.clientWidth,
      height: 250, //"300px", //chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255, 255, 255, 0.9)"
      },
      grid: {
        vertLines: {
          color: "#334158"
        },
        horzLines: {
          color: "#334158"
        }
      },
      crosshair: {
        mode: CrosshairMode.Normal
      },
      priceScale: {
        borderColor: "#485c7b"
      },
      timeScale: {
        borderColor: "#485c7b"
      }
    });

    console.log(chart.current);

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1"
    });

    candleSeries.setData(priceData);


    const volumeSeries = chart.current.addHistogramSeries({
      color: "#182233",
      lineWidth: 2,
      priceFormat: {
        type: "volume"
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0
      }
    });

    volumeSeries.setData(volumeData);
  }, []);

  // Resize chart on container resizes.
  /*useEffect(() => {
    resizeObserver.current = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);*/

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
    
      <div
        ref={chartContainerRef}
        className="chart-container"
         //style={{ height: "10%" }}
      />
    </div>
  );
}






/*import axios from 'axios';




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
*/