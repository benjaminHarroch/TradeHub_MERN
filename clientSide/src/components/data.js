import axios from 'axios';

const apiKey='smPg0j4kXAb9tWkwQx5b3RITg6we_nuM';

let url =`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-02-10?apiKey=${apiKey}`;

axios.get(url).then((res)=>console.log(res));

const sampleData = [
    { time: '2023-08-01', open: 150, high: 155, low: 149, close: 153 },
    { time: '2023-08-02', open: 152, high: 157, low: 151, close: 155 },
    { time: '2023-08-03', open: 154, high: 159, low: 153, close: 157 },
    { time: '2023-08-04', open: 156, high: 160, low: 155, close: 159 },
    { time: '2023-08-05', open: 150, high: 155, low: 149, close: 153 },
    { time: '2023-08-06', open: 152, high: 157, low: 151, close: 155 },
    { time: '2023-08-07', open: 154, high: 159, low: 153, close: 157 },
    { time: '2023-08-08', open: 156, high: 160, low: 155, close: 159 },
    { time: '2023-08-09', open: 150, high: 155, low: 149, close: 153 },
    { time: '2023-08-10', open: 152, high: 157, low: 151, close: 155 },
    { time: '2023-08-11', open: 154, high: 159, low: 153, close: 157 },
    { time: '2023-08-12', open: 176, high: 160, low: 155, close: 159 },
    { time: '2023-08-13', open: 140, high: 175, low: 149, close: 153 },
    { time: '2023-08-14', open: 152, high: 157, low: 151, close: 155 },
    { time: '2023-08-15', open: 154, high: 159, low: 153, close: 157 },
    { time: '2023-08-16', open: 156, high: 160, low: 155, close: 159 },
    { time: '2023-08-17', open: 150, high: 155, low: 149, close: 153 },
    { time: '2023-08-18', open: 152, high: 157, low: 151, close: 155 },
    { time: '2023-08-19', open: 154, high: 159, low: 153, close: 157 },
    { time: '2023-08-20', open: 156, high: 160, low: 155, close: 159 },
    { time: '2023-08-21', open: 150, high: 155, low: 149, close: 153 },
    { time: '2023-08-22', open: 152, high: 157, low: 151, close: 155 },
    { time: '2023-08-23', open: 154, high: 159, low: 153, close: 157 },
    { time: '2023-08-24', open: 156, high: 160, low: 155, close: 159 },
    { time: '2023-08-25', open: 150, high: 155, low: 149, close: 153 },
    { time: '2023-08-26', open: 152, high: 157, low: 151, close: 160 },
    { time: '2023-08-27', open: 152, high: 159, low: 153, close: 157 },
    { time: '2023-08-28', open: 182, high: 160, low: 155, close: 159 },
    { time: '2023-08-29', open: 152, high: 175, low: 149, close: 153 },
    { time: '2023-08-30', open: 152, high: 163, low: 151, close: 155 },
    { time: '2023-08-31', open: 154, high: 159, low: 180, close: 157 },
    { time: '2023-09-01', open: 150, high: 160, low: 142, close: 159 }
];

export default sampleData;