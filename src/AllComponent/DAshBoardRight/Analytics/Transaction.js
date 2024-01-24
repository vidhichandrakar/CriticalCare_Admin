import React, {Fragment, useState} from 'react'
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import CourseHeader from '../../Courses/CoursesHeader';
import SearchBar from '../../../Util/SearchBar';
import {TranscationCardData} from "../../../Data/JsonData"
import TransactionCard from './TranscationCard';
import styled from 'styled-components';
import {  alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
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
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Popover from "@mui/material/Popover";
import SideBar from '../../AdminDashboardMain/SideBar';

const Transaction = () => {
    const columns = [
        {
          id: "User_Info",
          label: "Studemt Name",
          // minWidth: 170
        },
        {
          id: "Full_Name",
          label: "Course Name",
          align: "center",
          //  minWidth: 100
        },
        {
          id: "Date_of_Registration",
          label: "Transaction Date",
          // minWidth: 170,
          align: "center",
          // format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: "Actions",
          label: "Transaction Amount",
          // minWidth: 170,
          align: "center",
          // format: (value) => value.toLocaleString('en-US'),
        },
      ];
    
      function createData(User_Info, Full_Name, Date_of_Registration, Actions) {
        // const density = population / size;
    
        return { User_Info, Full_Name, Date_of_Registration, Actions };
      }
    
      const rows = [
        createData(
          { name: "Pranab Raj", phone: "7589576" },
          "TRICS 1 FREE MOCK TEST FOR EDIC-1",
          "19/Dec/2023",
          <MoreVertIcon
            onClick={(event) =>
              handleClick(event, "id1", {
                User_Info: { name: "sheikhshoeb194@gmail.com", phone: "7589576" },
                full_name: "TRICS 1 FREE MOCK TEST FOR EDIC-1",
                date: "12/10/23",
              })
            }
          />
        ),
        createData(
          { name: "Sania Khan", phone: "asdfghjkl" },
          "TRICS 1 FREE MOCK TEST FOR EDIC-1",
          "19/Dec/2023",
          <MoreVertIcon
            onClick={(event) =>
              handleClick(event, "id2", {
                User_Info: { name: "sheikhshoeb194@gmail.com", phone: "asdfghjkl" },
                full_name: "TRICS 1 FREE MOCK TEST FOR EDIC-1",
                date: "12/10/23",
              })
            }
          />
        ),
       ];
    
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
      const [anchorEl, setAnchorEl] = React.useState(null);
      const [openId, setOpenId] = React.useState(0);
      const [openData, setOpenData] = React.useState("");
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
        <TableContainer sx={{ maxHeight: 540 }}>
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
                        console.log(row, Object.keys(row), column.id);
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
              <Popover
                id={openId}
                // open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Typography sx={{ p: 1 }}>{openData.full_name}</Typography>
                <Typography sx={{ p: 1 }}>Edit </Typography>
                <Typography sx={{ p: 1 }}>Delete</Typography>
              </Popover>
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
//   return (
//     <div className='main-container'>
//     <div className=' m20'>
//         <CourseHeader Heading={"Transaction Dashboard"} />

//         <div className='searchnfilter'>
//            <SearchBar />
//         </div>

//        <div className='transactionCards'> 
//         <div className='boxNoOne'>
//             <span className='boxValue'>Transactions</span>
//             <span className='boxNumber'>2</span>
//         </div>
//         <div className='boxNoTwo'>
//             <span className='boxValue'>Transactions Amount</span>
//             <span className='boxNumber'>₹2</span>
//         </div>
//         <div className='boxNoThree'>
//             <span className='boxValue'>Avg Order Value</span>
//             <span className='boxNumber'>₹1</span>
//         </div>
//         </div>

//         <table className='transactionCompleteTable'>
//             <tr className='transactionTableHeading'>
//                 <th>
//                     Student Name
//                 </th>
//                 <th className='courseName'>
//                     Course Name
//                 </th>
//                 <th>
//                     Transaction Date
//                 </th>
//                 <th>
//                     Transaction Amount
//                 </th>
//             </tr>
//             <hr className='hrLine'/>

    
//             <tr>
//                 <td><h4>Pranab Raj</h4> <h4 className='greyboldnumbers'>+918889844180</h4></td>
//                 <td><p className='firstCourseName'>TRICS 1 FREE MOCK TEST FOR EDIC-1</p></td>
//                 <td><p className='transactionDate'>19/Dec/2023</p></td>
//                 <td className='transactionAmount'> ₹1.00</td> 
//             </tr>
//             <tr>
//                 <td><h4>Sania Khan</h4> <h4 className='greyboldnumbers'>+918889844180</h4></td>
//                 <td><p className='firstCourseName'>TRICS 1 FREE MOCK TEST FOR EDIC-1</p></td>
//                 <td><p className='transactionDate'>19/Dec/2023</p></td>
//                 <td className='transactionAmount'> ₹1.00</td> 
//             </tr>
//         </table>
      
//     </div>
//     </div>

//   )