import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Project from '@/models/Project';
import Task from '@/models/Task';  // Assuming Task is a separate model
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import pusher from '@/services/pusherServer';

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);

    // Ensure the user is signed in
    if (!session || !session.user?.email) {
        return NextResponse.redirect('/homepage');
    }

    await connectToDatabase();

    // Extract the task ID and projectName from the request
    const { taskId, projectName, taskName } = await req.json();

    // Find the project by its name
    const project = await Project.findOne({ projectName });
    if (!project) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // Find the task by its ID
    const task = await Task.findById(taskId);
    if (!task) {
        return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    // Ensure the user deleting the task is the task owner or project owner
    if (task.taskOwner.email !== session.user.email && project.projectOwner.email !== session.user.email) {
        return NextResponse.json({ message: 'Only the task or project owner can delete this task' }, { status: 403 });
    }

    // Remove the task from the project arrays (todoTasks, doingTasks, doneTasks)
    await Project.updateOne(
        { projectName },
        {
            $pull: {
                todoTasks: taskId,
                doingTasks: taskId,
                doneTasks: taskId,
            },
        }
    );

    // Delete the task from the Task collection
    await Task.findByIdAndDelete(taskId);

    const currProject = await Project.findOne({ projectName })
        .populate('todoTasks')  // Populate tasks in the 'To Do' list
        .populate('doingTasks') // Populate tasks in the 'Doing' list
        .populate('doneTasks'); // Populate tasks in the 'Done' list

    await pusher.trigger(`project-delete-${projectName}`, 'project-delete-update', {
        message: `${taskName} have been removed from ${projectName} project`,
        project: currProject // Send the project name to remove it from the list in real-time
    });

    return NextResponse.json({ message: `Task deleted successfully` });
}
