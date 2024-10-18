import React, { useState } from 'react';
import axios from 'axios';
import "./App.css"
function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);


  const fetchProjects = () => {
    setIsVisible(prev => !prev)
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

  return (
    <div>
      <h2 onClick={fetchProjects} style={{ cursor: 'pointer', color: 'white', padding:'1rem', backgroundColor:'black', borderRadius:'1rem' }}>
        Projects
      </h2>
      {/* {loading && <p>Loading...</p>} */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
   <div className={`dropdown-content ${isVisible ? 'show' : ''}`}>
        {projects.map((project, index) => (
          <div key={index} >
            <h3>{project.name}</h3> {/* Display the project name */}
            <p>{project.description}</p> {/* Display the project description */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
