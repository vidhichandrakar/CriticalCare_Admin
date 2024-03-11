import React, { useState } from 'react'
import { Box, Typography } from "@mui/material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import Switch from "@mui/material/Switch";
import WarningIcon from "@mui/icons-material/Warning";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DoneIcon from "@mui/icons-material/Done";

const label = { inputProps: { "aria-label": "Switch demo" } };
 
const ProfileList = (anchor) => {
    const [state, setState] = useState({
        left: false,
      });
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

    return(
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
    )
    };


export default ProfileList
