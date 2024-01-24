import React, { Fragment } from "react";
import FolderIcon from '@mui/icons-material/Folder';
import { Box, Typography } from "@mui/material";

const LeftBox = ({})=>{
  return (
  <Fragment>
    <Box className="firstTree">
    <FolderIcon className="folderIconContent"/>
    <Box className="innerHeading">
      <Typography className="innerHeadingOne"><b>Bank Exams</b></Typography>
     <Typography className="innerHeadingTwo"> 1 Video(s), 2 file(s) </Typography>
     </Box>
     </Box>
     <Box className="innerTree">
     <FolderIcon className="folderIconContentTwo"/>
    <Box className="innerHeading" >
      <Typography sx={{marginTop:1}}>Bank Exams lesson 1</Typography>
     
     </Box>
     </Box>
     
  </Fragment>
  )
}

export default LeftBox;