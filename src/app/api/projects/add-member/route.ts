import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Project from '@/models/Project';
import User from '@/models/User';

// Add a user to a project
export async function POST(req: Request) {
    await connectToDatabase();

    const { userEmail, userImage, projectName } = await req.json(); // Get the user's email from the request body

    // Find the project by ID
    const project = await Project.findOne({ projectName });

    if (!project) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // Find the user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if the user is already a member of the project
    const isUserAlreadyInProject = project.projectMembers.some(
        (member: any) => member.email === user.email
    );

    if (isUserAlreadyInProject) {
        return NextResponse.json({ message: 'User is already a member of this project' }, { status: 400 });
    }

    // Add the user to the projectMembers array
    project.projectMembers.push({
        email: user.email,
        role: 'member',
        image: userImage
    });

    await project.save();

    return NextResponse.json({ message: 'User added successfully' });
}
