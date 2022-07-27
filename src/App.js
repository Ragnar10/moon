// Core
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { authActions } from './actions/authActions';
// Utils
import { getCookie } from './utils';
// Navigation
import { Public, Private } from './navigation';

const App = () => {
    const dispatch = useDispatch();
    const affiliateData = useSelector((state) => state.auth.affiliateData);

    useEffect(() => {
        const refresh = getCookie('refresh');

        if (refresh) {
            const data = {
                refresh,
            };
            dispatch(authActions.refreshLogin(data));
        }
    }, []);

    return !affiliateData.access ? <Private /> : <Public />;
};

export default App;
