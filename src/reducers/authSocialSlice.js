// Core
import { createSlice } from '@reduxjs/toolkit';

export const authSocialSlice = createSlice({
    name:         'authSocial',
    initialState: {
        influencer:       '',
        user:             {},
        wallet:           '',
        telegramData:     '',
        telegramDescribe: false,
        twitterData:      {},
        twitterDescribe:  false,
        step:             'one',
        popupIsOpen:      false,
        loading:          false,
        error:            '',
        message:          '',
    },
    reducers: {
        setInfluencer: (state, action) => {
            state.influencer = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setWallet: (state, action) => {
            state.wallet = action.payload;
        },
        setTelegramData: (state, action) => {
            state.telegramData = action.payload;
        },
        setTelegramDescribe: (state, action) => {
            state.telegramDescribe = action.payload;
        },
        setTwitterData: (state, action) => {
            state.twitterData = action.payload;
        },
        setTwitterDescribe: (state, action) => {
            state.twitterDescribe = action.payload;
        },
        setStep: (state, action) => {
            state.step = action.payload;
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
    setInfluencer, setUser, setWallet, setTelegramData, setTwitterData, setPopupIsOpen, setStep,
    setLoading, setError, clearError, setMessage, clearMessage, setTwitterDescribe, setTelegramDescribe,
} = authSocialSlice.actions;

export default authSocialSlice.reducer;
