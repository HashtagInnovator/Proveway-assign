import React, { useState } from 'react';
import ProductOffer from './components/proveway'; 
import './App.css';
import './styles/nightmode.css';
import './styles/contact.css';

function App() {
  const [nightMode, setNightMode] = useState(false);
  const toggleNightMode = () => {
    setNightMode(!nightMode);
  };


  return (
    <div className={`App ${nightMode ? 'night-mode' : ''}`}>
      <div className="center-container">
        <ProductOffer />
      </div>
      <button className="night-mode-toggle" onClick={toggleNightMode}>
        {nightMode ? '🌞' : '🌙'}
      </button>
      <a 
        href="mailto:chetanohri2000@gmail.com" 
        className="contact-link"
        target="_blank" 
        rel="noopener noreferrer"
      >
        Contact Me
      </a>
    </div>
  );
}

export default App;
