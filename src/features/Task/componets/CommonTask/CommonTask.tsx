import { Button, TableBody } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../redux/reducer/store";
import ArchiveTask from "../ArchiveTask/ArchiveTask";
import DeleteTask from "../DeleteTask/DeleteTask";
import EditTask from "../EditTask/EditTask";
import DeArchiveTask from "../DeArchive/DeArchiveTask";
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
const tablecell = {
  display: "flex",
  alignItems: "center",
  width: "640px",
};
const style = {
  display: "flex",
  alignItems: "center",
  
  width: "840px",
}
// const styleTableRow ={
//   display:"flex",
//   justifyContent: "space-between",
//   width : "100%"

// }
const StyledButton = styled.div`
  display: flex;
  align-items: center;
`;
const CommonTask = () => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const searchName = useSelector((state: RootState) => state.task.searchName);
  const taskCommon = tasks.filter((task) => task.type === 0);
  return (
    <Container>
      <Title>Common Task</Title>
      <TitleDes>
        These tasks are automatically added to all new projects
      </TitleDes>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
            {/* <TableBody>
              <TableRow>
                <TableCell style={style}>
                  <EditTask />
                  Task1
                </TableCell>

                <TableCell>
                  <StyledButton>
                    <ArchiveTask />
                    <DeleteTask />
                    
                  </StyledButton>
                </TableCell>

              </TableRow>

              <TableRow>
                <TableCell style={style}>
                  <EditTask />
                  Task1
                </TableCell>

                <TableCell>
                  <StyledButton>
                    <ArchiveTask />
                    <DeleteTask />
                  </StyledButton>
                </TableCell>

              </TableRow>

            </TableBody> */}
          </TableHead>
          {taskCommon
            .filter((item) => item.name.includes(searchName))
            .map((item) => {
              return (
                <TableBody key={item.id}>
                  <TableRow >
                    <TableCell style={style}>
                      <EditTask task={item} />
                      {item.name}
                    </TableCell>
                    <TableCell>
                      {!item.isDeleted ? (
                        <StyledButton>
                          <ArchiveTask task={item} />
                          <Button
                            style={{
                              marginRight: "10px",
                              color: "rgba(0,0,0,.26)",
                              background: "rgba(0,0,0,.12)",
                              textTransform: "none",
                            }}
                            variant="contained"
                            disabled
                          >
                            Delete
                          </Button>
                        </StyledButton>
                      ) : (
                        <StyledButton>
                          {/* <Button
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
                        </Button> */}
                          <DeArchiveTask task={item} />
                          <DeleteTask task={item} />
                        </StyledButton>
                      )}
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

export default CommonTask;
