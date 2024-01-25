import React, { Fragment, useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { Box, Button, Typography } from "@mui/material";
import banner from "../../../Media/Images/banner3.jpg";
import Popover from '@mui/material/Popover';
const LeftBox = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Fragment>
      <Box className="firstTree">
        <FolderIcon className="folderIconContent" />
        <Box className="innerHeading">
          <Typography className="innerHeadingOne">
            <b>Bank Exams</b>
          </Typography>
          <Typography className="innerHeadingTwo">
            {" "}
            1 Video(s), 2 file(s){" "}
          </Typography>
        </Box>
        <Box>
          
        </Box>
      </Box>
      <Box className="innerTree">
        <FolderIcon className="folderIconContentTwo" />
        <Box className="innerHeading">
          <Typography sx={{ marginTop: 1 }}>Bank Exams lesson 1</Typography>
        </Box>
      </Box>
      <Box className="innerTree">
        <img src={banner} className="folderIconContentTwo" width={45} height={42} style={{marginLeft:"1%"}} alt="video"></img>
        <Box className="innerHeading">
          <Typography >Bank Exams lesson 1</Typography>
           <Typography className="videoText">00:00:00</Typography>
        </Box>
      </Box>
      <Box className="innerTree">
        <img src={banner} className="folderIconContentTwo" width={45} height={42} style={{marginLeft:"1%"}} alt="doc"></img>
        <Box className="innerHeading">
          <Typography>Sample</Typography>
        </Box>
      </Box>
      <Box className="innerTree">
      <img src={banner} className="folderIconContentTwo" width={45} height={42} style={{marginLeft:"1%"}} alt="doc"></img>
        <Box className="innerHeading">
          <Typography>Sample</Typography>
        </Box>
      </Box>
      <Box className="innerTree">
      <Button aria-describedby={id} variant="text" onClick={handleClick} className="contentButton">
        + Add Content
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
      </Box>
    </Fragment>
  );
};

export default LeftBox;
