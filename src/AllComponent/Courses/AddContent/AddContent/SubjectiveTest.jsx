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

  return (
    <>
      {newTest ? (
        // <h1>hey</h1>
        <Box
          className="folderDrawer"
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <h2 style={{ marginLeft: "4%" }}>Create New Subjective Test</h2>
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

          {/* <Box className="addSubjUploadBox">
            <div>
              <p>
                Upload your subjective test papers & create a new test within a
                minute!
              </p>
            </div>

            <Button
              className="createNewTestBtn"
              onClick={() => handleCreateNewTest()}
            >
              Create New Test
            </Button>
          </Box>

          <p className="subjBoldPara">
            <b>You can also select from previously created tests</b>
          </p>

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
              borderRadius: "10px",
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by name"
              inputProps={{ "aria-label": "search your course by name" }}
            />
          </Paper>

          <Box className="A-searchImageSection">
            <img
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F749535%2Fa_document_find_letter_search_icon&psig=AOvVaw3fZLu9FmZUBiiqwVB5lq14&ust=1717010672877000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLDUsNaJsYYDFQAAAAAdAAAAABAE"
              width={120}
              height={110}
              sx={{ borderRadius: "50%" }}
            />
            <h3>No Result found</h3>
          </Box> */}

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
                // label="Select tests or folders"
                placeholder="Enter Test Name"
                className="stylingAutofield"
              />
            )}
          />
        </Box>
      </Box>

      <Box className="subjTestBox">
        <h4>Total marks</h4>
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
                // label="Select tests or folders"
                placeholder="Enter marks"
                className="stylingAutofield"
              />
            )}
          />
        </Box>
      </Box>

          <Divider sx={{ mt: "53px" }} />
          <Button className="subjTestAddTestBtn">Add test</Button>
        </Box>
      ) : (
        <SubjTestMainPage />
      )}
    </>
  );
};

export default SubjectiveTest;
