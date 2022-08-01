import { ExpandLess, ExpandMore } from "@mui/icons-material";
import TabPanel from "@mui/lab/TabPanel";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getUserNotPagging } from "../../../../../redux/actions/project";
import { setSearchName } from "../../../../../redux/reducer/project/projectReducer";
import { RootState } from "../../../../../redux/reducer/store";
import ListView from "./ListView/ListView";
import SelectBranch from "./SelectBranch/SelectBranch";
import ViewHeader from "./ViewHeader/ViewHeader";

const Container = styled.div`
  padding: 30px;
`;
const Header = styled.div`
  padding: 0px 30px;
`;
const Text = styled.div``;
const StyledCheckBox = styled.div`
  display: flex;
  align-items: center;
`;
const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const LeftHeader = styled.div`
  display: flex;
  align-items: center;
`;
const TextView = styled.div``;
const RightHeader = styled.div`
  display: flex;
`;
const Team = () => {
  const [openShowMember, setOpenShowMember] = React.useState(true);
  const [openSelectMember, setOpenSelectMember] = React.useState(true);
  const handleClickShowMember = () => {
    setOpenShowMember(!openShowMember);
  };
  const handleClickSelectMember = () => {
    setOpenSelectMember(!openSelectMember);
  };
  const users = useSelector((state: RootState) => state.project.filteredUsers);
  const members = useSelector(
    (state: RootState) => state.project.selectedMembers
  );
  const searchName = useSelector(
    (state: RootState) => state.project.searchName
  );
 

  const dispatch = useDispatch();
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    dispatch(
      setSearchName({
        searchName: searchItem,
      })
    );
  }, [searchItem, dispatch]);
  return (
    <TabPanel
      value="2"
      sx={{
        padding: "20px",
        paddingLeft: "0",
        height: "500px",
        overflowY: "auto",
      }}
    >
      <div>
        <Header>
          <Block>
            <LeftHeader>
              <Text>Team</Text>
              <StyledCheckBox>
                <Checkbox
                  sx={{
                    color: red[800],
                    "&.Mui-checked": {
                      color: red[600],
                    },
                  }}
                />
                <Text>Show deactive member</Text>
              </StyledCheckBox>
            </LeftHeader>
            <RightHeader onClick={handleClickShowMember}>
              <Text>Member Type</Text>
              {openShowMember ? <ExpandLess /> : <ExpandMore />}
            </RightHeader>
          </Block>
          <Collapse in={openShowMember} timeout="auto" unmountOnExit>
            {members.map((member) => {
              return <ViewHeader key={member.id} selectedMember={member} />;
            })}
          </Collapse>
        </Header>
        <Container>
          <Block>
            <LeftHeader>
              <TextView>Select team member</TextView>
            </LeftHeader>
            <RightHeader onClick={handleClickSelectMember}>
              {openSelectMember ? <ExpandLess /> : <ExpandMore />}
            </RightHeader>
          </Block>
          <Collapse in={openSelectMember} timeout="auto" unmountOnExit>
            <div>
              <SelectBranch setSearchKey={setSearchItem} />
              {users
                .filter((item) => item.name.includes(searchName))
                .map((item) => {
                  return <ListView user={item} />;
                })}
            </div>
          </Collapse>
        </Container>
      </div>
    </TabPanel>
  );
};
export default Team;
