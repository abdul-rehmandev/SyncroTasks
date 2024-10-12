import React from 'react'
import {
    Card,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"


interface projectPropTypes {
    project: ProjectTypes
}

const ProjectStatus = ({ project }: projectPropTypes) => {

    const totalTasks = project.todoTasks.length + project.doingTasks.length + project.doneTasks.length;
    const doneTasks = project.doneTasks.length;

    const completionRate = (doneTasks / totalTasks) * 100;

    return (
        <Card className='p-2 flex justify-center items-center w-full h-[120px] my-1'>
            <div className="w-full">
                <h2 style={{ fontSize: "3rem", fontWeight: "bolder", textAlign: "center" }}>{project.projectName}</h2>
                <Progress value={totalTasks === 0 ? 0 : parseFloat(completionRate.toFixed(2))} />
                <small className='text-center w-full text-gray-500'>{totalTasks === 0 ? "0.00" : completionRate.toFixed(2)}% Completed</small>
            </div>
        </Card>
    )
}

export default ProjectStatus