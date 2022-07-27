// Routing
import {
    Routes, Navigate, Route, Outlet,
} from 'react-router-dom';
// Pages
import {
    MainPage, WalletPage, SignUpPage, LoginPage,
} from '../pages';

export const Public = () => {
    return (
        <Routes>
            <Route path = '/' element = { <Outlet /> }>
                <Route index element = { <MainPage /> } />
                <Route path = 'affiliate/:id' element = { <WalletPage /> } />
                <Route path = 'registration/affiliate' element = { <SignUpPage /> } />
                <Route path = 'login' element = { <LoginPage /> } />
            </Route>

            <Route path = '*' element = { <Navigate to = '/' replace /> } />
        </Routes>
    );
};