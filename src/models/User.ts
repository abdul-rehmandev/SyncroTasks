import mongoose, { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: String
}, { timestamps: true });

// Check if the model exists before creating a new one to prevent overwriting
const User = models.User || model('User', userSchema);

export default User;
