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
import { BadgePlus } from 'lucide-react'




interface ProjectPropTypes {
    projectName: string;
}

const Project = ({ projectName }: ProjectPropTypes) => {

    const segments = projectName.split('/');
    const lastSegment = segments[segments.length - 1];


    const teamMembers = [
        {
            id: "1",
            image: "https://github.com/shadcn.png"
        },
        {
            id: "2",
            image: "https://github.com/shadcn.png"
        },
        {
            id: "3",
            image: "https://github.com/shadcn.png"
        },
        {
            id: "4",
            image: "https://github.com/shadcn.png"
        },
        {
            id: "5",
            image: "https://github.com/shadcn.png"
        }
    ]

    const displayedMembers = teamMembers.slice(0, 3);
    const remainingCount = teamMembers.length - displayedMembers.length;

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{lastSegment}</CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, distinctio consequatur necessitatibus suscipit delectus doloribus debitis eligendi non voluptatum blanditiis.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className='w-[20%] flex justify-between'>
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
                                        <AvatarFallback>+{remainingCount}</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                            <Button>Invite</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className='flex justify-between items-start'>
                <Card className='my-4 w-[33%] max-h-[69vh]'>
                    <CardHeader>
                        <CardTitle className='flex justify-between items-center'><Badge>Todo</Badge> <Button variant="outline"><BadgePlus className='mr-2' />Add Task</Button></CardTitle>
                    </CardHeader>
                    <CardContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, praesentium.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quam maxime magnam et unde rem voluptatem tenetur odit, odio suscipit? Voluptatibus explicabo nemo dignissimos nihil cupiditate. Voluptates perspiciatis unde enim.
                    </CardContent>
                </Card>
                <Card className='my-4 w-[33%] max-h-[69vh]'>
                    <CardHeader>
                        <CardTitle className='flex justify-between items-center'><Badge>Doing</Badge> <Button variant="outline"><BadgePlus className='mr-2' />Add Task</Button></CardTitle>
                    </CardHeader>
                    <CardContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nulla deserunt asperiores, sapiente quam aperiam temporibus soluta, ipsum corporis adipisci doloremque assumenda sit ipsam ad eaque ullam voluptates perferendis corrupti commodi delectus? Reiciendis minus, praesentium temporibus eum modi, numquam qui porro odio totam, vel amet deserunt! Suscipit, molestias laborum! Vel vero est obcaecati porro. Nam, suscipit earum saepe nemo perferendis corrupti, error rerum iusto labore dicta dolores explicabo. Voluptate, facilis.
                    </CardContent>
                </Card>
                <Card className='my-4 w-[33%] max-h-[69vh]'>
                    <CardHeader>
                        <CardTitle className='flex justify-between items-center'><Badge>Done</Badge> <Button variant="outline"><BadgePlus className='mr-2' />Add Task</Button></CardTitle>
                    </CardHeader>
                    <CardContent>
                        A
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Project