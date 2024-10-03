import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

// Define the options with correct types for NextAuth
export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // This callback is called during the sign-in process
        async signIn({ user }) {
            await connectToDatabase(); // Ensure MongoDB connection is active

            // Find the user in the database
            const existingUser = await User.findOne({ email: user.email });

            // If the user doesn't exist, create a new one
            if (!existingUser) {
                const newUser = new User({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: "user"
                });
                await newUser.save();
            }

            return true; // Continue with the sign-in
        },
        async redirect({ url, baseUrl }) {
            // Always redirect to the dashboard after successful login
            return baseUrl + '/dashboard';
        },
    },
};

// Export the NextAuth handler with the defined options
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
