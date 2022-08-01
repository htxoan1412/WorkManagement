import { createSlice} from "@reduxjs/toolkit";
import { setAccessToken } from "../../../utils/localStorageService";
import { getAuthenticate, getCurrentLoginInformations } from "../../actions/auth";
import { IAuthState} from "../../interface/auth";

const initialState: IAuthState = {
  progress: "",
  user: {
    accessToken: "",
    userId: 0,
  },
  success: false,
  error: {
    code: 0,
    details: "",
    validationErrors: {},
    message: "",
  },
  currentLoginInformations: {
    user: {
      name: "",
      surname: "",
      userName: "",
      emailAddress: "",
      allowedLeaveDay: 0,
      type: 0,
      level: 0,
      sex: 0,
      branch: 0,
      avatarPath: "",
      morningWorking: "",
      morningStartAt: "",
      morningEndAt: "",
      afternoonWorking: "",
      afternoonStartAt: "",
      afternoonEndAt: "",
      isWorkingTimeDefault: false,
      id: 0,
    },
  },
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    resetProgress(state){
      state.progress = "";
    }
  },
  extraReducers: (builder) =>{
    builder.addCase(getAuthenticate.pending, (state, action) =>{
      state.progress = "pending";
    })
    .addCase(getAuthenticate.fulfilled, (state, action) =>{
      state.progress = "done";
      state.success = action.payload.success;
      if(state.success === true){
        setAccessToken(action.payload.result.accessToken);
        state.user.accessToken = action.payload.result.accessToken;
      }
      else {
        state.error.message = action.payload.error.message;
        state.error.details = action.payload.error.details;
      }
    })
    .addCase(getAuthenticate.rejected, (state, action) =>{
      state.progress = "error";
    })
    builder.addCase(getCurrentLoginInformations.pending, (state, action) => {
      state.progress = "pending";
    });
    builder.addCase(getCurrentLoginInformations.fulfilled, (state, action) => {
      state.progress = "done";
      state.currentLoginInformations.user = action.payload.result.user;
    });
  }
})
export const { resetProgress } = authSlice.actions;
export default authSlice.reducer;
