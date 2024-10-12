SyncroTasks - Real-time Collaborative Task Management Tool
SyncroTasks is a real-time collaborative task management tool designed to streamline project management and task tracking for teams. With features like role-based access control, real-time updates, and localization support, SyncroTasks is perfect for teams looking for an efficient and dynamic way to manage their projects and tasks.

## Features
🟢Project Management: Create, manage, and collaborate on projects in real-time.
🟢Task Management: Add, assign, and track tasks with various statuses (To-do, Doing, Done) and priorities.
🟢Real-time Updates: Receive instant updates for project and task changes using Pusher.
🟢Role-based Access Control: Assign roles (owner, member) within each project.
🟢Notifications: Get real-time notifications for project updates and task changes.
🟢Localization Support: Switch between English and Arabic seamlessly.
🟢Authentication: Secure user authentication via Google OAuth.
🟢Progress Tracking: Visual progress bar based on task completion.

## Tech Stack
🟢Frontend: Next.js 14 (App Router), TypeScript, React, Redux Toolkit
🟢Backend: Next.js API Routes, MongoDB
🟢Authentication: NextAuth.js (Google OAuth)
🟢State Management: Redux Toolkit
🟢Real-time Communication: Pusher
🟢Styling: Tailwind CSS, Chakra UI
🟢Deployment: Vercel

## Getting Started
1. Clone the Repository

git clone https://github.com/your-username/syncrotasks.git
cd syncrotasks

2. Install Dependencies
npm install

3. Environment Variables
# MongoDB connection string
MONGODB_URI=<your-mongodb-connection-string>

# NextAuth configuration
NEXTAUTH_SECRET=<your-nextauth-secret>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

# Pusher configuration
PUSHER_APP_ID=<your-pusher-app-id>
PUSHER_KEY=<your-pusher-key>
PUSHER_SECRET=<your-pusher-secret>
PUSHER_CLUSTER=<your-pusher-cluster>

4. Running the Project Locally
npm run dev
