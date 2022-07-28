// Utils
import { setCookie } from '../utils';
// Actions
import {
    setAffiliateData, setAffiliateUsers, setLoading, setError, clearError, setMessage, clearMessage,
} from '../reducers/authSlice';
// Api
import { api } from '../api';

export const authActions = {
    signupAffiliate: (data) => (dispatch) => {
        dispatch(setLoading(true));
        try {
            api.signupAffiliate(data)
                .then((response) => response.json())
                .then((res) => {
                    if (typeof res.email === 'string') {
                        dispatch(setAffiliateData(res));
                        dispatch(setLoading(false));
                        dispatch(clearMessage());
                        dispatch(setMessage('Your request has successfully been submitted, we will be in contact shortly!'));
                    } else {
                        dispatch(setLoading(false));
                        dispatch(clearError());
                        dispatch(setError('User already exists!'));
                    }
                })
                .catch(() => {
                    dispatch(setLoading(false));
                    dispatch(clearError());
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        } catch {
            dispatch(setLoading(false));
            dispatch(clearError());
            dispatch(setError('Something went wrong, please try again later!'));
        }
    },

    loginAffiliate: (data) => (dispatch) => {
        dispatch(setLoading(true));
        try {
            api.loginAffiliate(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res.access) {
                        dispatch(setAffiliateData(res));
                        setCookie('refresh', res.refresh, {
                            secure: true, samesite: true, 'max-age': 3600,
                        });
                        dispatch(setLoading(false));
                        dispatch(clearMessage());
                        dispatch(setMessage('You have successfully logged in!'));
                    } else {
                        dispatch(setLoading(false));
                        dispatch(clearError());
                        dispatch(setError('Something went wrong, please try again later!'));
                    }
                })
                .catch(() => {
                    dispatch(setLoading(false));
                    dispatch(clearError());
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        } catch {
            dispatch(setLoading(false));
            dispatch(clearError());
            dispatch(setError('Something went wrong, please try again later!'));
        }
    },

    refreshLogin: (data) => (dispatch) => {
        try {
            api.refreshLogin(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res.access) {
                        dispatch(setAffiliateData(res));
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    },

    getAffiliateUsers: (data) => (dispatch) => {
        dispatch(setLoading(true));
        try {
            api.getAffiliateUsers(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res) {
                        dispatch(setAffiliateUsers(res));
                    } else {
                        dispatch(setLoading(false));
                        dispatch(clearError());
                        dispatch(setError('Something went wrong, please try again later!'));
                    }
                })
                .catch(() => {
                    dispatch(setLoading(false));
                    dispatch(clearError());
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        } catch {
            dispatch(setLoading(false));
            dispatch(clearError());
            dispatch(setError('Something went wrong, please try again later!'));
        }
    },

    getPartAffiliateUsers: (data) => (dispatch) => {
        dispatch(setLoading(true));
        try {
            api.getPartAffiliateUsers(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res) {
                        dispatch(setAffiliateUsers(res));
                    } else {
                        dispatch(setLoading(false));
                        dispatch(clearError());
                        dispatch(setError('Something went wrong, please try again later!'));
                    }
                })
                .catch(() => {
                    dispatch(setLoading(false));
                    dispatch(clearError());
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        } catch {
            dispatch(setLoading(false));
            dispatch(clearError());
            dispatch(setError('Something went wrong, please try again later!'));
        }
    },

    getSearchAffiliateUsers: (data) => (dispatch) => {
        dispatch(setLoading(true));
        try {
            api.getSearchAffiliateUsers(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res) {
                        dispatch(setAffiliateUsers(res));
                    } else {
                        dispatch(setLoading(false));
                        dispatch(clearError());
                        dispatch(setError('Something went wrong, please try again later!'));
                    }
                })
                .catch(() => {
                    dispatch(setLoading(false));
                    dispatch(clearError());
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        } catch {
            dispatch(setLoading(false));
            dispatch(clearError());
            dispatch(setError('Something went wrong, please try again later!'));
        }
    },

    getSearchPartAffiliateUsers: (data) => (dispatch) => {
        dispatch(setLoading(true));
        try {
            api.getSearchPartAffiliateUsers(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res) {
                        dispatch(setAffiliateUsers(res));
                    } else {
                        dispatch(setLoading(false));
                        dispatch(clearError());
                        dispatch(setError('Something went wrong, please try again later!'));
                    }
                })
                .catch(() => {
                    dispatch(setLoading(false));
                    dispatch(clearError());
                    dispatch(setError('Something went wrong, please try again later!'));
                });
        } catch {
            dispatch(setLoading(false));
            dispatch(clearError());
            dispatch(setError('Something went wrong, please try again later!'));
        }
    },
};
