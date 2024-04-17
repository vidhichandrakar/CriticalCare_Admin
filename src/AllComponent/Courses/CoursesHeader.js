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


const CourseHeader = ({ Heading, subHeading }) => {
  const [value, setValue] = useState("");

  const [state, setState] = useState({
    left: false,
  });

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
    <Box className="HeaderBox">
      <Box className="HeaderLeft">
        <Typography className="headerText">{Heading}</Typography>
        <Typography className="subHeader">{subHeading}</Typography>
      </Box>

      <Box className="HeaderRight">
        <FormControl sx={{ m: 1, minWidth: 240 }}>
          <Select
            className="selectDesign"
            displayEmpty
            renderValue={() => {
              return <em className="labelDesign">360 Critcial Care</em>;
            }}
            inputProps={{ "aria-label": "Without label" }}
            startAdornment={
              <div className="logoDesign">
                <Typography className="logoText">3CC</Typography>
              </div>
            }
            value={value}
          >
             {/* <MenuItem>
            <li class="menu-item">
<a href="#0" class="widgets">
  <i class="ion ion-ios-aperture-outline"></i>
  <span>Widgets</span>
  <div class="dots"></div>
</a>
<ol class="sub-menu">
  <li class="menu-item item--a"><a href="#0" class="item--a"><span>Big Widgets</span></a></li>
  <li class="menu-item item--b"><a href="#0" class="item--b"><span>Bigger Widgets</span></a></li>
  <li class="menu-item item--b"><a href="#0" class="item--c"><span>Huge Widgets</span></a></li>
</ol>
</li>
             </MenuItem> */}

            <MenuItem
              className="selectDesign hoverrr"
              value={"Profile"}
              onClick={toggleDrawer("right", true)}
            >
              <Box className="eachBox">
              <PersonRoundedIcon className="designingIcons" />
              Profile
              </Box>
            </MenuItem>
            <Divider/>

            <MenuItem className="selectDesign hoverrr" value={"Profiles"}>
            <Box className="eachBox">
              <CurrencyRupeeIcon className="designingIcons" />
              Recharge
              </Box>
            </MenuItem>
            <Divider/>

            <MenuItem className="selectDesign hoverrr" value={"Profiled"}>
            <Box className="eachBox">
              <SettingsRoundedIcon className="designingIcons" />
              Settings
            </Box>
            </MenuItem>
            <Divider/>

            <MenuItem className="selectDesign hoverrr" value={"Profilea"}>
            <Box className="eachBox">
              <QuizRoundedIcon className="designingIcons" />
              Help and Support
              </Box>
            </MenuItem>
            <Divider/>

            <Link to="/admin" className="textDecorationDD">
              {" "}
              <MenuItem
                className="selectDesign hoverrr"
                value={"Profileik"}
                onClick={handleLogout}
              >
                <Box className="eachBoxLogout">
                <LogoutTwoToneIcon className="designingIconsLogout" />
                Log Out
                </Box>
              </MenuItem>
            </Link>

          </Select>
        </FormControl>

        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {ProfileList("right")}

          {/* <List /> */}
        </SwipeableDrawer>
      </Box>
    </Box>
  );
};
export default CourseHeader;
