import mongoose, { Schema, model, models } from 'mongoose';

const notificationSchema = new Schema({
    userEmail: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true }, // The notification message
    from: { type: String },
    isRead: { type: Boolean, default: false }, // Track if the notification is read
}, { timestamps: true });

const Notification = models.Notification || model('Notification', notificationSchema);

export default Notification;
