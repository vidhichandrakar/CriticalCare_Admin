import React from "react";
import CourseHeader from "../Courses/CoursesHeader";
import { Box } from "@mui/material";
import UpcomingCourseBox from "./UpcomingCoursesBox";
import SideBar from "../AdminDashboardMain/SideBar";

const UpcomingCoursesMain =({})=>{
  return(
    <div className='grid-container'>
      <SideBar />
    <Box className="mainBox">
    <CourseHeader Heading = {"Create Upcoming Courses / Blog"} subHeading = {"Add / view content of your cours"}/>
    <UpcomingCourseBox/>
 </Box>
 </div>
  )
}
export default UpcomingCoursesMain;