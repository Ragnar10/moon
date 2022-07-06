// Core
import { createSlice } from '@reduxjs/toolkit';

export const signupSlice = createSlice({
    name:         'signup',
    initialState: {
        user:    {},
        loading: false,
        error:   '',
        message: '',
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = '';
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        clearMessage: (state) => {
            state.message = '';
        },
    },
});

export const {
    setUser, setLoading, setError, clearError, setMessage, clearMessage,
} = signupSlice.actions;

export default signupSlice.reducer;
