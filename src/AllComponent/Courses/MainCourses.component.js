import { Typography,Box } from "@mui/material";
import React, { useState } from "react";
import "../CSSFile/Courses.css"
import CourseHeader from "./CoursesHeader";
import CreateCourses from "./CreateCourse";
import SideBar from "../AdminDashboardMain/SideBar";
import Header from "./Header";
const MainCourses = ({})=>{
  const [headerLabel,setHeaderLabel] = useState("Create Course");
  const [subHeaderLabel,setSubHeaderLabel] = useState("Add / view content of your course");
  
  const handleHeaderLabels = (value)=>{
    setHeaderLabel(value);
  }
  return(
    <div className='grid-container'>
      <Header Heading = {headerLabel} subHeading = {subHeaderLabel}/>
      <SideBar />
    <Box className="main-container">
       <CreateCourses handleHeaderLabels={handleHeaderLabels}/>
    </Box>
    </div>
  )
}

export default MainCourses;