import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskPage from './TaskPage.js'
import './index.css'

// Create a root container and render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:taskID" element={<TaskPage />} /> 
    </Routes>
  </Router>
);
