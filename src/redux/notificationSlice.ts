import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
    title: string;
    message: string;
    from: string;
    createdAt: any;
}

interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload; // Set the full notification list
        },
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.push(action.payload); // Add new notification
        },
    }
});

export const { setNotifications, addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
