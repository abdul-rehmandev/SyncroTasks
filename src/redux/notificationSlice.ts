import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
    _id: string;
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
        markNotificationAsRead: (state, action: PayloadAction<string>) => {
            // Update only the specific notification's isRead status
            state.notifications = state.notifications.map((notification) => {
                if (notification._id === action.payload) {
                    return { ...notification, isRead: true };
                }
                return notification;
            });
        },
    }
});

export const { setNotifications, addNotification, markNotificationAsRead } = notificationSlice.actions;

export default notificationSlice.reducer;
