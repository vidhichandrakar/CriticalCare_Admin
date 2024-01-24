import React from "react";
import "../../CSSFile/Banner.css";
import CourseHeader from "../../Courses/CoursesHeader";
import Card from "@mui/material/Card";
import BannerCard from "./BannerCard";
import { BannerData } from "../../../Data/JsonData";
import { Fragment } from "react";
import SideBar from "../../AdminDashboardMain/SideBar";

const Banner = () => {
  return (
    <Fragment>
      <div className='grid-container'>
      <SideBar />
      <div className="BannerMain main-container">
        <CourseHeader
          Heading="Manage Banners"
          subHeading="Show banners to users"
        />
        <div className="BannerBox">
          <div className="HeadText">
            <h2>Your Banner (3)</h2>
          </div>
          <BannerCard Data={BannerData} />
        </div>
      </div>
      </div>
    </Fragment>
  );
}

export default Banner;
