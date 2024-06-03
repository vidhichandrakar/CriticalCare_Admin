import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../CSSFile/Content.css";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";
import Header from "../Header";
import SideBar from "../../AdminDashboardMain/SideBar";
import AddContentDrawer from "./AddContentDrawer";
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

  const handleVideoName=(value)=>{
    
    setVideoDesc(value);

  }
  return (
    <div className="grid-container">
      <Header
        Heading={"Hi 360 Critical Care,"}
        subHeading={"Welcome to your Dashboard"}
      />
      <SideBar />
      {console.log("videoDesc,", videoDesc)}
      <div className="formMain contentDisplay">
        <Box className="contentleftBox">
          <h2>
            <b>Contents</b>
          </h2>
          <Box className="contentInnerLeftBox">
            {/* <LeftBox /> */}

            {videoDesc?.map(
              (item) =>
                item.thumbnailPath && (
                  <Box className="videoBox">
                    {console.log("dgvfhjsejkfdhns",item.fileName.split(".")[1], "abcdddddd",item.fileName)}
                    <video width="120" controls autoplay muted height={"120"}>
                      <source src={item.thumbnailPath} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <Typography className="typoStyleVideo"> {item?.fileName}</Typography>
                  </Box>
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
    </div>
  );
};

export default AddContent;
