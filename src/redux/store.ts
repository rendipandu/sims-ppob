import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import bannerReducer from './slices/bannerSlice';
import serviceReducer from './slices/serviceSlice';
import balanceReducer from './slices/balanceSlice';
import transactionReducer from './slices/transactionSlice';
import transactionHistoryReducer from './slices/transactionHistorySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        banner: bannerReducer,
        service: serviceReducer,
        balance: balanceReducer,
        transaction: transactionReducer,
        transactionHistory: transactionHistoryReducer,
    },
});

// RootState and AppDispatch types for Redux hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;