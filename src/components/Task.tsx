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
import { Maximize2, SquarePlus, Trash2 } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const Task = () => {

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
        <Card className='my-1'>
            <CardHeader>
                <CardTitle className='flex items-center justify-between'><span>Fix Navbar Issue</span><Badge variant="destructive">High</Badge>
                </CardTitle>
                <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, ex.</CardDescription>
            </CardHeader>
            <CardFooter className='flex justify-between'>
                <div className="expandTask">
                    <ModalBox btnText='Expand task' modalHeader='Fix Navbar Issue Task Details' widthSize='w-full' icon=<Maximize2 /> >
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sunt, repudiandae dolore officiis aspernatur soluta.</p>
                        <Separator className='my-3' />
                        <h2 className='font-bold text-black text-[16px]'>Users</h2>
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
                    </ModalBox>
                </div>
                <div className="assignedUser">
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
                </div>
            </CardFooter>
        </Card>

    )
}

export default Task