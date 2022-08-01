import TabPanel from "@mui/lab/TabPanel";
import Checkbox from "@mui/material/Checkbox";
import styled from "styled-components";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/reducer/store";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React from "react";
import Collapse from "@mui/material/Collapse";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { ITaskReq } from "../../../../../../api/task/type";
import {
  pushTask,
  removeTask,
  updateBillable,
} from "../../../../../../redux/reducer/project/projectReducer";

const Main = styled.div``;
const BlockHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const NavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width:50%; */
`;
const TextName = styled.div``;
const NavRight = styled.div`
  width: 50%;
`;
const ViewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* flex-direction: column; */
`;
const LeftViewHeader = styled.div`
  display: flex;
`;
const TextView = styled.div`
  padding-left: 10px;
`;
const RightViewHeader = styled.div`
  /* padding-right: 50%; */
  width: 50%;
`;
const RightSelectTask = styled.div``;
const SelectTask = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;
const ListTask = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
const LeftTask = styled.div`
  display: flex;
  width: 50%;
  padding-left: 20px;
  align-items: center;
`;
const RightTask = styled.div`
  width: 50%;
`;
const ViewTask = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
`;
const Tasks = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [openViewTask, setOpenViewTask] = React.useState(true);
  const handleClickSelectTask = () => {
    setOpenViewTask(!openViewTask);
  };
  const selectTasks = useSelector(
    (state: RootState) => state.project.selectTasks
  );
  const filterTasks = useSelector(
    (state: RootState) => state.project.filterTasks
  );

  const dispatch = useDispatch();
  const handleClickPushTask = (task: ITaskReq) => {
    dispatch(pushTask(task));
  };
  const handleRemoveTask = (task: ITaskReq) => {
    dispatch(removeTask(task));
  };
  const [check, setCheck] = React.useState<boolean>(false);
  return (
    <TabPanel
      value="3"
      sx={{ paddingLeft: "0", overflowY: "auto", height: "500px" }}
    >
      <Main>
        <BlockHeader>
          <NavHeader>
            <TextName>Tasks</TextName>
            <NavRight>
              <TextName>Billable</TextName>
              <Checkbox {...label} color="error" defaultChecked />
            </NavRight>
          </NavHeader>
          {selectTasks.map((item) => {
            return (
              <ViewHeader>
                <LeftViewHeader>
                  <ClearOutlinedIcon onClick={() => handleRemoveTask(item)} />
                  <TextView>{item.name}</TextView>
                </LeftViewHeader>
                <RightViewHeader>
                  <Checkbox
                    color="error"
                    value={check}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setCheck(event.target.checked);
                      dispatch(
                        updateBillable({
                          ...item,
                          billable: event.target.checked,
                        })
                      );
                    }}
                  />
                </RightViewHeader>
              </ViewHeader>
            );
          })}
        </BlockHeader>
        <SelectTask onClick={handleClickSelectTask}>
          <TextView>Select Task</TextView>
          <RightSelectTask>
            {openViewTask ? <ExpandLess /> : <ExpandMore />}
          </RightSelectTask>
        </SelectTask>

        <Collapse in={openViewTask} timeout="auto" unmountOnExit>
          <ListTask>
            {filterTasks.map((item) => {
              return (
                <ViewTask>
                  <LeftTask onClick={() => handleClickPushTask(item)}>
                    <AddCircleOutlineOutlinedIcon />
                    <TextView>{item.name}</TextView>
                  </LeftTask>
                  <RightTask>
                    {item.type === 0 ? (
                      <TextView>Other Task</TextView>
                    ) : (
                      <TextView>Common Task</TextView>
                    )}
                    {/* <TextView>Other Task</TextView> */}
                  </RightTask>
                </ViewTask>
              );
            })}
          </ListTask>
        </Collapse>
      </Main>
    </TabPanel>
  );
};

export default Tasks;
