// Actions
import {
    setWallet, setLoading, setError, clearError,
} from '../reducers/authSlice';

export const authActions = {
    connectMeta: () => (dispatch) => {
        if (window.ethereum) {
            dispatch(clearError(''));
            dispatch(setLoading(true));
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((res) => {
                    if (res.code) {
                        dispatch(setLoading(false));
                        dispatch(setError('Check your extension!'));
                    } else {
                        dispatch(clearError(''));
                        dispatch(setWallet(res[ 0 ]));
                        dispatch(setLoading(false));
                    }

                    return null;
                })
                .catch(() => {
                    dispatch(clearError(''));
                    dispatch(setLoading(false));
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        } else {
            dispatch(clearError(''));
            dispatch(setError('Install metamask extension!'));
        }
    },

    connectMetaMobile: () => (dispatch) => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((res) => {
                    return  dispatch(setWallet(res[ 0 ]));
                })
                .catch(() => {
                    dispatch(clearError(''));
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        }
    },
};
