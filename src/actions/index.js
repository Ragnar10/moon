// Actions
import {
    setWallet, setLoading, setError, clearError,
    setTwitterData,
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

    getTwitterData: (data) => (dispatch) => {
        api.requestTwitterAccessToken(data)
            .then((response) => response.json())
            .then((res) => {
                if (res.user_id) {
                    setTwitterData({
                        user_id:   res.user_id,
                        user_name: res.screen_name,
                    });
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
