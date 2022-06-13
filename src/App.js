// Routing
import {
    Routes, Navigate, Route,
} from 'react-router-dom';
// Components
import { Main } from './components';

const App = () => {
    return (
        <Routes>
            <Route path = '/' element = { <Main /> } />

            <Route path = '*' element = { <Navigate to = '/' replace /> } />
        </Routes>
    );
};

export default App;
