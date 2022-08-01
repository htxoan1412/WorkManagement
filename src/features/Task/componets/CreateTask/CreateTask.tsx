import { Alert, Box, Button, Modal, NativeSelect, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveTask } from "../../../../redux/actions/task";
import AddIcon from "@mui/icons-material/Add";
import { resetProgress } from "../../../../redux/reducer/task/taskReducer";
import { RootState } from "../../../../redux/reducer/store";

const Container = styled.div``;
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "20px",
  borderRadius: "5px",
};
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Input = styled(TextField)`
  bottom: 30px;
`;
const StyleButton = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Title = styled.div`
  margin-bottom: 40px;
  font-size: 22px;
`;

interface IFormInput {
  name: string;
  type: number;
}

const CreateTask = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { reset, control, handleSubmit } = useForm<IFormInput>();
  const onSubmit = async (data: IFormInput) => {
    dispatch(
      saveTask({
        name: data.name,
        type: data.type,
      })
    );
    reset({
      name: "",
      type: 0,
    });
    handleClose();
  };
  return (
    <Container>
      <Button
        variant="contained"
        style={{ background: "#f24b50", height: "40px", alignItems: "center" }}
        onClick={handleOpen}
        startIcon={<AddIcon />}
      >
        New Task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Title>New Task</Title>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  id="standard-basic"
                  label="Name*"
                  variant="standard"
                />
              )}
              name="name"
              control={control}
              defaultValue=""
            />
            <Controller
              name="type"
              render={({ field }) => (
                <NativeSelect {...field}>
                  <option value={0}>Common Task</option>
                  <option value={1}>Other Task</option>
                </NativeSelect>
              )}
              control={control}
              defaultValue={0}
            />
            <StyleButton>
              <Button
                variant="outlined"
                sx={{ color: "black", right: "10px" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outlined"
                sx={{ color: "black", background: "#f24b50" }}
              >
                Save
              </Button>
            </StyleButton>
          </Form>
        </Box>
      </Modal>
    </Container>
  );
};

export default CreateTask;
