import React, { useState } from "react";
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
import "../../../CSSFile/Courses.css";
import { Margin } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

// export interface ConfirmationDialogRawProps {
//   id: string;
//   keepMounted: boolean;
//   value: string;
//   open: boolean;
//   onClose: (value?: string) => void;
// }

const Video = (anchor) => {
  const [state, setState] = useState({
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

  // const { onClose, value: valueProp, open, ...other } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClosee = () => {
    setOpen(false);
    // onClose();
  };

  const [videoDescription, setVideoDescription] = React.useState(false);
  const handleVideoDescription = () => {
    setVideoDescription(true);
    var njk = setVideoDescription ? (
      <Box className="addDiscriptionuploading">
        <p className="vdoAddDescription" onClick={handleVideoDescription}>
          + Add Description
        </p>
        <Divider />
        <div className="uploadZeroPerc">
          <p>Uploading: 0%</p>
          <PauseCircleIcon sx={{ mt: "10px", color: "grey" }} />
        </div>
      </Box>
    ) : (
      <Box className="addDiscriptionuploading">
        <p className="vdoAddDescription">+ Add Description</p>
        <Divider />
        <div className="uploadZeroPerc">
          <p>Uploading: 0%</p>
          <PauseCircleIcon sx={{ mt: "10px", color: "grey" }} />
        </div>
      </Box>
    );

    return njk;
  };
  // if(setVideoDescription) {
  //   return({

  //   })
  // }

  return (
    <Box
      className="folderDrawer"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h2 style={{ marginLeft: "1%" }}>Upload Videos</h2>
      <IconButton
        aria-label="close"
        onClick={toggleDrawer(anchor, false)}
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

      <div className="dividingVdoSections">
        <div>
          <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fvideo%2Fsearch%2Floading-animation&psig=AOvVaw254a2VPjxUd2pCz7A6yRqH&ust=1716589631859000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLC27u3opIYDFQAAAAAdAAAAABAE"
            width={120}
            height={90}
          />
        </div>

        <div sx={{ marginLeft: "300px" }} className="middleSectionVdo">
          <div>
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
                  borderRadius: "10px",
                }}
              >
                <InputBase
                  sx={{
                    ml: 1,
                    flex: 1,
                    marginTop: "-10px",
                    padding: "2px 11px",
                    borderRadius: "9px",
                    boxShadow: "none",
                  }}
                  placeholder="WhatsApp Video 2024-05 23 at 12.."
                  inputProps={{ "aria-label": "search your course by name" }}
                />
              </Paper>
            </Box>
          </div>

          <Box className="addDiscriptionuploading">
            <p className="vdoAddDescription" onClick={handleVideoDescription}>
              + Add Description
            </p>
            <Divider />
            <div className="uploadZeroPerc">
              <p>Uploading: 0%</p>
              <PauseCircleIcon sx={{ mt: "10px", color: "grey" }} />
            </div>
          </Box>
        </div>

        <div>
          <IconButton aria-label="close" onClick={handleClosee}>
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
