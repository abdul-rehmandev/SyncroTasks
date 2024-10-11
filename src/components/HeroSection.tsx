"use client"
import React from 'react'
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import GoogleSignInButton from './GoogleSignInButton';
import { Card } from "@/components/ui/card"
import Image from 'next/image';
import { useSelector } from 'react-redux';
import LanguageSwitcher from './LanguageSwitcher';


const HeroSection = () => {

    const translations = useSelector((state: any) => state.localization.translations);

    return (
        <div className='relative'>
            <div className='absolute z-50 right-5 top-3'>
                <LanguageSwitcher />
            </div>
            <BackgroundBeamsWithCollision>
                <div className='w-[60%] text-center'>
                    <div className="relative text-7xl mt-8 font-bold mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                        <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-orange-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                            <span className="">{translations.appName}</span>
                        </div>
                        <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-orange-500 py-4">
                            <span className="">{translations.appName}</span>
                        </div>
                    </div>
                    <p className='mt-3 my-10'>{translations.heroSectionDescription}</p>
                    <GoogleSignInButton btnText={translations.heroSectionBtn} />
                    <h2 className='text-3xl my-10 font-semibold'>{translations.sectionHeading}</h2>
                    <div className='flex justify-center gap-8'>
                        <Card className='p-2 flex justify-center items-center flex-col w-[200px] relative'>
                            <Image src="/Images/step1-new.svg" alt="step1-new" width={100} height={100} style={{ filter: "invert(48%) sepia(88%) saturate(2814%) hue-rotate(360deg) brightness(100%) contrast(101%)" }} />
                            <span className='font-semibold'>{translations.step1}</span>
                            <small>{translations.step1Description}</small>
                            <div className="absolute -top-11 left-0 text-7xl font-bold mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-orange-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                                    <span className="">{translations.step1Count}</span>
                                </div>
                                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-orange-500 py-4">
                                    <span className="">{translations.step1Count}</span>
                                </div>
                            </div>
                        </Card>
                        <Card className='p-2 flex justify-center items-center flex-col w-[200px] relative'>
                            <Image src="/Images/step2-team.svg" alt="step1-new" width={100} height={100} style={{ filter: "invert(48%) sepia(88%) saturate(2814%) hue-rotate(360deg) brightness(100%) contrast(101%)" }} />
                            <span className='font-semibold'>{translations.step2}</span>
                            <small>{translations.step2Description}</small>
                            <div className="absolute -top-11 left-0 text-7xl font-bold mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-orange-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                                    <span className="">{translations.step2Count}</span>
                                </div>
                                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-orange-500 py-4">
                                    <span className="">{translations.step2Count}</span>
                                </div>
                            </div>
                        </Card>
                        <Card className='p-2 flex justify-center items-center flex-col w-[200px] relative'>
                            <Image src="/Images/step3-assign.svg" alt="step1-new" width={100} height={100} style={{ filter: "invert(48%) sepia(88%) saturate(2814%) hue-rotate(360deg) brightness(100%) contrast(101%)" }} />
                            <span className='font-semibold'> {translations.step3}</span>
                            <small>{translations.step3Description}</small>
                            <div className="absolute -top-11 left-0 text-7xl font-bold mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-orange-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                                    <span className="">{translations.step3Count}</span>
                                </div>
                                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-orange-500 py-4">
                                    <span className="">{translations.step3Count}</span>
                                </div>
                            </div>
                        </Card>
                        <Card className='p-2 flex justify-center items-center flex-col w-[200px] relative'>
                            <Image src="/Images/step4-collab.svg" alt="step1-new" width={100} height={100} style={{ filter: "invert(48%) sepia(88%) saturate(2814%) hue-rotate(360deg) brightness(100%) contrast(101%)" }} />
                            <span className='font-semibold'>{translations.step4}</span>
                            <small>{translations.step4Description}</small>
                            <div className="absolute -top-11 left-0 text-7xl font-bold mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-orange-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                                    <span className="">{translations.step4Count}</span>
                                </div>
                                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-orange-500 py-4">
                                    <span className="">{translations.step4Count}</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </BackgroundBeamsWithCollision>
        </div>
    )
}

export default HeroSection