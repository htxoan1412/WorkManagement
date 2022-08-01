
export interface IAuthenticateReq {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
}
export interface IError {
  code: number;
  message: string | null ;
  details: string;
  validationErrors: object;
}

export interface IAuthenticateRes {
  result: {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: number;
  };
  error: IError;
  success: boolean;
}

export interface IGetCurrentLoginInformations {
  result: {
    application: {
      version: string;
      releaseDate: string;
      features: object;
    };
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