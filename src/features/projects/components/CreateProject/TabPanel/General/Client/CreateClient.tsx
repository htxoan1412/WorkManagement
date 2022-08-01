import { Box, Modal,TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect} from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../../redux/reducer/store";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import { saveClient } from "../../../../../../../redux/actions/project";
import { resetProgress } from "../../../../../../../redux/reducer/project/projectReducer";

const Container = styled.div``;
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "background.paper",
  // border: "2px solid",
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

const Title = styled.div`
  margin-bottom: 40px;
  font-size: 22px;
`;
const StyleInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const StyleButton = styled.div`
  /* padding-top: 50px; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

interface IFormInput {
  name: string;
  address: string;
}
const CreateClient: React.FC = () => {
  const progress = useSelector((state: RootState) => state.project.progress);
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
      saveClient({
        name: data.name,
        address: data.address,
      })
    );
    reset({
      name: "",
      address: "",
    });
    handleClose();
  };
  useEffect(() => {
    if (progress === "done" && open) {
      dispatch(resetProgress());
      setOpen(false);
    }
  }, [progress, open, dispatch]);
  return (
    <Container>
      <Button
        variant="contained"
        style={{ background: "#f24b50", height: "40px", alignItems: "center" }}
        onClick={handleOpen}
        startIcon={<AddIcon />}
      >
        New Client
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Title>New Client</Title>
            <StyleInput>
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
            </StyleInput>
            <StyleInput>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    id="standard-basic1"
                    label="Address*"
                    variant="standard"
                  />
                )}
                name="address"
                control={control}
                defaultValue=""
              />
            </StyleInput>
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
export default CreateClient;
