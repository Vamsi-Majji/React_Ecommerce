import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.jpg'; // Import logo image
import './Header.css';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, userDetails } = useContext(AuthContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userData');
  };

  return (
    <div className="header">
      <Link to="/"><img src={logo} alt="Logo" className="logo" height={80} width={80} /></Link>
      <div className="menu">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            <div className="user-icon" title="User Details">
              <span>{userDetails.name}</span>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="signup-button">Signup</Link>
            <Link to="/login" className="login-button">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;