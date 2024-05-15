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

      {/* autoclose start */}
     {/* <button
      type="button"
      data-bs-toggle="dropdown"
      data-bs-auto-close="true"
      aria-expanded="false">
        Logo
     </button>
     <ul>
      <li> <a href="#">Profile</a></li>
      <li> <a href="#">python</a></li>
      <li> <a href="#">Pro</a></li>
      <li> <a href="#">ddddd</a></li>
     </ul> */}

{/* <button
type="button"
data-bs-toggle="dropdown"
data-bs-auto-close="inside"
aria-expanded="false">
Logo
</button>
<ul>
      <li> <a href="#">Profile</a></li>
      <li> <a href="#">python</a></li>
      <li> <a href="#">Pro</a></li>
      <li> <a href="#">ddddd</a></li>
     </ul> */}

      {/* autoclose end  */}

      <Box className="HeaderRight">
        <FormControl sx={{ m: 1, minWidth: 240 }}>
          <Select
            className="selectDesign"
            // data-bs-auto-close="true"
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
              {" "}
              <MenuItem
                className="selectDesign hoverrr"
                value={"Profileik"}
                onClick={handleLogout}
              >
                <LogoutTwoToneIcon className="designingIconsLogout" />
                <span className="ccLogout">Log Out</span>
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
