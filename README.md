# TradeHub

<img src="https://firebasestorage.googleapis.com/v0/b/tradehub-ec4d8.appspot.com/o/profile_pics%2FBEARISH%20PIN%20BAR.png?alt=media&token=e5b096e0-28d2-4cd7-8b86-a80e69ef27f1" alt="TradeHub Logo" style="width: 100px; height: auto;" />
## Overview

TradeHub is a comprehensive trading platform designed to help users track their trades, analyze performance, and stay updated with the latest stock news. With a focus on usability and aesthetics, TradeHub offers a modern and intuitive interface for managing trades, viewing stock charts, and accessing real-time market data.

## Features

- **Trade Tracking**: Seamlessly add, manage, and analyze your trades.
- **Stock News**: Stay updated with the latest news articles related to your stocks.
- **Real-Time Stock Data**: View real-time stock prices and historical data.
- **Watchlist**: Track your favorite stocks and monitor their performance.
- **Chat System**: Communicate with other users through a private chat system.
- **Responsive Design**: Enjoy a smooth experience on any device with a responsive UI.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Material-UI (MUI)**: A React component library that provides pre-designed components.
- **Axios**: A promise-based HTTP client for making API requests.
- **Chart.js**: A charting library used for displaying candlestick charts.

### Backend

- **Node.js**: A JavaScript runtime for building scalable network applications.
- **Express**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing user data, posts, and trades.
- **Finnhub API**: Provides real-time stock market data and news.
- **Socket.io**: Enables real-time, bidirectional communication between web clients and servers.

### Deployment

- **Render**: For deploying and hosting the application.
- **Firebase**: For storing images.

## API Endpoints

### 📈 News Endpoint

- **URL**: `/news`
- **Method**: `GET`
- **Description**: Fetches the latest market news.
- **Response**: Returns a list of news articles with details such as title, description, and published date.

### 📊 Momentum Stock Endpoint

- **URL**: `/getMomentumStock`
- **Method**: `GET`
- **Description**: Retrieves stocks with momentum based on pre-defined criteria.
- **Response**: Returns a list of stocks with details such as ticker symbol, price, and percentage change.

## Installation Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/benjaminHarroch/TradeHub_MERN.git
   cd JuinorTraders
   cd clientSide
   npm run start
