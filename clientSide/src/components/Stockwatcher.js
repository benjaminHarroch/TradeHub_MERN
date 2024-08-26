import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Box, Typography, Paper } from '@mui/material';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register chart components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StockWatcher = () => {
    const [indices, setIndices] = useState([
        { name: 'SPY', symbol: 'SPY' },
        { name: 'NASDAQ', symbol: 'QQQ' }
    ]);
    const [data, setData] = useState({});
    const API_KEY = 'ccjf0liad3i47ghodgv0ccjf0liad3i47ghodgvg';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    indices.map(index =>
                        axios.get(`https://finnhub.io/api/v1/quote?symbol=${index.symbol}&token=${API_KEY}`)
                    )
                );

                const newData = { ...data };

                responses.forEach((response, idx) => {
                    const index = indices[idx];
                    const price = response.data.c;

                    if (price !== 0 && price !== null) {
                        // Initialize the chartData array if it doesn't exist
                        if (!newData[index.symbol]) {
                            newData[index.symbol] = { chartData: [] };
                        }

                        // Add the new price to the chartData array
                        newData[index.symbol].chartData.push({
                            time: new Date().toLocaleTimeString(),
                            value: price
                        });

                        // Keep only the last 30 data points to avoid memory issues
                        if (newData[index.symbol].chartData.length > 30) {
                            newData[index.symbol].chartData.shift();
                        }
                        const previousClose = response.data.pc;

                        const color = price > previousClose ? 'rgba(0, 255, 0, 1)' : 'rgba(255, 0, 0, 1)';
                        const backgroundColor = price > previousClose ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)';
    
                        newData[index.symbol] = {
                            price: price || 'Loading...',
                            previousClose,
                            chartData: [
                                { time: new Date().toLocaleTimeString(), value: price }
                            ],
                            color,
                            backgroundColor
                        };

                      //  newData[index.symbol].price = quote.c;
                    }
                });

                setData(newData);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 60000); // Fetch every minute

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [indices, data]);

    const renderChart = (chartData,color,backgroundColor) => {
        const labels = chartData.map(point => point.time);
        const values = chartData.map(point => point.value);

        return (
            <Line
                data={{
                    labels,
                    datasets: [
                        {
                            label: 'Price',
                            data: values,
                            borderColor: color,
                            backgroundColor: backgroundColor,
                            tension: 0.1
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                        },
                    },
                }}
            />
        );
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 100,
                left: 20,
                width: 250,
                maxHeight: 500,
                overflowY: 'auto',
                backgroundColor: 'background.paper',
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            {indices.map(index => (
                <Paper key={index.symbol} sx={{ padding: 2, marginBottom: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        {index.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {data[index.symbol]?.price || 'Loading...'}
                    </Typography>
                    {data[index.symbol]?.chartData && renderChart(data[index.symbol].chartData)}
                </Paper>
            ))}
        </Box>
    );
};

export default StockWatcher;
