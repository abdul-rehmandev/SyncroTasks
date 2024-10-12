import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Project from '@/models/Project';
import Task from '@/models/Task';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import pusher from '@/services/pusherServer';
import Notification from '@/models/Notification';

// Add a task to a project
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    // Ensure the user is signed in
    if (!session || !session.user?.email) {
        return NextResponse.redirect('/homepage');
    }

    await connectToDatabase();

    const { taskName, taskDescription, assignTaskUserEmail, assignTaskUserImage, taskPriority, taskStatus, projectName, taskOwnerEmail } = await req.json();

    // Create a new task
    const newTask = new Task({
        taskName,
        taskDescription,
        assignTask: {
            email: assignTaskUserEmail,
            image: assignTaskUserImage
        },
        taskPriority,
        taskStatus,
        projectName,
        taskOwner: {
            email: taskOwnerEmail
        }
    });

    await newTask.save();

    // Find the project by ID and push the task ID into the corresponding array
    const project = await Project.findOne({ projectName });
    if (!project) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // Add task ID to the appropriate array based on task status
    if (taskStatus === 'Todo') {
        project.todoTasks.push(newTask._id);
    } else if (taskStatus === 'Doing') {
        project.doingTasks.push(newTask._id);
    } else if (taskStatus === 'Done') {
        project.doneTasks.push(newTask._id);
    }

    await project.save(); // Save the updated project

    const notification = new Notification({
        userEmail: assignTaskUserEmail,
        title: `Added to ${projectName} project.`,
        message: `You have been added to the task : "${taskName}".`,
        from: projectName,
    })

    await notification.save();

    const currProject = await Project.findOne({ projectName })
        .populate('todoTasks')  // Populate tasks in the 'To Do' list
        .populate('doingTasks') // Populate tasks in the 'Doing' list
        .populate('doneTasks'); // Populate tasks in the 'Done' list


    await pusher.trigger(`project-updates-${projectName}`, 'project-updated', {
        message: `${taskName} task added in ${projectName}`,
        project: currProject,  // Send the updated project object
    });

    await pusher.trigger(`notifications-${assignTaskUserEmail}`, 'member-added', {
        title: `Added to ${taskName} task.`,
        message: `You have been added to a new task : "${taskName}".`,
        from: projectName,
        createdAt: notification.createdAt
    })

    return NextResponse.json(newTask);
}
