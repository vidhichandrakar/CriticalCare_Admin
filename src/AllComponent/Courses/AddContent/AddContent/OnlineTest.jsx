import React, { useEffect, useState } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { getOnlineTest } from "../../../ActionFactory/apiActions";


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const OnlineTest = ({ anchor, handelclose }) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [testName, setTestName] = useState([])
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
 
  ];
  useEffect(()=>{
    getOnlineTest({
      callBack:(response)=>{
        setTestName(response.data);
      }
    })

  },[])

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
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {console.log("testNametestName",testName)}
      <h2 style={{ marginLeft: "4%" }}>Add online test</h2>
      <IconButton
        aria-label="close"
        onClick={handelclose("right", false)}
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
        <h4>Test/Folder name</h4>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={testName}
            disableCloseOnSelect
            getOptionLabel={(option) => option.test_name}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.test_name}
              </li>
            )}
            style={{ width: "100%", borderRadius: "10px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                // label="Select tests or folders"
                placeholder="Select tests or folders"
                className="stylingAutofield"
              />
            )}
          />
        </Box>
      </Box>

      <Box className="FolderNameBox">
        <h4>Number of attempts</h4>
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
                placeholder="1"
                className="stylingAutofield"
              />
            )}
          />
        </Box>
      </Box>

      <div className="OTLastCheckbox">
        <Checkbox {...label} sx={{ color: "lightgrey" }} />
        <p>Set unlimited attempts</p>
      </div>
      {/* <Box className="selectTestCompleteBox">
        <DialogTitle
          sx={{ m: "-30px -6px", p: -2 }}
          id="customized-dialog-title"
        >
          <h5>Select tests or folders</h5>
        </DialogTitle>
        <DialogContent dividers>
          <Box className="selectTestsOptions">
            <div>
              <Checkbox {...label} sx={{ color: "lightgrey" }} />
            </div>
            <FontDownloadIcon
              sx={{
                position: "relative",
                bottom: "-10px",
                right: "2px",
                color: "#0f7af5",
              }}
            />
            <p>Trics 1 Module 8</p>
          </Box>

          <Box className="selectTestsOptions">
            <div>
              <Checkbox {...label} sx={{ color: "lightgrey" }} />
            </div>
            <FontDownloadIcon
              sx={{
                position: "relative",
                bottom: "-10px",
                right: "2px",
                color: "#0f7af5",
              }}
            />
            <p>Cardio Vascular System</p>
            <Box className="realExamTestOne">Real Exam Test</Box>
          </Box>

          <Box className="selectTestsOptions">
            <div>
              <Checkbox {...label} sx={{ color: "lightgrey" }} />
            </div>
            <FontDownloadIcon
              sx={{
                position: "relative",
                bottom: "-10px",
                right: "2px",
                color: "#0f7af5",
              }}
            />
            <p>TRICS DEMO</p>
            <Box className="realExamTestTwo">Real Exam Test</Box>
          </Box>

          <Box className="selectTestsOptions">
            <div>
              <Checkbox {...label} sx={{ color: "lightgrey" }} />
            </div>
            <FontDownloadIcon
              sx={{
                position: "relative",
                bottom: "-10px",
                right: "2px",
                color: "#0f7af5",
              }}
            />
            <p>TRICS FREE TEST</p>
          </Box>

          <Box className="selectTestsOptions">
            <div>
              <Checkbox {...label} sx={{ color: "lightgrey" }} />
            </div>
            <FontDownloadIcon
              sx={{
                position: "relative",
                bottom: "-10px",
                right: "2px",
                color: "#0f7af5",
              }}
            />
            <p>Neuromonitoring Online Test A-Type</p>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            // autoFocus
            onClick={handleClose}
            sx={{
              textTransform: "none",
              bgcolor: "#43c5f0 ",
              color: "#ffffff",
              borderRadius: "12px",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Box> */}

      <Divider sx={{ mt: "226px" }} />
      <Button className="OTDrawerAddTestBtn">Add Test</Button>
    </Box>
  );
};

export default OnlineTest;
