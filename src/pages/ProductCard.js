import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/prod.json')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched products:', data); // Debugging log
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card-container">
      {products.length > 0 ? (
        products.map(product => (
          <div className="product-card" key={product.id} onClick={() => handleCardClick(product.id)}>
            <img src={product.image_url || 'path/to/fallback-image.jpg'} alt={product.title} height={500} width={500} className="product-image" />
            <h2 className="product-title">{product.title}</h2>
            <p className="product-price">Price: {product.price}</p>
            <p className="product-description">{product.description}</p>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductCard;