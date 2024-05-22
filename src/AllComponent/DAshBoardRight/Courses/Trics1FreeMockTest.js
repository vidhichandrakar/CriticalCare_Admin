import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import Popover from "@mui/material/Popover";
import SideBar from "../../AdminDashboardMain/SideBar";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  deleteCourses,
  getCourseById,
  publishOrEditCourse,
  getDuration,
} from "../../ActionFactory/apiActions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DailogBox, capitalizeFirstLetter } from "../../../Util/CommonFields";
import { redirectRestriction } from "../../../Util/RedirectRestriction";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import IconButton from "@mui/material/IconButton";

const Trics1FreeMockTest = ({ onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [durationData, setDuration] = useState([]);
  let location = useLocation();
  const courseId = location.state?.id;
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteClick = () => {
    setIsOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDeleteCourse();
    setIsOpen(false);
  };

  const handleCancelDelete = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   if (redirectRestriction()) {
  //     if (courseId) {
  //       getCourseById({
  //         courseId,
  //         callBack: (response) => {
  //           const userCallBack = response?.data;
  //           setCourseData(userCallBack);
  //         },
  //         error: (error) => {
  //           toast.error(error.message);
  //         },
  //       });
  //     }
  //   } else {
  //     navigate("/admin");
  //   }
  // }, []);

  const isNotEmptyObject = (obj) => {
    return obj && typeof obj === "object" && Object.keys(obj).length;
  };
  const isNotEmptyArray = (arr) => {
    return Array.isArray(arr) && arr.length >= 1;
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
        });
      }
      getDuration({
        callBack: (response) => {
          const userCallBack = response?.data;
          setDuration(userCallBack);
        },
        error: (error) => {
          // toast.error(error.message);
        },
      });
    } else {
      navigate("/admin");
    }
  }, [courseId]);

  const durationName = durationData?.filter(
    (duraData) =>
      duraData?.duration_id == courseData?.durations?.length &&
      courseData?.durations[0]?.duration_id
  );

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
              <p className="greyPara">{courseData?.description}</p>
              <hr />

              <div className="PricenOfferPrice">
                <div>
                  <p className="blackPara">Price</p>
                  <p className="greyPara">
                    ₹
                    {courseData?.durations?.length &&
                      courseData?.durations[0]?.offer_price}
                  </p>
                </div>
                <div className="offerPrice">
                  <p className="blackPara">Offer Price</p>
                  <p className="greyPara">
                    {courseData?.durations?.length &&
                      courseData?.durations[0]?.price}
                  </p>
                </div>
              </div>
              <hr />
              {isNotEmptyObject(courseData) || isNotEmptyArray(courseData) ? (
                courseData?.durations[0]?.duration_type_id === 3 ||
                courseData?.durations[0]?.duration_type_id === 4 ? null : (
                  <>
                    <div className="CatagorynSubCatagory">
                      <div>
                        <p className="blackPara">Catagory</p>
                        <p className="greyPara">{courseData?.main_category}</p>
                      </div>
                      <div className="subCatagory">
                        <p className="blackPara">Sub Catagory</p>
                        <p className="greyPara">{courseData?.sub_category}</p>
                      </div>
                    </div>
                    <hr />

                    <p className="blackPara">Course Duration</p>
                    <p className="greyPara">
                      {courseData?.durations?.length &&
                        courseData?.durations[0]?.duration}{" "}
                      {durationName?.length && durationName[0]?.duration_name}
                    </p>
                    <hr />
                  </>
                )
              ) : null}
        
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
                src={courseData?.thumbnail_path}
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
                  onClick={() => handleDeleteClick()}
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

              <DailogBox
                isOpen={isOpen}
                handleConfirmDelete={handleConfirmDelete}
                handleDeleteClick={handleDeleteClick}
                handleCancelDelete={handleCancelDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trics1FreeMockTest;
