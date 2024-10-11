import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '@/redux/projectSlice';
import notificationReducer from "@/redux/notificationSlice";
import localizationReducer from "@/redux/localizationSlice";

export const store = configureStore({
    reducer: {
        projects: projectReducer,
        notifications: notificationReducer,
        localization: localizationReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
