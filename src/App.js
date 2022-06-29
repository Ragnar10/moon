// Routing
import {
    Routes, Navigate, Route,
} from 'react-router-dom';
// Pages
import { ConnectWithWalletPage, ConnectWithAuthPage } from './pages';

const App = () => {
    return (
        <Routes>
            <Route path = '/' element = { <ConnectWithWalletPage /> } />

            <Route path = '/login' element = { <ConnectWithAuthPage /> } />

            <Route path = '*' element = { <Navigate to = '/' replace /> } />
        </Routes>
    );
};

export default App;
