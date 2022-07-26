// Utils
import { setCookie } from '../utils';
// Actions
import {
    setUser, setLoading, setError, clearError, setMessage, clearMessage, setAccess, setAffiliates,
} from '../reducers/authSlice';
// Api
import { api } from '../api';

export const authActions = {
    signupUser: (data) => (dispatch) => {
        dispatch(setLoading(true));
        try {
            api.signupUser(data)
                .then((response) => response.json())
                .then((res) => {
                    if (typeof res.email === 'string') {
                        dispatch(setUser(res));
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

    loginUser: (data) => (dispatch) => {
        dispatch(setLoading(true));
        try {
            api.loginUser(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res.access) {
                        dispatch(setAccess(res));
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
                        dispatch(setAccess(res));
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    },

    getAffiliates: (data) => (dispatch) => {
        dispatch(setLoading(true));
        try {
            api.loginUser(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res) {
                        dispatch(setAffiliates(res));
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
