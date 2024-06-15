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
import attachmentimgae from "../../../Media/Images/undraw_attached_file_re_0n9b.svg";
import DeleteIcon from "@mui/icons-material/Delete";
const AddContent = ({ handleInputChange, handleTrackerPage, courseData }) => {
  const [contentType, setContentType] = useState([]);
  const [videoDesc, setVideoDesc] = useState([{}]);
  const [url, setUrl] = useState();
  const [contentName, setContentName] = useState();
  const [data, setData] = useState("");

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

  const extractVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=|^youtu\.be\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  const handleUploadLink = (url) => {
    const videoId = url ? extractVideoId(url) : null;
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    if (!videoId) {
      return <p>Invalid YouTube URL</p>;
    }
    // setData(embedUrl);
    return embedUrl;
  };

  const handleCreateCourse = () => {
    let createCourse = 3;
    handleTrackerPage(3, createCourse);
  };

  const handleAddUrl = (type, value) => {
    if (type === "uploadUrl") {
      setVideoDesc(value);
    }
  };

  return (
    <div className="formMain contentDisplay">
      <Box className="contentleftBox">
        <h2>
          <b>Contents</b>
        </h2>
        <Box className="contentInnerLeftBox">
          {!videoDesc?.length ? (
            <Box className="noContent">
              <img src={attachmentimgae} height="320px" width="320px" />
            </Box>
          ) : (
            videoDesc?.map((item) =>
              item?.content_name?.split(".")[1] === "mp4" ? (
                <Box className="videoBox">
                  <video width="350" controls autoplay muted height={"120"}>
                    <source src={item.content_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <Typography className="typoStyleVideo">
                    {item?.content_name}
                  </Typography>
                </Box>
              ) : handleImageType(item?.content_name?.split(".")[1]) ? (
                <Box className="videoBox">
                  <Box className="leftVideo">
                    <img src={item.content_url} height="120px" width="350" />
                    <Typography className="typoStyleVideo">
                      {item?.content_name}
                    </Typography>
                  </Box>
                  <Box>
                    <DeleteIcon className="deleteIconContent" />
                  </Box>
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
                <>
                  <Box className="videoBox">
                    <iframe
                      width="350"
                      height="120"
                      src={handleUploadLink(item.content_url)}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded YouTube Video"
                    ></iframe>
                    <h4>Name </h4> :{" "}
                    <Typography> {item.content_name}</Typography>
                  </Box>
                </>
              )
            )
          )}
        </Box>

        <Box className="/">
          {commonButton({
            handleTrackerPage: () => handleCreateCourse(),
            className: "coursesButton",
            label: "Create Course",
          })}
        </Box>
      </Box>
      <Box className="contentRightBox">
        <Typography className="contentRightHeading"> Add content</Typography>
        <Box>
          <RightBox
            contentType={contentType}
            handleVideoName={handleVideoName}
            handleInputChange={handleInputChange}
            courseData={courseData}
            handleAddUrl={handleAddUrl}
          />
        </Box>
      </Box>
    </div>
  );
};

export default AddContent;
