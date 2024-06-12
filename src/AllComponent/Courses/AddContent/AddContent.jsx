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
import { commonButton } from "../../../Util/CommonFields";

const AddContent = ({ handleInputChange, handleTrackerPage, courseData }) => {
  const [contentType, setContentType] = useState([]);
  const [videoDesc, setVideoDesc] = useState([{}]);

  useEffect(() => {
    if (courseData) {
      setVideoDesc(courseData.contents);
    }
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

  const handleImageType = (value) => {
    return value === "jpeg" || value === "png" || value === "jpg";
  };

  // const handleZipClick=()=>{
  //   console.log("ijkiuhniuhb")
  // }

  const handleCreateCourse = () => {
    let createCourse = 3;
    handleTrackerPage(3, createCourse);
  };

  return (
    <div className="formMain contentDisplay">
      <Box className="contentleftBox">
        <h2>
          <b>Contents</b>
        </h2>
        <Box className="contentInnerLeftBox">
          <Box>
          
          </Box>
          {videoDesc?.map((item) =>
            item?.content_name?.split(".")[1] === "mp4" ?
             (
              <Box className="videoBox">
                <video width="120" controls autoplay muted height={"120"}>
                  <source src={item.content_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <Typography className="typoStyleVideo">
                  {item?.content_name}
                </Typography>
              </Box>
            ) : handleImageType(item?.content_name?.split(".")[1]) ? (
              <Box className="videoBox">
                <img src={item.content_url} height="120px" width="120px" />
                <Typography className="typoStyleVideo">
                  {item?.content_name}
                </Typography>
              </Box>
            ) : item?.content_name?.split(".")[1] === "zip" ? (
              <Box className="videoBox">
                <FolderZipIcon className="zipFolderPrevIcon" />
                <Typography className="typoStyleVideo">
                  {item.content_name}
                </Typography>
              </Box>
            ) : handleDocumentType(item?.content_name?.split(".")[1]) ? (
              <Box className="videoBox">
                <a href={item.content_url} target="_blank">
                  <NoteIcon className="zipFolderPrevIcon" />
                </a>
                <Typography className="typoStyleVideo">
                  {item.content_name}
                </Typography>
              </Box>
            ) : (
              ""
            )
          )}
        </Box>
        {/* <Box className="/">
          {commonButton({
            handleTrackerPage: () => handleCreateCourse(),
            className: "coursesButton",
            label: "Create Course",
          })}
        </Box> */}
      </Box>
      <Box className="contentRightBox">
        <Typography className="contentRightHeading"> Add content</Typography>
        <Box>
          <RightBox
            contentType={contentType}
            handleVideoName={handleVideoName}
            handleInputChange={handleInputChange}
            courseData={courseData}
          />
        </Box>
      </Box>
    </div>
  );
};

export default AddContent;
