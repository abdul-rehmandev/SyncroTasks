import React from 'react'
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import GoogleSignInButton from './GoogleSignInButton';
import { Card } from "@/components/ui/card"
import Image from 'next/image';


const HeroSection = () => {
    return (
        <BackgroundBeamsWithCollision>
            <div className='w-[60%] text-center'>
                <div className="relative text-7xl mt-8 font-bold mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                    <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-orange-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                        <span className="">SyncroTasks</span>
                    </div>
                    <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-orange-500 py-4">
                        <span className="">SyncroTasks</span>
                    </div>
                </div>
                <p className='mt-3 my-10'>SyncroTasks is your ultimate real-time task management tool designed for teams and individuals to collaborate effortlessly. Whether you're leading a project or contributing as a team member, SyncroTasks offers seamless project creation, role assignment, and dynamic task management features.</p>
                <GoogleSignInButton btnText='Get Started - Sync Your Tasks, Streamline Your Success.' />
                <h2 className='text-3xl my-10 font-semibold'>How It Works ?</h2>
                <div className='flex justify-center gap-8'>
                    <Card className='p-2 flex justify-center items-center flex-col w-[200px] relative'>
                        <Image src="/Images/step1-new.svg" alt="step1-new" width={100} height={100} style={{ filter: "invert(48%) sepia(88%) saturate(2814%) hue-rotate(360deg) brightness(100%) contrast(101%)" }} />
                        <span className='font-semibold'>Create a New Project</span>
                        <small>Project creation is quick and easy.</small>
                        <div className="absolute -top-11 left-0 text-7xl font-bold mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-orange-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                                <span className="">1</span>
                            </div>
                            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-orange-500 py-4">
                                <span className="">1</span>
                            </div>
                        </div>
                    </Card>
                    <Card className='p-2 flex justify-center items-center flex-col w-[200px] relative'>
                        <Image src="/Images/step2-team.svg" alt="step1-new" width={100} height={100} style={{ filter: "invert(48%) sepia(88%) saturate(2814%) hue-rotate(360deg) brightness(100%) contrast(101%)" }} />
                        <span className='font-semibold'>Add Your Team</span>
                        <small>Encourages the user to add team members.</small>
                        <div className="absolute -top-11 left-0 text-7xl font-bold mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-orange-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                                <span className="">2</span>
                            </div>
                            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-orange-500 py-4">
                                <span className="">2</span>
                            </div>
                        </div>
                    </Card>
                    <Card className='p-2 flex justify-center items-center flex-col w-[200px] relative'>
                        <Image src="/Images/step3-assign.svg" alt="step1-new" width={100} height={100} style={{ filter: "invert(48%) sepia(88%) saturate(2814%) hue-rotate(360deg) brightness(100%) contrast(101%)" }} />
                        <span className='font-semibold'> Assign and Track Tasks</span>
                        <small>Real-time task assignment and tracking.</small>
                        <div className="absolute -top-11 left-0 text-7xl font-bold mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-orange-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                                <span className="">3</span>
                            </div>
                            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-orange-500 py-4">
                                <span className="">3</span>
                            </div>
                        </div>
                    </Card>
                    <Card className='p-2 flex justify-center items-center flex-col w-[200px] relative'>
                        <Image src="/Images/step4-collab.svg" alt="step1-new" width={100} height={100} style={{ filter: "invert(48%) sepia(88%) saturate(2814%) hue-rotate(360deg) brightness(100%) contrast(101%)" }} />
                        <span className='font-semibold'>Collaborate</span>
                        <small>Real-time collaboration features.</small>
                        <div className="absolute -top-11 left-0 text-7xl font-bold mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-orange-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                                <span className="">4</span>
                            </div>
                            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-orange-500 py-4">
                                <span className="">4</span>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
        </BackgroundBeamsWithCollision>
    )
}

export default HeroSection