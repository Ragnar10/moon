// Core
import { useSelector } from 'react-redux';
// Navigation
import { Public, Private } from './navigation';

const App = () => {
    const affiliateData = useSelector((state) => state.auth.affiliateData);

    return affiliateData.access ? <Public /> : <Private />;
};

export default App;
