import { createSlice } from "@reduxjs/toolkit";
import { archiveTask, deArchiveTask, deleteTask, getAllTask, saveTask } from "../../actions/task";
import { ITaskState } from "../../interface/task";



const initialState: ITaskState = {
    tasks: [],
    progress: "",
    success: false,
    error: {
        code: 0,
        details: "",
        validationErrors: {},
        message: "",
    },
    searchName: ""
};
const getAllSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        resetProgress(state) {
            state.progress = "";
        },
        setSearchName(state, action) {
            state.searchName = action.payload.searchName;
        }


    },
    extraReducers: (builder) => {
        builder.addCase(getAllTask.pending, (state, action) => {
            state.progress = "pending";
        });
        builder.addCase(getAllTask.fulfilled, (state, action) => {
            state.tasks = action.payload.result;
        });
        builder.addCase(saveTask.pending, (state, action) => {
            state.progress = "pending";
        });
        builder.addCase(saveTask.fulfilled, (state, action) => {
            const findOneTask = state.tasks.find((task) =>
                (task.id === action.payload.result.id)
            );
            if (findOneTask) {
                state.tasks = state.tasks.map((item) => {
                    if (item.id === action.payload.result.id) {
                        item.name = action.payload.result.name;
                        item.type = action.payload.result.type;
                    }
                    return item;
                });
            }
            else state.tasks.push(action.payload.result);
        });
        builder.addCase(archiveTask.fulfilled, (state, action) => {
            state.progress = "done";
            if (action.payload.success === true) {
                state.tasks = state.tasks.map((task) => {
                    if (task.id === action.payload.id) {
                        task.isDeleted = true;
                    }
                    return task;
                });
            } else {
                state.error.message = action.payload.error.message;
            }
        });
        builder.addCase(deArchiveTask.fulfilled, (state, action) => {
            state.progress = "done";
            if (action.payload.id) {
                state.tasks = state.tasks.map((task) => {
                    if (task.id === action.payload.id) {
                        task.isDeleted = false;
                    }
                    return task;
                });
            }
        });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.progress = "done";
            if (action.payload.success === true) {
                state.tasks = state.tasks.filter(
                    (task) => task.id !== action.payload.id
                );
            } else {
                state.error.message = action.payload.error.message;
            }
        });

    }
})
export const { resetProgress, setSearchName } =
    getAllSlice.actions;
export default getAllSlice.reducer;