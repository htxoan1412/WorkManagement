import { IError } from "../../api/auth/types";

export interface IAuthState {
  [x: string]: any;
  progress: string;
  user: {
    accessToken: string;
    userId: number;
  };
  error: IError;
  success: boolean;
  currentLoginInformations: {
    user: {
      name: string;
      surname: string;
      userName: string;
      emailAddress: string;
      allowedLeaveDay: number;
      type: number;
      level: number;
      sex: number;
      branch: number;
      avatarPath: string;
      morningWorking: string;
      morningStartAt: string;
      morningEndAt: string;
      afternoonWorking: string;
      afternoonStartAt: string;
      afternoonEndAt: string;
      isWorkingTimeDefault: boolean;
      id: number;  
    };
  };
}


export interface IPayLoad<T>{
  payload : T;
}

