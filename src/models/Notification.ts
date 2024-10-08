import mongoose, { Schema, model, models } from 'mongoose';

const notificationSchema = new Schema({
    userEmail: { type: String, required: true }, // Email of the user to whom the notification is sent
    title: { type: String, required: true },
    message: { type: String, required: true }, // The notification message
    projectName: { type: String }, // Associated project ID
    isRead: { type: Boolean, default: false }, // Track if the notification is read
});

const Notification = models.Notification || model('Notification', notificationSchema);

export default Notification;
