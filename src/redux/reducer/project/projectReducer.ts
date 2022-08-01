import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../api/project/type";
import { ITaskReq } from "../../../api/task/type";
import { activeProject, deleteProject, getAllCustomer, getAllProject, getProject, getUserNotPagging, inactiveProject, saveClient, saveProject } from "../../actions/project";
import { getAllTask } from "../../actions/task";
import { IProjectState } from "../../interface/project";

const initialState: IProjectState = {
  allProjects: [],
  customers: [],
  progress: "",
  users: [],
  filteredUsers: [],
  selectedMembers: [],
  searchName: "",
  tasks: [],
  selectTasks: [],
  filterTasks: [],
  projects: [],
  success: false,
  project: {
    name: "",
    code: "",
    status: 0,
    timeStart: "",
    timeEnd: "",
    note: "",
    projectType: 0,
    customerId: 0,
    tasks: [
      {
        taskId: 0,
        billable: false,
        id: 0,
      },
    ],
    users: [
      {
        userId: 0,
        type: 0,
        id: 0,
      },
    ],
    projectTargetUsers: [
      {
        userId: 0,
        roleName: "",
        id: 0,
      },
    ],
    isAllUserBelongTo: false,
    id: 0,
  },
};

const ProjectSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    resetProgress: (state) => {
      state.progress = "";
    },
    pushMember: (state, action: PayloadAction<IUser>) => {
      state.selectedMembers.push(action.payload);
      state.filteredUsers = state.filteredUsers.filter(
        (user) => user.id !== action.payload.id
      );
    },
    filter: (state, action) => {
      state.filteredUsers = state.users.filter(
        (user) =>
          (action.payload.branch === "All" ||
            user.branch === action.payload.branch) &&
          (action.payload.level === "All" ||
            user.level === action.payload.level) &&
          (action.payload.type === "All" || user.type === action.payload.type)
      );
    },
    setSearchName: (state, action) => {
      state.searchName = action.payload.searchName;
    },
    removeMember: (state, action: PayloadAction<IUser>) => {
      state.selectedMembers = state.selectedMembers.filter(
        (user) => user.id !== action.payload.id
      );
      state.filteredUsers.push(action.payload);
    },
    pushTask: (state, action: PayloadAction<ITaskReq>) => {
      state.selectTasks.push(action.payload);
      state.filterTasks = state.filterTasks.filter(
        (task) => task.id !== action.payload.id
      );
    },
    removeTask: (state, action) => {
      state.selectTasks = state.selectTasks.filter(
        (task) => task.id !== action.payload.id
      )
      state.filterTasks.push(action.payload);

    },
    updateBillable: (state, action: PayloadAction<ITaskReq>) => {
      state.selectTasks = state.selectTasks.map((task) => {
        if (task.id === action.payload.id) {
          task.billable = action.payload.billable;
        }
        return task;
      });
    },

  },
  extraReducers: (builder) => {
    builder.addCase(getAllProject.pending, (state, action) => {
      state.progress = "pending";
    });
    builder.addCase(getAllProject.fulfilled, (state, action) => {
      state.allProjects = action.payload.result;

    });
    builder.addCase(getAllProject.rejected, (state, action) => {
      state.progress = "error";
    });
   
    builder.addCase(getAllCustomer.pending, (state, action) => {
      state.progress = "pending";
    });
    builder.addCase(getAllCustomer.fulfilled, (state, action) => {
      console.log(action.payload)
      state.customers = action.payload.result;
    });
    builder.addCase(getAllCustomer.rejected, (state, action) => {
      state.progress = "error";
    });

    builder.addCase(saveClient.pending, (state, action) => {
      state.progress = "pending";
    });
    builder.addCase(saveClient.fulfilled, (state, action) => {
      // state.customers = action.payload.result;
      state.customers.push(action.payload.result);
    });
    builder.addCase(saveClient.rejected, (state, action) => {
      state.progress = "error";
    });


    builder.addCase(getUserNotPagging.pending, (state, action) => {
      state.progress = "pending";
    });
    builder.addCase(getUserNotPagging.fulfilled, (state, action) => {
      state.users = action.payload.result;
      state.filteredUsers = action.payload.result;
    });
    builder.addCase(getUserNotPagging.rejected, (state, action) => {
      state.progress = "error";
    });
    builder.addCase(getAllTask.fulfilled, (state, action) => {
      state.tasks = action.payload.result;
      state.filterTasks = action.payload.result;
    });
    builder.addCase(saveProject.fulfilled, (state, action) => {
      state.progress = "done";
      if (
        state.projects.find(
          (project) => project.id === action.payload.result.id
        )
      ) {
        state.projects = state.projects.map((project) => {
          if (project.id === action.payload.result.id) {
            project.customerId = action.payload.result.customerId;
            project.name = action.payload.result.name;
            project.code = action.payload.result.code;
            project.timeStart = action.payload.result.timeStart;
            project.timeEnd = action.payload.result.timeEnd;
            project.note = action.payload.result.note;
            project.isAllUserBelongTo = action.payload.result.isAllUserBelongTo;
            project.projectType = action.payload.result.projectType;
            project.users = action.payload.result.users;
            project.tasks = action.payload.result.tasks;
          }
          return project;
        });
      } else {
        state.projects.push(action.payload.result);
      }
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      if (action.payload.success=== true) {
        state.tasks = state.tasks.filter(
            (project) => project.id !== action.payload.id
        );
    }
    });
    builder.addCase(activeProject.fulfilled, (state, action) => {
      state.progress = "done";
      if (action.payload.id) {
        state.projects = state.projects.map((project) => {
          if (project.id === action.payload.id) {
            project.status = 0;
          }
          return project;
        });
      }
    });

    builder.addCase(inactiveProject.fulfilled, (state, action) => {
      state.progress = "done";
      if (action.payload.id) {
        state.projects = state.projects.map((project) => {          
          if (project.id === action.payload.id) {
            project.status = 1;
          }
          return project;
        });
      }
    });

    builder.addCase(getProject.fulfilled, (state, action) => {
      state.progress = "done";
      state.project = action.payload.result;
    });
  },

});
export const {
  resetProgress, filter, pushMember, setSearchName, removeMember, pushTask, removeTask, updateBillable
} = ProjectSlice.actions;
export default ProjectSlice.reducer;