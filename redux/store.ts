import { configureStore } from "@reduxjs/toolkit";
import { retoolApi } from "./hooks";
import theme from "./themeSlice";
import userProfileReducer from './userProfileSlice';
import loginStateReducer from './loginSlice';
import listingReducer from './listingSlice';
import reportStateReducer from './reportsSlice';

export const store = configureStore({
    reducer: {
        theme,
        userProfile: userProfileReducer,
        isLoggedIn:loginStateReducer,
        reports:reportStateReducer,
        listing:listingReducer,
        [retoolApi.reducerPath]: retoolApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(retoolApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;