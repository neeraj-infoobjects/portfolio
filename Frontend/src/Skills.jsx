import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader'; // Import the Loader component
import './App.css'; // Import the CSS for loader styles

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchSkills = () => {
    setLoading(true);
    setError(null);
    axios.get('http://127.0.0.1:5000/skills') // Your API endpoint
      .then(response => {
        setSkills(response.data); // Store the fetched data
        setIsVisible(prev => !prev); // Toggle visibility
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the skills data!", error);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div>
      <h2 onClick={fetchSkills} style={{ cursor: 'pointer', color: 'white', padding:'1rem', backgroundColor:'black', borderRadius:'1rem' }}>
        Skills
        {loading && <Loader />} {/* Show loader when loading */}
      </h2>
      {/* {loading && <p>Loading...</p>} */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
     
        <div className={`dropdown-content ${isVisible ? 'show' : ''}`}>
          {skills.map((skill, index) => (
            <p key={index}>{skill.name}</p>
          ))}
        </div>

    </div>
  );
}

export default Skills;
