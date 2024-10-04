import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import { Toaster } from 'react-hot-toast';


const inter = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SyncroTasks - Sync Your Tasks, Streamline Your Success.",
  description: "SyncroTasks is a powerful real-time collaborative task management tool designed to streamline team workflows and boost productivity. Whether you're managing small projects or large-scale operations, SyncroTasks helps teams collaborate seamlessly, track tasks in real time, and stay on top of deadlines. With features like task prioritization, secure authentication, real-time updates, and support for multiple languages (including English and Arabic), SyncroTasks ensures your team stays organized and efficient. Built with modern web technologies like Next.js and Socket.io, SyncroTasks delivers a fast, responsive, and engaging user experience. Empower your team to collaborate better and achieve more with SyncroTasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <AuthSessionProvider>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
