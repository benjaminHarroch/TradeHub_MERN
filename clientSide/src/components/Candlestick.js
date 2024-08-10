import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const Candlestick = ({ data }) => {
    const chartContainerRef = useRef();

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            layout: {
                backgroundColor: '#ffffff',
                textColor: '#000',
            },
            grid: {
                vertLines: {
                    color: '#eee',
                },
                horzLines: {
                    color: '#eee',
                },
            },
            priceScale: {
                borderColor: '#cccccc',
            },
            timeScale: {
                borderColor: '#cccccc',
            },
        });

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#4caf50',
            downColor: '#f44336',
            borderDownColor: '#f44336',
            borderUpColor: '#4caf50',
            wickDownColor: '#f44336',
            wickUpColor: '#4caf50',
        });

        candlestickSeries.setData(data);

        return () => {
            chart.remove();
        };
    }, [data]);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '500px' }} />;
};

export default Candlestick;