"use client"
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BadgePlus, Check, SquarePlus, Trash2, UserPlus } from 'lucide-react'
import ModalBox from '../ModalBox'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Task from '../Task'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import pusherClient from "@/services/pusherClient"


interface ProjectPropTypes {
    projectName: string;
}

const Project = ({ projectName }: ProjectPropTypes) => {

    const { data: session } = useSession();

    const segments = projectName.split('/');
    const lastSegment = segments[segments.length - 1];

    //Get Project Details
    const [project, setProject] = useState<ProjectTypes | undefined>();

    const fetchProject = async () => {
        const response = await fetch('/api/projects/single-project', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName: lastSegment,
            })
        })

        if (response.ok) {
            const data = await response.json();
            setProject(data)
        } else {
            toast.error('Project fetching failed', { id: "1" });
        }
    }


    //Fetch All User
    const [allUsers, setAllUsers] = useState<UserTypes[]>([]);
    const fetchUsers = async () => {
        const response = await fetch('/api/users', { method: "GET" });
        const data = await response.json();

        if (response.ok) {
            setAllUsers(data);
        } else {
            console.error('Failed to fetch users');
        }
    };

    useEffect(() => {
        fetchProject();
        fetchUsers();
    }, [lastSegment])

    //Search Users Functionality
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(allUsers)

    const handleSearch = (e: any) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = allUsers.filter((user) =>
            user.email.toLowerCase().includes(value)
        );

        setFilteredUsers(filtered);
    };

    //Add user to project
    const addUserToProject = async (userEmail: string, userImage: string) => {
        toast.loading(`Adding ${userEmail}`, { id: "1" })
        try {
            const response = await fetch(`/api/projects/add-member`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail, projectName: lastSegment, userImage }),
            });

            if (response.ok) {
                toast.success('User added to the project successfully!', { id: "1" });
            } else {
                const data = await response.json();
                toast.error(data.message, { id: "1" });
            }
        } catch (error: any) {
            toast.error('An error occurred:', { id: "1" });
        }
    };


    //Create new task
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [assignTaskUserEmail, setAssignTaskUserEmail] = useState('');
    const [taskPriority, setTaskPriority] = useState('Low');
    const [taskStatus, setTaskStatus] = useState('Todo');
    const [assignTaskCheck, setAssignTaskCheck] = useState(false)

    const handleMySelfTask = () => {
        setAssignTaskCheck(!assignTaskCheck)
    }

    const newTaskCreation = async () => {
        if (!taskName || !taskDescription || !taskPriority || !taskStatus) return toast.error("All fields required!")
        toast.loading(`Adding Task ${taskName}`, { id: "1" })
        const emailplusimage = assignTaskUserEmail;
        const [email, imageUrl] = emailplusimage.split('+');

        const response = await fetch(`/api/projects/add-task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                taskName,
                taskDescription, // Add image if needed
                taskPriority,
                taskStatus,
                projectName: lastSegment,
                assignTaskUserEmail: assignTaskCheck ? session?.user?.email : email,
                assignTaskUserImage: assignTaskCheck ? session?.user?.image : imageUrl,
                taskOwnerEmail: session?.user?.email
            }),
        });

        if (response.ok) {
            toast.success('Task added successfully', { id: "1" });

        } else {
            const data = await response.json();
            toast.error(data.message, { id: "1" })
        }
    }

    const isUserAlreadyAdded = (email: string) => {
        return project?.projectMembers.some((member) => member.email === email);
    };

    useEffect(() => {
        console.log("useEffectRun")
        const channel = pusherClient.subscribe(`project-updates-${lastSegment}`);

        // Listen for the "member-added" event
        channel.bind('project-updated', (data: any) => {
            setProject(data.project);
            toast.success(data.message)
        });

        return () => {
            pusherClient.unsubscribe(`project-updates-${lastSegment}`)
        }
    }, [project])

    if (!project) return <small>Loading...</small>


    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{lastSegment}</CardTitle>
                    <CardDescription>{project?.projectDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center justify-between'>
                        <div className='w-[27%] flex justify-between'>
                            <div className='flex'>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger><Avatar className='-mr-3'>
                                            <AvatarImage src={project.projectOwner.image} />
                                            <AvatarFallback>ST</AvatarFallback>
                                        </Avatar></TooltipTrigger>
                                        <TooltipContent>
                                            Project Owner : <span>{project.projectOwner.email}</span>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <Avatar className='-mr-3'>
                                    <AvatarImage src="" />
                                    <AvatarFallback><ModalBox btnText={project.projectMembers.length > 0 ? `+${project.projectMembers.length}` : `👀`} modalHeader='Manage and view members' widthSize='w-full'>
                                        {project.projectMembers.length > 0 ? (
                                            project.projectMembers.map((member, index) => (
                                                <div key={index}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="my-2">
                                                                <AvatarImage src={member.image} />
                                                                <AvatarFallback>ST</AvatarFallback>
                                                            </Avatar>
                                                            <span>{member.email}</span>
                                                        </div>
                                                        {project.projectOwner.email == session?.user?.email && <Trash2 className="hover:text-red-500 cursor-pointer" />}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center">
                                                <p>No members found</p>
                                            </div>
                                        )}
                                    </ModalBox></AvatarFallback>
                                </Avatar>
                            </div>
                            {project.projectOwner.email == session?.user?.email && <ModalBox btnText='Invite a member' modalHeader='Invite a new member' widthSize='w-[220px]' icon=<UserPlus /> >
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="email">Enter user email</Label>
                                    <Input type="email" id="email" placeholder="Enter the user email whom you want to add" value={searchTerm} onChange={handleSearch} />
                                </div>
                                <div className='mt-3'>
                                    {filteredUsers.slice(0, 3).map((member, index) => (
                                        <div className='flex items-center justify-between' key={index}>
                                            <div className='flex items-center gap-2'>
                                                <Avatar className='my-2'>
                                                    <AvatarImage src={member.image} />
                                                    <AvatarFallback>ST</AvatarFallback>
                                                </Avatar>
                                                <span>{member.email}</span>
                                            </div>
                                            <Button variant="outline" onClick={() => addUserToProject(member.email, member.image)} disabled={isUserAlreadyAdded(member.email)}> {isUserAlreadyAdded(member.email) ? <Check className='mr-2' /> : <BadgePlus className='mr-2' />}
                                                {isUserAlreadyAdded(member.email) ? 'Added' : 'Add this user'}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </ModalBox>}
                        </div>
                        {project.projectOwner.email == session?.user?.email && <div className='flex items-center gap-2'>
                            <ModalBox btnText='Add Task' modalHeader='Add a new task' widthSize='w-[150px]' icon=<BadgePlus /> >
                                <div className="grid w-full items-center gap-1.5 mb-2">
                                    <Label htmlFor="email">Enter task name</Label>
                                    <Input type="email" id="email" placeholder="Task name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                                </div>
                                <div className="grid w-full gap-1.5 mb-2">
                                    <Label htmlFor="message">Write task description</Label>
                                    <Textarea placeholder="Type your description here." id="message" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                                </div>
                                <div className='mb-2'>
                                    <Label htmlFor="message" className='flex items-center justify-between mb-1'>Assign task <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" onCheckedChange={handleMySelfTask} />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Assign myself
                                        </label>
                                    </div></Label>
                                    {!assignTaskCheck ? (
                                        <Select value={assignTaskUserEmail} onValueChange={setAssignTaskUserEmail}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select user to assign this task" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {project.projectMembers.length > 0 ? (
                                                    project.projectMembers.map((member, index) => (
                                                        <SelectItem value={`${member.email}+${member.image}`} key={index}>{member.email}</SelectItem>
                                                    ))
                                                ) : (
                                                    <div className="text-center">
                                                        <p>No members found</p>
                                                    </div>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    ) : ""}
                                </div>
                                <div className='mb-2'>
                                    <Label htmlFor="message">Task priority</Label>
                                    <Select value={taskPriority} onValueChange={setTaskPriority}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select user to assign this task" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Low" className='text-green-500'>Low</SelectItem>
                                            <SelectItem value="Critical" className='text-orange-500'>Critical</SelectItem>
                                            <SelectItem value="Highest" className='text-red-500'>Highest</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='mb-2'>
                                    <Label htmlFor="message">Task Status</Label>
                                    <Select value={taskStatus} onValueChange={setTaskStatus}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select user to assign this task" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Todo" >Todo</SelectItem>
                                            <SelectItem value="Doing" >Doing</SelectItem>
                                            <SelectItem value="Done" >Done</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button variant="outline" className='w-full' onClick={newTaskCreation}><SquarePlus className="mr-2" />Create this task</Button>
                            </ModalBox>

                            <Button className='bg-red-500 hover:bg-red-500'> <Trash2 className='mr-2' />Delete this project</Button>
                        </div>
                        }
                    </div>
                </CardContent>
            </Card>

            <div className='flex justify-between items-start'>
                <Card className='my-4 w-[33%] max-h-[69vh] tasks-scroll'>
                    <CardHeader>
                        <CardTitle className='flex justify-between items-center'><Badge>Todo</Badge><Badge variant="secondary">Tasks: {project?.todoTasks.length}</Badge></CardTitle>
                    </CardHeader>
                    <CardContent>
                        {project.todoTasks.length > 0 ? (
                            project.todoTasks.map((task: TaskTypes, index) => (
                                <Task key={index} taskName={task.taskName} taskDescription={task.taskDescription} taskStatus={task.taskStatus} taskPriority={task.taskPriority} taskMembers={task.taskMembers} assignTask={task.assignTask} taskOwner={task.taskOwner} projectMembers={project} _id={task._id} projectName={task.projectName} />
                            ))
                        ) : (
                            <small>No task added</small>
                        )}
                    </CardContent>
                </Card>
                <Card className='my-4 w-[33%] max-h-[69vh] tasks-scroll'>
                    <CardHeader>
                        <CardTitle className='flex justify-between items-center'><Badge>Doing</Badge><Badge variant="secondary">Tasks: {project?.doingTasks.length}</Badge></CardTitle>
                    </CardHeader>
                    <CardContent>
                        {project.doingTasks.length > 0 ? (
                            project.doingTasks.map((task: TaskTypes, index) => (
                                <Task key={index} taskName={task.taskName} taskDescription={task.taskDescription} taskStatus={task.taskStatus} taskPriority={task.taskPriority} taskMembers={task.taskMembers} assignTask={task.assignTask} taskOwner={task.taskOwner} projectMembers={project} _id={task._id} projectName={task.projectName} />
                            ))
                        ) : (
                            <small>No task added</small>
                        )}
                    </CardContent>
                </Card>
                <Card className='my-4 w-[33%] max-h-[69vh] tasks-scroll'>
                    <CardHeader>
                        <CardTitle className='flex justify-between items-center'><Badge>Done</Badge><Badge variant="secondary">Tasks: {project?.doneTasks.length}</Badge></CardTitle>
                    </CardHeader>
                    <CardContent>
                        {project.doneTasks.length > 0 ? (
                            project.doneTasks.map((task: TaskTypes, index) => (
                                <Task key={index} taskName={task.taskName} taskDescription={task.taskDescription} taskStatus={task.taskStatus} taskPriority={task.taskPriority} taskMembers={task.taskMembers} assignTask={task.assignTask} taskOwner={task.taskOwner} projectMembers={project} _id={task._id} projectName={task.projectName} />
                            ))
                        ) : (
                            <small>No task added</small>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Project