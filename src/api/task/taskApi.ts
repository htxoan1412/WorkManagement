import { deleteApi, getApi, postApi } from "../../utils/apiHelper";
import { IDeleteTaskRes, INewTask, ITaskGetAllRes, ITaskRes } from "./type";

export const getAllTaskApi = async () => {
  const data = await getApi<ITaskGetAllRes>(`/services/app/Task/GetAll`)
  return data;
}
export const createTaskApi = async ({ id, type, name }: INewTask) => {
  const data = await postApi<INewTask, ITaskRes>(`/services/app/Task/Save`, {
    id,
    type,
    name,
  });
  return data;
};
export const archiveTaskApi = async (id: number) => {
  const data = await deleteApi<IDeleteTaskRes>(`/services/app/Task/Archive?Id=${id}`);
  return data;
};

export const deArchiveTaskApi = async ({ id }: INewTask) => {
  const data = await postApi<INewTask, ITaskRes>(
    `/services/app/Task/DeArchive?Id=${id}`,
    {
      id,
    }
  );
  return data;
};
export const deleteTaskApi = async (id: number) => {
  const data = await deleteApi<IDeleteTaskRes>(`/services/app/Task/Delete?Id=${id}`);
  return data;
};