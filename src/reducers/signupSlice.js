// Core
import { createSlice } from '@reduxjs/toolkit';

export const signupSlice = createSlice({
    name:         'signup',
    initialState: {
        user:        {},
        popupIsOpen: false,
        loading:     false,
        error:       '',
        message:     '',
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setPopupIsOpen: (state, action) => {
            state.popupIsOpen = action.payload;
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
    setUser, setPopupIsOpen, setLoading, setError, clearError, setMessage, clearMessage,
} = signupSlice.actions;

export default signupSlice.reducer;
