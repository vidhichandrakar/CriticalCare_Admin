import React from "react";
import "../CSSFile/YourCourses.css";
import cardimg from "../../Media/Images/db7187e8-b7cf-47ed-8900-6de89dabde06.png";
import CourseHeader from "./CoursesHeader";
import FolderCopyRoundedIcon from "@mui/icons-material/FolderCopyRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "@mui/material/Button";
import Folder from "../../Media/Images/folder.avif";
import SearchBar from "../../Util/SearchBar";
import YourCoursesCard from "./YourCoursesCard";
import {YourCoursesCardData} from '../../Data/JsonData'
import SideBar from "../AdminDashboardMain/SideBar";
import { Link } from "react-router-dom";

const YourCourses = () => {
  return (
    <div className='grid-container'>
      <SideBar />
    <div className="main-container margin20">
      <CourseHeader
        Heading={"Your Courses (3)"}
        subHeading={"Add/View courses of your brand"}
      />

      <SearchBar  mt ="2%" placeholder="Search by name"/>
      <div className="Add-main-cards">
        <div className="card">
          <div className="AddCourses">
            <img src={Folder} className="FolderImg" />
            <Link to="/CreateCourses"><Button variant="contained" className="AddBtn">
              Add New Courses <AddRoundedIcon />
            </Button></Link>
          </div>
        </div>
       <YourCoursesCard Data = {YourCoursesCardData}/>
      </div>
    </div>
    </div>
  );
}

export default YourCourses;
