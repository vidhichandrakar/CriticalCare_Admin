import React, { useState, useEffect } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useNavigate } from "react-router-dom";
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
import { Box, TableFooter, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment/moment";
import axios from "axios";
import {
  deleteMember,
  deleteTestPortal,
  deleteUser,
  getTeamByID,
  getAllUsersApi,
  getTeam,
  updateTeam,
  getTest,
  getTestByID,
  createTestPortal,
} from "../../../ActionFactory/apiActions";
import { TablePagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import { add } from "date-fns";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import LoaderComponent from "../../../../Util/LoaderComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirectRestriction } from "../../../../Util/RedirectRestriction";
import Header from "../../../Courses/Header";
import { DailogBox } from "../../../../Util/CommonFields";
import TipsAndUpdatesTwoToneIcon from "@mui/icons-material/TipsAndUpdatesTwoTone";
import "../../../CSSFile/testPortal.css";
import { Link } from "react-router-dom";
import TestFirstPage from "./TestFirstPage";
import Switch from "@mui/material/Switch";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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
    hours: "",
  });
  const [loaderState, setLoaderState] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectRestriction()) {
      // setLoaderState(true);
      getTest({
        callBack: (response) => {
          const userCallBack = response?.data;
          setUserData(userCallBack);
          // setLoaderState(false);
        },
      });
    } else {
      navigate("/admin");
    }
  }, []);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpenId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteClick = () => {
    handleClose();
    setIsOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDelete();
    setIsOpen(false);
  };

  const handleCancelDelete = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    const userId = openId;
    deleteTestPortal({
      userId,
      callBack: () => {
        getTest({
          callBack: (response) => {
            const userCallBack = response?.data;
            setUserData(userCallBack);
          },
        });
        handleClose();
      },
      error: (error) => {
        toast.error(error.message);
        console.log(error);
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
      storedValues.testName = value;
    } else if (type === "TestDuration") {
      storedValues.testDuration = value;
    } else if (type === "Hours") {
      storedValues.hours = value;
    }
    setAddTest(storedValues);
  };
  const handleCreateTeam = () => {
    const payload = {
      test_name: addTest.testName,
      created_by: 12,
      duration_hour: parseInt(addTest.testDuration),
      duration_minute: parseInt(addTest.hours),
    };
    createTestPortal({
      payload,
      callBack: (response) => {
        toast.success("New Member added!");
        setOpen(false);
        navigate("/admin/TestFirstPage", {
          state: { id: response.data.test_id },
        });
        getTest({
          callBack: (response) => {
            const userCallBack = response?.data;
            setUserData(userCallBack);
            console.log("irhthjn plce")
            // setLoaderState(false);
          },
        });
      },
    });
  };

  const handleEdit = () => {
    const testId = openId;
    navigate("/admin/TestFirstPage", { state: { id: openId } });

    // getTestByID({
    //   testId,
    //   callBack: (response) => {
    //     // toast.success("");
    //     const data = response.data;
    //     let storedValues = Object.assign({}, addTest);
    //     storedValues.testName = data?.test_name;
    //     storedValues.testDuration = data?.duration_minute;
    //     storedValues.hours = data?.duration_hour;
    //     setAddTest(storedValues);
    //   },
    // });
  };
  return (
    <div className="grid-container">
      <Header
        Heading={"Test Portal"}
        subHeading={"Only published test are shown here"}
      />
      <SideBar />
      <div className="main-container">
        <LoaderComponent loaderState={loaderState} />
        <div className="testPortalSearchBarSection">
          <div className="searchnfilter">
            <div className="wid100">
              <Paper
                component="form"
                sx={{
                  ml: 0,
                  mt: "41px",
                  mb: "15px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#e4e4e459",
                  borderRadius: "10px",
                }}
              >
                <IconButton sx={{ p: "10px" }} aria-label="menu">
                  <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search your course by name"
                  inputProps={{ "aria-label": "search your course by name" }}
                />
              </Paper>
            </div>

            <Button className="filterButton">
              <FilterAltIcon /> Filter
            </Button>
          </div>

          <Button
            className="width13 addTestimonialButton"
            onClick={handleClickOpen}
          >
            + Add Test
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
              Add New Test
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
                value={addTest?.testName}
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
                    value={addTest?.testDuration}
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
                    value={addTest?.Hours}
                    type="hours"
                    onChange={(e) => handleInput(e.target.value, "Hours")}
                  />{" "}
                  <p className="TimeText">Minute</p>
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              {/* <Link to="/admin/TestFirstPage"> */}
              <Button
                variant="contained"
                className="CreateBtn"
                onClick={handleCreateTeam}
              >
                Create
              </Button>
              {/* </Link> */}
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
                  ? (rowsPerPage > 0
                      ? userData.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : userData
                    ).map((row) => {
                      return (
                        <TableRow
                          hover
                          className="TableHover"
                          role="checkbox"
                          tabIndex={-1}
                          key={row?.code}
                        >
                          <TableCell className="alignTableBody">
                            {row?.test_name}
                          </TableCell>
                          <TableCell className="alignTableBody">
                            {`${row?.duration_hour}hr : ${row?.duration_minute}min`}
                          </TableCell>
                          <TableCell className="alignTableBody">
                            {moment(row?.createdAt).format("MM/DD/YYYY")}
                          </TableCell>

                          <TableCell sx={{ textAlign: "center" }}>
                            <MoreVertIcon
                              onClick={(event) =>
                                handleClick(event, row?.test_id)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : null}

                <Popover
                  sx={{ m: -7, mt: 0.2, ml: -15 }}
                  id={openId}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Box
                    className="redDeleteofTestPortal"
                    onClick={handleDeleteClick}
                    sx={{borderBottom: "1px solid #eee"}}
                  >
                    {" "}
                    <DeleteIcon className="deleteIcon" /> Delete{" "}
                  </Box>
                  <Box
                    className="redDeleteofTestPortal blueBlockUser"
                    onClick={handleEdit}
                  >
                    <EditIcon className="deleteIcon" />
                    Edit
                  </Box>
                </Popover>
              </TableBody>
              {userData?.length > 5 && (
                <TableFooter>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    // colSpan={3}
                    count={userData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "rows per pageeee",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    // className="Pagination"
                  />
                </TableFooter>
              )}
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <ToastContainer />
      <DailogBox
        isOpen={isOpen}
        handleConfirmDelete={handleConfirmDelete}
        handleDeleteClick={handleDeleteClick}
        handleCancelDelete={handleCancelDelete}
      />
    </div>
  );
};

export default TestPortal;
