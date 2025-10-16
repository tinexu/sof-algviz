import React, { useState } from 'react';
import './styles/globals.css';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [visualizationData, setVisualizationData] = useState([]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Algorithm Visualizer</h1>
      </header>
      
      <div className="app-content">
        <aside className="sidebar">
          {/* Algorithm selection menu */}
          <h2>Algorithms</h2>
          {/* Add algorithm categories and options */}
        </aside>
        
        <main className="visualizer-container">
          {/* Visualization area */}
          <div className="controls">
            {/* Add playback controls */}
          </div>
          
          <div className="visualization">
            {/* Add D3.js visualization component */}
          </div>
          
          <div className="code-display">
            {/*  Add algorithm code display */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;