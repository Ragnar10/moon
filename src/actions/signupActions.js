// Actions
import {
    setUser, setLoading, setError, clearError, setMessage, clearMessage,
} from '../reducers/signupSlice';
// Api
import { api } from '../api';

export const signupActions = {
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
                        dispatch(setUser(res));
                        sessionStorage.setItem('access', JSON.stringify(res));
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
};
