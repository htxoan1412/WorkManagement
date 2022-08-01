import { TabPanel } from "@mui/lab";
import {
  Button,
  Checkbox,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import { useForm, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NewProject } from "../../../../../../api/project/type";
import { getAllProject } from "../../../../../../redux/actions/project";
import { RootState } from "../../../../../../redux/reducer/store";
import CreateClient from "./Client/CreateClient";


const StyleClient = styled.div`
  display: flex;
  padding-top: 5px;
  /* align-items: center; */
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;

  /* display: flex;
  flex-direction: row;
  /* align-items: center; */
  /* gap: 50px; */
`;
const Lable = styled.div`
  width: 158px;
  padding: 0px 10px;
  font-weight: 550;
  font-size: 15px;
`;
const StyleProjectName = styled.div`
  display: flex;
  padding-top: 20px;
  /* align-items: center; */
  align-items: flex-start;
  justify-content: flex-start;
`;
const StyleProjectCode = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: flex-start;
  justify-content: flex-start;
`;
const StyleDate = styled.div`
  display: flex;
  padding-top: 20px;
  flex-direction: row;
`;

const StyledNote = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: flex-start;
  justify-content: flex-start;
`;
const StyledCheckBox = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: center;
`;
const Text = styled.div``;
const StyleProjectType = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: flex-start;
  justify-content: flex-start;
`;
const ProjectList = styled.div`
  display: flex;
`;
const StyleButton = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

interface useForm {
  register: UseFormRegister<NewProject>;
  setValue: UseFormSetValue<NewProject>;
}
const General: React.FC<useForm> = ({ register, setValue }) => {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();
  const [activeButton, setActiveButton] = useState("fixedFee");
  const dispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.project.customers);
  const [customer, setCustomer] = useState("");
  const handleChangeCustomer = (event: SelectChangeEvent) => {
    setCustomer(event.target.value as string);
  };
  useEffect(() => {
    dispatch(getAllProject({}));
  }, [dispatch]);
  return (
    <TabPanel
      value="1"
      sx={{ padding: 0, paddingLeft: "0", height: "500px", overflowY: "auto" }}
    >
      <StyleClient>
        <Lable>Client</Lable>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FormControl sx={{ m: 1, width: 460 }}>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              {...register("customerId", { required: true })}
              value={customer}
              onChange={handleChangeCustomer}
            >
              {customers.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <CreateClient />
        </div>
      </StyleClient>

      <StyleProjectName>
        <Lable>Project Name*</Lable>
        <TextField
          {...register("name")}
          id="outlined-basic"
          label="Project name"
          variant="outlined"
          sx={{ width: "460px", marginLeft: "7px" }}
        />
      </StyleProjectName>
      <StyleProjectCode>
        <Lable>Project Code*</Lable>
        <TextField
          {...register("code")}
          id="outlined-basic"
          label="Project code"
          variant="outlined"
          sx={{ width: "230px", marginLeft: "7px" }}
        />
      </StyleProjectCode>

      <StyleDate>
        <Lable>Date*</Lable>
        <TextField
          type="date"
          {...register("timeStart")}
          sx={{ marginLeft: "7px", marginRight: "10px" }}
        />
        <>to</>
        <TextField
          type="date"
          {...register("timeEnd")}
          sx={{ marginLeft: "10px" }}
        />
      </StyleDate>
      <StyledNote>
        <Lable>Note</Lable>
        <TextField
          {...register("note")}
          sx={{ width: 750, marginLeft: "7px" }}
        />
      </StyledNote>
      <StyledCheckBox>
        <Lable>All User</Lable>
        <Checkbox
          {...register("isAllUserBelongTo")}
          sx={{
            color: red[800],
            "&.Mui-checked": {
              color: red[600],
            },
          }}
        />
        <Text>
          Auto add user as a member of this project when creating new user
        </Text>
      </StyledCheckBox>
      <StyleProjectType>
        <Lable>Project type</Lable>
        <ProjectList>
          <Button
            type="button"
            style={{
              marginRight: "10px",
              width: "130px",
              height: "50px",
              color: "black",
              textTransform: "none",
              borderRadius: "8px",
              border: "1px solid#c1c1c1",
              whiteSpace: "nowrap",
              background:
                activeButton === "timeMaterials" ? "#f36c00" : "#ffffff",
            }}
            variant="contained"
            onClick={() => {
              setActiveButton("timeMaterials");
              setValue("projectType", 0);
            }}
          >
            Time & Materials
          </Button>
          <Button
            style={{
              marginRight: "10px",
              width: "130px",
              height: "50px",
              color: "black",
              textTransform: "none",
              border: "1px solid#c1c1c1",
              borderRadius: "8px",
              background: activeButton === "fixedFee" ? "#f36c00" : "#ffffff",
            }}
            variant="contained"
            onClick={() => {
              setActiveButton("fixedFee");
              setValue("projectType", 1);
            }}
          >
            Fixed Fee
          </Button>
          <Button
            style={{
              marginRight: "10px",
              width: "130px",
              height: "50px",
              color: "black",
              textTransform: "none",
              border: "1px solid#c1c1c1",
              borderRadius: "8px",
              background:
                activeButton === "Non-Billable" ? "#f36c00" : "#ffffff",
            }}
            variant="contained"
            onClick={() => {
              setActiveButton("Non-Billable");
              setValue("projectType", 2);
            }}
          >
            Non-Billable
          </Button>
          <Button
            {...register("projectType")}
            style={{
              marginRight: "10px",
              width: "130px",
              height: "50px",
              color: "black",
              textTransform: "none",
              border: "1px solid#c1c1c1",
              borderRadius: "8px",
              background: activeButton === "ODC" ? "#f36c00" : "#ffffff",
            }}
            variant="contained"
            onClick={() => {
              setActiveButton("ODC");
              setValue("projectType", 3);
            }}
          >
            ODC
          </Button>
        </ProjectList>
      </StyleProjectType>
      <StyleButton>
        <Button
          variant="outlined"
          sx={{ color: "black", right: "10px" }}
          // onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="outlined"
          sx={{ color: "black", background: "#f24b50" }}
          // onClick={handleClose}
        >
          Save
        </Button>
      </StyleButton>
    </TabPanel>
  );
};

export default General;
