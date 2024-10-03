import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

let isConnected = false; // Track the connection status

export async function connectToDatabase() {
    if (isConnected) {
        return; // If already connected, skip re-connecting
    }

    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Failed to connect to MongoDB');
    }
}
