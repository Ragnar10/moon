// Core
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name:         'auth',
    initialState: {
        access:  {},
        user:    {},
        loading: false,
        error:   '',
        message: '',
    },
    reducers: {
        setAccess: (state, action) => {
            state.access = action.payload;
        },
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
    setAccess, setUser, setLoading, setError, clearError, setMessage, clearMessage,
} = authSlice.actions;

export default authSlice.reducer;
