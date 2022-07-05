// Core
import { configureStore } from '@reduxjs/toolkit';
// Reducers
import authReducer from '../reducers/authSlice';
import signupReducer from '../reducers/signupSlice';

export default configureStore({
    reducer: {
        auth:   authReducer,
        signup: signupReducer,
    },
});
