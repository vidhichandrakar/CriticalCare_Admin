import React, { Fragment, useState, useEffect, useMemo } from "react";
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
import { deleteUser, getAllUsersApi } from "../../ActionFactory/apiActions";
import moment from "moment/moment";
import { TablePagination } from "@mui/material";
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

  useEffect(() => {
    setLoaderState(true);
    getAllUsersApi({
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

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpenId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    const userId = openId;
    deleteUser({
      userId,
      callBack: () => {
        getAllUsersApi({
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

  const deleteSelectedItem = () => {
    setLoaderState(true);
    checkedValue.map((item) => {
      deleteUser({
        userId: item,
        callBack: () => {
          getAllUsersApi({
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

  const visibleRows = useMemo(() =>
      stableSort(userData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, userData]
  );

  return (
    <div className="grid-container">
      <SideBar />
      <div className=" m20">
        <CourseHeader
          Heading={"Users (357)"}
          subHeading={"View, Filter & Manage all your users"}
        />
        <LoaderComponent loaderState={loaderState} />
        <div className="searchnfilter">
          <SearchBar mt="2%" placeholder="Search by name" />
          <Button className="filterButton">
            <FilterAltIcon className="filterIcon" /> Filter
          </Button>
        </div>
        {checkedValue.length > 0 ? (
          <div className="countSelectedValue">
            <Button className="countedCheckBox" disabled>
              {checkedValue.length} Selected
            </Button>
            <Button
              className="deleteButton"
              onClick={deleteSelectedItem}
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </div>
        ) : null}

        <Paper
          sx={{ width: "100%", overflow: "hidden" }}
          className="userCompleteTable"
        >
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
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
                          sx={
                            {
                               color:"rgb(216, 224, 240)"
                            }
                          }
                          onChange={(event) =>
                            handleChangeOnCheckBox(event, row.user_id)
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
                        {row.user_name}
                      </TableCell>
                      <TableCell>
                        {moment(row.createdAt).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell>
                        <MoreVertIcon //need to remove this hardcode this code, more ... three drops in last column
                          onClick={(event) => handleClick(event, row.user_id)}
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
                  <Typography
                    className="redDeleteofTestPortal"
                    onClick={handleDelete}
                  >
                    {" "}
                    <DeleteIcon className="deleteIcon" /> Delete{" "}
                  </Typography>
                  <Typography className="redDeleteofTestPortal blueBlockUser">
                    {" "}
                    <BlockIcon className="deleteIcon" /> Block User
                  </Typography>
                </Popover>
              </TableBody>
              <TablePagination
                rowsPerPageOptions={[4, 10, 25, { label: "All", value: -1 }]}
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
                className="Pagination"
              />
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <ToastContainer />
    </div>
  );
};

export default User;
