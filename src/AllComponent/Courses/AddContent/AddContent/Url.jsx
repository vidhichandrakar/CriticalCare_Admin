import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
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
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import "../../CSSFile/Courses.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { CommonTypography, commonTextField } from "../../../../Util/CommonFields";

const Url = ({anchor, handelclose}) => {
  const [state, setState] = useState({
    top: false,
    left: false,  
    bottom: false,
    right: false,
  });
  const [open, setOpen] = useState(true);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  
  return (
    <Box
      className="folderDrawer"
      //   sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h2 style={{marginLeft: "4%"}}>Add Url</h2>
      <IconButton
        aria-label="close"
        
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Box onClick= {handelclose("right", false)}>
          <CloseIcon  /></Box>
      </IconButton>
      <Divider />

      <Box className="FolderNameBox">
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
        <Box> 
        {CommonTypography({ fontWeight: 600, label: "Content Name" })}
        {commonTextField(
        {
          id: "fullWidth",
          className: "BoxShadow mt2",
          inputClassName: "textField PaddingOnly",
          labels: "Enter Content name",
        },
      )}
      </Box>
        <Box sx={{mt: 2}}> 
        {CommonTypography({ fontWeight: 600, label: "Url" })}
        {commonTextField(
        {
          id: "fullWidth",
          className: "BoxShadow mt2",
          inputClassName: "textField PaddingOnly",
          labels: "Paste URL Path",
        },
      )}
      </Box>
          
        </Box>
      </Box>

      <Divider sx={{ mt: "370px" }} />
      <Box className="UploadBtnBox">
      <Button className="folderDrawerSaveBtn">Upload</Button>
      </Box>
    </Box>
  );
};

export default Url;
