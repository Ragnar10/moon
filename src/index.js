// Core
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// Routing
import { BrowserRouter as Router } from 'react-router-dom';
// Instruments
import './theme/main.scss';
// Store
import store from './store';
// Components
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store = { store }>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
);
