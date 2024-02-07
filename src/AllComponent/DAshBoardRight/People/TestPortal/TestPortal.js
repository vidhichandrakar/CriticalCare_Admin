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
    return { Tests, Date, Actions };
  }
  const rows = [
    createData(
      "Module 9 Neuromonitoring",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id1", {
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "7589576" },
            full_name: "Sheikh Shoeb",
            date: "12/10/23",
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
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "7589576" },
            full_name: "Jitendra Chandrakar",
            date: "12/10/23",
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
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "7589576" },
            full_name: "Pranab Raj",
            date: "12/10/23",
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
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "7589576" },
            full_name: "Sania Khan",
            date: "12/10/23",
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
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "7589576" },
            full_name: "Rahul Amin",
            date: "12/10/23",
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
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "7589576" },
            full_name: "Menka",
            date: "12/10/23",
          })
        }
      />
    ),
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClick = (event, id, data) => {
    setAnchorEl(event.currentTarget);
    setOpenId(id);
    setOpenData(data);
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
                >   
                  <Typography className="redDeleteofTestPortal">
                    <DeleteIcon className="deleteIcon"/> <span>Delete</span>
                  </Typography>
                </Popover>
                
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
    </div>
  );
}

export default TestPortal;
