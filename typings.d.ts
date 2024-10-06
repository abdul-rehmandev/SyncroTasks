interface ProjectTypes {
    projectName: string;
    projectDescription: string;
    todoTasks: [];
    doingTasks: [];
    doneTasks: [];
    projectOwner: {
        email: string;
        role: string;
        image: string;
    };
    projectMembers: [
        {
            email: string;
            role: string;
            image: string;
        }
    ];
}

interface UserTypes {
    name: string;
    email: string;
    image: string;
}