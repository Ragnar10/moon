// Actions
import {
    setWallet,
    setLoading,
    setError,
    clearError,
    setTwitterData,
    setStep,
    setUser,
    clearMessage,
    setMessage,
    setPopupIsOpen, setTwitterDescribe, setTelegramDescribe,
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
                    localStorage.removeItem('influencer');
                    window.location.href = process.env.REACT_APP_BASE_PATH;
                })
                .then((res) => {
                    return null;
                })
                .catch(() => {
                    return null;
                });
        } catch {
            return null;
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
                        dispatch(setLoading(false));
                        const data = {
                            wallet: res[ 0 ],
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
                    const data = {
                        wallet: res[ 0 ],
                    };
                    localStorage.setItem('wallet', JSON.stringify(data));
                })
                .catch(() => {
                    dispatch(clearError());
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        }
    },

    createMetamaskUser: (data) => (dispatch) => {
        try {
            api.createSocialUser(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res.id) {
                        window.location.href = `${process.env.REACT_APP_BASE_PATH}/affiliate/${res.ref}?userId=${res.id}&token=${res.token}`;
                    } else {
                        dispatch(clearError(''));
                        dispatch(setError('User already exists!'));
                    }
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

    getSocialUser: (data) => (dispatch) => {
        try {
            api.getSocialUser(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res.id) {
                        dispatch(setUser(res));
                        dispatch(setWallet(res.metamask));

                        const metamask = {
                            wallet: res.metamask,
                        };
                        localStorage.setItem('wallet', JSON.stringify(metamask));
                        localStorage.setItem('user', JSON.stringify(res));
                    } else {
                        dispatch(clearError(''));
                        dispatch(setError('Something went wrong, please try again later!'));
                    }
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

    checkTwitterFollow: (data) => (dispatch) => {
        try {
            api.checkTwitterFollow(data)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    dispatch(clearError(''));
                    dispatch(setError('Describe!'));
                })
                .then((res) => {
                    dispatch(setTwitterDescribe(true));
                })
                .catch(() => {
                    return null;
                });
        } catch {
            return null;
        }
    },

    checkTelegramFollow: (data) => (dispatch) => {
        try {
            api.checkTelegramFollow(data)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    dispatch(clearError(''));
                    dispatch(setError('Describe!'));
                })
                .then((res) => {
                    dispatch(setTelegramDescribe(true));
                })
                .catch(() => {
                    return null;
                });
        } catch {
            return null;
        }
    },

    updateTwitterUser: (data) => (dispatch) => {
        try {
            api.updateSocialUser(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res.id) {
                        dispatch(setUser(res));
                        dispatch(setStep('three'));
                        localStorage.setItem('user', JSON.stringify(res));
                    } else {
                        dispatch(clearError(''));
                        dispatch(setError('User already exists!'));
                    }
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

    updateTelegramUser: (data) => (dispatch) => {
        try {
            api.updateSocialUser(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res.id) {
                        dispatch(setUser(res));

                        const user = {
                            id:    res.id,
                            token: res.token,
                        };
                        localStorage.setItem('user', JSON.stringify(user));
                    } else {
                        dispatch(clearError(''));
                        dispatch(setError('User already exists!'));
                    }
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
                    const twitterData = {
                        id:       res.id,
                        username: res.screen_name,
                    };
                    dispatch(setTwitterData(twitterData));
                    localStorage.setItem('tw', JSON.stringify(twitterData));
                    const user = JSON.parse(localStorage.getItem('user'));
                    const wallet = JSON.parse(localStorage.getItem('wallet'));
                    dispatch(setUser(user));
                    dispatch(setWallet(wallet.wallet));
                    dispatch(setStep('two'));
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

    createSocialUserFinish: (data) => (dispatch) => {
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
