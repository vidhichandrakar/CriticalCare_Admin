import React, { Fragment, useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { Box, Button, Typography } from "@mui/material";
// import FolderIcon from '@mui/icons-material/Folder';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NoteIcon from '@mui/icons-material/Note';
import LandscapeIcon from '@mui/icons-material/Landscape';
import FolderZipIcon from '@mui/icons-material/FolderZip';
// import DownloadForOfflineSharpIcon from '@mui/icons-material/DownloadForOfflineSharp';
import DownloadForOfflineSharpIcon from '@mui/icons-material/DownloadForOfflineSharp';



const RightBox = () => {
  return (
    <Fragment>
    <div className="rightBoxComplete">
      <Typography className="rightBoxTypography "><FolderIcon className="folderIconRightBox"/>Folder</Typography>
      <Typography className="rightBoxTypography "><PlayCircleIcon className="folderIconRightBox"/>Video</Typography>
      <Typography className="rightBoxTypography "><AssignmentIcon className="folderIconRightBox"/>Online Test</Typography>
      <Typography className="rightBoxTypography "><AssignmentIcon className="folderIconRightBox"/>Subjective Test</Typography>
      <Typography className="rightBoxTypography "><NoteIcon className="folderIconRightBox"/>Document</Typography>
      <Typography className="rightBoxTypography "><LandscapeIcon className="folderIconRightBox"/>Image</Typography>
      <Typography className="rightBoxTypography "><FolderZipIcon className="folderIconRightBox"/>Zip File</Typography>
      <Typography className="rightBoxTypography "><DownloadForOfflineSharpIcon className="folderIconRightBox"/>Import Content</Typography>
      <Typography className="rightBoxTypography "><DownloadForOfflineSharpIcon className="folderIconRightBox"/>Import Live</Typography>
    </div>
    </Fragment>
  )
}

export default RightBox
