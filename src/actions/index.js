// Actions
import {
    setWallet, setLoading, setError, clearError,
    setTwitterSuccess, setTwitterData,
} from '../reducers/authSlice';
// Api
import { api } from '../api';

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

    getTwitterOauthToken: () => (dispatch) => {
        try {
            api.getTwitterOauthToken()
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    if (res.oauth_token) {
                        window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${res.oauth_token}`;
                    } else {
                        dispatch(clearError(''));
                        dispatch(setError('Something went wrong, please try again later!'));
                    }

                    return null;
                })
                .catch(() => {
                    dispatch(clearError(''));
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        } catch {
            dispatch(clearError(''));
            dispatch(setError('Something went wrong, please try again later!'));
        }
    },

    requestTwitterAccessToken: (data) => (dispatch) => {
        api.requestTwitterAccessToken(data)
            .then((response) => response.json())
            .then((res) => {
                if (res.success) {
                    console.log(res);
                    setTwitterSuccess(res.success);
                } else {
                    dispatch(clearError(''));
                    dispatch(setError('Something went wrong, please try again later!'));
                }

                return null;
            })
            .catch(() => {
                dispatch(clearError(''));
                dispatch(setError('Something went wrong, please try again later!'));
            });
    },

    getTwitterData: () => (dispatch) => {
        api.getTwitterData()
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    dispatch(setTwitterData(res));
                } else {
                    dispatch(clearError(''));
                    dispatch(setError('Something went wrong, please try again later!'));
                }

                return null;
            })
            .catch(() => {
                dispatch(clearError(''));
                dispatch(setError('Something went wrong, please try again later!'));
            });
    },
};
