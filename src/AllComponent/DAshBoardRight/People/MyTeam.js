import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Box, TableFooter, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  deleteMember,
  getTeamByID,
  getTeam,
  updateTeam,
  putTeamByID,
  getAllUsersApi,
  getAllUsers,
} from "../../ActionFactory/apiActions";
import { TablePagination } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import LoaderComponent from "../../../Util/LoaderComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirectRestriction } from "../../../Util/RedirectRestriction";
import Header from "../../Courses/Header";
import { DailogBox } from "../../../Util/CommonFields";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import MembersignupPopup from "./MembersignupPopup";
import ResetPassword from "./ResetPassword";


function TablePaginationActions(props) {
  const [loaderState, setLoaderState] = useState(false);
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

const MyTeam = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openId, setOpenId] = useState(0);
  const [openData, setOpenData] = useState("");
  const [userData, setUserData] = useState([]);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const id = open ? "simple-popover" : undefined;
  const [opened, setOpen] = useState(false);
  const [resetOpened, setResetOpen] = useState(false);
  const [addTeam, setAddTeam] = useState({
    memberName: "",
    emailID: "",
    PhoneNo: "",
  });
  const [loaderState, setLoaderState] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (redirectRestriction()) {
      // setLoaderState(true);
      getAllUsersApi({
        callBack: (response) => {
          const userCallBack = response?.data;
          setUserData(userCallBack);
          setLoaderState(false);
        },
        error: (error) => {
          toast.error(error.message);
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

  const handleDelete = () => {
    const userId = openId;
    deleteMember({
      userId,
      callBack: () => {
        getAllUsersApi({
          callBack: (response) => {
            const userCallBack = response?.data;
            setUserData(userCallBack);
            handleClose();
          },
          error: (error) => {
            toast.error(error.message);
          },
        });
      },
    });
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
    setTimeout(() => {
    handleGetTeam()
    }, 3000);
    setAddTeam({
      memberName: "",
      emailID: "",
      PhoneNo: "",
    });
  };
  const handleClickOpenReset = () => {
    setResetOpen(true);
  };
  const handleClickClosereset = () => {
    setResetOpen(false);
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
  const handleGetTeam = ()=>{
    getTeam({
      callBack: (response) => {
        const userCallBack = response?.data;
        // setUserData(userCallBack);
        setLoaderState(false);
      },
      error: (error) => {
        toast.error(error.message);
      },
    });
  }
  const handleCreateTeam = () => {
    const teamId = openId
    if (teamId) {
      const payload = {
        member_name: addTeam.memberName,
        email_id: addTeam.emailID,
        phone_no: addTeam.PhoneNo,
        "member_photo_url": "string",
        "member_type_id": 1

      };
      handleClose()
      putTeamByID({
        payload,
        teamId,
        callBack: (response) => {
          getTeam({
            callBack: (response) => {
              const userCallBack = response?.data;
              setUserData(userCallBack);
              handleClose();
              toast.success("Created successfully");
              setOpen(false);
            },
            error: (error) => {
              toast.error(error.message);
            },
          });
         
        },
      });
    } else {
      const payload = {
        member_name: addTeam.memberName,
        email_id: addTeam.emailID,
        phone_no: addTeam.PhoneNo,
        "member_photo_url": "string",
        "member_type_id": 1

      };
      updateTeam({
        payload,
        callBack: (response) => {
          handleGetTeam()
          toast.success("Created successfully");
          setOpen(false);
        },
      });
    }
  };

  const handleEdit = () => {
    setOpen(true);
    const userId = openId;
    getAllUsers({
      userId,
      callBack: (response) => {
        const data = response.data;
        let storedValues = Object.assign({}, addTeam);
        storedValues.PhoneNo = data.phone_no;
        storedValues.emailID = data.email_id;
        storedValues.memberName = data.member_name;
        setAddTeam(storedValues);
      },
      error: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="grid-container">
      <Header
        Heading={"Team Member"}
        subHeading={"View, Filter & Manage all your users"}
      />
      <SideBar />
      <div className=" main-container">

        <LoaderComponent loaderState={loaderState} />
        <div className="testPortalSearchBarSection">
          <div className="searchnfilter">
           
            {/* <div className="wid100">
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
            Temprory commented this searchbar and filter so don't dare to remove this
            <Button className="filterButton mt43">
              <FilterAltIcon /> Filter
            </Button> */}
          </div>
          <Button className="width13 addTestimonialButton" onClick={handleClickOpen}>
            + Add Team
          </Button>
          <Button className="width13 addTestimonialButton resetbutton" onClick={handleClickOpenReset}>
            Reset Password
          </Button>

          <MembersignupPopup opened={opened} handleCloseDialog={handleCloseDialog}/>

          <ResetPassword opened={resetOpened} handleClickClosereset={handleClickClosereset}/>
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
                        <TableCell className="useInfoCheckbox">
                          <Typography className="PhoneText">
                            {row.user_name}
                          </Typography>
                        </TableCell>
                        <TableCell className="fullNameHead">
                          {row.email_id}
                        </TableCell>
                        <TableCell>{row.phone_no}</TableCell>
                        <TableCell>
                          <MoreVertIcon //need to remove this hardcode this code, more ... three drops in last column
                            onClick={(event) =>
                              handleClick(event, row.user_id)
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
                    className="redDeleteofTestPortal redDelete"
                    onClick={handleDeleteClick}
                    sx={{ borderBottom: "1px solid #eee", padding: "2%" }}
                  >

                    <DeleteIcon className="deleteIcon" /> Delete{" "}
                  </Box>
                  <Box
                    className="redDeleteofTestPortal blueBlockUser"
                    onClick={handleEdit}
                  >
                    {" "}
                    <EditIcon className="deleteIcon" />
                    Edit
                  </Box>
                </Popover>
              </TableBody>
              {userData?.length > 5 && <TableFooter>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  // colSpan={3}
                  count={userData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                // className="Pagination"
                />
              </TableFooter>}

            </Table>
          </TableContainer>
        </Paper>
      </div>
      <DailogBox
        isOpen={isOpen}
        handleConfirmDelete={handleConfirmDelete}
        handleDeleteClick={handleDeleteClick}
        handleCancelDelete={handleCancelDelete}
      />
    </div>
  );
};

export default MyTeam;
