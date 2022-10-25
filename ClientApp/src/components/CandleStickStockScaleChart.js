import React, {useState, useEffect, useRef } from "react";
import "../css/chart.css";
import axios from "axios";

//import { priceData } from "../Utils/priceData";
// import { areaData } from './areaData';
//import { volumeData } from "../Utils/VolumData";

import { createChart, CrosshairMode } from "lightweight-charts";


export default function CandleStickStockScaleChart({priceData,volumeData,stockName}) {

  //console.log('priceData',priceData);
 // console.log('Voloume data',volumeData);

  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  //const [priceData,setPriceData]=useState();
  //let volumeData =[];
  ///const [volumData,setVolumData]=useState();
 // const [ priceData ,setPriceData]=useState();

  // async function getPriceDataFromDB (){


  //   try {
  //   const res=await axios.get(`http://localhost:8000/getpricedata/${tiker}`)
  //   setPriceData(res.data);
  //   }catch(e){

  //   console.log(e)
  //   }
    

  //  }

  //   useEffect( ()=>{

  //       getPriceDataFromDB();
         
  //   },[])

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
      //candleSeries.update(priceData[0])
      //candleSeries.update(priceData[1])
  
  
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


  //useEffect(() => {
    /*chart.current = createChart(chartContainerRef.current, {
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
 // }, []);
*/
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
