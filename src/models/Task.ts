import mongoose, { Schema, model, models } from 'mongoose';

const taskSchema = new Schema({
    taskName: { type: String, required: true },
    taskDescription: { type: String },
    assignTask: {
        email: { type: String, required: true }, // Email of the user to whom the task is assigned
        image: { type: String } // Image of the user
    },
    taskPriority: { type: String, enum: ['Low', 'Critical', 'Highest'], default: 'Low' }, // Task priority
    taskStatus: { type: String, enum: ['Todo', 'Doing', 'Done'], default: 'Todo' }, // Task status
    projectName: { type: String, required: true }, // Project name to which the task belongs
    taskMembers: [
        {
            email: { type: String }, // Task member's email
            image: { type: String } // Task member's image
        }
    ]
}, { timestamps: true });

// Ensure model is not re-compiled when the app reloads
const Task = models.Task || model('Task', taskSchema);

export default Task;
