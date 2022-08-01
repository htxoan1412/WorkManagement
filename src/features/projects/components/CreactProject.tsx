import { Button } from "@mui/material";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";

const Container = styled.div``;
const Test = styled.button``;
const CreactProject = () => {
  return (
    <Container>
      <Button
        variant="contained"
        style={{ background: "#f24b50", height: "50px", alignItems: "center" }}
        startIcon={<AddIcon />}
      >
        New Project
      </Button>
    </Container>
  );
};

export default CreactProject;
