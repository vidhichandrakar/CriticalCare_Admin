import React from "react";
import Box from "@mui/material/Box";
import { TextField, colors } from "@mui/material";
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
import "../../../CSSFile/Courses.css"
import { Margin } from "@mui/icons-material";
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const Video = (anchor) => {
  const [state, setState] = React.useState({
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
      {/* <Box className="HeaderBox"> */}
      <h2 style={{marginLeft: "1%"}}>Upload Videos</h2>
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
      {/* </Box> */}
      <Divider />

      {/* <Box className="FolderNameBox">
        <h4>Folder name</h4>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField fullWidth label="fullWidth" id="fullWidth" />
        </Box>
      </Box> */}
      <div className="dividingVdoSections">
        <div>
          <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fvideo%2Fsearch%2Floading-animation&psig=AOvVaw254a2VPjxUd2pCz7A6yRqH&ust=1716589631859000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLC27u3opIYDFQAAAAAdAAAAABAE"
           width={120} height={90}/>
        </div>

        <div sx={{marginLeft:"300px"}} className="middleSectionVdo">
          <div>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
           fullWidth
            label="WhatsApp Video 2024-05 23 at 12.."
            // id="fullWidth"
            sx={{ marginLeft:"-6px" ,width:"80%", padding:"-2px -6px"}}/>
        </Box>
      </div>


      <Box className="addDiscriptionuploading">
        <p className="vdoAddDescription">+ Add Description</p>
        <Divider/>
        <div className="uploadZeroPerc">
        <p>Uploading: 0%</p>
        <PauseCircleIcon sx={{mt:"10px", color:"grey"}}/>
        </div>
      </Box>
        </div>

        <div>
        <IconButton
        aria-label="close"
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
        </div>
      </div>

      <Divider sx={{ mt: "363px" }} />

      <div className="lastButtons">
      <Button className="videoDrawerAdvSettBtn">Advanced Settings</Button>
      <Button className="videoDrawerDoneBtn">Done</Button>
      </div>
      
    </Box>
  );
};

export default Video;
