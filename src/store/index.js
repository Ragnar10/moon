// Core
import { configureStore } from '@reduxjs/toolkit';
// Reducers
import authSocialReducer from '../reducers/authSocialSlice';
import authReducer from '../reducers/authSlice';

export default configureStore({
    reducer: {
        authSocial: authSocialReducer,
        auth:       authReducer,
    },
});
