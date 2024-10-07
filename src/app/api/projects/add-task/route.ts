import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Project from '@/models/Project';
import Task from '@/models/Task';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Add a task to a project
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    // Ensure the user is signed in
    if (!session || !session.user?.email) {
        return NextResponse.redirect('/homepage');
    }

    await connectToDatabase();

    const { taskName, taskDescription, assignTaskUserEmail, assignTaskUserImage, taskPriority, taskStatus, projectName } = await req.json();

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

    return NextResponse.json(newTask);
}
