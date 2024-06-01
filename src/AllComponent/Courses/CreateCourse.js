import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tracker from "./Tracker";
import CreateForm from "./CreateCourses.form";
import EditPrice from "./EditPrice";
import AddContent from "./AddContent/AddContent";
import {
  createCourse,
  getCourseById,
  publishOrEditCourse,
} from "../ActionFactory/apiActions";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import LoaderComponent from "../../Util/LoaderComponent";
import { Link, useNavigate } from "react-router-dom";

const CreateCourses = ({ handleHeaderLabels }) => {
  const [trackerPage, setTackerPage] = useState(0);
  const [basicInfo, setBasicInfo] = useState({});
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
  let location = useLocation();
  const courseId = location.state?.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      setLoaderState(true);
      getCourseById({
        courseId,
        callBack: (response) => {
          const userCallBack = response?.data;
          setCourseData(userCallBack);
          setLoaderState(false);
        },
      });
    }
  }, [courseId]);

  const handleInputChange = (type, value) => {
    if (type === "basicInfo") {
      setBasicInfo(value);
    } else if (type === "editPrice") {
      setEditPrice([value]);
      setValidity([value]);
      // setNewtest(value)
    }
  };
  const handleTrackerPage = (page, value) => {
    if (page === 2) {
      handleCreateCourse(value);
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
        about_course: basicInfo?.Description,
        team_member_id: 5,
        category_id: basicInfo?.Category?.category_id,
        sub_category_id: basicInfo?.subCategory?.category_id,
        thumbnail_path: basicInfo?.thumbnailPath,
        created_by: 1,
        start_date: "2024-04-30",
        end_date: "2024-05-30",
        is_publish: "not published",
      };
      const courseAttachments = [];
      
      const courseDurations = value === undefined ? validity : value;
      payload = {
        courseDetails: courseDetails,
        courseDurations: courseDurations,
        courseAttachments: courseAttachments,
      };
      console.log("patload", payload);
    } catch (error) {
      console.log(error);
    }
    if (courseId) {
      // const payload = formData;
      publishOrEditCourse({
        courseId: courseId,
        payload,
        callBack: (response) => {
          navigate("/YourCourses");
        },
      });
    } else {
      createCourse({
        courseData: payload,

        callBack: (response) => {
          toast.success("Course added successfully!", {
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
    }
  };

  return (
    <Box className="courseMainTrack">
      <Tracker
        trackerPage={trackerPage}
        handleTrackerPage={handleTrackerPage}
      />
      {console.log("courseData",courseData)}
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
        />
      ) : (
        <AddContent />
      )}
      <ToastContainer />
      <LoaderComponent loaderState={loaderState} />
    </Box>
  );
};

export default CreateCourses;
