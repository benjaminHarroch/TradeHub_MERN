import React from 'react';
import './css/loadingSpinner.css'; // Import the CSS for styling

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
