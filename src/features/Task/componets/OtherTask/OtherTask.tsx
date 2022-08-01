import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../redux/reducer/store";
import DeleteTask from "../DeleteTask/DeleteTask";
import EditTask from "../EditTask/EditTask";

const Container = styled.div`
  padding-top: 20px;
`;
const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #555555;
`;
const TitleDes = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 14px;
`;
const style = {
  display: "flex",
  alignItems: "center",
  width: "931px",

};
const StyledButton = styled.div`
  display: flex;
  align-items: center;
`;
const OtherTask = () => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const searchName = useSelector((state: RootState) => state.task.searchName);
  const otherTask = tasks.filter((task) => task.type === 1);
  return (
    <Container>
      <Title>Other Task </Title>
      <TitleDes>These task must be manually added to projects</TitleDes>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead></TableHead>
          {otherTask
            .filter((item) => item.name.includes(searchName))
            .map((item) => {
              return (
                <TableBody key={item.id}>
                  <TableRow>
                    <TableCell style={style}>
                      <EditTask task={item} />
                      {item.name}
                    </TableCell>

                    <TableCell>
                      <StyledButton>
                        <DeleteTask task={item} />
                      </StyledButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OtherTask;
