import { withAuth } from 'next-auth/middleware';

export default withAuth({
    pages: {
        signIn: '/homepage', // Redirect to this page if not authenticated
    },
});

// Specify which routes this middleware applies to
export const config = {
    matcher: ['/dashboard/:path*'], // Protect dashboard route
};
