import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../CSSFile/Content.css";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";
import Header from "../Header";
import SideBar from "../../AdminDashboardMain/SideBar";
import AddContentDrawer from "./AddContentDrawer";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import NoteIcon from "@mui/icons-material/Note";
import { getContentType } from "../../ActionFactory/apiActions";

const AddContent = ({}) => {
  const [contentType, setContentType] = useState([]);
  const [videoDesc, setVideoDesc] = useState([{}]);

  useEffect(() => {
    getContentType({
      callBack: (response) => {
        setContentType(response.data);
      },
    });
  }, []);

  const handleVideoName = (value) => {
    setVideoDesc(value);
  };

  const handleDocumentType = (value) => {
    return (
      value === "doc" ||
      value === "HTML" ||
      value === "pdf" ||
      value === "XLS" ||
      value === "PPT" ||
      value === "TXT"
    );
  };

  // const handleZipClick=()=>{
  //   console.log("ijkiuhniuhb")
  // }

  return (
      <div className="formMain contentDisplay">
        <Box className="contentleftBox">
          <h2>
            <b>Contents</b>
          </h2>
          <Box className="contentInnerLeftBox">
            {/* <LeftBox /> */}
           
            {videoDesc?.map((item) =>
              item?.fileName?.split(".")[1] === "mp4" ? (
                <Box className="videoBox">
                  {/* {console.log("dgvfhjsejkfdhns",item?.fileName?.split('.')[1])} */}
                  <video width="120" controls autoplay muted height={"120"}>
                    <source src={item.thumbnailPath} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <Typography className="typoStyleVideo">
                    {item?.fileName}
                  </Typography>
                </Box>
              ) : item?.fileName?.split(".")[1] === "jpg" ? (
                <Box className="videoBox">
                  {/* {console.log("dgvfhjsejkfdhns",item.thumbnailPath)} */}
                  <img src={item.thumbnailPath} height="120px" width="120px" />
                  <Typography className="typoStyleVideo">
                    {item?.fileName}
                  </Typography>
                </Box>
              ) : item?.fileName?.split(".")[1] === "zip" ? (
                <Box className="videoBox">
                  {console.log("dgvfhjsejkfdhns",item.fileName)}
                  <FolderZipIcon className="zipFolderPrevIcon" />
                  <Typography className="typoStyleVideo">
                    {item.fileName}
                  </Typography>
                </Box>
              ) : handleDocumentType(item?.fileName?.split(".")[1]) ? (
                <Box className="videoBox">
                  <a
                    href={item.thumbnailPath}
                    target="_blank"
                  >
                    <NoteIcon
                      className="zipFolderPrevIcon"
                    />
                  </a>
                  <Typography className="typoStyleVideo">
                    {item.fileName}
                  </Typography>
                </Box>
              ) : (
                ""
              )
            )}
          </Box>
        </Box>
        <Box className="contentRightBox">
          <Typography className="contentRightHeading"> Add content</Typography>
          <Box>
            <RightBox
              contentType={contentType}
              handleVideoName={handleVideoName}
            />
          </Box>
        </Box>
        {/* <AddContentDrawer/> */}
      </div>
  );
};

export default AddContent;
