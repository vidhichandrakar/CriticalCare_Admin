import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import ClearIcon from "@mui/icons-material/Clear";
import Switch from "@mui/material/Switch";
import WarningIcon from "@mui/icons-material/Warning";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ProfileList from "../SubComponent/ProfileList";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import { Link } from "react-router-dom";
import { DialogContent } from '@mui/material';
import Divider from '@mui/material/Divider'; 
import PersonIcon from '@mui/icons-material/Person';
import Popover from "@mui/material/Popover";
import Logo from "../../Media/Logo.png";

const Header = ({ Heading, subHeading }) => {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  const [state, setState] = useState({
    left: false,
  });
  
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ state, [anchor]: open });
  };

  const handleLogout = () => {
    localStorage.setItem("loggedInUser", null);
    localStorage.setItem("subMenuCourses", false);
    localStorage.setItem("subMenuPeople", false);
  };

  return (
    <Box className="header">
      <Box className="HeaderLeft">
        <Typography className="headerText">{Heading}</Typography>
      </Box>
      <Box className="HeaderRight">
        <Box  onClick={handleClick} className="logoCircle">
        <PersonIcon className="logoDesign"/>
        </Box>
      </Box>
          <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                sx={{ mt: "5px" }}
                value={value}
              > 
               <MenuItem
              className="selectDesign hoverrr"
              value={"Profile"}
              onClick={toggleDrawer("right", true)}
            >
              <PersonRoundedIcon className="designingIcons" />
              <span className="ccLogout">Profile</span>
            </MenuItem>
            <Divider/>

            <MenuItem className="selectDesign hoverrr" value={"Profiles"}>
              <CurrencyRupeeIcon className="designingIcons" />
              <span className="ccLogout">Recharge</span>
            </MenuItem>
            <Divider/>

            <MenuItem className="selectDesign hoverrr" value={"Profiled"}>
              <SettingsRoundedIcon className="designingIcons" />
              <span className="ccLogout">Settings</span>
            </MenuItem>
            <Divider/>

            <MenuItem className="selectDesign hoverrr" value={"Profilea"}>
              <QuizRoundedIcon className="designingIcons" />
              <span className="ccLogout">Help and Support</span>
            </MenuItem>
            <Divider/>

            <Link to="/admin" className="textDecorationDD">
              <MenuItem
                className="selectDesign hoverrr"
                value={"Profileik"}
                onClick={handleLogout}
              >
                <Box className="eachBoxLogout">
                 <LogoutTwoToneIcon className="designingIconsLogout" />
                <span className="ccLogout">Log Out</span>
                </Box> 
              </MenuItem>
            </Link>
            <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {ProfileList("right")}

      {/* <ProfileList /> */}
        </SwipeableDrawer> 
              </Popover>
    </Box>
  );
};
export default Header;
