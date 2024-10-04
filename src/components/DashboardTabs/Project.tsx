import React from 'react'
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
import { BadgePlus, Forward, SquarePlus, Trash2, UserPlus } from 'lucide-react'
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



interface ProjectPropTypes {
    projectName: string;
}

const Project = ({ projectName }: ProjectPropTypes) => {

    const segments = projectName.split('/');
    const lastSegment = segments[segments.length - 1];


    const teamMembers = [
        {
            id: "1",
            image: "https://github.com/shadcn.png",
            email: "mianrehman7495@gmail.com"
        },
        {
            id: "2",
            image: "https://github.com/shadcn.png",
            email: "mianrehman7595@gmail.com"
        }
    ]

    const displayedMembers = teamMembers.slice(0, 1);
    const remainingCount = teamMembers.length - displayedMembers.length;

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{lastSegment}</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, distinctio consequatur necessitatibus suscipit delectus doloribus debitis eligendi non voluptatum blanditiis.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center justify-between'>
                        <div className='w-[28%] flex justify-between'>
                            <div className='flex'>
                                {displayedMembers.map((member, index) => (
                                    <Avatar key={index} className='-mr-3'>
                                        <AvatarImage src={member.image} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                ))}
                                {remainingCount > 0 && (
                                    <Avatar className='-mr-3'>
                                        <AvatarImage src="" />
                                        <AvatarFallback><ModalBox btnText={`+${remainingCount}`} modalHeader='Manage and view members' widthSize='w-full'>
                                            {teamMembers.map((member, index) => (
                                                <div key={index}>
                                                    <div className='flex items-center justify-between'>
                                                        <div className='flex items-center gap-2'>
                                                            <Avatar className='my-2'>
                                                                <AvatarImage src={member.image} />
                                                                <AvatarFallback>CN</AvatarFallback>
                                                            </Avatar>
                                                            <span>{member.email}</span>
                                                        </div>
                                                        <Trash2 className='hover:text-red-500 cursor-pointer' />
                                                    </div>
                                                </div>
                                            ))}
                                        </ModalBox></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                            <ModalBox btnText='Invite a member' modalHeader='Invite a new member' widthSize='w-[220px]' icon=<UserPlus /> >
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="email">Enter user email</Label>
                                    <Input type="email" id="email" placeholder="Enter the user email whom you want to add" />
                                </div>
                                <div className='mt-3'>
                                    {teamMembers.map((member, index) => (
                                        <div className='flex items-center justify-between' key={index}>
                                            <div className='flex items-center gap-2'>
                                                <Avatar className='my-2'>
                                                    <AvatarImage src={member.image} />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <span>{member.email}</span>
                                            </div>
                                            <Button variant="outline"><BadgePlus className='mr-2' />Add this user</Button>
                                        </div>
                                    ))}
                                </div>
                            </ModalBox>
                        </div>
                        <div className='flex items-center gap-2'>
                            <ModalBox btnText='Add Task' modalHeader='Add a new task' widthSize='w-[150px]' icon=<BadgePlus /> >
                                <div className="grid w-full items-center gap-1.5 mb-2">
                                    <Label htmlFor="email">Enter task name</Label>
                                    <Input type="email" id="email" placeholder="Task name" />
                                </div>
                                <div className="grid w-full gap-1.5 mb-2">
                                    <Label htmlFor="message">Write task description</Label>
                                    <Textarea placeholder="Type your description here." id="message" />
                                </div>
                                <div className='mb-2'>
                                    <Label htmlFor="message">Assign task</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select user to assign this task" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {displayedMembers.map((member, index) => (
                                                <SelectItem value={member.email} key={index}>{member.email}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='mb-2'>
                                    <Label htmlFor="message">Task priority</Label>
                                    <Select>
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
                                    <Select>
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
                                <Button variant="outline" className='w-full'><SquarePlus className="mr-2" />Create this task</Button>
                            </ModalBox>
                            <ModalBox btnText='Assign Task' modalHeader='Assign task to user' widthSize='w-[160px]' icon=<Forward /> >
                                {teamMembers.map((member, index) => (
                                    <div className='flex items-center justify-between gap-5' key={index}>
                                        <div className='flex items-center gap-2'>
                                            <Avatar className='my-2'>
                                                <AvatarImage src={member.image} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <span>{member.email}</span>
                                        </div>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select task to assign" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Fix Navbar Issue" >Fix Navbar Issue</SelectItem>
                                                <SelectItem value="Api calling" >Api calling</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ))}
                            </ModalBox>
                            <Button className='bg-red-500 hover:bg-red-500'> <Trash2 className='mr-2' /> Delete this project</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className='flex justify-between items-start'>
                <Card className='my-4 w-[33%] max-h-[69vh] tasks-scroll'>
                    <CardHeader>
                        <CardTitle className='flex justify-between items-center'><Badge>Todo</Badge><Badge variant="secondary">Tasks: 4</Badge></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                    </CardContent>
                </Card>
                <Card className='my-4 w-[33%] max-h-[69vh]'>
                    <CardHeader>
                        <CardTitle className='flex justify-between items-center'><Badge>Doing</Badge><Badge variant="secondary">Tasks: 0</Badge></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Task />
                    </CardContent>
                </Card>
                <Card className='my-4 w-[33%] max-h-[69vh]'>
                    <CardHeader>
                        <CardTitle className='flex justify-between items-center'><Badge>Done</Badge><Badge variant="secondary">Tasks: 0</Badge></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Task />
                        <Task />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Project