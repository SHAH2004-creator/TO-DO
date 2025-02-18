import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18
import './index.css'; // Ensure this file exists
import App from './App'; // Ensure the path to App.js is correct

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
