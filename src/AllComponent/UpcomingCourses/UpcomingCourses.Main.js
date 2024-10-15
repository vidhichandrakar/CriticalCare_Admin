import React, { Fragment } from "react";
import CourseHeader from "../Courses/CoursesHeader";
import { Box } from "@mui/material";
import UpcomingCourseBox from "./UpcomingCoursesBox";
import SideBar from "../AdminDashboardMain/SideBar";
import Header from "../Courses/Header";

const UpcomingCoursesMain = ({}) => {
  return (
    <Fragment>
      <div className="grid-container">
        <Header
          Heading="Create Upcoming Courses / Blog"
          subHeading="Add / view content of your cours"
        />
        <SideBar />
        <div className="main-container">
          <UpcomingCourseBox />
        </div>
      </div>
    </Fragment>
  );
};
export default UpcomingCoursesMain;
