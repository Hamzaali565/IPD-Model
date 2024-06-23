import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Drawer({ onClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value) => {
    onClick(value);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <p className="text-3xl">|||</p>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("service")}>Services</MenuItem>
        <MenuItem onClick={() => handleClose("lab")}>Laboratory</MenuItem>
        <MenuItem onClick={() => handleClose("med")}>Medicines</MenuItem>
        <MenuItem onClick={() => handleClose("radio")}>Radiology</MenuItem>
        <MenuItem onClick={() => handleClose("view")}>View History</MenuItem>
      </Menu>
    </div>
  );
}
