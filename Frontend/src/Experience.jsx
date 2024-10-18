import React, { useState } from 'react';
import axios from 'axios';
import "./App.css"

function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchExperience = () => {
    setIsVisible(prev => !prev)
    setLoading(true);
    setError(null);
    axios.get('http://127.0.0.1:5000/experience') // Your API endpoint
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

  return (
    <div>
      <h2 onClick={fetchExperience} style={{ cursor: 'pointer', color: 'white', padding:'1rem', backgroundColor:'black', borderRadius:'1rem' }}>
        Experience
      </h2>
      {/* {loading && <p>Loading...</p>} */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className={`dropdown-content ${isVisible ? 'show' : ''}`}>
        {experience.map((exp, index) => (
          <div key={index}>
            <h3>{exp.name}</h3> {/* Display the name */}
            <p>{exp.description}</p> {/* Display the description */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
