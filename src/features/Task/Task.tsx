import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ViewMainHead from "../../layout/ViewMainHeader/ViewMainHead";
import { getAllTask } from "../../redux/actions/task";
import { setSearchName } from "../../redux/reducer/task/taskReducer";
import CommonTask from "./componets/CommonTask/CommonTask";
import CreateTask from "./componets/CreateTask/CreateTask";
import OtherTask from "./componets/OtherTask/OtherTask";
import SearchTask from "./componets/SearchTask/SearchTask";

const Container = styled.div`
  background: white;
  height: 100%;
`;
const Content = styled.div`
  padding: 20px 20px;
`;
const TopBlock = styled.div`
  display: flex;
  padding-top: 5px;
`;
const Task: React.FC = () => {
  const dispatch = useDispatch();
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    dispatch(getAllTask());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      setSearchName({
        searchName: searchItem,
      })
    );
  }, [searchItem, dispatch]);
  return (
    <Container>
      <ViewMainHead title="Manage Tasks" />
      <Content>
        <div style={{ paddingLeft: "20px" }}>
          <TopBlock>
            <CreateTask />
            <SearchTask setSearchKey={setSearchItem} />
          </TopBlock>
          <CommonTask />
          <OtherTask />
        </div>
      </Content>
    </Container>
  );
};

export default Task;
