// Core
import { useSelector } from 'react-redux';
// Routing
import {
    Routes, Navigate, Route, Outlet,
} from 'react-router-dom';
// Navigation
import { Public, Private } from './navigation';

const App = () => {
    const affiliateData = useSelector((state) => state.auth.affiliateData);
};

export default App;
