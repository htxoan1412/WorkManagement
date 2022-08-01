import { IAuthenticateReq } from "../../api/auth/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthenticateApi, getCurrentLoginInformationsApi } from "../../api/auth/auth";

export const getAuthenticate = createAsyncThunk(
  "/tokenAuth/Authenticate",
  async ({
    userNameOrEmailAddress,
    password,
    rememberClient,
  }: IAuthenticateReq) => {
    const response = {
      ...(await getAuthenticateApi({
        userNameOrEmailAddress,
        password,
        rememberClient,
      })),
    };
    return response;
  }
);
export const getCurrentLoginInformations = createAsyncThunk(
  "services/app/Session/GetCurrentLoginInformations",
  async () => {
    const response = {
      ...(await getCurrentLoginInformationsApi())
    }
    return response;
  }

)


