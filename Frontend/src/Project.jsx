import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState({}); // Object to track expanded state of each project

  // Fetch projects from the backend
  const fetchProjects = () => {
    setLoading(true);
    setError(null);
    axios.get('http://127.0.0.1:5000/projects') // Your API endpoint
      .then(response => {
        setProjects(response.data); // Store the fetched data
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the projects data!", error);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects(); // Automatically fetch the projects when the component is mounted
  }, []);

  // Toggle project description visibility without collapsing other descriptions
  const handleProjectClick = (index) => {
    setExpandedProjects(prevState => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the expanded state for the clicked project
    }));
  };

  return (
    <div>
      <h2 onClick={() => setIsVisible(prev => !prev)} style={{ cursor: 'pointer', color: 'white', padding: '1rem', backgroundColor: 'black', borderRadius: '1rem' }}>
        Projects
      </h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {loading && <p>Loading...</p>}

      {/* Show only two project names initially */}
      <div className={`dropdown-content ${isVisible ? 'show' : ''}`}>
        {projects.slice(0, 2).map((project, index) => (
          <div key={index}>
            <h3 onClick={() => handleProjectClick(index)} style={{ cursor: 'pointer', color: 'blue' }}>
              {project.name}
            </h3>
            {/* Show the description if this project is clicked and expanded */}
            {expandedProjects[index] && (
              <p>{project.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
