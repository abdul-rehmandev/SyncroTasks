import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
    projectNames: string[];
}

const initialState: ProjectState = {
    projectNames: [],
};

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addCollabProject: (state, action: PayloadAction<string>) => {
            state.projectNames.push(action.payload);
        },
        setCollabProjects: (state, action: PayloadAction<string[]>) => {
            state.projectNames = action.payload;
        },
        deleteCollabProject: (state, action: PayloadAction<string>) => {
            // Remove the project from the projectNames array by filtering it out
            state.projectNames = state.projectNames.filter(
                (projectName) => projectName !== action.payload
            );
        },
    }
});

export const { addCollabProject, setCollabProjects, deleteCollabProject } = projectSlice.actions;

export default projectSlice.reducer;
