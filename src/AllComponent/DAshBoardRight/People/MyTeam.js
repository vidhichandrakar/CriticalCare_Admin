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
import SearchBar from "../../../Util/SearchBar";
import Popover from "@mui/material/Popover";
import CourseHeader from "../../Courses/CoursesHeader";
import SideBar from "../../AdminDashboardMain/SideBar";
import { teamColumns } from "../../../Data/JsonData";
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
import axios from "axios";
import {
  deleteMember,
  deleteUser,
  getTeamByID,
  getAllUsersApi,
  getTeam,
  updateTeam,
} from "../../ActionFactory/apiActions";
import moment from "moment/moment";
import { TablePagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import { add } from "date-fns";


import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import LoaderComponent from "../../../Util/LoaderComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function TablePaginationActions(props) {
  
  const [loaderState, setLoaderState] = useState(false);
  console.log(props, "propsss")
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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
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


const MyTeam = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openId, setOpenId] = useState(0);
  const [openData, setOpenData] = useState("");
  const [userData, setUserData] = useState([]);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const id = open ? "simple-popover" : undefined;
  const [opened, setOpen] = useState(false);
  const [addTeam, setAddTeam] = useState({
    memberName: "",
    emailID: "",
    PhoneNo: "",
  });
  const [loaderState, setLoaderState] = useState(false);
  useEffect(() => {
    setLoaderState(true);
    getTeam({
      callBack: (response) => {
        const userCallBack = response?.data;
        setUserData(userCallBack);
        setLoaderState(false);
      },error:(error)=>{
        toast.error(error.message);
        console.log(error.message);
      }
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
          },error:(error)=>{
            toast.error(error.message);
            console.log(error.message);
          }
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
    setAddTeam({
      memberName: "",
      emailID: "",
      PhoneNo: "",
    });
  };
  const handleInput = (value, type) => {
    let storedValues = Object.assign({}, addTeam);
    if (type === "MemberName") {
      storedValues.memberName = value;
    } else if (type === "EmailID") {
      storedValues.emailID = value;
    } else if (type === "PhoneNo") {
      storedValues.PhoneNo = value;
    }
    setAddTeam(storedValues);
  };
  const handleCreateTeam = () => {
    const payload = {
      member_name: addTeam.memberName,
      email_id: addTeam.emailID,
      phone_no: addTeam.PhoneNo,
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
    const teamId = openId;
    getTeamByID({
      teamId,
      callBack: (response) => {
        console.log(response.data);
        const data = response.data;
        let storedValues = Object.assign({}, addTeam);
        storedValues.PhoneNo = data.phone_no;
        storedValues.emailID = data.email_id;
        storedValues.memberName = data.member_name;
        setAddTeam(storedValues);
      },
    });
  };
  return (
    <div className="grid-container">
      <SideBar />
      <div className=" m20">
        <CourseHeader
          Heading={"My Team"}
          subHeading={"View, Filter & Manage all your users"}
        />
        <LoaderComponent
      loaderState={loaderState}
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
              <Typography gutterBottom>Member Name</Typography>
              <TextField
                inputProps={{ className: "textField" }}
                fullWidth
                size="small"
                id="fullWidth"
                className="BoxShadowInputField"
                type="MemberName"
                value={addTeam.memberName}
                onChange={(e) => handleInput(e.target.value, "MemberName")}
              />

            <Box className="FlexRow" sx={{ mt: -1 }}>
              <Typography gutterBottom sx={{ mt: 2 }}>
                Email ID
              </Typography>

              {/* <Box className="FlexRow" sx={{ mt: -1 }}> */}
                <Typography className="FlexRow">
                  <TextField
                    inputProps={{ className: "textField" }}
                    fullWidth
                    size="small"
                    id="fullWidth"
                    className="BoxShadowInputField"
                    type="EmailID"
                    value={addTeam.emailID}
                    onChange={(e) => handleInput(e.target.value, "EmailID")}
                  />
                  <p className="TimeText"> Phone No. </p>
                </Typography>

                <Typography className="FlexRow">
                  <TextField
                    inputProps={{ className: "textField" }}
                    fullWidth
                    size="small"
                    id="fullWidth"
                    className="BoxShadowInputField"
                    sx={{ ml: 4 }}
                    value={addTeam.PhoneNo}
                    type="PhoneNo"
                    onChange={(e) => handleInput(e.target.value, "PhoneNo")}
                  />{" "}
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
                  {teamColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: 600 }}
                      className="headingOfTable2"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody className="parentTable">
                {userData.length
                  ? (rowsPerPage > 0
                    ? userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                          <TableCell className="useInfoCheckbox">
                            <Typography className="PhoneText">
                              {row.member_name}
                            </Typography>
                          </TableCell>
                          <TableCell className="fullNameHead">
                            {row.email_id}
                          </TableCell>
                          <TableCell>{row.phone_no}</TableCell>
                          <TableCell>
                            <MoreVertIcon //need to remove this hardcode this code, more ... three drops in last column
                              onClick={(event) =>
                                handleClick(event, row.member_id)
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
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              // colSpan={3}
              count={userData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              className="Pagination"
            />
            </Table>
          </TableContainer>

          
        </Paper>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default MyTeam;
