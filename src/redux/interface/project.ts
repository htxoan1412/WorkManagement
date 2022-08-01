import { ICreateProject, ICustomer, IProject, IUser} from "../../api/project/type";
import { ITaskReq } from "../../api/task/type";

export interface IProjectState {
  //getAllProject
  allProjects: IProject[];
  //getAllCustomer
  customers: ICustomer[];
  progress: string;
  users: IUser[];
  filteredUsers: IUser[];
  selectedMembers: IUser[];
  searchName:string;
  tasks : ITaskReq[];
  selectTasks:ITaskReq[];
  filterTasks:ITaskReq[];
  projects:ICreateProject[];
  success: boolean | null;
  project: ICreateProject;
}
export interface Groups {
  [key: string]: IProject[];
}
