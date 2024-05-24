import React from "react";
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
import "../../CSSFile/Courses.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

const AddContentDrawer = (anchor) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,  
    bottom: false,
    right: false,
  });
  const [vdo, setVdo] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const toggleDrawerVideo = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setVdo({ ...vdo, [anchor]: open });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      className="folderDrawer"
      //   sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h2 style={{marginLeft: "4%"}}>Add Folder</h2>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <Divider />

      <Box className="FolderNameBox">
        <h4>Folder name</h4>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <Paper
      component="form"
      sx={{
        ml: "2px",
        mt: "12px",
        mb: "-1px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "20%",
        borderRadius: "10px"
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter folder name"
        inputProps={{ 'aria-label': 'search your course by name' }}
      />
    </Paper>
        </Box>
      </Box>

      <Divider sx={{ mt: "444px" }} />
      <Button className="folderDrawerSaveBtn">Save</Button>
    </Box>
  );
};

export default AddContentDrawer;
