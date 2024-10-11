import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Task from '@/models/Task';  // Assuming Task is a separate model
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import pusher from '@/services/pusherServer';
import Project from '@/models/Project';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    // Ensure the user is signed in
    if (!session || !session.user?.email) {
        return NextResponse.redirect('/homepage');
    }

    await connectToDatabase();

    // Extract the task ID and userEmail from the request
    const { taskId, userEmail, projectName } = await req.json();

    // Find the task by its ID
    const task = await Task.findById(taskId);
    if (!task) {
        return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    // Ensure the user removing another user is the task owner or someone with permission
    if (task.taskOwner.email !== session.user.email) {
        return NextResponse.json({ message: 'Only the task owner can remove users' }, { status: 403 });
    }

    // Remove the user from taskMembers using MongoDB's `pull` method
    await Task.updateOne(
        { _id: taskId },
        { $pull: { taskMembers: { email: userEmail } } }
    );

    const currProject = await Project.findOne({ projectName })
        .populate('todoTasks')  // Populate tasks in the 'To Do' list
        .populate('doingTasks') // Populate tasks in the 'Doing' list
        .populate('doneTasks'); // Populate tasks in the 'Done' list

    await pusher.trigger(`project-delete-${projectName}`, 'project-delete-update', {
        message: `${userEmail} have been removed from ${projectName} project`,
        project: currProject // Send the project name to remove it from the list in real-time
    });

    return NextResponse.json({ message: `User ${userEmail} removed from the task` });
}
