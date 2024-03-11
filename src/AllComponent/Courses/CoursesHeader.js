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
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ProfileList from "../SubComponent/List"



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
    setState({state, [anchor]: open });
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
            <MenuItem
              className="selectDesign hoverrr"
              value={"Profile"}
              onClick={toggleDrawer("right", true)} 
            >
              <PermIdentityOutlinedIcon  />
              Profile
            </MenuItem>
            <MenuItem className="selectDesign hoverrr" value={"Profiles"}>
              <CurrencyRupeeIcon />
              Recharge
            </MenuItem>
            <MenuItem className="selectDesign hoverrr" value={"Profiled"}>
              <SettingsOutlinedIcon />
              Settings
            </MenuItem>
            <MenuItem className="selectDesign hoverrr" value={"Profilea"}>
              <QuizOutlinedIcon />
              Help and Support
            </MenuItem>
            <MenuItem className="selectDesign hoverrr" value={"Profileik"}>
              <LogoutTwoToneIcon />
              Logout
            </MenuItem>
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