export interface ITaskReq {
  name: string;
  isDeleted: boolean;
  type: number;
  id: number;
  billable: boolean;
}

export interface ITaskRes {
  result: {
    name: string,
    type: number,
    isDeleted: boolean,
    id: number
  }

}
export interface ITaskGetAllRes {
  result: ITaskReq[];
}
export interface INewTask {
  id?: number;
  name?: string;
  type?: number;
}
export interface IDeleteTaskRes {
  id: number;
  success: boolean;
  error: IError;
}

export interface IError {
  code: number;
  message: string | null;
  details: string;
  validationErrors: object;
}
export interface ISearchBar {
  setSearchKey: (e: string) => void;
}
