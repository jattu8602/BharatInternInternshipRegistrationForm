import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('Logged Out Successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = 'http://localhost:8080/products';
      const headers = {
        'Authorization': localStorage.getItem('token')
      };
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (err) {
      handleError(err.message || 'Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <div>
        {products.length > 0 ? (
          products.map((item, index) => (
            <div key={index}> {/* Use a unique key for each item */}
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </div>
  );
};

export default Home;

