import MenuItem from "@mui/material/MenuItem";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ViewProject = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <MenuItem onClick={handleClose} disableRipple>
        <VisibilityIcon />
        View
      </MenuItem>
    </div>
  );
};

export default ViewProject;
