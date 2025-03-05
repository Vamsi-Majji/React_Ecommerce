import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      password: formData.get('password'),
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Signup successful!');
    navigate('/login'); // Navigate to login page after successful signup
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <label>Name:</label>
        <input type="text" name="name" required />
        <label>Email:</label>
        <input type="email" name="email" required />
        <label>Phone Number:</label>
        <input type="tel" name="phone" required />
        <label>Address:</label>
        <input type="text" name="address" required />
        <label>Password:</label>
        <input type="password" name="password" required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;