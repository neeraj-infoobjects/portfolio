import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styles

function Introduction() {
  const [introduction, setIntroduction] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchIntroduction = () => {
    setLoading(true);
    setError(null);
    axios.get('https://portfolio-5-6jmt.onrender.com/introduction') // Your API endpoint
      .then(response => {
        setIntroduction(response.data); // Store the fetched data
        setIsVisible(prev => !prev); // Toggle visibility after fetching data
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the introduction data!", error);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div>
      <h2 onClick={fetchIntroduction} style={{ cursor: 'pointer', color: 'white', padding: '1rem', backgroundColor: 'black', borderRadius: '1rem' }}>
        Introduction
      </h2>
      {/* {loading && <p>Loading...</p>} */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className={`dropdown-content ${isVisible ? 'show' : ''}`}>
        <p>{introduction.introduction}</p> {/* Display introduction text */}
      </div>
    </div>
  );
}

export default Introduction;
