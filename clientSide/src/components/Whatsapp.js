import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Whatsapp.css';

const Whatsapp = () => {

  const navigate = useNavigate();
  
  const handleClick = () => {
    // Replace the phone number with your support number
    const phoneNumber = '+972546198858'; // Replace with your support number
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <div className="whatsapp-icon" onClick={handleClick}>
      <i className="fab fa-whatsapp"></i>
    </div>
  );
};

export default Whatsapp;
