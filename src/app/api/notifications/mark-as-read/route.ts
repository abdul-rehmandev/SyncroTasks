import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Notification from '@/models/Notification';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Mark a single notification as read
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    // Ensure the user is signed in
    if (!session || !session.user?.email) {
        return NextResponse.redirect('/homepage');
    }

    await connectToDatabase();

    const { notificationId } = await req.json(); // Single notification ID

    // Update the specific notification to mark it as read
    const updatedNotification = await Notification.findOneAndUpdate(
        { _id: notificationId, userEmail: session.user.email },
        { $set: { isRead: true } },
        { new: true } // Return the updated document
    );

    if (!updatedNotification) {
        return NextResponse.json({ message: 'Notification not found or already read' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Notification marked as read', notification: updatedNotification });
}
