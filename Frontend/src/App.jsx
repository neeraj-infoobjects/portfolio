import React from 'react';
import './App.css';
import Skills from './Skills';  // Update the extension
import Introduction from './Introduction';  // Update the extension
import Projects from './Project';  // Update the extension
import Experience from './Experience';  // Update the extension

function App() {
  return (
    <div className="App" style={{display:'flex', justifyItems:'center', width:'100vw', color:'black'}}>
      <div className="container">
        <h1 style={{color:'black'}}>Neeraj Portfolio</h1>
        <Introduction /> {/* Display the Introduction component */}
        <Skills /> {/* Display the Skills component */}
        <Projects /> {/* Display the Projects component */}
        <Experience /> {/* Display the Experience component */}
      </div>
    </div>
  );
}

export default App;
