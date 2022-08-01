import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import React from "react";
import { useDispatch } from "react-redux";
import { ITaskReq } from "../../../../api/task/type";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import styled from "styled-components";
import { deArchiveTask } from "../../../../redux/actions/task";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "478px",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "16px",
  borderRadius: "5px",
};
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
const StyleButton = styled.div`
  padding-top: 29px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const TextTitle = styled.div`
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 10px;
  font-size: 27px;
  font-weight: 600;
`;
const TextDescription = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.64);
`;
const DeArchiveTask: React.FC<{ task: ITaskReq }> = ({ task }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const handleDispatch = async (id: number) => {
    dispatch(deArchiveTask(id));
    handleClose();
  };
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
        Unarchive
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Form>
            <ErrorOutlineIcon
              sx={{
                color: "#f8bb86",
                fontSize: "120px",
                paddingBottom: "15px",
              }}
            />
            <TextTitle>Are you sure?</TextTitle>
            <TextDescription>Unarchive task: '{task.name}' ?</TextDescription>
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
                sx={{
                  color: "black",
                  background: "#7cd1f9",
                }}
                onClick={() => handleDispatch(task.id)}
              >
                Yes
              </Button>
            </StyleButton>
          </Form>
        </Box>
      </Modal>
    </div>
  );
};

export default DeArchiveTask;
