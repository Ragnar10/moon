// Actions
import {
    setWallet, setLoading, setError, clearError,
    setTwitterData, setPopupIsOpen, setUser,
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
                .then((res) =>  dispatch(setWallet(res[ 0 ])))
                .catch(() => {
                    dispatch(clearError(''));
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        }
    },

    createUser: (data) => (dispatch) => {
        try {
            api.createUser(data)
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    if (res.id) {
                        dispatch(setUser(res));
                        const user = {
                            id:    res.id,
                            token: res.token,
                        };
                        localStorage.setItem('user', JSON.stringify(user));
                        dispatch(setPopupIsOpen(true));
                    } else {
                        dispatch(clearError(''));
                        dispatch(setError('User already exists!'));
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

    getUser: (data) => (dispatch) => {
        try {
            api.getUser(data)
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    if (res.id) {
                        dispatch(setUser(res));
                        dispatch(setPopupIsOpen(true));
                        localStorage.removeItem('user');
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

    updateUser: (data) => (dispatch) => {
        try {
            api.updateUser(data)
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    if (res.id) {
                        dispatch(setUser(res));
                    } else {
                        dispatch(clearError(''));
                        dispatch(setError('User already exists!'));
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
                console.log(res);
                if (res.screen_name) {
                    dispatch(setTwitterData(res.screen_name));
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
