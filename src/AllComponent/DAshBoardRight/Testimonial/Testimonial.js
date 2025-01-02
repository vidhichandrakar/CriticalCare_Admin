import React, { Fragment, useState, useEffect } from "react";
import { redirectDocument, useNavigate } from "react-router-dom";
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
import { testimonalColumns } from "../../../Data/JsonData";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { Box, TextField } from "@mui/material";
import {
  deleteTestimonial,
  getTestimonal,
  updateTestimonial,
} from "../../ActionFactory/apiActions";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import LoaderComponent from "../../../Util/LoaderComponent";
import { redirectRestriction } from "../../../Util/RedirectRestriction";
import Header from "../../Courses/Header";
import { DailogBox } from "../../../Util/CommonFields";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";

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

const Testimonial = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openId, setOpenId] = useState(0);
  const [openData, setOpenData] = useState("");
  const [userData, setUserData] = useState([]);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [opened, setOpen] = useState(false);
  const [addTestimonal, setAddTestimonal] = useState({});
  const [loaderState, setLoaderState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = userData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(userData.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectRestriction()) {
      // setLoaderState(true);
      getTestimonal({
        callBack: (response) => {
          const userCallBack = response?.data;
          setUserData(userCallBack);
          setLoaderState(false);
        },
      });
    } else {
      navigate("/admin");
    }
  }, []);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCPage = (id) => {
    setCurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

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
    // setLoaderState(true);
    const userId = openId;
    deleteTestimonial({
      userId,
      callBack: () => {
        getTestimonal({
          callBack: (response) => {
            const userCallBack = response?.data;
            setUserData(userCallBack);
            setLoaderState(false);
          },
        });
      },
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 3));
    setPage(0);
  };

  const handleAddTeam = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleInput = (value, type) => {
    let storedValues = Object.assign({}, addTestimonal);
    if (type === "author") {
      storedValues.AuthorName = value;
    } else if (type === "comments") {
      storedValues.Comments = value;
    }
    setAddTestimonal(storedValues);
  };
  const handleCreateTeam = () => {
    const payload = {
      author: addTestimonal.AuthorName,
      comment: addTestimonal.Comments,
    };
    updateTestimonial({
      payload,
      callBack: (response) => {
        setOpen(false);
      },
    });
  };

  return (
    <div className="grid-container">
      <Header
        Heading={"Testimonial"}
        subHeading={"Only published testiimonial are showm here"}
      />
      <SideBar />
      <div className=" main-container">
        <LoaderComponent loaderState={loaderState} />
        <div className="testPortalSearchBarSection">
          <div className="searchnfilter">
            {/* <SearchBar mt="2%" placeholder="Search by name" /> */}
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
          <Button
            className="width25 addTestimonialButton"
            onClick={handleClickOpen}
          >
            + Add Testimonial
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
              Add Testimonial
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
              <Typography gutterBottom>Author</Typography>
              <TextField
                inputProps={{ className: "textField" }}
                fullWidth
                size="small"
                id="fullWidth"
                className="BoxShadowInputField"
                // type="author"
                onChange={(e) => handleInput(e.target.value, "author")}
              />

              <Typography gutterBottom sx={{ mt: 2 }}>
                Comments
              </Typography>
              <TextField
                id="outlined-multiline-flexible"
                // label="Multiline"
                multiline
                size="small"
                maxRows={4}
                fullWidth
                type="range"
                inputProps={{
                  className: "textField",
                  min: 130, // Minimum value
                  max: 150, // Maximum value
                }}
                className="BoxShadowInputField"
                sx={{width: "30vw"}}
                // type="comments"
                onChange={(e) => handleInput(e.target.value, "comments")}
              />
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
                  {testimonalColumns.map((column) => (
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
                          <TableCell className="alignTableBody">
                            <Typography className="PhoneText">
                              {row.comment}
                            </Typography>
                          </TableCell>
                          <TableCell className="alignTableBody">
                            {row.author}
                          </TableCell>
                          <TableCell>
                            <MoreVertIcon //need to remove this hardcode this code, more ... three drops in last column
                              onClick={(event) =>
                                handleClick(event, row.comment_id)
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
                    onClick={handleDeleteClick}
                  >
                    {" "}
                    <DeleteIcon className="deleteIcon" /> Delete
                  </Typography>
                  <Typography className="redDeleteofTestPortal blueBlockUser">
                    <BlockIcon className="deleteIcon" /> Block User
                  </Typography>
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
      <DailogBox
        isOpen={isOpen}
        handleConfirmDelete={handleConfirmDelete}
        handleDeleteClick={handleDeleteClick}
        handleCancelDelete={handleCancelDelete}
      />
    </div>
  );
};

export default Testimonial;
