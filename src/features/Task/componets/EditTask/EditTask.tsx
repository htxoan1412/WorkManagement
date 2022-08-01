import { Box, Modal, NativeSelect, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ITaskReq } from "../../../../api/task/type";
import { saveTask } from "../../../../redux/actions/task";

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
  margin-bottom: 50px;
  font-size: 22px;
`;
interface IFormInput {
  id: number;
  name: string;
  type: number;
}
const EditTask: React.FC<{ task: ITaskReq }> = ({ task }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    reset({
      id: task.id,
      name: task.name,
      type: task.type,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (data: IFormInput) => {
    dispatch(
      saveTask({
        id: data.id,
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
  const { reset, control, handleSubmit } = useForm<IFormInput>();
  return (
    <div>
      <Button
        style={{
          marginRight: "10px",
          background: "#FFFFFF",
          color: "black",
          textTransform: "none",
        }}
        variant="contained"
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Title>Edit Task</Title>
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
    </div>
  );
};

export default EditTask;
