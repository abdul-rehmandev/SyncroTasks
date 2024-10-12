import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Project from '@/models/Project';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import pusher from '@/services/pusherServer';

// Handle project creation
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    // Ensure the user is signed in
    if (!session || !session.user?.email) {
        return NextResponse.redirect('/homepage');
    }

    await connectToDatabase();

    const { projectName, projectDescription } = await req.json();

    // Create a new project with the current user as the owner, using email
    const newProject = new Project({
        projectName,
        projectDescription,
        projectOwner: {
            email: session?.user?.email, // Store the email of the signed-in user
            role: 'owner',
            image: session?.user?.image
        },
        projectMembers: [], // No team members initially
        todoTasks: [],
        doingTasks: [],
        doneTasks: [],
    });

    await newProject.save();

    const currProject = await Project.find({
        $or: [
            { 'projectOwner.email': session.user.email }, // User is the owner
            { 'projectMembers.email': session.user.email } // User is a member
        ]
    }).sort({ createdAt: -1 });

    // Notify the owner of the project creation
    await pusher.trigger(`all-project-updates-${session.user.email}`, 'all-project-created', {
        message: `${newProject.projectName} has been created successfully.`,
        project: currProject,  // Send the newly created project object
    });

    return NextResponse.json(newProject);
}
