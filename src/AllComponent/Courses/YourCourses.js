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
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";

const YourCourses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [loaderState, setLoaderState] = useState(false);
  const [userData, setUserData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [courseData, setCourseData] = useState([]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const authorized = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (redirectRestriction()) {
      setLoaderState(true);
      getAllCourses({
        callBack: (response) => {
          const userCallBack = response?.data;
          setAllCourses(userCallBack);
          setCourseData(userCallBack);
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

  useEffect(() => {
    if (filterValue == "All Courses") {
      setAllCourses(courseData);
    } else {
      const filterCourseData = courseData?.filter(
        (item) => item?.is_publish == filterValue
      );
      setAllCourses(filterCourseData);
    }
  }, [filterValue]);

  const handleFilterCourse = (type) => {
    setFilterValue(type);
  };

  return (
    <div className="grid-container">
      <Header
        Heading={"My Courses"}
        subHeading={"Add/View courses of your brand"}
      />
      <SideBar />
      <main className="main-container">
        <LoaderComponent loaderState={loaderState} />
        <Box className="subHeaderMycourses">
          <SearchBar placeholder="Search by name" />

          <div className="MyCOurseFilterBtn filterButton">
            <Button className="filterButton" onClick={handleClick}>
              <FilterAltIcon /> Filter
            </Button>
          </div>
        </Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{ mt: "5px" }}
          value={value}
        >
          <MenuItem
            sx={{ mb: -1 }}
            value={"published"}
            onClick={() => handleFilterCourse("published")}
          >
            <span className="ccLogout">Publish</span>
          </MenuItem>
          <Divider />

          <MenuItem
            sx={{ mt: -1, mb : -1 }}
            value={"not published"}
            onClick={() => handleFilterCourse("not published")}
          >
            <span className="ccLogout">Not Publish</span>
          </MenuItem>

          <Divider />
          <MenuItem
            sx={{ mt: -1 }}
            value={"published"}
            onClick={() => handleFilterCourse("All Courses")}
          >
            <span className="ccLogout">All Courses</span>
          </MenuItem>
        </Popover>

        <Box className="Add-main-cards">
          <YourCoursesCard
            allCourses={allCourses}
            userData={userData}
            Data={YourCoursesCardData}
          />
        </Box>
        <div>
          <Box
            sx={{
              top: "88%",
              position: "absolute",
              zIndex: 1111111111111,
              right: 0,
            }}
            className="addCircle"
            onClick={() => navigate("/admin/CreateCourses")}
          >
            <AddRoundedIcon className="addIcon" />
          </Box>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
};

export default YourCourses;
