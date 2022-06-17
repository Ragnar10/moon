// Routing
import {
    Routes, Navigate, Route,
} from 'react-router-dom';
// Pages
import { ConnectWithWalletPage, ConnectWithLoginPage } from './pages';

const App = () => {
    return (
        <Routes>
            <Route path = '/' element = { <ConnectWithWalletPage /> } />

            <Route path = '/login' element = { <ConnectWithLoginPage /> } />

            <Route path = '*' element = { <Navigate to = '/' replace /> } />
        </Routes>
    );
};

export default App;
