import React from "react";
import CourseHeader from "../Courses/CoursesHeader";
import { Box } from "@mui/material";
import CouponHeader from "./CouponHeader";
import CouponBox from "./CouponBox";
import SideBar from "../AdminDashboardMain/SideBar";
const CouponMain =({})=>{
  return(
    <div className='grid-container'>
      <SideBar />
   <Box className="mainBox">
    <CourseHeader Heading = {"Manage Coupons"} subHeading = {""}/>
    <CouponHeader/>
    <CouponBox/>
 </Box>
 </div>
  )
}
export default CouponMain;