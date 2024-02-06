import React, { useState, Fragment } from "react";
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
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchBar from "../../../Util/SearchBar";
import Popover from "@mui/material/Popover";
import CourseHeader from "../../Courses/CoursesHeader";
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import SideBar from "../../AdminDashboardMain/SideBar";

const MyTeam = () => {
  const [action, setAction] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openId, setOpenId] = useState(0);
  const [openData, setOpenData] = useState("");

  const columns = [
    {
      id: "User_Info",
      label: "User Info",
      // minWidth: 170
    },
    {
      id: "Full_Name",
      label: "Full Name",
      align: "center",
    },
    {
      id: "Access_Level",
      label: "Access Level",
      align: "center",
    },
    {
      id: "Actions",
      label: "Actions",
      align: "center",
    },
  ];

  const createData = (User_Info, Full_Name, Access_Level, Actions) => {

    return { User_Info, Full_Name, Access_Level, Actions };
  }

  const rows = [
    createData(
      { name: "sheikhshoeb194@gmail.com", phone: "7589576" },
      "Sheikh Shoeb",
      "Super Admin",
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
      { name: "jitendra.chandrakar@gmail.com", phone: "7589576" },
      "Jitendra Chandrakar",
      "Admin",
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
      { name: "pranab.raj@gmail.com", phone: "7589576" },
      "Pranab Raj",
      "Admin",
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
      { name: "saniakhan@gmail.com", phone: "7589576" },
      "Sania Khan",
      "Admin",
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
      { name: "rahulamin@gmail.com", phone: "7589576" },
      "Rahul Amin",
      "Admin",
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

  return (
    <div className='grid-container'>
      <SideBar />
    <div className="main-container">
      <div className=" m20">
        <CourseHeader Heading={"My Team (5)"} subHeading={"View, Filter & Manage all your users"} />
        <div className="searchnfilter">
        <SearchBar mt = "2%" placeholder="Search by name"/>
          <Button className="filterButton">
            <FilterAltIcon /> Filter
          </Button>
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
                              <TableCell key={column.id} align={column.align}>
                                <Typography className="bluePara">
                                 {value.name}
                                </Typography>
                                <Typography className="PhoneText">
                                 { value.phone}
                                </Typography>
                              </TableCell>
                            ) : (
                              <TableCell key={column.id} align={column.align}>
                              { value}
                              </TableCell>
                            )}
                          </Fragment>
                        );
                      })}
                    </TableRow>
                  );
                })}
              <Popover
               sx={{m: -7, mt: 0.7}}
                id={openId}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                 <Typography  className="redDeleteofTestPortal"> <DeleteIcon className="deleteIcon"/> Delete </Typography>
                <Typography  className="redDeleteofTestPortal blueBlockUser"> <BlockIcon className="deleteIcon"/> Block User</Typography>
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

export default MyTeam;
