import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedExperience, setExpandedExperience] = useState({}); 

  // Fetch experiences from the backend
  const fetchExperience = () => {
    setLoading(true);
    setError(null);
    axios.get('https://portfolio-5-6jmt.onrender.com/experience') // Your API endpoint
      .then(response => {
        setExperience(response.data); // Store the fetched data
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the experience data!", error);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchExperience(); // Automatically fetch experiences when the component is mounted
  }, []);

  
  const handleExperienceClick = (index) => {
    setExpandedExperience(prevState => ({
      ...prevState,
      [index]: !prevState[index], 
    }));
  };

  return (
    <div>
      <h2 onClick={() => setIsVisible(prev => !prev)} style={{ cursor: 'pointer', color: 'white', padding: '1rem', backgroundColor: 'black', borderRadius: '1rem' }}>
        Experience
      </h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {loading && <p>Loading...</p>}

      {/* Show only two experience items initially */}
      <div className={`dropdown-content ${isVisible ? 'show' : ''}`}>
        {experience.slice(0, 2).map((exp, index) => (
          <div key={index}>
            <h3 onClick={() => handleExperienceClick(index)} style={{ cursor: 'pointer', color: 'blue' }}>
              {exp.name}
            </h3>
            {/* Show the description if this experience is clicked and expanded */}
            {expandedExperience[index] && (
              <p>{exp.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
