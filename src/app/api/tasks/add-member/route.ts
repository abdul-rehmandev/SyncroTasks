import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Task from '@/models/Task';

export async function POST(req: Request) {
    const { taskId, userEmail, userImage } = await req.json();

    await connectToDatabase();

    try {
        // Find the task by ID and update the taskMembers array
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                $push: { taskMembers: { email: userEmail, image: userImage } } // Push the new member to taskMembers
            },
            { new: true } // Return the updated task document
        );

        if (!updatedTask) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Member added successfully', task: updatedTask });
    } catch (error) {
        console.error('Error adding member:', error);
        return NextResponse.json({ message: 'Failed to add member' }, { status: 500 });
    }
}
