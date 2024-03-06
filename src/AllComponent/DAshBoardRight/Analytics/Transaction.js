import React, {Fragment, useState} from 'react'
import CourseHeader from '../../Courses/CoursesHeader';
import SearchBar from '../../../Util/SearchBar';
import {TranscationCardData} from "../../../Data/JsonData"
import TransactionCard from './TranscationCard';
import styled from 'styled-components';
import {  alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import { Box, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import { MockDataForTable } from "../../../Data/mockDataForTable";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Popover from "@mui/material/Popover";
import SideBar from '../../AdminDashboardMain/SideBar';

const Transaction = () => {
    const columns = [
        {
          id: "User_Info",
          label: "Student Name",
        },
        {
          id: "Full_Name",
          label: "Course Name",
          align: "center",
        },
        {
          id: "Date_of_Registration",
          label: "Transaction Date",
          align: "center",
        },
        {
          id: "Actions",
          label: "Transaction Amount",
          align: "center",
        },
      ];
    
      function createData(User_Info, Full_Name, Date_of_Registration, Actions) {    
        return { User_Info, Full_Name, Date_of_Registration, Actions };
      }
    
      const rows = [
        createData(
          { name: "Pranab Raj", phone: "7589576" },
          "TRICS 1 FREE MOCK TEST FOR EDIC-1",
          "19/Dec/2023",
          "₹1.00"
        ),
        createData(
          { name: "Sania Khan", phone: "7534626" },
          "TRICS 1 FREE MOCK TEST FOR EDIC-1",
          "19/Dec/2023",
          "₹1.00"
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
      <div className='grid-container'>
      <SideBar />
    <div className='main-container'>
    <div className=' m20'>
        <CourseHeader Heading={"Transaction Dashboard"} />
        <SearchBar mt = "-15px" placeholder="Search by name"/>

       <div className='transactionCards'> 
            <TransactionCard  Data = {TranscationCardData}/>
        </div>

       
        <Paper
        sx={{ width: "100%", overflow: "hidden", height: "4%" }}
        className="completeTable h50vh"
      >
        <TableContainer sx={{ maxHeight: 540 }} >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
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
                        return (
                          <Fragment>
                            {column.id === "User_Info" ? (
                              <TableCell key={column.id} align={column.align}>
                                <Typography >
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
             
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
    </div>
    </div>

  )

}

export default Transaction;
