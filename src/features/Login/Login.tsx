import React, { useEffect } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Box, Button, Checkbox, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/store";
import { IAuthenticateReq } from "../../api/auth/types";
import {
  getAuthenticate,
  getCurrentLoginInformations,
} from "../../redux/actions/auth";
import { useNavigate } from "react-router";
import { resetProgress } from "../../redux/reducer/auth/authReducer";
import Swal from "sweetalert2";
import { getAuthenticateApi } from "../../api/auth/auth";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const FormLogin = styled.form`
  width: 320px;
  /* height: 500px; */
  color: palevioletred;
  display: flex;

  justify-content: center;
  flex-direction: column;
  align-items: center;
  
`;
const Title = styled.p`
  color: #000;
  font-size: 36px;
`;
const Input = styled(TextField)`
  bottom: 10px;

  width: 100%;
`;
const GroupInput = styled.div`
  padding-bottom: 20px;
`;
const StyleCheckBox = styled.div`
  display: flex;
`;
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  background: "white",
  borderRadius: "7.5px",
  p: 4,
};

const Form = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const TextTitle = styled.div`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const TextDescription = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 15px;
`;
const StyleButton = styled.div`
  display: flex;
  gap: 15px;
`;
const LoginForm = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const progress = useSelector((state: RootState) => state.auth.progress);
  const accessToken = useSelector(
    (state: RootState) => state.auth.user.accessToken
  );
  const error = useSelector((state: RootState) => state.auth.error.message);
  const details = useSelector((state: RootState) => state.auth.error.details);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const questionAlert = () => {
    Swal.fire({
      title: "Login failed!",
      text: "Invalid user name or password",
      icon: "error",
    });
  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (progress === "done" && accessToken) {
      dispatch(resetProgress());
      handleOpen();
      navigate("home");
    } 
    else {

    }
  }, [navigate, dispatch, progress, accessToken]);

  // const onLogin = async (props: IAuthenticateReq) => {
  //   try {
  //     await dispatch(
  //       getAuthenticate({
  //         userNameOrEmailAddress: props.userNameOrEmailAddress,
  //         password: props.password,
  //         rememberClient: props.rememberClient,
  //       })
  //     );
  //     dispatch(getCurrentLoginInformations());
  //   } catch (error) {
  //      return questionAlert();
  //   }
  // };

  const onLogin = async (props: IAuthenticateReq) => {
    try {
      await dispatch(
        getAuthenticate({
          userNameOrEmailAddress: props.userNameOrEmailAddress,
          password: props.password,
          rememberClient: props.rememberClient,
        })
      );
      dispatch(getCurrentLoginInformations());
    } catch (error) {
       return questionAlert();
    }
  };
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthenticateReq>();

  return (
    <div style={{ padding: "0 20px", background: "#fff" }}>
      <FormLogin onSubmit={handleSubmit(onLogin)}>
        <Title>Login</Title>
        <GroupInput>
          <Input
            {...register("userNameOrEmailAddress")}
            label="User name or Email"
            variant="standard"
          />
          <Input
            {...register("password")}
            id="standard-error"
            label="Password"
            type="password"
            variant="standard"
            style={{ top: "10px" }}
          />
        </GroupInput>

        <StyleCheckBox>
          {" "}
          <Checkbox {...label} defaultChecked /> <p>Remember Me</p>
        </StyleCheckBox>
        <Button
          type="submit"
          variant="contained"
          style={{ background: "#0000000f1", marginBottom: "10px" }}
          onClick={handleOpen}
        >
          Login
        </Button>
      </FormLogin>
    </div>
  );
};
export default LoginForm;
