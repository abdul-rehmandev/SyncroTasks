import { withAuth } from 'next-auth/middleware';

// Apply middleware to protect certain routes
export default withAuth({
    pages: {
        signIn: '/homepage', // Redirect to this page if not authenticated
    },
});

// Specify which routes this middleware applies to
export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*'], // Protect dashboard and admin routes
};
