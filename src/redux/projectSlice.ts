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
    }
});

export const { addCollabProject, setCollabProjects } = projectSlice.actions;

export default projectSlice.reducer;
