import { createAsyncThunk } from "@reduxjs/toolkit";
import { activeProjectApi, createCustomerApi, createProjectApi, deleteProjectApi, getAllCustomerApi, getAllProjectApi, getProjectApi, getUserNotPaggingApi, inactiveProjectApi } from "../../api/project/projectApi";
import { IActiveProject, IClientRes, ICreateProject, ICreateProjectRes, IGetProjectReq, INewClient, IProjectReq } from "../../api/project/type";

export const getAllProject = createAsyncThunk(
  "/services/app/Project/GetAll",
  async ({ status }: IProjectReq) => {
    const response = { ...(await getAllProjectApi({ status })) };
    return response;
  }
);
export const getAllCustomer = createAsyncThunk(
  "/services/app/Customer/GetAll",
  async () => {
    const response = { ...(await getAllCustomerApi()) };
    console.log("customer", response);

    return response;
  }
);
export const saveClient = createAsyncThunk("/services/app/Customer/Save",
  async ({ id, name, address }: INewClient) => {
    const response = { ...(await createCustomerApi({ id, name, address })) }
    return response as IClientRes;
  }
);
export const getUserNotPagging = createAsyncThunk(
  "/services/app/User/GetUserNotPagging",
  async () => {
    const response = { ...(await getUserNotPaggingApi()) };
    console.log("action", response);
    return response;
  }
);
export const saveProject = createAsyncThunk(
  "/services/app/Project/Save",
  async ({
    id,
    name,
    code,
    status,
    timeStart,
    timeEnd,
    note,
    projectType,
    customerId,
    tasks,
    users,
    projectTargetUsers,
    isAllUserBelongTo,
  }: ICreateProject) => {
    const response = await createProjectApi({
      id,
      name,
      code,
      status,
      timeStart,
      timeEnd,
      note,
      projectType,
      customerId,
      tasks,
      users,
      projectTargetUsers,
      isAllUserBelongTo,
    });
    return response as ICreateProjectRes;
  }
);

export const deleteProject = createAsyncThunk(
  "/services/app/Project/Delete",
  async (id: number) => {
    const response = { ...await deleteProjectApi(id), id };
    return response;
  }
);
export const activeProject = createAsyncThunk(
  "services/app/Project/Active", async ({id}: IActiveProject) => {
    const response = { ...(await activeProjectApi({id})), id };
    console.log(response);
    
    return response;
  }
);
export const getProject = createAsyncThunk("services/app/Project/Get",
  async ({ input }: IGetProjectReq) => {
    const response = { ...await getProjectApi({ input }) }
    return response;
  }

);
export const inactiveProject = createAsyncThunk(
  "services/app/Project/Inactive", async ({id}: IActiveProject) => {
    const response = { ...(await inactiveProjectApi({id})), id };    
    return response;
  }
)


