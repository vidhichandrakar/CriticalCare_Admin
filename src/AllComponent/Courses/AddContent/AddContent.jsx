import { Box, Typography } from "@mui/material";
import React from "react";
import "../../CSSFile/Content.css";
import LeftBox from "./LeftBox";

const AddContent = ({})=>{
  return(
    <div className="formMain contentDisplay">

      <Box className="contentleftBox"> 
        <h2><b>Contents</b></h2>
        <Box className="contentInnerLeftBox"> 
         <LeftBox/>
        </Box>
        
      </Box>
      <Box className="contentRightBox">
      <Typography className="contentRightHeading"> Add content</Typography>
      </Box>

    </div>
  )
}

export default AddContent;