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
import Button from "@mui/material/Button";

import DoneIcon from "@mui/icons-material/Done";

const label = { inputProps: { "aria-label": "Switch demo" } };

const CourseHeader = ({ Heading, subHeading }) => {
  const [state, setState] = useState({
    left: false,
  });
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setState(false);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 450,
        margin: "20px",
      }}
      role="presentation"
    >
      <Box className="flexrow JustfiSB">
        <h3>My Profile</h3>
        <ClearIcon onClick={handleChange} className="Xicon pointer" />
      </Box>
      <Box className="BasicInfoBox">
        <Box className="margin20">
          <Box className="flexrow JustfiSB">
              <Box className="flexrow width80">
             <h5>Basic Information</h5> <DoneIcon  className="TickIcon "/>
            </Box>
            <Button>Edit</Button>
          </Box>
          <Box className="flexrow BasicInfo">
            <Box className="flexrow">
              <PermIdentityOutlinedIcon className="infoicon" />{" "}
              <Typography className="InfoTextLeft">Name:</Typography>
            </Box>
            <Typography className="InfoTextRight">360 Critcial Care</Typography>
          </Box>
          <Box className="flexrow BasicInfo">
            <Box className="flexrow">
              <PermIdentityOutlinedIcon className="infoicon" />
              <Typography className="InfoTextLeft">Email:</Typography>
            </Box>
            <Typography className="InfoTextRight">360 Critcial Care</Typography>
          </Box>
          <Box className="flexrow BasicInfo">
            <Box className="flexrow">
              <PermIdentityOutlinedIcon className="infoicon" />
              <Typography className="InfoTextLeft">Mobile:</Typography>
            </Box>
            <Typography className="InfoTextRight">360 Critcial Care</Typography>
          </Box>
          <Box className="flexrow BasicInfo">
            <Box className="flexrow">
              <PermIdentityOutlinedIcon className="infoicon" />
              <Typography className="InfoTextLeft">About:</Typography>
            </Box>
            <Typography className="InfoTextRight">360 Critcial Care</Typography>
          </Box>
        </Box>
      </Box>
      <Box className="BasicInfoBox">
        <Box className="margin20">
          <Box className="flexrow JustfiSB">
          <Box className="flexrow width80">
             <h5>Bank Details</h5> <DoneIcon className="TickIcon"/>
            </Box>
            <Button>Edit</Button>
          </Box>
          <Box className="flexrow BasicInfo">
            <Box className="flexrow">
              <PermIdentityOutlinedIcon className="infoicon" />
              <Typography className="InfoTextLeft">Name:</Typography>
            </Box>
            <Typography className="InfoTextRight">360 Critcial Care</Typography>
          </Box>
          <Box className="flexrow BasicInfo">
            <Box className="flexrow">
              <PermIdentityOutlinedIcon className="infoicon" />
              <Typography className="InfoTextLeft">Email:</Typography>
            </Box>
            <Typography className="InfoTextRight">360 Critcial Care</Typography>
          </Box>
          <Box className="flexrow BasicInfo">
            <Box className="flexrow">
              <PermIdentityOutlinedIcon className="infoicon" />
              <Typography className="InfoTextLeft">Mobile:</Typography>
            </Box>
            <Typography className="InfoTextRight">360 Critcial Care</Typography>
          </Box>
        </Box>
      </Box>
      <Box className="BasicInfoBox">
        <Box className="margin20">
        <Box className="flexrow JustfiSB">
          <h5>Show Classplus Branding</h5>
          <Switch {...label} />
        </Box>
        </Box>
      </Box>

      <Box className="BasicInfoBox">
        <Box className="margin20">
        <Box className="flexrow JustfiSB">
          <Box className="flexrow width80">
           <Typography> Text Details </Typography><WarningIcon  className="WarningIcon"/>
          </Box>
          <Button>Edit</Button>
        </Box>
        <Box className="flexrow BasicInfo">
          <Box className="flexrow width80">
            <PermIdentityOutlinedIcon />
            Billing Address:
          </Box>
        </Box>
        <Box className="flexrow BasicInfo">
          <Box className="flexrow width80">
            <PermIdentityOutlinedIcon />
            GSTIN:
          </Box>
        </Box>
        </Box>
      </Box>

     
    </Box>
  );

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
          {list("right")}
        </SwipeableDrawer>
      </Box>
    </Box>
  );
};
export default CourseHeader;