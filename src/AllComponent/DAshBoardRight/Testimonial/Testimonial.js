import React, {Fragment, useState} from "react";
import CourseHeader from "../../Courses/CoursesHeader";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchBar from "../../../Util/SearchBar";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import SideBar from "../../AdminDashboardMain/SideBar";
import { TablePagination } from "@mui/material";
import Stack from '@mui/material/Stack';

const Testimonial = () => {

  const columns = [
    {
      id: "Comments",
      minWidth: 100,
      label: "Comments",
      align: "left",
    },
    {
      id: "Author",
      label: "Author",
      align: "center",
    },
    {
      id: "Actions",
      label: "Actions",
      align: "center",
    },
  ];

  const createData = (Comments, Author, Actions) => {
    return { Comments, Author, Actions };
  };

  const rows = [
    createData(
      "Can't express the amount of respect to all the members in this platform who are working so hard for us. We are so blessed to have this lovely platform in our generation!",
      "Sheikh Shoeb",
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
      " It was a great experience for me because I was a dropper and had only PW as a source for my coaching. I love Alakh sir since because of him I cleared the exam with good marks and also made my family proud. My experience with PW was full of learning and grooming.",
      "Jitendra Chandrakar",
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
      " It was a great experience for me because I was a dropper and had only PW as a source for my coaching. I love Alakh sir since because of him I cleared the exam with good marks and also made my family proud. My experience with PW was full of learning and grooming.",
      "Jitendra Chandrakar",
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
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [openId, setOpenId] = useState(0);
  const [openData, setOpenData] = useState("");
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
      <div className="main-container">
        <div className="m20">
          <CourseHeader
            Heading={"Testimonial"}
            subHeading={"Only published testimonial are shown here"}
          />
          <div className="testPortalSearchBarSection">
            <div className="searchnfilter">
              <SearchBar mt="2%" placeholder="Search by name" />

              <Button className="filterButton">
                <FilterAltIcon /> Filter
              </Button>
            </div>
            <Button className="addTestimonialButton">
              {" "}
              + Add Testimonial{" "}
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
                        style={{ width: "56%", fontWeight: 600 }}
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
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            console.log(
                              row,
                              Object.keys(row),
                              column.id,
                              value
                            );
                            return (
                              <Fragment>
                                {column.id === "Commments" ? (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    className="lastTableCellOfTestimonial"
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                    <Typography className="lastValue">
                                      {value}
                                    </Typography>
                                    <Typography className="phNumber">
                                      FREE TEST
                                    </Typography>
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{ minWidth: 100 }}
                                  >
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
                    id={openId}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    className="testimonialPopOver"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Typography
                      sx={{ p: 0.5, fontSize: 15 }}
                      className="redDeleteofTestimonial"
                    >
                      <DeleteIcon className="redDeleteIcon" /> Delete
                    </Typography>
                  </Popover>
                </TableBody>
              </Table>
            </TableContainer>

            <footer>
            <TablePagination
              rowsPerPageOptions={[2, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="testimonialPagination"
            />
            </footer>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
