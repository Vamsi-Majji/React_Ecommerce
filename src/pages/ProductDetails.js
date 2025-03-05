import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import emailjs from 'emailjs-com';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, userDetails } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetch('/prod.json')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debugging log
        const product = data.find((item) => item.id === parseInt(id));
        console.log('Product ID:', id); // Debugging log
        console.log('Found product:', product); // Debugging log
        setProduct(product);
        const similarProducts = data.filter((item) => item.category === product?.category && item.id !== product.id);
        setSimilarProducts(similarProducts);
      })
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleBuyClick = () => {
    if (isLoggedIn) {
      setAddress(userDetails.address);
      setShowConfirmation(true);
    } else {
      alert('Please login to proceed with the purchase.');
      navigate('/login');
    }
  };

  const handleConfirmOrder = (event) => {
    event.preventDefault();
    const purchaseDate = new Date().toLocaleString(); // Get the current date and time
    // Send thank you email to user and client
    sendThankYouEmail(userDetails.email, product, address, paymentMethod, purchaseDate);
    sendOrderDetailsToClient(userDetails, product, address, paymentMethod, purchaseDate);
    alert('Thank you for your order!');
    navigate('/thankyou');
  };

  const sendThankYouEmail = (userEmail, product, address, paymentMethod, purchaseDate) => {
    const templateParams = {
      user_email: userEmail,
      product_name: product.title,
      product_price: product.price,
      address: address,
      payment_method: paymentMethod,
      purchase_date: purchaseDate,
    };

    emailjs.send('service_nhu8rdl', 'template_chvl6fr', templateParams, 'FBn02M-9D9st_lzuP')
      .then((response) => {
        console.log('Thank you email sent successfully!', response.status, response.text);
      }, (error) => {
        console.error('Failed to send thank you email.', error);
      });
  };

  const sendOrderDetailsToClient = (userDetails, product, address, paymentMethod, purchaseDate) => {
    const templateParams = {
      client_email: 'client@example.com', // Replace with the client's email address
      user_name: userDetails.name,
      user_email: userDetails.email,
      user_phone: userDetails.phone,
      product_name: product.title,
      product_price: product.price,
      address: address,
      payment_method: paymentMethod,
      purchase_date: purchaseDate,
    };

    emailjs.send('service_nhu8rdl', 'template_nvi6ucw', templateParams, 'FBn02M-9D9st_lzuP')
      .then((response) => {
        console.log('Order details email sent successfully!', response.status, response.text);
      }, (error) => {
        console.error('Failed to send order details email.', error);
      });
  };

  return (
    <div className="product-details">
      {product ? (
        <>
          <h1>{product.title}</h1>
          <img src={product.image_url || 'path/to/fallback-image.jpg'} alt={product.title} className="product-image" />
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Rating: {product.rating}</p>
          <button className="buy-button" onClick={handleBuyClick}>Buy</button>
          {showConfirmation && (
            <form className="confirmation-form" onSubmit={handleConfirmOrder}>
              <h2>Confirm Order</h2>
              <label>Address:</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
              <label>Payment Method:</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                <option value="">Select Payment Method</option>
                <option value="UPI">UPI</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
              </select>
              <button type="submit">Confirm Order</button>
            </form>
          )}
          <h2>Features:</h2>
          <ul>
            {Object.entries(product.features).map(([key, value]) => (
              <li key={key}>{key}: {value}</li>
            ))}
          </ul>
          <h2>Similar Products:</h2>
          <div className="similar-products">
            {similarProducts.map((item) => (
              <div key={item.id} className="similar-product" onClick={() => handleCardClick(item.id)}>
                <h3>{item.title}</h3>
                <img src={item.image_url || 'path/to/fallback-image.jpg'} alt={item.title} />
                <p>Price: {item.price}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetails;