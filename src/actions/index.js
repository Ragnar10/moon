// Actions
import {
    setWallet, setLoading, setError, clearError,
} from '../reducers/authSlice';

export const authActions = {
    connectMeta: () => (dispatch) => {
        if (window.ethereum) {
            dispatch(setLoading());
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((res) => {
                    if (res.code) {
                        dispatch(setLoading());
                        dispatch(setError('Check your extension!'));
                    } else {
                        dispatch(clearError(''));
                        dispatch(setWallet(res[ 0 ]));
                        dispatch(setLoading());
                    }

                    return null;
                })
                .catch(() => {
                    dispatch(clearError(''));
                    dispatch(setLoading());
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        } else {
            dispatch(setError('Install metamask extension!'));
        }
    },
};
