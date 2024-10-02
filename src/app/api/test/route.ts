import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
    const db = await connectToDatabase();
    const testCollection = db.collection('test');
    const data = await testCollection.find({}).toArray();
    return NextResponse.json({ data });
}
