import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Task from '@/models/Task';
import Project from '@/models/Project';
import pusher from '@/services/pusherServer';

export async function POST(req: Request) {
    const { taskId, newStatus, projectName, taskName } = await req.json();

    await connectToDatabase();

    try {
        // Update the task status in the Task model
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { taskStatus: newStatus },  // Update task status
            { new: true }  // Return the updated document
        );

        if (!updatedTask) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }

        // Find the project that contains this task
        const project = await Project.findOne({
            $or: [
                { todoTasks: taskId },
                { doingTasks: taskId },
                { doneTasks: taskId }
            ]
        })

        if (!project) {
            return NextResponse.json({ message: 'Project not found' }, { status: 404 });
        }

        // Remove the task ID from the current array and add it to the target array
        if (updatedTask.taskStatus === 'Doing') {
            project.todoTasks.pull(taskId); // Remove from todoTasks
            project.doingTasks.push(taskId); // Add to doingTasks
        } else if (updatedTask.taskStatus === 'Done') {
            project.doingTasks.pull(taskId); // Remove from doingTasks
            project.doneTasks.push(taskId); // Add to doneTasks
        }

        // Save the updated project
        await project.save();

        const currProject = await Project.findOne({ projectName })
            .populate('todoTasks')  // Populate tasks in the 'To Do' list
            .populate('doingTasks') // Populate tasks in the 'Doing' list
            .populate('doneTasks'); // Populate tasks in the 'Done' list

        await pusher.trigger(`project-updates-${project.projectName}`, 'project-updated', {
            message: `${taskName} task status updated to "${newStatus}`,
            project: currProject,  // Send the updated project object
        });


        return NextResponse.json({ message: 'Task status updated', task: updatedTask });
    } catch (error) {
        console.error('Error updating task status:', error);
        return NextResponse.json({ message: 'Failed to update task status' }, { status: 500 });
    }
}
