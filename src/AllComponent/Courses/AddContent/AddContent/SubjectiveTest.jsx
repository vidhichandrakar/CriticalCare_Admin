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
import "../../../CSSFile/Courses.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
// import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";



const SubjectiveTest = (anchor) => {
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
      <h2 style={{marginLeft: "4%"}}>Add Subjective Test</h2>
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

      <Box className="addSubjUploadBox">
        {/* <h4>Folder name</h4>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField fullWidth label="fullWidth" id="fullWidth" />
        </Box> */}
        <div>
          <p>Upload your subjective test papers & create a new test within a minute!</p>
        </div>
        
        <Button className="createNewTestBtn">Create New Test</Button>
      </Box>

      <p className="subjBoldPara"><b>You can also select from previously created tests</b></p>

      <Paper
      component="form"
      sx={{
        ml: "36px",
        mt: "56px",
        mb: "-9px",
        display: "flex",
        alignItems: "center",
        width: "594px",
        backgroundColor: "#e4e4e459",
        borderRadius: "10px"
      }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <SearchIcon />
      </IconButton>
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by name"
        inputProps={{ 'aria-label': 'search your course by name' }}
      />
    </Paper>

    <Box className="A-searchImageSection">
      <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F749535%2Fa_document_find_letter_search_icon&psig=AOvVaw3fZLu9FmZUBiiqwVB5lq14&ust=1717010672877000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLDUsNaJsYYDFQAAAAAdAAAAABAE"
       width={120} height={110} sx={{borderRadius:"50%"}} />
      <h3>No Result found</h3>
    </Box>
      
      <Divider sx={{ mt: "53px" }} />
      <Button className="folderDrawerSaveBtn">Add test</Button>
    </Box>
  );
};

export default SubjectiveTest;
