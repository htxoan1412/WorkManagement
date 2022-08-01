import styled from "styled-components";
import LoginForm from "./Login";

const Wrapper = styled.div`
  background: #00bcd4;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  height: 100vh;
`;

const Login = () => {
  return (
    <Wrapper>
      <h1 style={{ color: "white" }}>Timesheet</h1>
      <LoginForm />
    </Wrapper>
  );
};

export default Login;
