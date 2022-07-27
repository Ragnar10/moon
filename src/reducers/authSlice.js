// Core
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name:         'auth',
    initialState: {
        affiliateData:  {},
        affiliateUsers: {},
        loading:        false,
        error:          '',
        message:        '',
    },
    reducers: {
        setAffiliateData: (state, action) => {
            state.affiliateData = action.payload;
        },
        setAffiliateUsers: (state, action) => {
            state.affiliateUsers = action.payload;
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
    setAffiliateData, setAffiliateUsers, setLoading, setError, clearError, setMessage, clearMessage,
} = authSlice.actions;

export default authSlice.reducer;
