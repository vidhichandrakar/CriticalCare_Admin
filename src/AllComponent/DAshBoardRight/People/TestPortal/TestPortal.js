import React, { Fragment, useState } from "react";
import CourseHeader from "../../../Courses/CoursesHeader";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchBar from "../../../../Util/SearchBar";
import Popover from "@mui/material/Popover";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SideBar from "../../../AdminDashboardMain/SideBar";
import { Link } from "react-router-dom";
import {Box, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from "@mui/icons-material/Clear";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import BookIcon from '@mui/icons-material/Book';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import FormControl from "@mui/material/FormControl";
import {
  CommonTypography,
  commonButton,
  commonSelect,
  commonTextField,
} from "../../../../Util/CommonFields" ;
import Checkbox from '@mui/material/Checkbox';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const TestPortal = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openId, setOpenId] = useState(0);
  const [openData, setOpenData] = useState("");
  const [popHeading, setPopHeading] = useState("");

  const [state, setState] = useState({
    left: false,
  });
  const [menuOptipnOpen, setMenuOptipnOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleChangeClose = () => {
    setState(false)
  }
  const handleChange = (event) => {
    setValue(event.target.value);
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
    setValue(event.target.value);
  };



  const columns = [
    {
      id: "Tests",
      label: "Tests",
    },
    {
      id: "Date",
      label: "Date",
      align: "center",
    },
    {
      id: "Actions",
      label: "Actions",
      align: "center",
    },
  ];
  const createData = (Tests, Date, Actions) => {
    let dataa = Tests
     dataa = [...dataa];

    console.log("dataa",dataa)
    return { Tests, Date, Actions };
  }
  const rows = [
    createData(
      "Module 9 Neuromonitoring",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id1", {
          Tests: "Module 9 Neuromonitoring"
          })
        }
      />
    ),
    createData(
      "Module 7 Resuscitation & initial management of Critically",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id2", {
            Tests:  "Module 7 Resuscitation & initial management of Critically",
          })
        }
      />
    ),
    createData(
      "Module 6-Trauma, Toxicology, Pregnancy, Endocrine-Mock Test",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id2", {
           Tests:  "Module 6-Trauma, Toxicology, Pregnancy, Endocrine-Mock Test"
          })
        }
      />
    ),
    createData(
      "Module 5-Gastroeneterology-Mock Test",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id2", {
            Tests:  "Module 5-Gastroeneterology-Mock Test",
          })
        }
      />
    ),
    createData(
      "Module 4-Infection & Antimicrobials",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id2", {
           Tests: "Module 4-Infection & Antimicrobials",
          })
        }
      />
    ),
    createData(
      "TRICS 1 FREE MOCK TEST FOR EDIC-1",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id2", {
            Tests:"TRICS 1 FREE MOCK TEST FOR EDIC-1"
          })
        }
      />
    ),
  ];
  
  const handleClick = (event, id, data) => {
    console.log(data)
    setAnchorEl(event.currentTarget);
    setOpenId(id);
    setOpenData(data);
    setPopHeading(data.Tests);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [opened, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 450,
        margin: "20px",
      }}
      role="presentation"
    >
      <Box className="flexrow JustfiSB">
        <h4>{popHeading}</h4>
        <ClearIcon onClick={handleChangeClose} className="Xicon pointer" />
      </Box>
      <Box className="mt2">
        <Typography>Add test to</Typography>
        <Box className="mt2 BasicInfoBox">
          <Box className="flexrow JustfiSB">
              <Box className="flexrow width50">
                <BookIcon className="BookIcon"/><Typography className="textAdd">Course</Typography>
            </Box>
            <Button className="AddButton">Add to Course <ArrowRightAltIcon /></Button>
          </Box>
        </Box>
        <Box className="mt2 BasicInfoBox">
          <Box className="flexrow JustfiSB">
              <Box className="flexrow width50">
                <BookmarkAddedIcon className="BookIcon"/><Typography className="textAdd">Free Test</Typography>
            </Box>
            <Button className="AddButton">Add to Free Test <ArrowRightAltIcon /></Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const AddCourse = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 450,
        margin: "20px",
      }}
      role="presentation"
    >
      <Box className="flexrow">
        <KeyboardBackspaceIcon />
        <h3>Add To Course</h3>
      </Box>
      <Box className="mt2">
        <Box className="mt2 BasicInfoBox">
          <Box className="flexrow pad20">
                <BookIcon className="BookIcon"/><Typography className="textAdd">{popHeading}</Typography>
          </Box>
        </Box>
        <Box className="mt2">
        <FormControl sx={{ mt: 2, minWidth: 450 }} className="categorySelect">
          <Typography>Select Course</Typography>
            {commonSelect(
              {
                placeholder: "Select Category",
                menuItemList: [
                  { id: 1, label: "Java Script" },
                  { id: 2, label: "React JS" },
                  { id: 3, label: "Python" },
                ],
                className: "categorytext",
              },
            )}
          </FormControl>
        </Box>
        <Box className="mt2">
        <div className="FlexRow">
        {CommonTypography({ fontWeight: 600, label: "Number of a\ttempts" })}
      </div>
      {commonTextField(
        {
          id: "fullWidth",
          className: "BoxShadow",
          inputClassName: "textField",
          labels: "Enter course name",
        },
      )}
        </Box>
        <Box className="flexrow mt2">
           <Checkbox {...label} />
           <Typography>Set unlimited attempts</Typography>
        </Box>
      </Box>
    </Box>
  );
  const AddFreeTest = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 450,
        margin: "20px",
      }}
      role="presentation"
    >
      <Box className="flexrow">
        <KeyboardBackspaceIcon />
        <h3>Add To Course</h3>
      </Box>
      <Box className="mt2">
        <Box className="mt2 BasicInfoBox">
          <Box className="flexrow pad20">
                <BookIcon className="BookIcon"/><Typography className="textAdd">Module 9 Neuromonitoring</Typography>
          </Box>
        </Box>
        <Box className="mt2">
        <FormControl sx={{ mt: 2, minWidth: 450 }} className="categorySelect">
          <Typography>Select Course</Typography>
            {commonSelect(
              {
                placeholder: "Select Category",
                menuItemList: [
                  { id: 1, label: "Java Script" },
                  { id: 2, label: "React JS" },
                  { id: 3, label: "Python" },
                ],
                className: "categorytext",
              },
            )}
          </FormControl>
        </Box>
        <Box className="mt2">
        <div className="FlexRow">
        {CommonTypography({ fontWeight: 600, label: "Number of a\ttempts" })}
      </div>
      {commonTextField(
        {
          id: "fullWidth",
          className: "BoxShadow",
          inputClassName: "textField",
          labels: "Enter course name",
        },
      )}
        </Box>
        <Box className="flexrow mt2">
           <Checkbox {...label} />
           <Typography>Set unlimited attempts</Typography>
        </Box>
      </Box>
    </Box>
  );



  return (
    <div className='grid-container'>
      <SideBar />
    <div className="main-container">
      <div className="m20">
        <CourseHeader
          Heading={"Test Portal"}
          subHeading={"Only published tests are shown here"}
        />
        <div className="testPortalSearchBarSection">
          <div className="searchnfilter">
            <SearchBar mt="2%" placeholder="Search by name" />

            <Button className="filterButton">
              {" "}
              <FilterAltIcon /> Filter
            </Button>
          </div>
          <Button >  </Button>
          <React.Fragment>
        <Button variant="outlined" className="addTestButton" onClick={handleClickOpen}>
        + Add Test
        </Button>
        <BootstrapDialog
        className="PopUP"
          onClose={handleCloseDialog}
          aria-labelledby="customized-dialog-title"
          open={opened}
        >
          <DialogTitle sx={{ m: 0, p: 2, fontSize: "1rem" }} id="customized-dialog-title">
          Create New Test
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
         
          <DialogContent dividers>
            <Typography gutterBottom >
             Test Name
            </Typography>
            <TextField
        inputProps={{ className: "textField" }}
        fullWidth
        size="small"
        placeholder="e.g. General Knowledge"
        id="fullWidth"
        className="BoxShadowInputField"
        />
            <Typography gutterBottom sx={{mt: 2}}>
              Test Duration
            </Typography>
            <Box className="FlexRow" sx={{mt: -1}}>
            <Typography className="FlexRow"><TextField
        inputProps={{ className: "textField" }}
        fullWidth
        size="small"
        placeholder="0"
        id="fullWidth"
        className="BoxShadowInputField"
         /><p className="TimeText"> Hour </p>
        </Typography>
            <Typography className="FlexRow">
              <TextField
        inputProps={{ className: "textField" }}
        fullWidth
        size="small"
        placeholder="0"
        id="fullWidth"
        className="BoxShadowInputField"
        sx={{ml: 4}}
         /> <p className="TimeText" >Minute</p></Typography>
            </Box>
          </DialogContent>
          <DialogActions>
          <Button variant="contained" className="CreateBtn">Create</Button>
          </DialogActions>
        </BootstrapDialog>
        </React.Fragment>
        </div>
        <Paper
          sx={{ width: "100%", overflow: "hidden" }}
          className="completeTable"
        >
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: 600 }}
                      className="headingOfTable"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className="parentTable">
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        className="TableHover"
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          console.log(row, Object.keys(row), column.id, value);
                          return (
                            <Fragment>
                              {column.id === "Tests" &&
                              row.Tests ===
                                "TRICS 1 FREE MOCK TEST FOR EDIC-1" ? (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  className="lastTableCell"
                                >
                                  <Typography className="lastValue">
                                    {value}
                                  </Typography>
                                  <Typography className="phNumber">
                                    FREE TEST
                                  </Typography>
                                </TableCell>
                              ) : (
                                <TableCell key={column.id} align={column.align}>
                                  {value}
                                </TableCell>
                              )}
                            </Fragment>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                <Popover
                  id={openId}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  sx={{ml:-12}}
                  value={value}
                >   
                  <Typography className="redDeleteofTestPortal"
                  onClick={toggleDrawer("right", true)}
                  value={value}
                  >
                   Add
                  </Typography>
                  <Typography className="redDeleteofTestPortal">
                    Test stats
                  </Typography>
                </Popover>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {list("right")}
        </SwipeableDrawer>
      </div>
    </div>
    </div>
  );
}

export default TestPortal;
