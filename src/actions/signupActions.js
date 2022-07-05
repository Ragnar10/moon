// Actions
import {
    setLoading, setError, clearError, setPopupIsOpen, setUser, clearMessage, setMessage,
} from '../reducers/signupSlice';
// Api
import { api } from '../api';

export const signupActions = {
    signupUser: (data) => (dispatch) => {
        try {
            api.signupUser(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res.ok) {
                        dispatch(setUser(res));
                        dispatch(clearMessage());
                        dispatch(setMessage('Your request has successfully been submitted, we will be in contact shortly!'));
                    } else {
                        dispatch(clearError());
                        dispatch(setError('User already exists!'));
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

    loginUser: (data) => (dispatch) => {
        try {
            api.loginUser(data)
                .then((response) => response.json())
                .then((res) => {
                    if (res.token) {
                        dispatch(setUser(res));
                        dispatch(clearMessage());
                        dispatch(setMessage('You have successfully logged in!'));
                    } else {
                        dispatch(clearError());
                        dispatch(setError('Something went wrong, please try again later!'));
                        dispatch(setUser({ token: 'exist' }));
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
};
