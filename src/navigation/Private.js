// Routing
import {
    Routes, Navigate, Route, Outlet,
} from 'react-router-dom';
// Pages
import {
    DashboardPage,
} from '../pages';

export const Private = () => {
    return (
        <Routes>
            <Route path = '/' element = { <Outlet /> }>
                <Route path = 'dashboard' element = { <DashboardPage /> } />
            </Route>

            <Route path = '*' element = { <Navigate to = '/dashboard' replace /> } />
        </Routes>
    );
};

