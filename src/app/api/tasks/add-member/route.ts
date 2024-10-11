import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Task from '@/models/Task';
import Project from '@/models/Project';
import pusher from '@/services/pusherServer';
import Notification from '@/models/Notification';

export async function POST(req: Request) {
    const { taskId, userEmail, userImage, projectName } = await req.json();

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

        const notification = new Notification({
            userEmail,
            title: `Added to ${projectName} project.`,
            message: `You have been added to the task : "${updatedTask.taskName}".`,
            from: projectName
        })

        await notification.save();

        const currProject = await Project.findOne({ projectName })
            .populate('todoTasks')  // Populate tasks in the 'To Do' list
            .populate('doingTasks') // Populate tasks in the 'Doing' list
            .populate('doneTasks'); // Populate tasks in the 'Done' list

        await pusher.trigger(`project-updates-${projectName}`, 'project-updated', {
            message: `${userEmail} added as a member in ${updatedTask.taskName} Task`,
            project: currProject,  // Send the updated project object
        });

        return NextResponse.json({ message: 'Member added successfully', task: updatedTask });
    } catch (error) {
        console.error('Error adding member:', error);
        return NextResponse.json({ message: 'Failed to add member' }, { status: 500 });
    }
}
