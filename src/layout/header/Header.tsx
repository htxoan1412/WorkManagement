import styled from "styled-components";
import logo from "../../asset/image/nccsoft_vietnam_logo.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const Content = styled.div`
  background: #f44336;
  display: flex;
  justify-content: space-between;
  height: 70px;
  padding: 0 15px;
  align-items: center;
`;
const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 20px;
    width: 20px;
    padding-right: 9px;
  }
`;
const TextLeft = styled.div`
  color: #fff;
  font-size: 18px;
`;
const RightHeader = styled.div`
  display: flex;
`;
const TextRight = styled.div`
  color: #fff;
  font-size: 18px;
  padding-right: 5px;
`;

const Header = () => {
  return (
    <Content>
      <LeftHeader>
        <img src={logo} />
        <TextLeft>Timesheet</TextLeft>
      </LeftHeader>
      <RightHeader>
        <TextRight>English</TextRight>
        <MoreVertIcon style={{ color: "#fff" }} />
      </RightHeader>
    </Content>
  );
};

export default Header;
