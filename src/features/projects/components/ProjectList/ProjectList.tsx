import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IProject } from "../../../../api/project/type";
import { Groups } from "../../../../redux/interface/project";
import { RootState } from "../../../../redux/reducer/store";
import ActionProject from "./ActionProject";
import dayjs from "dayjs";

const Main = styled.div`
  padding-top: 30px;
`;
const TitleProject = styled.div`
  background-color: lightgray;
  padding: 15px 10px;
  border-radius: 5px;
  font-weight: 700;
  font-size: 19px;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  color: #555555;
`;
const ItemProject = styled.div`
  border-bottom: #ccc solid 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TextNameProject = styled.span`
  font-size: 14px;
  color: #555555;
`;
const TextPM = styled.span`
  margin-left: 5px;
  font-weight: 600;
  background: #2e95ea;
  color: #fff;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 10px;
`;
const TextMember = styled.span`
  margin-left: 5px;
  font-weight: 600;
  background: #f44336;
  color: #fff;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 10px;
`;
const TextTypeProject = styled.span`
  padding: 3px 5px;
  margin-left: 5px;
  font-size: 12px;
  border-radius: 10px;
  background: #f89c26;
  color: #fff;
  font-weight: 600;
`;
const Date = styled.span`
  margin-left: 5px;
  font-weight: 600;
  background: #4caf50;
  color: #fff;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 10px;
`;
const BlockLeft = styled.div``;

const BlockRight = styled.div`
  display: flex;
  align-items: center;
`;

const StyleInactive = styled.div`
  background-color: #9e9e9e;
  border: none;
  border-radius: 3px;
  margin-right: 10px;

  & p {
    font-size: 14px;
    color: white;
    padding: 1px;
    margin: 0;
    font-weight: 600;
  }
`;
const StyleActive = styled.div`
  background-color: #4caf50;
  border: none;
  border-radius: 3px;
  margin-right: 10px;
  align-items: center;

  & p {
    font-size: 14px;
    color: white;
    padding: 1px;
    margin: 0;
    font-weight: 600;
  }
`;
export const formatDay = (day: string) => dayjs(day).format("DD/MM/YYYY");
const ProjectList: React.FC = () => {
  const projects = useSelector((state: RootState) => state.project.allProjects);
  const groups = projects.reduce((groups: Groups, key: IProject) => {
    const customerName = groups[key.customerName] || [];
    customerName.push(key);
    groups[key.customerName] = customerName;
    return groups;
  }, {});
  const customers = useSelector((state: RootState) => state.project.customers);
  const searchName = useSelector((state: RootState) => state.task.searchName);

  return (
    <div>
      {Object.keys(groups).map((group) => {
        return (
          <div>
            <Main key={Object.keys(groups).indexOf(group)}>
              <TitleProject>{group}</TitleProject>
              {projects
                .filter(
                  (item) =>
                    item.customerName === group &&
                    item.name.includes(searchName)
                )
                .map((item,index) => {
                  return (
                    <ItemProject >
                      <BlockLeft key={index}>
                        <TextNameProject>{item.name}</TextNameProject>
                        <TextPM>{item.pms}</TextPM>
                        <TextMember> {item.activeMember} members</TextMember>
                        {/* <TextTypeProject>HTX</TextTypeProject> */}
                        {item.projectType === 0 ? (
                          <TextTypeProject>T&M</TextTypeProject>
                        ) : item.projectType === 1 ? (
                          <TextTypeProject>FF</TextTypeProject>
                        ) : item.projectType === 2 ? (
                          <TextTypeProject>NB</TextTypeProject>
                        ) : (
                          <TextTypeProject>ODC</TextTypeProject>
                        )}
                        {item.timeEnd ? (
                          <Date>
                            {`${formatDay(item.timeStart)}-${formatDay(
                              item.timeEnd
                            )}`}
                          </Date>
                        ) : (
                          <Date>
                            {`${formatDay(item.timeStart)}
                          `}
                          </Date>
                        )}
                      </BlockLeft>
                      <BlockRight>
                        {item.status === 1 ? (
                          <StyleInactive>
                            <p>Inactive</p>
                          </StyleInactive>
                        ) : (
                          <StyleActive>
                            <p>Active</p>
                          </StyleActive>
                        )}
                        <ActionProject project={item} />
                      </BlockRight>
                    </ItemProject>
              
                  );
                })}
            </Main>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
