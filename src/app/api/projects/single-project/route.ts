import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Project from '@/models/Project';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Task from '@/models/Task';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    // Ensure the user is signed in
    if (!session || !session.user?.email) {
        return NextResponse.redirect('/homepage');
    }

    await connectToDatabase();

    const { projectName } = await req.json();

    await Task;

    const project = await Project.findOne({ projectName })
        .populate('todoTasks')  // Populate tasks in the 'To Do' list
        .populate('doingTasks') // Populate tasks in the 'Doing' list
        .populate('doneTasks'); // Populate tasks in the 'Done' list

    if (!project) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
}
