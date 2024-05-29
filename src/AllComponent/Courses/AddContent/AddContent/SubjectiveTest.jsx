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
import "../../../CSSFile/Courses.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import SubjTestMainPage from "./SubjTestMainPage";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import UploadIcon from "@mui/icons-material/Upload";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import WestIcon from '@mui/icons-material/West';
import { Link } from "react-router-dom";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
];
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

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

  const [newTest, setNewTest] = useState(false);
  const handleCreateNewTest = () => {
    setNewTest(true);
  };

  const handleSubjTestMainPage = () => {
    setNewTest(false)
  }

  return (
    <>
      <Box
        className="subjTestFolderDrawer"
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        {newTest ? (
          <>
            <h2 style={{ marginLeft: "4%" }}>
              <WestIcon sx={{position:"relative", right:"14px", top:"7px", fontSize:"1.9rem"}} 
              onClick={handleSubjTestMainPage}/>
              Create New Subjective Test</h2>

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

            <Box className="subjTestBox">
              <h4>Test name</h4>
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                }}
              >
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={top100Films}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.title}
                    </li>
                  )}
                  style={{ width: "100%", borderRadius: "10px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Enter Test Name"
                      className="stylingAutofield"
                    />
                  )}
                />
              </Box>
            </Box>

            <Box className="subjTestBox">
              <h4>Total Marks</h4>
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                }}
              >
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={top100Films}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.title}
                    </li>
                  )}
                  style={{ width: "100%", borderRadius: "10px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Enter marks"
                      className="stylingAutofield"
                    />
                  )}
                />
              </Box>
            </Box>

            <Box className="subjTestBox">
              <h4>Attach files</h4>
              <Box className="subjTestAttachFiles">
                <UploadIcon
                  sx={{
                    fontSize: "1.2rem",
                    position: "relative",
                    top: "4px",
                    left: "-6px",
                  }}
                />
                Attach files
              </Box>
            </Box>

            <Box className="addImgPara">
              <div><LightbulbIcon sx={{color:"yellow", position:"relative", top:"21px", right:"5px"}}/></div>
              <div>
                <p>Add images or PDFs containing subjective questions. You can attach upto 100 files.
                   Maximum file size that can be attached is 40 MB.</p>
              </div>
            </Box>

            <Box className="yellowBoxDiscription">
               Your students will be able to upload their answer files.
                You can evaluate & give feedback on their answer sheet.
            </Box>

            <Divider sx={{ mt: "26px" }} />
            <Button className="subjTestAddTestBtn">Create & Add Test</Button>
          </>
        ) : (
          <SubjTestMainPage handleCreateNewTest={handleCreateNewTest} />
        )}
      </Box>
    </>
  );
};

export default SubjectiveTest;
