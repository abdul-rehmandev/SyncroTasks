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

    // Extract the projectName or projectID from the request
    const { projectName } = await req.json();

    // Find the project by its ID
    const project = await Project.findOne({ projectName });
    if (!project) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // Delete all tasks associated with the project
    await Task.deleteMany({
        _id: {
            $in: [
                ...project.todoTasks, // Assuming todoTasks, doingTasks, doneTasks are arrays of task IDs
                ...project.doingTasks,
                ...project.doneTasks
            ]
        }
    });

    // Delete the project itself
    await Project.findOneAndDelete({ projectName });

    await pusher.trigger(`project-delete-${session.user.email}`, 'project-deleted', {
        message: `Project ${projectName} has been deleted`,
        projectName // Send the project name to remove it from the list in real-time
    });

    if (project.projectMembers && project.projectMembers.length > 0) {
        for (const member of project.projectMembers) {
            if (member.email !== session.user.email) {  // Skip notifying the owner, already notified
                await pusher.trigger(`collab-project-delete-${member.email}`, 'collab-project-deleted', {
                    message: `Project ${projectName} has been deleted`,
                    projectName
                });
            }
        }
    }

    return NextResponse.json({ message: 'Project and associated tasks deleted successfully' });
}
