import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
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
import yellowEnvlope from "../../../Media/Images/yellowEnvlope.jpeg";
import Header from "../../Courses/Header";
import { Typography } from "@material-ui/core";
import { tripmHtmlTagsToNormalFormat } from "../../../Util/CommonHtmlTagsToTextConvertor";

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
            const userCallBack = response?.data[0];
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
      courseData?.durations[courseData?.durations?.length - 1]?.duration_id
  );

  const handleDeleteCourse = () => {
    deleteCourses({
      courseId,
      callBack: (response) => {
        toast.success("Course Deleted successfully!", {
          autoClose: 500,
        });
        navigate("/admin/YourCourses");
      },
      error: () => {
        toast.error("Something went wrong!", {
          autoClose: 500,
        });
      },
    });
  };

  const handleEdit = (id) => {
    localStorage.setItem("addContent", false);
    navigate("/admin/CreateCourses", { state: { id: courseId } });
  };

  const handleContent = () => {
    localStorage.setItem("addContent", true);
    navigate("/admin/CreateCourses", { state: { id: courseId } });
  };

  const handlePublish = () => {
    const payload = {
      courseDetails: {
        is_publish:
          courseData?.is_publish === "not published"
            ? "published"
            : "not published",
      },
    };
    publishOrEditCourse({
      courseId: courseData?.course_id,
      payload,
      callBack: (response) => {
        navigate("/admin/YourCourses");
      },
    });
  };

  return (
    <div className="grid-container">
      <Header
        Heading={<ArrowBackIosNewIcon />}
        LinkAddress={"/admin/YourCourses"}
      />
      <SideBar />
      <div className="main-container ">
        <div className="another-main-container">
          <div className="completeTricsBox">
            <div className="leftSideRow">
              <p className="blackPara">Course Name</p>
              <p className="greyPara">
                {capitalizeFirstLetter(courseData?.course_name)}
              </p>
              <hr />
              <p className="blackPara">Description</p>
              <TextField
                sx={{ mt: -2 }}
                inputProps={{ className: "textField" }}
                fullWidth
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                className="DescBoxShadow "
                variant="standard"
                value={tripmHtmlTagsToNormalFormat(courseData?.description)}
              />
              <div className="PricenOfferPrice">
                <div>
                  <p className="blackPara">Price</p>
                  <p className="greyPara">
                    ₹
                    {courseData?.durations?.length &&
                      courseData?.durations[courseData?.durations?.length - 1]
                        ?.price}
                  </p>
                </div>
                <div className="offerPrice">
                  <p className="blackPara">Offer Price</p>
                  <p className="greyPara">
                    {courseData?.durations?.length &&
                      courseData?.durations[courseData?.durations?.length - 1]
                        ?.offer_price}
                  </p>
                </div>
              </div>
              <hr />
              {isNotEmptyArray(courseData) ? (
                courseData?.durations[courseData?.durations?.length - 1]
                  ?.duration_type_id === 3 ||
                courseData?.durations[courseData?.durations?.length - 1]
                  ?.duration_type_id === 4 ? null : (
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
                    <p>
                      {" "}
                      {courseData?.durations[0]?.duration_type_id === 2 ? (
                        <Box className="multiplevalidityBox">
                          Multiple Validity Available
                        </Box>
                      ) : courseData?.durations[0]?.duration_type_id === 1 ? (
                        <Box className="multiplevalidityBox">
                          Single Validity
                        </Box>
                      ) : courseData?.durations[0]?.duration_type_id === 3 ? (
                        <Box className="multiplevalidityBox">
                          LifeTime Validity
                        </Box>
                      ) : courseData?.durations[0]?.duration_type_id === 4 ? (
                        <Box className="multiplevalidityBox">Course Expire</Box>
                      ) : null}
                    </p>
                    <Box className="YearBox ">
                      {courseData?.durations?.map((item) => {
                        return (
                          <Box className="durationBOx">
                            <Box className="greyPara">
                              <p>{item.duration}</p>
                              <p style={{ marginLeft: "5px" }}>
                                {item.duration_name}
                              </p>
                            </Box>
                            <Box>
                              <p
                                className="greyPara"
                                style={{ marginTop: "-8px" }}
                              >
                                {item.offer_price}
                              </p>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>

                    <hr />
                  </>
                )
              ) : null}

              <div className="StuEnrViewAll">
                <div>
                  <p className="blackPara">Student Enrolled</p>
                </div>
                <span className="blueViewAll pointer">
                  <Link to="/admin/User" className="viewAllBlue">
                    View All
                  </Link>
                </span>
              </div>
              <p className="greyPara">44</p>
            </div>

            <div>
              {courseData?.thumbnail_path ? (
                <img
                  src={courseData?.thumbnail_path}
                  className="rightSideRow"
                />
              ) : (
                <img src={yellowEnvlope} className="rightSideRow" />
              )}
            </div>
          </div>

          <div className="whiteBoxOfContent">
            <div className="contentOneContent" onClick={handleContent}>
              <FolderIcon className="folderIcon" />

              <div className="ContentCol">
                <p className="blackPara">Content</p>
                <p className="greyPara mt-10px">
                  {courseData?.contents?.length} content(s)
                </p>
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
            <Button
              variant="contained"
              className="Publishbutton"
              onClick={() => handlePublish()}
            >
              <PublishedWithChangesIcon className="PoPIcon" />
              {courseData?.is_publish == "published" ? "UnPublish" : "Publish"}
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
