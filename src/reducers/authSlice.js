// Core
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name:         'auth',
    initialState: {
        user:         {},
        wallet:       '',
        telegramData: '',
        twitterData:  '',
        popupIsOpen:  false,
        loading:      false,
        error:        '',
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setWallet: (state, action) => {
            state.wallet = action.payload;
        },
        setTelegramData: (state, action) => {
            state.telegramData = action.payload;
        },
        setTwitterData: (state, action) => {
            state.twitterData = action.payload;
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
    },
});

export const {
    setUser, setWallet, setTelegramData, setTwitterData,
    setPopupIsOpen, setLoading, setError, clearError,
} = authSlice.actions;

export default authSlice.reducer;
