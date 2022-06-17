// Core
import { configureStore } from '@reduxjs/toolkit';
// Reducers
import authReducer from '../reducers/authSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
    },
});
