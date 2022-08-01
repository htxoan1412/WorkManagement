import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAllProject } from "../../../redux/actions/project";
import { RootState } from "../../../redux/reducer/store";

const Wrapper = styled.div`
  margin-left: 80px;
`;

const SelectProject = () => {
  const dispatch = useDispatch();
  const [projects, setProjects] = React.useState("0");
  const handleChange = (event: SelectChangeEvent) => {
    setProjects(event.target.value);
  };
  const listProject = useSelector(
    (state: RootState) => state.project.allProjects
  );
  const getActiveProject = useSelector((state: RootState) =>
    state.project.allProjects.filter((project) => project.status === 0)
  );
  const getIActiveProject = useSelector((state: RootState) =>
    state.project.allProjects.filter((project) => project.status === 1)
  );
  const handleActive = () => {
    dispatch(getAllProject({ status: 0 }));
  };
  const handleDeActive = () => {
    dispatch(getAllProject({ status: 1 }));
  };
  const handleGetAll = () => {
    dispatch(getAllProject({}));
  };
  return (
    <Wrapper>
      <FormControl sx={{ width: "250px" }}>
        <Select
          id="demo-simple-select"
          value={projects}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value={0} onClick={handleActive}>
            Active Projects ({getActiveProject.length})
          </MenuItem>
          <MenuItem value={1} onClick={handleDeActive}>
            Deactive Projects ({getIActiveProject.length})
          </MenuItem>
          <MenuItem value={2} onClick={handleGetAll}>
            All Projects
          </MenuItem>
        </Select>
      </FormControl>
    </Wrapper>
  );
};

export default SelectProject;
