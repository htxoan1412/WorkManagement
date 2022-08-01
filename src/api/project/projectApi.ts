import { deleteApi, getApi, postApi } from "../../utils/apiHelper";
import { IActiveProject, IActiveProjectRes, IClientRes, ICreateProject, ICreateProjectRes, ICustomer, ICustomerRes, IDeleteProjectRes, IGetProjectReq, IProjectReq, IProjectRes, IUserRes } from "./type";

export const getAllProjectApi = async ({ status }: IProjectReq) => {
  let url = `/services/app/Project/GetAll?`;
  if (typeof status === "number") url += `status=${status}`;
  const data = await getApi<IProjectRes>(url);
  return data;
};

export const getAllCustomerApi = async () => {
  let url = `/services/app/Customer/GetAll`;
  const data = await getApi<ICustomerRes>(url);
  return data;
};

export const createCustomerApi = async ({ id, name, address }: ICustomer) => {
  const data = await postApi<ICustomer, IClientRes>(`/services/app/Customer/Save`, {
    id,
    name,
    address
  });
  return data;
}
export const getUserNotPaggingApi = async () => {
  let url = `/services/app/User/GetUserNotPagging`;
  const data = await getApi<IUserRes>(url);
  console.log("data", data);

  return data;
};

export const createProjectApi = async ({
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
  const data = await postApi<ICreateProject, ICreateProjectRes>(
    `/services/app/Project/Save`,
    {
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
    }
  );
  return data;
};

export const deleteProjectApi = async (id: number) => {
  let url = `/services/app/Project/Delete?`;
  if (typeof id === "number") url += `Id=${id}`;
  const data = await deleteApi<IDeleteProjectRes>(url);
  return data;
};
export const activeProjectApi = async ({ id }: IActiveProject) => {
  const data = await postApi<IActiveProject, IActiveProjectRes>(`/services/app/Project/Active`, { id });
  return data;
}

export const getProjectApi = async ({ input }: IGetProjectReq) => {
  let url = `/services/app/Project/Get?`;
  if (typeof input === "number") url += `input=${input}`;
  const data = await getApi<ICreateProjectRes>(url);
  return data;
};

export const inactiveProjectApi = async ({ id }: IActiveProject) => {
  const data = await postApi<IActiveProject, IActiveProjectRes>(`/services/app/Project/Inactive`, { id });
  return data;
}
