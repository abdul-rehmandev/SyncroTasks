import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Project from '@/models/Project';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import pusher from '@/services/pusherServer';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    // Ensure the user is signed in
    if (!session || !session.user?.email) {
        return NextResponse.redirect('/homepage');
    }

    await connectToDatabase();

    // Extract the projectName and userEmail from the request
    const { projectName, userEmail } = await req.json();

    // Find the project by its name
    const project = await Project.findOne({ projectName });
    if (!project) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // Ensure the user removing another user is the project owner
    if (project.projectOwner.email !== session.user.email) {
        return NextResponse.json({ message: 'Only the project owner can remove users' }, { status: 403 });
    }

    // Remove the user from projectMembers using MongoDB's `pull` method
    await Project.updateOne(
        { projectName },
        { $pull: { projectMembers: { email: userEmail } } }
    );

    const currProject = await Project.findOne({ projectName })
        .populate('todoTasks')  // Populate tasks in the 'To Do' list
        .populate('doingTasks') // Populate tasks in the 'Doing' list
        .populate('doneTasks'); // Populate tasks in the 'Done' list

    await pusher.trigger(`project-delete-${projectName}`, 'project-delete-update', {
        message: `${userEmail} have been removed from ${projectName} project`,
        project: currProject // Send the project name to remove it from the list in real-time
    });

    await pusher.trigger(`project-delete-member-${userEmail}`, 'project-deleted-member', {
        message: `You have been removed from ${projectName} project`,
        projectName // Send the project name to remove it from the list in real-time
    });

    return NextResponse.json({ message: `User ${userEmail} removed from the project` });
}
