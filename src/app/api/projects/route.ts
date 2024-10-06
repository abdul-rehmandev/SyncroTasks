import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Project from '@/models/Project';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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

    return NextResponse.json(newProject);
}
