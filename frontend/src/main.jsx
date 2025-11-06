import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; 
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <AppProvider> 
      <App />
    </AppProvider>
  </Router>
);
