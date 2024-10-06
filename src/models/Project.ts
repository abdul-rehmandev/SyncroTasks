import mongoose, { Schema, model, models } from 'mongoose';

const projectSchema = new Schema({
    projectName: { type: String, required: true, unique: true },
    projectDescription: { type: String },
    projectOwner: {
        email: { type: String, required: true },
        role: { type: String, default: 'owner' },
        image: { type: String }
    },
    projectMembers: [
        {
            email: { type: String },
            role: { type: String, default: 'member' }, // Role for team members
            image: { type: String }
        },
    ],
    todoTasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }], // Array of task IDs in the ToDo list
    doingTasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }], // Array of task IDs in progress
    doneTasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }], // Array of task IDs completed
    createdAt: { type: Date, default: Date.now },
});

const Project = models.Project || model('Project', projectSchema);

export default Project;
