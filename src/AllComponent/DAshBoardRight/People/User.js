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

const User = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openId, setOpenId] = useState(0);
  const [openData, setOpenData] = useState("");
  const [checkedValue, setCheckedValue] = useState([]);

  const createData = (User_Info, Full_Name, Date_of_Registration, Actions) => {
    return { User_Info, Full_Name, Date_of_Registration, Actions };
  };
  const getAllUserDetails = () => {
    axios
      .get("https://teamnodejs-98fd0b00ec80.herokuapp.com/users")
      .then((data) => console.log(data.data))
      .catch((error) => console.log(error));
  };
useEffect(()=>{

},[getAllUserDetails])



  const handleChangeOnCheckBox = (event, data) => {
    let selectValue = [...checkedValue];
    console.log("eventt", event.target.checked);
    if (event.target.checked === true) {
      selectValue.push(data);
      setCheckedValue(selectValue);
    } else {
      setCheckedValue(selectValue.filter((item) => data.phone != item.phone));
    }
  };
  const rows = [
    createData(
      { name: "sheikhshoeb194@gmail.com", phone: "7589576" },
      "Sheikh Shoeb",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id1", {
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "75895576" },
            full_name: "Sheikh Shoeb",
            date: "12/10/23",
          })
        }
      />
    ),
    createData(
      { name: "jitendra.chandrakar@gmail.com", phone: "758329576" },
      "Jitendra Chandrakar",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id2", {
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "758529576" },
            full_name: "Jitendra Chandrakar",
            date: "12/10/23",
          })
        }
      />
    ),
    createData(
      { name: "pranab.raj@gmail.com", phone: "7589585276" },
      "Pranab Raj",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id2", {
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "758941576" },
            full_name: "Pranab Raj",
            date: "12/10/23",
          })
        }
      />
    ),
    createData(
      { name: "saniakhan@gmail.com", phone: "758952576" },
      "Sania Khan",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id2", {
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "758429576" },
            full_name: "Sania Khan",
            date: "12/10/23",
          })
        }
      />
    ),
    createData(
      { name: "rahulamin@gmail.com", phone: "75489576" },
      "Rahul Amin",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id2", {
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "758902576" },
            full_name: "Rahul Amin",
            date: "12/10/23",
          })
        }
      />
    ),
    createData(
      { name: "sheikhshoeb194@gmail.com", phone: "7501289576" },
      "Menka",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id2", {
            User_Info: {
              name: "sheikhshoeb194@gmail.com",
              phone: "7589551076",
            },
            full_name: "Menka",
            date: "12/10/23",
          })
        }
      />
    ),
    createData(
      { name: "sheikhshoeb194@gmail.com", phone: "758529576" },
      "Ramesh",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id2", {
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "758951076" },
            full_name: "Ramesh",
            date: "12/10/23",
          })
        }
      />
    ),
    createData(
      { name: "sheikhshoeb194@gmail.com", phone: "758952576" },
      "Rakesh Pal",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id2", {
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "758419576" },
            full_name: "Rakesh Pal",
            date: "12/10/23",
          })
        }
      />
    ),
    createData(
      "ashutosh.a@gmail.com",
      "Ashutosh",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id2", {
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "758529576" },
            full_name: "Ashutosh",
            date: "12/10/23",
          })
        }
      />
    ),
    createData(
      "pixelinsource@gmail.com",
      "Pixel Insource",
      "19/Dec/2023",
      <MoreVertIcon
        onClick={(event) =>
          handleClick(event, "id2", {
            User_Info: { name: "sheikhshoeb194@gmail.com", phone: "755289576" },
            full_name: "Pixel Insource",
            date: "12/10/23",
          })
        }
      />
    ),
  ];

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
                          console.log(row, Object.keys(row), column.id);
                          return (
                            <Fragment>
                              {column.id === "User_Info" ? (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  className="useInfoCheckbox"
                                >
                                  <Checkbox
                                    onChange={(event) =>
                                      handleChangeOnCheckBox(
                                        event,
                                        row.User_Info
                                      )
                                    }
                                  />
                                  <div className="userCheckBoxDiv">
                                    <Typography className="bluePara">
                                      {value.name}
                                    </Typography>
                                    <Typography className="PhoneText">
                                      {value.phone}
                                    </Typography>
                                  </div>
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
                  sx={{ m: -7, mt: 0.7 }}
                  id={openId}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Typography className="redDeleteofTestPortal">
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
        </Paper>
      </div>
    </div>
  );
};

export default User;
