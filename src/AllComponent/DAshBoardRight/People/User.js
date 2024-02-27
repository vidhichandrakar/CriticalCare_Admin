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
import { columns } from "../../../Data/JsonData";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { deleteUser, getAllUsersApi } from "../../ActionFactory/apiActions";
import moment from "moment/moment";
import { TablePagination } from "@mui/material";
import Stack from '@mui/material/Stack';

const User = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openId, setOpenId] = useState(0);
  const [openData, setOpenData] = useState("");
  const [checkedValue, setCheckedValue] = useState([]);
  const [userData, setUserData] = useState([]);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  useEffect(() => {
    getAllUsersApi({
      callBack: (response) => {
        const userCallBack = response?.data;
        setUserData(userCallBack);
      },
    });
  }, []);

  const handleChangeOnCheckBox = (event, data) => {
    let selectValue = [...checkedValue];
    if (event.target.checked === true) {
      selectValue.push(data);
      setCheckedValue(selectValue);
    } else {
      setCheckedValue(selectValue.filter((item) => data.phone != item.phone));
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
    const userId =  openId;
    deleteUser({userId,callBack: () => {
      getAllUsersApi({
        callBack: (response) => {
          const userCallBack = response?.data;
          setUserData(userCallBack);
        },
      });
    }})
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const rows = [
  //   createData(
  //     "Can't express the amount of respect to all the members in this platform who are working so hard for us. We are so blessed to have this lovely platform in our generation!",
  //     "Sheikh Shoeb",
  //     <MoreVertIcon
  //       onClick={(event) =>
  //         handleClick(event, "id1", {
  //           User_Info: { name: "sheikhshoeb194@gmail.com", phone: "7589576" },
  //           full_name: "Sheikh Shoeb",
  //           date: "12/10/23",
  //         })
  //       }
  //     />
  //   ),]

  return (
    <div className="grid-container">
      <SideBar />
      <div className=" m20">
        <CourseHeader
          Heading={"Users (357)"}
          subHeading={"View, Filter & Manage all your users"}
        />
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
            <Button className="deleteButton" variant="outlined" color="error">
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
                            <Checkbox
                              onChange={(event) =>
                                handleChangeOnCheckBox(event, row.User_id)
                              }
                            />
                            <div className="userCheckBoxDiv">
                              <Typography className="bluePara">
                                {row.Email_id}
                              </Typography>
                              <Typography className="PhoneText">
                                {row.Phone_no}
                              </Typography>
                            </div>
                          </TableCell>
                          <TableCell className="fullNameHead">{row.UserName}</TableCell>
                          <TableCell>
                            {moment(row.createdAt).format("MM/DD/YYYY")} 
                          </TableCell>
                          <TableCell>
                            <MoreVertIcon //need to remove this hardcode this code, more ... three drops in last column
                              onClick={(event) =>
                                handleClick(event,row.User_id)
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
                  <Typography className="redDeleteofTestPortal blueBlockUser">
                    {" "}
                    <BlockIcon className="deleteIcon" /> Block User
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

export default User;
