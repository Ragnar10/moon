// Actions
import {
    setWallet, setLoading, setError, clearError, setTwitterData, setPopupIsOpen, setUser, clearMessage, setMessage,
} from '../reducers/authSocialSlice';
// Api
import { api } from '../api';

export const authWalletActions = {
    checkRef: (data) => () => {
        try {
            api.checkRef(data)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }

                    window.location.href = process.env.REACT_APP_BASE_PATH;
                })
                .then((res) => {
                    return null;
                })
                .catch(() => {
                    window.location.href = process.env.REACT_APP_BASE_PATH;
                });
        } catch {
            window.location.href = process.env.REACT_APP_BASE_PATH;
        }
    },

    connectMeta: () => (dispatch) => {
        if (window.ethereum) {
            dispatch(clearError());
            dispatch(setLoading(true));
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((res) => {
                    if (res.code) {
                        dispatch(setLoading(false));
                        dispatch(setError('Check your extension!'));
                    } else {
                        dispatch(clearError());
                        dispatch(setWallet(res[ 0 ]));
                        dispatch(setPopupIsOpen(true));
                        dispatch(setLoading(false));
                        const data = {
                            wallet:      res[ 0 ],
                            popupIsOpen: true,
                        };
                        localStorage.setItem('wallet', JSON.stringify(data));
                    }
                })
                .catch(() => {
                    dispatch(clearError());
                    dispatch(setLoading(false));
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        } else {
            dispatch(clearError());
            dispatch(setError('Install metamask extension!'));
        }
    },

    connectMetaMobile: () => (dispatch) => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((res) => {
                    dispatch(setWallet(res[ 0 ]));
                    dispatch(setPopupIsOpen(true));
                    const data = {
                        wallet:      res[ 0 ],
                        popupIsOpen: true,
                    };
                    localStorage.setItem('wallet', JSON.stringify(data));
                })
                .catch(() => {
                    dispatch(clearError());
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
                        dispatch(clearError());
                        dispatch(setError('Something went wrong, please try again later!'));
                    }
                })
                .catch(() => {
                    dispatch(clearError());
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        } catch {
            dispatch(clearError());
            dispatch(setError('Something went wrong, please try again later!'));
        }
    },

    getTwitterData: (data) => (dispatch) => {
        api.requestTwitterAccessToken(data)
            .then((response) => response.json())
            .then((res) => {
                if (res.screen_name) {
                    dispatch(setTwitterData(res.screen_name));
                    localStorage.setItem('tw', res.screen_name);
                } else {
                    dispatch(clearError());
                    dispatch(setError('Something went wrong, please try again later!'));
                }
            })
            .catch(() => {
                dispatch(clearError());
                dispatch(setError('Something went wrong, please try again later!'));
            });
    },

    createSocialUser: (data) => (dispatch) => {
        try {
            api.createSocialUser(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res.id) {
                        dispatch(setUser(res));
                        dispatch(clearMessage());
                        dispatch(setMessage('You have successfully registered!'));
                    } else {
                        dispatch(clearError());
                        dispatch(setError('User already exists!'));
                        dispatch(setUser({ token: 'exist' }));
                    }

                    localStorage.removeItem('influencer');
                    localStorage.removeItem('wallet');
                    localStorage.removeItem('tw');
                    localStorage.removeItem('tg');
                })
                .catch(() => {
                    dispatch(clearError());
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        } catch {
            dispatch(clearError());
            dispatch(setError('Something went wrong, please try again later!'));
        }
    },
};
