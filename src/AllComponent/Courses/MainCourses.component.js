import { Typography,Box } from "@mui/material";
import React, { useState } from "react";
import "../CSSFile/Courses.css"
import CourseHeader from "./CoursesHeader";
import CreateCourses from "./CreateCourse";
import SideBar from "../AdminDashboardMain/SideBar";
const MainCourses = ({})=>{
  const [headerLabel,setHeaderLabel] = useState("Create Course");
  const [subHeaderLabel,setSubHeaderLabel] = useState("Add / view content of your course");
  const labels=[
    {id:0,labels:"Create Course",subLabels:"Add / view content of your course"},
    {id:1,labels:"Nephrology (Course Name)",subLabels:""},
    {id:2,labels:"Nephrology (Course Name)",subLabels:"Add / view content of your course"}
  ]
  const handleHeaderLabels = (value)=>{
    console.log("lan",value)
    setHeaderLabel(value);
    // setSubHeaderLabel(heading[0].subLabels);
  }
  return(
    <div className='grid-container'>
      <SideBar />
    <Box className="mainBox">
       <CourseHeader Heading = {headerLabel} subHeading = {subHeaderLabel}/>
       <CreateCourses handleHeaderLabels={handleHeaderLabels}/>
    </Box>
    </div>
  )
}

export default MainCourses;