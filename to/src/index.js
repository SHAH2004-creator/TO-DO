import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure this file exists (you can create an empty index.css if needed)
import App from './App'; // Points to src/App.js

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error('Root element not found!');
  }
});