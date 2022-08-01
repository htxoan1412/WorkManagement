import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getCurrentLoginInformationsApi } from "../../api/auth/auth";
import { getCurrentLoginInformations } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";

const Container = styled.div`
  height: 60px;
  /* background-color: blue; */
  padding: 0 20px;
  border-bottom: 1px solid #ccc;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TextTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: #111;
`;
interface Props {
  title: string;
}
const ViewMainHead: React.FC<Props> = ({ title }) => {
  const dispatch= useDispatch();
  return (
    <Container>
      <Content>
        <TextTitle>{title}</TextTitle>
        <MoreVertIcon />
      </Content>
    </Container>
  );
};

export default ViewMainHead;
