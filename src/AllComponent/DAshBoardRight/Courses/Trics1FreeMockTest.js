import React, { useEffect, useState } from "react";
import { Select, Box, Typography, TextField, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import FolderIcon from "@mui/icons-material/Folder";
import Popover from "@mui/material/Popover";
import DoctorsImage from "../../../Media/Images/db7187e8-b7cf-47ed-8900-6de89dabde06.png";
import CourseHeader from "../../Courses/CoursesHeader";
import SideBar from "../../AdminDashboardMain/SideBar";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  deleteCourses,
  getCourseById,
  publishOrEditCourse,
} from "../../ActionFactory/apiActions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { capitalizeFirstLetter } from "../../../Util/CommonFields";
import { redirectRestriction } from "../../../Util/RedirectRestriction";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Header from "../../Courses/Header";

const Trics1FreeMockTest = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [courseData, setCourseData] = useState([]);
  let location = useLocation();
  const courseId = location.state?.id;
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (redirectRestriction()) {
      if (courseId) {
        getCourseById({
          courseId,
          callBack: (response) => {
            const userCallBack = response?.data;
            setCourseData(userCallBack);
          },
          error: (error) => {
            toast.error(error.message);
          },
        });
      }
    } else {
      navigate("/admin");
    }
  }, []);
  useEffect(() => {
    if (courseId) {
      getCourseById({
        courseId,
        callBack: (response) => {
          const userCallBack = response?.data;
          setCourseData(userCallBack);
        },
      });
    }
  }, [courseId]);

  const handleDeleteCourse = () => {
    deleteCourses({
      courseId,
      callBack: (response) => {
        toast.success("Course Deleted successfully!", {
          autoClose: 500,
        });
        navigate("/YourCourses");
      },
      error: () => {
        toast.error("Something went wrong!", {
          autoClose: 500,
        });
      },
    });
  };

  const handleEdit = (id) => {
    navigate("/CreateCourses", { state: { id: courseId } });
  };

  const handlePublish = () => {
    const payload = {
      is_publish:
        courseData?.is_publish === "not published"
          ? "published"
          : "not published",
    };
    publishOrEditCourse({
      courseId: courseData?.course_id,
      payload,
      callBack: (response) => {
        navigate("/YourCourses");
      },
    });
  };
  return (
    <div className="grid-container">
        <Header
            Heading={capitalizeFirstLetter(courseData?.course_name)}
          />
      <SideBar />
      <div className="main-container ">
        <div className="singleRow">
          <Link to="/YourCourses">
            <Button className="backToCourses">
              <ArrowBackIosNewIcon />
            </Button>
          </Link>
        
        </div>
        <div className="another-main-container">
          <div className="completeTricsBox">
            <div className="leftSideRow">
              <p className="blackPara">Course Name</p>
              <p className="greyPara">
                {capitalizeFirstLetter(courseData?.course_name)}
              </p>
              <hr />

              <p className="blackPara">Description</p>
              <p className="greyPara">{courseData.description}</p>
              <hr />

              <div className="PricenOfferPrice">
                <div>
                  <p className="blackPara">Price</p>
                  <p className="greyPara">{courseData.price}</p>
                </div>
                <div className="offerPrice">
                  <p className="blackPara">Offer Price</p>
                  <p className="greyPara">{courseData.offer_price}</p>
                </div>
              </div>
              <hr />

              <div className="CatagorynSubCatagory">
                <div>
                  <p className="blackPara">Catagory</p>
                  <p className="greyPara">OTHERS</p>
                </div>
                <div className="subCatagory">
                  <p className="blackPara">Sub Catagory</p>
                </div>
              </div>
              <hr />

              <p className="blackPara">Course Duration</p>
              <p className="greyPara">1 year</p>
              <hr />

              <div className="StuEnrViewAll">
                <div>
                  <p className="blackPara">Student Enrolled</p>
                </div>
                <span className="blueViewAll pointer">
                  <Link to="/User" className="viewAllBlue">
                    View All
                  </Link>
                </span>
              </div>
              <p className="greyPara">44</p>
            </div>

            <div>
              <img
                src={`data:image/png;base64,${courseData?.thumbnail_path}`}
                className="rightSideRow"
              />
            </div>
          </div>

          <div className="whiteBoxOfContent">
            <div className="contentOneContent">
              <FolderIcon className="folderIcon" />

              <div className="ContentCol">
                <p className="blackPara">Content</p>
                <p className="greyPara mt-10px">1 Content</p>
              </div>
            </div>

            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              className="catagorytextofTrics"
            >
              {/* <MoreHorizIcon className="threeDotsIcon"/> */}
              More Options
              <MoreHorizIcon className="threeDotsIcon" />
            </Button>
            <div className="Widthhh">
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
              >
                <MenuItem
                  sx={{ width: "230px" }}
                  value={10}
                  className="greyPara"
                  onClick={handleEdit}
                >
                  <EditIcon className="PoPIcon" />
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => handleDeleteCourse(id)}
                  value={20}
                  className="greyPara"
                >
                  <DeleteIcon className="PoPIcon" />
                  Delete
                </MenuItem>
                <MenuItem
                  value={30}
                  className="greyPara"
                  onClick={() => handlePublish()}
                >
                  <PublishedWithChangesIcon className="PoPIcon" />
                  {courseData?.is_publish == "published"
                    ? "UnPublish"
                    : "Publish"}
                </MenuItem>
                <IconButton aria-label="add to favorites"></IconButton>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trics1FreeMockTest;
