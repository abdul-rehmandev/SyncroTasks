import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '@/redux/projectSlice';
import notificationReducer from "@/redux/notificationSlice";

export const store = configureStore({
    reducer: {
        projects: projectReducer,
        notifications: notificationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
