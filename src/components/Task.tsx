"use client"
import React, { useState } from 'react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ModalBox from './ModalBox'
import { BadgePlus, Check, Maximize2, RedoDot, Trash2 } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useSession } from 'next-auth/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from 'react-hot-toast'


const Task = ({ taskName, taskDescription, taskStatus, taskPriority, taskMembers, assignTask, taskOwner, projectMembers, _id }: TaskTypes) => {
    const { data: session } = useSession();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleSearch = (e: any) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        // First, filter users based on search term and exclude assignTask.email
        let filtered = projectMembers.projectMembers
            .filter((user: UserTypes) => user.email.toLowerCase().includes(value))
            .filter((user: UserTypes) => user.email !== assignTask.email); // Exclude assignTask.email

        // Add logged-in user's email if it's not already in the filtered array
        if (session?.user?.email && !filtered.some((user: UserTypes) => user.email === session?.user?.email)) {
            filtered = [...filtered, { email: session.user.email, image: session.user.image || '' }];
        }

        setFilteredUsers(filtered);
    };

    //Add member to task
    const addMemberToTask = async (userEmail: string, userImage: string) => {
        toast.loading("Adding member...", { id: "1" })
        try {
            const response = await fetch(`/api/tasks/add-member`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskId: _id,       // The ID of the task
                    userEmail,    // The email of the user being added
                    userImage,    // The image of the user being added
                }),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message, { id: "1" })
            } else {
                const data = await response.json();
                toast.error(data.message, { id: "1" })
            }
        } catch (error) {
            toast.error('An error occurred while adding the user:', { id: "1" });
        }
    };


    //Update task status

    const updateTaskStatus = async (newStatus: string) => {
        try {
            const response = await fetch(`/api/tasks/update-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskId: _id,
                    newStatus,
                }),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                // Handle task state update here if needed (e.g., reload tasks, update UI, etc.)
                toast.success(updatedTask.message, { id: "1" });
            } else {
                const data = await response.json();
                toast.error(data.message, { id: "1" });
            }
        } catch (error) {
            toast.error("Error updating task status", { id: "1" });
        }
    };


    return (
        <Card className='my-1 relative'>
            {taskStatus != "Done" && <div className='flex justify-center w-full'>
                {taskMembers.some((taskMember) => taskMember.email === session?.user?.email) && <img src="/Images/live-task.gif" alt='user-working' className='absolute' width={22} height={22} />}
                {session?.user?.email === assignTask.email && <img src="/Images/live-task.gif" alt='user-working' className='absolute' width={22} height={22} />}
            </div>}
            <CardHeader>
                <CardTitle className='flex items-center justify-between'><span>{taskName}</span>
                    {taskStatus != "Done" &&
                        <Badge variant={taskPriority == "Low" ? "outline" : taskPriority == "Critical" ? "secondary" : taskPriority == "Highest" ? "destructive" : ""}>{taskPriority}</Badge>
                    }
                </CardTitle>
                <CardDescription>{taskDescription}</CardDescription>
            </CardHeader>
            <CardFooter className='flex justify-between'>
                <div className="expandTask">
                    <ModalBox btnText='Expand task' modalHeader={`${taskName} Details`} widthSize='w-full' icon=<Maximize2 /> >
                        <p>{taskDescription}</p>
                        <Separator className='my-3' />
                        <h2 className='text-black text-[16px]'>Lead Assignee</h2>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <Avatar className='my-2'>
                                    <AvatarImage src={assignTask.image} />
                                    <AvatarFallback>ST</AvatarFallback>
                                </Avatar>
                                <span>{assignTask.email}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                {assignTask.email === session?.user?.email && taskStatus != "Done" && <DropdownMenu>
                                    <DropdownMenuTrigger className='bg-orange-500 text-white py-1 px-2 rounded-full'>Update task status</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {taskStatus == "Todo" ? <DropdownMenuItem onClick={() => updateTaskStatus("Doing")}>Doing</DropdownMenuItem> : taskStatus == "Doing" ? <DropdownMenuItem onClick={() => updateTaskStatus("Done")}>Done</DropdownMenuItem> : ""}
                                    </DropdownMenuContent>
                                </DropdownMenu>}
                                {/* {taskOwner.email === session?.user?.email && <Trash2 className='hover:text-red-500 cursor-pointer' />} */}
                            </div>
                        </div>
                        <div className='flex justify-between items-center mt-5'>
                            <h2 className=' text-black text-[16px] mt-2'>Members</h2>
                            {taskOwner.email === session?.user?.email && taskStatus != "Done" && <ModalBox btnText='Add member(s)' modalHeader='Assign task' widthSize='w-[180px]' icon=<BadgePlus /> >
                                <div>
                                    <div>
                                        <div className="grid w-full items-center gap-1.5">
                                            <Label htmlFor="email">Enter user email</Label>
                                            <Input type="email" id="email" placeholder="Enter the user email whom you want to add" value={searchTerm} onChange={handleSearch} />
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        {filteredUsers.slice(0, 3).map((member: UserTypes, index: number) => {
                                            // Check if the user is already in the taskMembers
                                            const isUserInTask = taskMembers.some((taskMember) => taskMember.email === member.email);
                                            const checkMySelftAssign = member.email === assignTask.email;

                                            return (
                                                <div className='flex items-center justify-between' key={index}>
                                                    <div className='flex items-center gap-2'>
                                                        <Avatar className='my-2'>
                                                            <AvatarImage src={member.image} />
                                                            <AvatarFallback>ST</AvatarFallback>
                                                        </Avatar>
                                                        <span>{member.email}</span>
                                                    </div>
                                                    <Button variant="outline" disabled={isUserInTask || checkMySelftAssign} onClick={() => addMemberToTask(member.email, member.image)}>
                                                        {isUserInTask || checkMySelftAssign ? (
                                                            <>
                                                                <Check className='mr-2' /> Assigned
                                                            </>
                                                        ) : (
                                                            <>
                                                                <RedoDot className='mr-2' /> Assign task
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </ModalBox>}
                        </div>
                        {taskMembers.length > 0 ? (
                            taskMembers.map((member, index) => (
                                <div key={index}>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <Avatar className='my-2'>
                                                <AvatarImage src={member.image} />
                                                <AvatarFallback>ST</AvatarFallback>
                                            </Avatar>
                                            <span>{member.email}</span>
                                        </div>
                                        {taskOwner.email === session?.user?.email && (
                                            <Trash2 className='hover:text-red-500 cursor-pointer' />
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No members found</p>
                        )}
                        {taskOwner.email === session?.user?.email && <Button className='bg-red-500 hover:bg-red-500 mt-10 w-full'> <Trash2 className='mr-2' />Delete this task</Button>}
                    </ModalBox>
                </div>
                <div className="assignedUser">
                    <div className='flex'>
                        <Avatar className='-mr-3'>
                            <AvatarImage src={assignTask.image} />
                            <AvatarFallback>ST</AvatarFallback>
                        </Avatar>
                        {taskMembers.length > 0 && (
                            <Avatar className='-mr-3'>
                                <AvatarImage src="" />
                                <AvatarFallback>+{taskMembers.length}</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                </div>
            </CardFooter>
        </Card>

    )
}

export default Task