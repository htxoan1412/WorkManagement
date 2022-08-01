import MenuItem from '@mui/material/MenuItem';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IProject } from '../../../../api/project/type'
import { resetProgress } from '../../../../redux/reducer/project/projectReducer';
import { RootState } from '../../../../redux/reducer/store';
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Button from '@mui/material/Button';
import { activeProject, getAllProject, inactiveProject } from '../../../../redux/actions/project';

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "478px",
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "16px",
    borderRadius: "5px",
  };
  const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  `;
  const StyleButton = styled.div`
    padding-top: 29px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `;
  const TextTitle = styled.div`
    color: rgba(0, 0, 0, 0.65);
    margin-bottom: 10px;
    font-size: 27px;
    font-weight: 600;
  `;

  const TextDescription = styled.div`
    font-size: 18px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.64);
  `;
export const DeActive:React.FC<{ project: IProject }> = ({project}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        setOpen(false);
      
    }, [ dispatch]);
  
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const progress = useSelector((state: RootState) => state.project.progress);
    const handleDispatch = (id:number)=>{
        handleClose();
        dispatch(activeProject({id}));
        dispatch(getAllProject({status:0}));
    }
  return (
    <div>
    <MenuItem onClick={handleOpen} disableRipple>
      <DeleteIcon />
      Active
    </MenuItem>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={style}>
        <Form>
          <ErrorOutlineIcon
            sx={{
              color: "#f8bb86",
              fontSize: "120px",
              paddingBottom: "15px",
            }}
          />
          <TextTitle>Are you sure?</TextTitle>
          <TextDescription>Deactive project: '{project.name}'?</TextDescription>
          <StyleButton>
            <Button
              variant="outlined"
              sx={{ color: "black", right: "10px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outlined"
              sx={{ color: "black", background: "#7cd1f9" }}
              onClick={() => handleDispatch(project.id)}
            >
              Yes
            </Button>
          </StyleButton>
        </Form>
      </Box>
    </Modal>
  </div>
  )
}
