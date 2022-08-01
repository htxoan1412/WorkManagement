import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import General from "./TabPanel/General/General";
import {
  getAllCustomer,
  getAllProject,
  getUserNotPagging,
  saveProject,
} from "../../../../redux/actions/project";
import Team from "./Team/Team";
import Tasks from "./TabPanel/Task/Tasks";
import { NewProject } from "../../../../api/project/type";
import { useForm } from "react-hook-form";
import { RootState } from "../../../../redux/reducer/store";
import { ResetTvRounded } from "@mui/icons-material";

const Container = styled.div``;
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "990px",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "20px",
  borderRadius: "5px",
};
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
`;
const ContentForm = styled.form`
  width: 100%;
  /* typography: body1; */
  /* marginTop:24px; */
  margin-top: 24px;
  /* background: red; */
  height: "10px";
  overflow-y: "auto";
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  z-index: 0;
`;
const HeaderTitle = styled.h2``;
const StyleButton = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

interface IFormInput {
  code: string;
  customerId: number;
  isAllUserBelongTo: boolean;
  name: string;
  note: string;
  projectTargetUsers: {
    userId: number;
    roleName: string;
    id: number;
  }[];
  projectType: number;
  status: number;
  tasks: { taskId: number; billable?: boolean; id: number }[];
  timeEnd: string;
  timeStart: string;
  users: { userId: number; type?: number; id: number }[];
}
const CreactProject: React.FC = () => {
  const { register, reset, handleSubmit, setValue } = useForm<NewProject>();
  const [valueTab, setValueTab] = React.useState("1");
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    dispatch(getAllCustomer());
    dispatch(getUserNotPagging());
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };
  const selectMembers = useSelector(
    (state: RootState) => state.project.selectedMembers
  );
  const selectTasks = useSelector(
    (state: RootState) => state.project.selectTasks
  );
  let members: { userId: number; id: number; type?: number }[] = [];
  selectMembers.forEach((member) =>
    members.push({
      id: 0,
      userId: member.id,
      type: typeof member.projectType === "undefined" ? 1 : member.projectType,
    })
  );
  let tasks: { id: number; taskId: number; billable?: boolean }[] = [];
  selectTasks.forEach((task) => {
    tasks.push({ taskId: task.id, id: 0, billable: task.billable || false });
  });

  const onSaveProject = (props: NewProject) => {
    const newProject: NewProject = {
      name: props.name,
      code: props.code,
      status: props.status,
      timeStart: props.timeStart,
      timeEnd: props.timeEnd,
      note: props.note,
      projectType: props.projectType || 1,
      customerId: props.customerId,
      tasks: tasks,
      users: members,
      projectTargetUsers: props.projectTargetUsers,
      isAllUserBelongTo: props.isAllUserBelongTo,
    };
    dispatch(saveProject(newProject));
    handleClose();
    reset();
  };
  return (
    <Container>
      <Button
        variant="contained"
        style={{
          background: "#f24b50",
          height: "42px",
          width: "165px",
          alignItems: "center",
        }}
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        New Project
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Header>
            <HeaderTitle>Create Project</HeaderTitle>
            <CloseIcon onClick={handleClose} />
          </Header>
          <ContentForm onSubmit={handleSubmit(onSaveProject)}>
            <TabContext value={valueTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab sx={{ width: "160px" }} label="General" value="1" />
                  <Tab sx={{ width: "160px" }} label="Team" value="2" />
                  <Tab sx={{ width: "160px" }} label="Tasks" value="3" />
                  <Tab sx={{ width: "160px" }} label="Notification" value="4" />
                </TabList>
              </Box>
              <General register={register} setValue={setValue} />
              <Team />
              <Tasks />
            </TabContext>
          </ContentForm>
        </Box>
      </Modal>
    </Container>
  );
};

export default CreactProject;
