// Routing
import {
    Routes, Navigate, Route, Outlet,
} from 'react-router-dom';
// Pages
import { MainPage, WalletPage, SignUpPage } from './pages';

const App = () => {
    return (
        <Routes>
            <Route path = '/' element = { <Outlet /> }>
                <Route index element = { <MainPage /> } />
                <Route path = 'affiliate/:id' element = { <WalletPage /> } />
                <Route path = 'login' element = { <SignUpPage /> } />
            </Route>

            <Route path = '*' element = { <Navigate to = '/' replace /> } />
        </Routes>
    );
};

export default App;
