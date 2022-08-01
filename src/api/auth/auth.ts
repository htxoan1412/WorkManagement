import { getApi, postApi } from "../../utils/apiHelper";
import {
  IAuthenticateReq,
  IAuthenticateRes,
  IGetCurrentLoginInformations,
} from "./types";

export const getAuthenticateApi = async ({
  userNameOrEmailAddress,
  password,
  rememberClient,
}: IAuthenticateReq) => {
  const data = await postApi<IAuthenticateReq, IAuthenticateRes>(
    `/TokenAuth/Authenticate`,
    {
      userNameOrEmailAddress,
      password,
      rememberClient,
    }
  );
  console.log("auth", data);
  return data;
};

export const getCurrentLoginInformationsApi = async () => {
  const data = await getApi<IGetCurrentLoginInformations>(
    `/services/app/Session/GetCurrentLoginInformations`
  )
  return data;
}