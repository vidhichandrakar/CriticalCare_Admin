import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tracker from "./Tracker";
import CreateForm from "./CreateCourses.form";
import EditPrice from "./EditPrice";
import {
  createCourse,
  getCourseById,
  getCourseContentById,
  publishOrEditCourse,
} from "../ActionFactory/apiActions";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import LoaderComponent from "../../Util/LoaderComponent";
import { Link, useNavigate } from "react-router-dom";
import AddContent from "./AddContent/AddContent";

const CreateCourses = ({ handleHeaderLabels }) => {
  const [trackerPage, setTackerPage] = useState(0);
  const [basicInfo, setBasicInfo] = useState({});
  const [courseIdForContent, setCourseIdForContent] = useState({});
  const [editPrice, setEditPrice] = useState([
    {
      duration: "20",
      years: "",
      regularPrice: "400",
      offerPrice: "1000",
      startDate: "",
      endDate: "",
      duration_type_name: "",
      duration_type_id: "",
      duration_id: "",
    },
    {
      duration: "20",
      years: "",
      regularPrice: "400",
      offerPrice: "1000",
      startDate: "",
      endDate: "",
      duration_type_name: "",
      duration_type_id: "",
      duration_id: "",
    },
  ]);
  const [courseData, setCourseData] = useState([]);
  const [loaderState, setLoaderState] = useState(false);
  const [validity, setValidity] = useState([{}]);
  const [mulitiDuration, setMulitiDuration] = useState([{}]);
  const [attachments, setAttachment] = useState([{}]);
  let location = useLocation();
  const courseId = location.state?.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      setLoaderState(true);
      getCourseById({
        courseId,
        callBack: (response) => {
          const userCallBack = response?.data[0];
          setCourseData(userCallBack);
          setLoaderState(false);
          if (userCallBack?.contents?.length) {
            setAttachment(userCallBack?.contents);
          }
          if (localStorage.getItem("addContent") === "true") {
            setTackerPage(3);
          } else {
            setTackerPage(0);
          }
        },
      });
    }
  }, [courseId]);

  const handleInputChange = (type, value) => {
    if (type === "basicInfo") {
      setBasicInfo(value);
    } else if (type === "editPrice") {
      console.log("Value=----->,", value);
      handleCreateCourse(value);
    } else if (
      type === "editPriceLifeTime" ||
      type === "editPriceWithExpiryDate"
    ) {
      handleCreateCourse([value]);
    }
  };

  const handleTrackerPage = (page, value) => {
    if (page === 2) {
      setMulitiDuration(value);
    } else {
      setTackerPage(page);
      handleHeaderLabels(basicInfo.Name);
    }
  };

  const handleCreateCourse = (value) => {
    let payload;
    try {
      const courseDetails = {
        course_name: basicInfo?.Name,
        description: basicInfo?.Description,
        course_batchdetails: "passing as static need to change it", //passing as static will imlement once it willl present
        course_detail: "hello details", //same as above
        course_FAQ: "This is FAQ", //same as above
        about_course: basicInfo?.Description,
        team_member_id: basicInfo.team_member_id, 
        category_id: basicInfo?.Category?.category_id,
        sub_category_id: basicInfo?.subCategory?.category_id,
        thumbnail_path: basicInfo?.thumbnailPath,
        created_by: 1,
        start_date: "2024-04-30",
        end_date: "2024-05-30",
        is_publish: "not published",
      };
      const courseDurations = value; //need to work on the multiple selection part
      payload = {
        courseDetails: courseDetails,
        courseDurations: courseDurations,
        // course_batchDetails: {
        //   type: String,
        //   required: true,
        // },
        // course_detail: {
        //   type: String, // hard coded coz of backend ppl asked to put hardcoded value
        //   required: true,
        // },
        // course_FAQ: {
        //   type: String,
        //   required: true,
        // },
      };
    } catch (error) {
      console.log(error);
    }
    if (courseId) {
      publishOrEditCourse({
        courseId: courseId,
        payload,
        callBack: (response) => {
          if (courseData?.course_id) {
            navigate("/admin/YourCourses");
          } else {
            setTackerPage(3);
          }
        },
      });
    } else {
      createCourse({
        courseData: payload,
        callBack: (response) => {
          toast.success("Course added successfully!", {
            autoClose: 500,
          });
          setCourseIdForContent(response.data);
          setTackerPage(3);
        },
        error: () => {
          console.log("error==>");
        },
      });
    }
  };

  return (
    <Box className="courseMainTrack">
      <Tracker
        trackerPage={trackerPage}
        handleTrackerPage={handleTrackerPage}
      />
      {trackerPage === 0 ? (
        <CreateForm
          handleTrackerPage={handleTrackerPage}
          handleInputChange={handleInputChange}
          courseData={courseData}
        />
      ) : trackerPage === 1 ? (
        <EditPrice
          handleTrackerPage={handleTrackerPage}
          handleInputChange={handleInputChange}
          courseData={courseData}
          courseId={courseId}
        />
      ) : trackerPage === 3 ? (
        <AddContent
          handleTrackerPage={handleTrackerPage}
          courseData={courseData}
          handleInputChange={handleInputChange}
          courseIdForContent={courseIdForContent}
        />
      ) : null}
      <ToastContainer />
      <LoaderComponent loaderState={loaderState} />
    </Box>
  );
};

export default CreateCourses;
