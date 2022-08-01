import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { removeAccessToken } from "../../utils/localStorageService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/store";

const Container = styled.div`
  width: 330px;
  height: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
`;
const SidebarTop = styled.div`
background-color: blue;
background-image: url("http://dev.timesheet.nccsoft.vn/user-img-background.7f354e93c30f9d51fc3a.jpg");
padding-top: 15px;
/* height: 100px; */

`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
`
const TextName = styled.div`
  padding-bottom: 2px;
  color: #fff;
`
const TextEmail = styled.div`
color: #fff;
  
`
const SidebarList = styled.div`
height: 450px;
`;

const SidebarBottom = styled.div``;

const Avatar = styled.div`
  margin-left: 15px;
  margin-right: 10px;
  img {
    margin-right: 5px;
    width: 60px;
    border-radius: 50%;
  }
`;

const Info = styled.div`
/* display: flex;
flex-direction: column; */
`;
const ButtonLogout = styled.button`
 margin-left: 264px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 300;
  font-size: 10px;
  color: black;
  & :focus {
    font-size: 20px;
    font-weight: 600;
  }
`;

const Sidebar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state: RootState) => state.auth.currentLoginInformations.user)
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    removeAccessToken();
    navigate("/");
  };


  return (
    <Container>
     
      <SidebarTop>
        <UserInfo>
          <Avatar>
            <img src="http://dev.timesheetapi.nccsoft.vn/avatars/1637318238561_1_admin.jpg" />
          </Avatar>
          <Info>
            <TextName>{user.name}</TextName>
            <TextEmail>{user.emailAddress}</TextEmail>
          </Info>
        </UserInfo>
        <ButtonLogout onClick={handleLogout}>Logout</ButtonLogout>
      </SidebarTop>
      <SidebarList>
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
            ></ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home page" />
          </ListItemButton>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              {/* <HomeIcon /> */}
              <GroupWorkIcon/>
            </ListItemIcon>
            <ListItemText primary="Admin" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </List>
          </Collapse>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <StyledLink to="/home/tasks">
                <ListItemButton sx={{ pl: 4 }}>
                  {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Tasks" /> */}
                   <ListItemIcon>
                  <MenuBookIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Task" />
                </ListItemButton>
              </StyledLink>
            </List>
          </Collapse>
          <StyledLink to="/home/projects">
            <ListItemButton>
              <ListItemIcon>
                <InsertChartIcon/>
              </ListItemIcon>
              <ListItemText primary="Project" />
            </ListItemButton>
          </StyledLink>

          {/* <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse> */}
        </List>
      </SidebarList>
      <SidebarBottom />
    </Container>
  );
};

export default Sidebar;
function useHistory() {
  throw new Error("Function not implemented.");
}
