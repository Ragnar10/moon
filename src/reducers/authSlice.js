// Core
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name:         'auth',
    initialState: {
        wallet:       '',
        telegramData: {},
        twitterData:  {},
        loading:      false,
        error:        '',
    },
    reducers: {
        setWallet: (state, action) => {
            state.wallet = action.payload;
        },
        setLoading: (state) => {
            state.loading = !state.loading;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = '';
        },
    },
});

export const {
    setWallet, setLoading, setError, clearError,
} = authSlice.actions;

export default authSlice.reducer;
