import { Box, Typography } from "@mui/material";
import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CourseHeader =({Heading,subHeading})=>{
  return(
    <Box className="HeaderBox">
     <Box className="HeaderLeft">
     <Typography className="headerText">
      {Heading}
     </Typography>
     <Typography className="subHeader">
       {subHeading}
     </Typography>
     </Box>
      <Box className="HeaderRight">
      <FormControl sx={{ m: 1, minWidth: 240 }}>
        <Select
          className="selectDesign"
          displayEmpty
          renderValue={() => {return <em className="labelDesign">360 Critcial Care</em>
          }}
          inputProps={{ 'aria-label': 'Without label' }}
         startAdornment={<div className="logoDesign"><Typography className="logoText">3CC</Typography></div>}
        >
          <MenuItem value={""}>
            <em>360 Critcial Care</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      </Box>
    </Box>
  )
}
export default CourseHeader;