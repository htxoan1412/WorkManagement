import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ViewMainHead from "../../../layout/ViewMainHeader/ViewMainHead";
import { getAllCustomer, getAllProject } from "../../../redux/actions/project";
import { setSearchName } from "../../../redux/reducer/project/projectReducer";

import CreactProject from "./CreateProject/CreateProject";

import ProjectList from "./ProjectList/ProjectList";
import SearchProject from "./SearchProject/SearchProject";
import SelectProject from "./SelectProject";

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
  justify-content: space-between;
`;
const Project = () => {
  const dispatch = useDispatch();
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    dispatch(
      setSearchName({
        searchName: searchItem,
      })
    );
  }, [searchItem, dispatch]);

  useEffect(() => {
    dispatch(getAllProject({status:0}));
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(getAllProject({ status: 0 }));
  //   dispatch(getAllCustomer());
  // }, [dispatch]);

  return (
    <Container>
      <ViewMainHead title="Manage Project" />
      <Content>
        <TopBlock>
          <CreactProject />
          <SelectProject />
          <SearchProject setSearchKey={setSearchItem} />
        </TopBlock>
        <ProjectList />
      </Content>
    </Container>
  );
};
export default Project;
