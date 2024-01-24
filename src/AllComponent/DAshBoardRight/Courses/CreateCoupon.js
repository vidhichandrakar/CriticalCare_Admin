import React from "react";
import Box from "@mui/material/Box";
import CourseHeader from "../../Courses/CoursesHeader";
import CreateCouponForm from "./CreateCoupon.form";
import SideBar from "../../AdminDashboardMain/SideBar";

const CreateCoupon = () => {
  return (
    <div className='grid-container'>
      <SideBar />
    <Box className="mainBox">
      <CourseHeader Heading={"Create coupon"} subHeading={""} />
      <CreateCouponForm />
    </Box>
    </div>
  );
}

export default CreateCoupon;
