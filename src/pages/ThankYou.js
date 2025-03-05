import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleReturnClick = () => {
    navigate('/');
  };

  return (
    <div className="thank-you-container">
      <h1>Thank You!</h1>
      <p>Your order has been placed successfully.</p>
      <button className="return-button" onClick={handleReturnClick}>Return to Products</button>
    </div>
  );
};

export default ThankYou;