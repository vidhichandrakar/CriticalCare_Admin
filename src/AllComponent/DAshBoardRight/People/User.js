import React, { Fragment, useState, useEffect, useMemo } from "react";
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
import { columns } from "../../../Data/JsonData";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { BlockStudent, deleteUser, getAllStudentApi, getAllUsersApi } from "../../ActionFactory/apiActions";
import moment from "moment/moment";
import { TableFooter, TablePagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { Box, TextField } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import LoaderComponent from "../../../Util/LoaderComponent";
import { ToastContainer, toast } from "react-toastify";
import TableSortLabel from "@mui/material/TableSortLabel";
import "react-toastify/dist/ReactToastify.css";
import { visuallyHidden } from "@mui/utils";
import { redirectRestriction } from "../../../Util/RedirectRestriction";
import Header from "../../Courses/Header";

import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DailogBox } from "../../../Util/CommonFields";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import StudentRegisterPopup from "./StudentRegisterPopup";

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

const User = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openId, setOpenId] = useState(0);
  const [openData, setOpenData] = useState("");
  const [checkedValue, setCheckedValue] = useState([]);
  const [userData, setUserData] = useState([]);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loaderState, setLoaderState] = useState(false);
  const id = open ? "simple-popover" : undefined;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("user_name");
  const authorized = JSON.parse(localStorage.getItem("loggedInUser"));
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState();
  const [opened, setOpen] = useState(false);
  const [blockstudent, setBlock] = useState("");
  const [addTeam, setAddTeam] = useState({
      memberName: "",
      emailID: "",
      PhoneNo: "",
    });

  const navigate = useNavigate();

  useEffect(() => {
    if (redirectRestriction()) {
      // setLoaderState(true);
      getAllStudentApi({
        callBack: (response) => {
          const userCallBack = response?.data;
          setUserData(userCallBack);
          setLoaderState(false);
        },
        error: (error) => {
          toast.error(error.message);
          setLoaderState(false);
        },
      });
    } else {
      navigate("/admin");
    }
  }, []);

  const handleChangeOnCheckBox = (event, data) => {
    let selectValue = [...checkedValue];
    if (event.target.checked === true) {
      selectValue.push(data);
      setCheckedValue(selectValue);
    } else {
      setCheckedValue(selectValue.filter((item) => data != item));
    }
  };

  const handleClick = (event, id, block) => {
    setAnchorEl(event.currentTarget);
    setOpenId(id);
    setBlock(block);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    const userId = openId;
    deleteUser({
      userId,
      callBack: () => {
        getAllStudentApi({
          callBack: (response) => {
            const userCallBack = response?.data;
            setUserData(userCallBack);
            handleClose();
          },
        });
      },
      error: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleDeleteClick = () => {
    handleClose();
    setIsOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteSelectedItem();
    handleDelete();
    setIsOpen(false);
  };

  const handleCancelDelete = () => {
    setIsOpen(false);
  };

  const deleteSelectedItem = () => {
    // setLoaderState(true);
    checkedValue.map((item) => {
      deleteUser({
        userId: item,
        callBack: () => {
          getAllStudentApi({
            callBack: (response) => {
              const userCallBack = response?.data;
              setUserData(userCallBack);
              setLoaderState(false);
              setCheckedValue([]);
            },
          });
        },
        error: (error) => {
          toast.error(error.message);
          setLoaderState(false);
        },
      });
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const visibleRows = useMemo(
    () =>
      stableSort(userData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, userData]
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
    // setTimeout(() => {
    // handleGetTeam()
    // }, 3000);
    // setAddTeam({
    //   memberName: "",
    //   emailID: "",
    //   PhoneNo: "",
    // });
  };

  // search filter
  const handleSearchChange = (search) => {
    const query = search.target.value;
    setSearchQuery(query);

    // const filtered = (row.user_name).filter(item =>
    //   item.toLOwerCase().includes(query.toLOwerCase())
    // );
    // setFilteredItems(filtered);
    getAllStudentApi({
      searchString: query,
      callBack: (response) => {
        const userCallBack = response?.data;
        setUserData(userCallBack);
        setLoaderState(false);
      },
      error: (error) => {
        toast.error(error.message);
        setLoaderState(false);
      },
    });
    
  }

  const handleBlock = () => {
    handleClose()
    console.log(openId, "work")
    const payload = {
      block: blockstudent === "Y" ? "N" : "Y" 
    }
    BlockStudent({
      studentId: openId,
      payload,
      callBack: (response) => {
        getAllStudentApi({
          callBack: (response) => {
            const userCallBack = response?.data;
            setUserData(userCallBack);
            setLoaderState(false);
          },
          error: (error) => {
            toast.error(error.message);
            setLoaderState(false);
          },
         
        });
      },
    });
  }


  return (
    <div className="grid-container">
      <Header
        Heading={"Students"}
        subHeading={"View, Filter & Manage all your users"}
      />
      <SideBar />
      <div className="main-container">
        <LoaderComponent loaderState={loaderState} />
        <div className="searchnfilter " style={{display: "flex", flexDirection: "row" , justifyContent: "space-between", alignItems: "center"}}>
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
                placeholder="Search user by name"
                inputProps={{ "aria-label": "search your course by name" }}
                onChange={handleSearchChange}
              />

            </Paper>
          </div>
           
          {/* Temprory commented this searchbar and filter so don't dare to remove this */}
          {/* <Button className="filterButton mt43">
            <FilterAltIcon className="filterIcon" /> Filter
          </Button> */}
           <Button className="addTestimonialButton addstudent" onClick={handleClickOpen}>
            + Add Students
          </Button>
           
        </div><StudentRegisterPopup opened={opened} handleCloseDialog={handleCloseDialog}/>
        {checkedValue.length > 0 ? (
          <div className="countSelectedValue">
            <Button className="countedCheckBox" disabled>
              {checkedValue.length} Selected
            </Button>
            <Button
              className="deleteButton"
              onClick={handleDeleteClick}
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </div>
        ) : null}
        <DailogBox
          isOpen={isOpen}
          handleConfirmDelete={handleConfirmDelete}
          handleDeleteClick={handleDeleteClick}
          handleCancelDelete={handleCancelDelete}
        />

        <Paper
          sx={{ width: "100%", overflow: "hidden" }}
          className="userCompleteTable"
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
                      className="headingOfTable2"
                      sortDirection={orderBy === column.id ? order : false}
                    >
                      {column.id === "user_name" ||
                      column.id === "updatedAt" ? (
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : "asc"}
                          onClick={createSortHandler(column.id)}
                        >
                          {column.label}
                          {orderBy === column.id ? (
                            <Box component="span" sx={visuallyHidden}>
                              {order === "desc"
                                ? "sorted descending"
                                : "sorted ascending"}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody className="parentTable">
                {visibleRows.map((row) => {
                  return (
                    <TableRow
                      hover
                      className="TableHover"
                      role="checkbox"
                      tabIndex={-1}
                      key={row?.code}
                    >
                      <TableCell className="useInfoCheckbox">
                        <Checkbox
                          checked={
                            checkedValue.filter(
                              (value) => row.user_id === value
                            ).length
                          }
                          sx={{
                            color: "rgb(216, 224, 240)",
                          }}
                          onChange={(event) =>
                            handleChangeOnCheckBox(event, row.student_id)
                          }
                        />
                        <div className="userCheckBoxDiv">
                          <Typography className="bluePara">
                            {row.email_id}
                          </Typography>
                          <Typography className="PhoneText">
                            {row.phone_no}
                          </Typography>
                        </div>
                      </TableCell>

                      <TableCell className="fullNameHead">
                        {row.student_name}
                      </TableCell>

                      <TableCell>
                        {moment(row.createdAt).format("MM/DD/YYYY")}
                      </TableCell>

                      <TableCell>
                        <MoreVertIcon //need to remove this hardcode this code, more ... three drops in last column
                          onClick={(event) => handleClick(event, row.student_id, row.block)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
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
                  <Box
                    className="redDeleteofTestPortal redDelete"
                    onClick={handleDeleteClick}
                    sx={{borderBottom: "1px solid #eee"}}
                  >
                    {" "}
                    <DeleteIcon className="deleteIcon" /> Delete{" "}
                  </Box>
                  <Box className={blockstudent == "Y" ? "redDeleteofTestPortal BlueButton" : "redDeleteofTestPortal redDelete"}
                  // "" 
                  onClick={handleBlock}>
                    {" "}
                    <BlockIcon className="deleteIcon"  /> {blockstudent == "Y" ? "Unblock Student" : "Block Student"} 
                  </Box>
                </Popover>
              </TableBody>
              {userData?.length > 5 && (
                <TableFooter>
                  <TablePagination
                    rowsPerPageOptions={[
                      4,
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
                </TableFooter>
              )}
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <ToastContainer />
    </div>
  );
};

export default User;
