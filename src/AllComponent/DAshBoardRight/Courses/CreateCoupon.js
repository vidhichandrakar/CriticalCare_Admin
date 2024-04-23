import React from "react";
import Box from "@mui/material/Box";
import CourseHeader from "../../Courses/CoursesHeader";
import CreateCouponForm from "./CreateCoupon.form";
import SideBar from "../../AdminDashboardMain/SideBar";
import Header from "../../Courses/Header";

const CreateCoupon = () => {
  return (
    <div className='grid-container'>
      <Header Heading={"Create coupon"} subHeading={""}/>
      <SideBar />
    <main className=" main-container">
      {/* <CourseHeader  /> */}
      <CreateCouponForm />
    </main>
    </div>
  );
}

export default CreateCoupon;
