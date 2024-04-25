import React from "react";
import CourseHeader from "../Courses/CoursesHeader";
import { Box } from "@mui/material";
import CouponHeader from "./CouponHeader";
import CouponBox from "./CouponBox";
import SideBar from "../AdminDashboardMain/SideBar";
import Header from "../Courses/Header";
const CouponMain =({})=>{
  return(
    <div className='grid-container'>
      <Header Heading = {"Manage Coupons"} subHeading = {""}/>
      <SideBar />
      <main className="main-container">
    
    <CouponHeader/>
    <CouponBox/>
 </main>
 </div>
  )
}
export default CouponMain;