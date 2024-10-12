interface ProjectTypes {
    _id: string;
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

interface TaskTypes {
    _id: string;
    taskName: string;
    taskDescription: string;
    assignTask: {
        email: string;
        image: string;
    };
    taskPriority: string;
    taskStatus: string;
    projectName?: string;
    taskMembers: [
        {
            email: string;
            image: string;
        }
    ],
    createdAt?: any;
    taskOwner: {
        email: string;
    },
    projectMembers: any,
    createdAt: any
}

interface NotificationTypes {
    _id: string;
    message: string;
    title: string;
    from: string;
    createdAt: any;
    isRead: boolean;
}