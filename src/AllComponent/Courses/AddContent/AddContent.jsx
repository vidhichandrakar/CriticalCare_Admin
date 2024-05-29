import { Box, Typography } from "@mui/material";
import React from "react";
import "../../CSSFile/Content.css";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";
import Header from "../Header";
import SideBar from "../../AdminDashboardMain/SideBar";
import AddContentDrawer from "./AddContentDrawer";

const AddContent = ({}) => {
  return (
    <div className="grid-container">
      <Header
        Heading={"Hi 360 Critical Care,"}
        subHeading={"Welcome to your Dashboard"}
      />
      <SideBar />
      <div className="formMain contentDisplay">
        <Box className="contentleftBox">
          <h2>
            <b>Contents</b>
          </h2>
          <Box className="contentInnerLeftBox">
            <LeftBox />
          </Box>
        </Box>

        <Box className="contentRightBox">
          <Typography className="contentRightHeading"> Add content</Typography>
          <Box>
            <RightBox />
          </Box>
        </Box>
        {/* <AddContentDrawer/> */}
      </div>
    </div>
  );
};

export default AddContent;
