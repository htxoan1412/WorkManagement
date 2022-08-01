import MenuItem from "@mui/material/MenuItem";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabPanel } from "@material-ui/lab";
import { IProject, NewProject } from "../../../../api/project/type";
import { useForm } from "react-hook-form";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tasks from "./TabPanel/Task/Tasks";
import Teams from "./TabPanel/Team/Teams";
import Generals from "./TabPanel/General/Generals";
import { RootState } from "../../../../redux/reducer/store";
import { useSelector } from "react-redux";

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
const ContentForm = styled(Box)`
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
const TabTitle = styled(Tab)`
  font-size: 10px;
  font-weight: 700;
  padding: 10px;
  width: 180px;
`;
interface IFormInput {
  name: string;
  type: number;
}
const HeaderTitle = styled.h2``;
const EditProject: React.FC<{ project: IProject }> = ({ project }) => {
  // const { register, reset, handleSubmit } = useForm<NewProject>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [valueTab, setValueTab] = React.useState("1");
  // const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };
  const projectGet = useSelector((state: RootState) => state.project.project);
  const { reset, register, handleSubmit, setValue, control } =
  useForm<NewProject>({
    defaultValues: {
      name: projectGet.name,
      code: projectGet.code,
      status: projectGet.status,
      timeStart: projectGet.timeStart,
      timeEnd: projectGet.timeEnd,
      note: projectGet.note,
      projectType: projectGet.projectType,
      customerId: projectGet.customerId,
      tasks: projectGet.tasks,
      users: projectGet.users,
      projectTargetUsers: projectGet.projectTargetUsers,
      isAllUserBelongTo: projectGet.isAllUserBelongTo,
    },
  });
  return (
    <Container onClick={handleOpen}>
      <MenuItem disableRipple>
        <EditIcon />
        Edit
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Header>
            <HeaderTitle>Edit project</HeaderTitle>
            <CloseIcon  onClick={handleClose}/>
          </Header>
          <ContentForm>
            <TabContext value={valueTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={valueTab}
                  onChange={handleChange}
                  aria-label="wrapped label tabs example"
                >
                  <Tab sx={{ width: "160px" }} label="General" value="1" />
                  <Tab sx={{ width: "160px" }} label="Team" value="2" />
                  <Tab sx={{ width: "160px" }} label="Task" value="3" />
                </Tabs>
              </Box>
              <TabPanel value="1">
                <Generals
                  register={register}
                  setValue={setValueTab}
                  control={control}
                />
              </TabPanel>
              <TabPanel value="2">
                <Teams />
              </TabPanel>
              <TabPanel value="3">
                <Tasks />
              </TabPanel>
            </TabContext>
          </ContentForm>
        </Box>
      </Modal>
    </Container>
  );
};

export default EditProject;
