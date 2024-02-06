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

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const CourseHeader = ({ Heading, subHeading }) => {
  const [state, setState] = useState({
    left: false,
  });
  const [menuOptipnOpen, setMenuOptipnOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue("event");
    setMenuOptipnOpen(false);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box className="HeaderBox">
      <Box className="HeaderLeft">
        <Typography className="headerText">{Heading}</Typography>
        <Typography className="subHeader">{subHeading}</Typography>
      </Box>
      <Box className="HeaderRight">
        {console.log(menuOptipnOpen, "hjhjkkl;lkj")}
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
            <MenuItem className="selectDesign" value={"Profiles"}>
              <CurrencyRupeeIcon />
              Recharge
            </MenuItem>
            <MenuItem className="selectDesign" value={"Profiled"}>
              {" "}
              <SettingsOutlinedIcon />
              Settings
            </MenuItem>
            <MenuItem className="selectDesign" value={"Profilea"}>
              {" "}
              <QuizOutlinedIcon />
              Help and Support
            </MenuItem>
            <MenuItem className="selectDesign" value={"Profileik"}>
              {" "}
              <LogoutTwoToneIcon />
              Logout
            </MenuItem>

            <MenuItem value={"Profile"} onClick={toggleDrawer("right", true)}>
              {/* <Button onClick={toggleDrawer("right", true)}> */}
                Profile
                {/* </Button> */}
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
