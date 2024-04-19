import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSSFile/YourCourses.css";
import CourseHeader from "./CoursesHeader";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "@mui/material/Button";
import Folder from "../../Media/Images/folder.avif";
import SearchBar from "../../Util/SearchBar";
import YourCoursesCard from "./YourCoursesCard";
import { YourCoursesCardData } from "../../Data/JsonData";
import SideBar from "../AdminDashboardMain/SideBar";
import { Link } from "react-router-dom";
import { getAllCourses, getAllUsersApi } from "../ActionFactory/apiActions";
import LoaderComponent from "../../Util/LoaderComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirectRestriction } from "../../Util/RedirectRestriction";
import Header from "./Header";
import { Box } from "@mui/material";

const YourCourses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [loaderState, setLoaderState] = useState(false);
  const [userData, setUserData] = useState([]);

  const authorized = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectRestriction()) {
      setLoaderState(true);
      getAllCourses({
        callBack: (response) => {
          const userCallBack = response?.data;
          setAllCourses(userCallBack);
          setLoaderState(false);
        },
        error: (error) => {
          toast.error(error.message);
          console.log(error.message);
          setLoaderState(false);
        },
      });
      getAllUsersApi({
        callBack: (response) => {
          const userCallBack = response?.data;
          setUserData(userCallBack);
          setLoaderState(false);
        },
        error: (error) => {
          toast.error(error.message);
          console.log(error.message);
          setLoaderState(false);
        },
      });
    } else {
      navigate("/admin");
    }
  }, []);

  return (
    <div className="grid-container">
      <SideBar />
      <div className="main-container">
        <Header
          Heading={"My Courses"}
          subHeading={"Add/View courses of your brand"}
        />
        <LoaderComponent loaderState={loaderState} />
        <Box className="subHeaderMycourses">
        <SearchBar  placeholder="Search by name" />
        </Box>
        <div className="Add-main-cards">
          <div className="card">
            <div className="AddCourses">
              <img src={Folder} className="FolderImg" />
              <Link to="/CreateCourses">
                <Button variant="contained" className="AddBtn">
                  Add New Courses <AddRoundedIcon />
                </Button>
              </Link>
            </div>
          </div>
          <YourCoursesCard
            allCourses={allCourses}
            userData={userData}
            Data={YourCoursesCardData}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default YourCourses;
