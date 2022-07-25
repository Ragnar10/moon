// Core
import { useSelector } from 'react-redux';
// Routing
import {
    Routes, Navigate, Route, Outlet,
} from 'react-router-dom';

// Pages
import {
    MainPage, WalletPage, SignUpPage, LoginPage, DashboardPage,
} from './pages';

const App = () => {
    const access = useSelector((state) => state.auth.access);

    return (
        <Routes>
            <Route path = '/' element = { <Outlet /> }>
                <Route index element = { <MainPage /> } />
                <Route path = 'affiliate/:id' element = { <WalletPage /> } />
                { !access.access && <Route path = 'registration/affiliate' element = { <SignUpPage /> } /> }
                <Route path = 'login' element = { <LoginPage /> } />
                { access.access && <Route path = 'dashboard' element = { <DashboardPage /> } /> }
            </Route>

            <Route path = '*' element = { <Navigate to = '/' replace /> } />
        </Routes>
    );
};

export default App;
