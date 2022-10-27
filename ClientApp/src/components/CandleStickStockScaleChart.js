import React, {useState, useEffect, useRef } from "react";
import "../css/chart.css";
import axios from "axios";


import { createChart, CrosshairMode } from "lightweight-charts";


export default function CandleStickStockScaleChart({priceData,volumeData,stockName}) {

  //console.log('priceData',priceData);
 // console.log('Voloume data',volumeData);

  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

 

    useEffect(()=>{

      chart.current = createChart(chartContainerRef.current, {
        width: 350,//chartContainerRef.current.clientWidth,
        height: 450, //"300px", //chartContainerRef.current.clientHeight,
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
  
     // console.log(chart.current);
  
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

    },[priceData])


  return (
    <div className="chart-container">
      <h1>{stockName}</h1>
    
      <div
        ref={chartContainerRef}
        className="chart"
         //style={{ height: "10%" }}
      />
    </div>
  );
}
