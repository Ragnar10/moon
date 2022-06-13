// Core
import React from 'react';
import { createRoot } from 'react-dom/client';
// Routing
import { BrowserRouter as Router } from 'react-router-dom';
// Instruments
import './theme/main.scss';
// Components
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
);
