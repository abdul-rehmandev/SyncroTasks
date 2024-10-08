import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Task from '@/models/Task';
import Project from '@/models/Project';

export async function POST(req: Request) {
    const { taskId, newStatus } = await req.json();

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
        });

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

        return NextResponse.json({ message: 'Task status updated', task: updatedTask });
    } catch (error) {
        console.error('Error updating task status:', error);
        return NextResponse.json({ message: 'Failed to update task status' }, { status: 500 });
    }
}
