import React, { Fragment, useState, useEffect } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchBar from "../../../../Util/SearchBar";
import Popover from "@mui/material/Popover";
import CourseHeader from "../../../Courses/CoursesHeader";
import SideBar from "../../../AdminDashboardMain/SideBar";
import { testPortalColumns } from "../../../../Data/JsonData";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { Box, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment/moment";
import axios from "axios";
import {
  deleteMember,
  deleteUser,
  getTeamByID,
  getAllUsersApi,
  getTeam,
  updateTeam,
  getTest,
  getTestByID,
} from "../../../ActionFactory/apiActions";
import { TablePagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import { add } from "date-fns";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const TestPortal = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openId, setOpenId] = useState(0);
  const [openData, setOpenData] = useState("");
  const [userData, setUserData] = useState([]);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const id = open ? "simple-popover" : undefined;
  const [opened, setOpen] = useState(false);
  const [addTest, setAddTest] = useState({
    testName: "",
    testDuration: "",
    Hours: "",
  });
  useEffect(() => {
    getTest({
      callBack: (response) => {
        const userCallBack = response?.data;
        setUserData(userCallBack);
      },
    });
  }, []);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpenId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    const userId = openId;
    deleteMember({
      userId,
      callBack: () => {
        getTeam({
          callBack: (response) => {
            const userCallBack = response?.data;
            setUserData(userCallBack);
          },
        });
      },
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddTeam = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleInput = (value, type) => {
    let storedValues = Object.assign({}, addTest);
    if (type === "TestName") {
      storedValues.memberName = value;
    } else if (type === "TestDuration") {
      storedValues.emailID = value;
    } else if (type === "Hours") {
      storedValues.PhoneNo = value;
    }
    setAddTest(storedValues);
  };
  const handleCreateTeam = () => {
    const payload = {
      member_name: addTest.memberName,
      email_id: addTest.emailID,
      phone_no: addTest.PhoneNo,
    };
    console.log("payloadpayload", payload);
    updateTeam({
      payload,
      callBack: (response) => {
        setOpen(false);
      },
    });
  };

  const handleEdit = () => {
    console.log("etidn", openId);
    setOpen(true);
    const testId = openId;
    getTestByID({
      testId,
      callBack: (response) => {
        console.log(response.data);
        const data = response.data;
        let storedValues = Object.assign({}, addTest);
        storedValues.testName = data.test_name;
        storedValues.testDuration = data.duration_minute;
        storedValues.Hours = data.duration_hour;
        setAddTest(storedValues);
      },
    });
  };
  return (
    <div className="grid-container">
      <SideBar />
      <div className=" m20">
        <CourseHeader
          Heading={"Test Portal"}
          subHeading={"Only published test are shown here"}
        />
        <div className="testPortalSearchBarSection">
          <div className="searchnfilter">
            <SearchBar mt="2%" placeholder="Search by name" />

            <Button className="filterButton">
              <FilterAltIcon /> Filter
            </Button>
          </div>
          <Button className="addTestimonialButton" onClick={handleClickOpen}>
            {" "}
            + Add Team{" "}
          </Button>
          <BootstrapDialog
            className="PopUP"
            onClose={handleCloseDialog}
            aria-labelledby="customized-dialog-title"
            open={opened}
          >
            <DialogTitle
              sx={{ m: 0, p: 2, fontSize: "1rem" }}
              id="customized-dialog-title"
            >
              Add New Member
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>

            <DialogContent dividers>
              <Typography gutterBottom>Test Name</Typography>
              <TextField
                inputProps={{ className: "textField" }}
                fullWidth
                size="small"
                placeholder="e.g. General Knowledge"
                id="fullWidth"
                className="BoxShadowInputField"
                type="TestName"
                value={addTest.testName}
                onChange={(e) => handleInput(e.target.value, "TestName")}
              />
              <Typography gutterBottom sx={{ mt: 2 }}>
                Test Duration
              </Typography>
              <Box className="FlexRow" sx={{ mt: -1 }}>
                <Typography className="FlexRow">
                  <TextField
                    inputProps={{ className: "textField" }}
                    fullWidth
                    size="small"
                    placeholder="0"
                    id="fullWidth"
                    className="BoxShadowInputField"
                    type="TestDuration"
                    value={addTest.testDuration}
                    onChange={(e) =>
                      handleInput(e.target.value, "TestDuration")
                    }
                  />
                  <p className="TimeText"> Hour </p>
                </Typography>
                <Typography className="FlexRow">
                  <TextField
                    inputProps={{ className: "textField" }}
                    fullWidth
                    size="small"
                    placeholder="0"
                    id="fullWidth"
                    className="BoxShadowInputField"
                    sx={{ ml: 4 }}
                    value={addTest.Hours}
                    type="hours"
                    onChange={(e) => handleInput(e.target.value, "Hours")}
                  />{" "}
                  <p className="TimeText">Minute</p>
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                className="CreateBtn"
                onClick={handleCreateTeam}
              >
                Create
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>{" "}
        <Paper
          sx={{ width: "100%", overflow: "hidden" }}
          className="userCompleteTable"
        >
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {testPortalColumns.map((column) => (
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
                {userData.length
                  ? userData.map((row) => {
                      return (
                        <TableRow
                          hover
                          className="TableHover"
                          role="checkbox"
                          tabIndex={-1}
                          key={row?.code}
                        >
                          <TableCell className="useInfoCheckbox">
                            <Typography className="PhoneText">
                              {row.test_name}
                            </Typography>
                          </TableCell>
                          <TableCell className="fullNameHead">
                            {moment(row.createdAt).format("MM/DD/YYYY")}
                          </TableCell>
                          <TableCell>{row.phone_no} </TableCell>
                          <TableCell>
                            <MoreVertIcon //need to remove this hardcode this code, more ... three drops in last column
                              onClick={(event) =>
                                handleClick(event, row.test_id)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : null}
                <Popover
                  sx={{ m: -7, mt: 0.7, ml: -18 }}
                  id={openId}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Typography
                    className="redDeleteofTestPortal"
                    onClick={handleDelete}
                  >
                    {" "}
                    <DeleteIcon className="deleteIcon" /> Delete{" "}
                  </Typography>
                  <Typography
                    className="redDeleteofTestPortal blueBlockUser"
                    onClick={handleEdit}
                  >
                    {" "}
                    <EditIcon className="deleteIcon" />
                    Edit
                  </Typography>
                </Popover>
              </TableBody>
            </Table>
          </TableContainer>

          <Stack spacing={60}>
            <TablePagination
              rowsPerPageOptions={[2, 25, 100]}
              component="div"
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="userPagination"
            />
          </Stack>
        </Paper>
      </div>
    </div>
  );
};

export default TestPortal;
