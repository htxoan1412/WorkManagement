import { createSlice } from "@reduxjs/toolkit";
import { IError, ITaskGetAllRes, ITaskReq } from "../../api/task/type";

export interface ITaskState {
    tasks: ITaskReq[],
    progress: string;
    success: boolean;
    error: IError;
    searchName : string;
}

