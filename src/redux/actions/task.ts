import { createAsyncThunk } from '@reduxjs/toolkit';
import { archiveTaskApi, createTaskApi, deArchiveTaskApi, deleteTaskApi, getAllTaskApi } from '../../api/task/taskApi';
import { INewTask, ITaskReq } from '../../api/task/type';

export const getAllTask = createAsyncThunk(
  "/services/app/Task/GetAll",
  async () => {
    const response = await getAllTaskApi();
    return response;
  }
);

export const saveTask = createAsyncThunk(
  "/services/app/Task/Save",
  async ({ id, name, type }: INewTask) => {
    const response = await createTaskApi({
      id,
      name,
      type,
    });
    return response as { result: ITaskReq };
  }
);

export const archiveTask = createAsyncThunk(
  "/services/app/Task/Archive",
  async (id: number) => {
    const response = {...await archiveTaskApi(id), id};
    return response;
  }
);

export const deArchiveTask = createAsyncThunk(
  "/services/app/Task/DeArchive",
  async (id:number) => {
    const response = { ...(await deArchiveTaskApi({ id })), id };
    return response;
  }
);
export const deleteTask = createAsyncThunk(
  "/services/app/Task/Delete",
  async (id: number) => {
    const response = {...await deleteTaskApi(id), id };
    return  response;
  }
);

