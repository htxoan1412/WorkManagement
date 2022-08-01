import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import styled from "styled-components";
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import { getAllTask } from "../redux/actions/task";

const Container = styled.div`
  /* width: 100%; */
`;
const MainContent = styled.div`
  display: flex;
  width: 100%;
`;
const MainView = styled.div`
  background-color: #e9e9e9;
  height: 100%;
  width: 100%;
  padding: 30px 30px 30px;
  box-sizing: border-box;
`;
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTask());
  }, [dispatch]);
  return (
    <Container>
      <Header />
      <MainContent>
        <Sidebar />
        <MainView>
          <Outlet />
        </MainView>
      </MainContent>
    </Container>
  );
};

export default Home;
