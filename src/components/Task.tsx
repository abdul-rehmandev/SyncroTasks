import React from 'react'
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
import { Maximize2, Trash2 } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const Task = ({ taskName, taskDescription, taskStatus, taskPriority, taskMembers, assignTask }: TaskTypes) => {

    return (
        <Card className='my-1'>
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
                        <h2 className='font-bold text-black text-[16px]'>Users</h2>
                        {taskMembers.map((member, index) => (
                            <div key={index}>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <Avatar className='my-2'>
                                            <AvatarImage src={member.image} />
                                            <AvatarFallback>ST</AvatarFallback>
                                        </Avatar>
                                        <span>{member.email}</span>
                                    </div>
                                    <Trash2 className='hover:text-red-500 cursor-pointer' />
                                </div>
                            </div>
                        ))}
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <Avatar className='my-2'>
                                    <AvatarImage src={assignTask.image} />
                                    <AvatarFallback>ST</AvatarFallback>
                                </Avatar>
                                <span>{assignTask.email}</span>
                            </div>
                            <Trash2 className='hover:text-red-500 cursor-pointer' />
                        </div>
                        <Button className='bg-red-500 hover:bg-red-500 mt-10 w-full'> <Trash2 className='mr-2' />Delete this task</Button>
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