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
  const [editPrice, setEditPrice] = useState({});
  const [resetPrice, setRestPrice] = useState([{}]);
  const [courseData, setCourseData] = useState([]);
  const [loaderState, setLoaderState] = useState(false);

  let location = useLocation();
  const courseId = location.state?.id;
  const navigate = useNavigate();

  const handleTrackerPage = (page) => {
    if (page === 2) {
      handleCreateCourse();
    } else {
      setTackerPage(page);
      handleHeaderLabels(basicInfo.Name);
    }
  };

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

  const handleCreateCourse = () => {
    let formData = new FormData();
    try {
      formData.append("course_name", basicInfo?.Name);
      formData.append("description", basicInfo?.Description);
      formData.append("price", parseInt(editPrice?.regularPrice));
      formData.append("offer_price", parseInt(editPrice?.offerPrice));
      formData.append("category_id", basicInfo?.Category?.category_id);
      formData.append("sub_category_id", basicInfo?.subCategory?.category_id);
      formData.append("duration_id", parseInt(editPrice?.duration));
      formData.append("duration_type_id", 91);
      if (typeof basicInfo?.thumbnailPath !== "string") {
        formData.append(
          "thumbnail_path",
          basicInfo?.thumbnailPath,
          basicInfo?.thumbnailPath?.name
        );
      }
      formData.append("content_type_id", 1);
      formData.append(
        "modified_by",
        JSON.parse(localStorage.getItem("loggedInUser")).user_id
      );
      formData.append(
        "created_by",
        JSON.parse(localStorage.getItem("loggedInUser")).user_id
      );
      formData.append("is_publish", "not published");
      // formData.append("end_date", editPrice?.startDate);
      // formData.append("start_date", editPrice?.endDate);
      formData.append("end_date", "20/02/2024");
      formData.append("start_date", editPrice?.date);
      formData.append("duration_type", editPrice?.durationType);
    } catch (error) {
      console.log(error);
    }
    if (courseId) {
      const payload = formData;
      publishOrEditCourse({
        courseId: courseId,
        payload,
        callBack: (response) => {
          navigate("/YourCourses");
        },
      });
    } else {
      createCourse({
        courseData: formData,
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

  const handleInputChange = (type, value) => {
    if (type === "basicInfo") {
      setBasicInfo(value);
    } else if (type === "editPrice") {
      setEditPrice(value);
    } else if (type === "resetPrice") {
      setRestPrice(value);
    }
  };

  return (
    <Box className="courseMainTrack">
      <Tracker
        trackerPage={trackerPage}
        handleTrackerPage={handleTrackerPage}
      />
      {console.log("Create other", editPrice)}
      {console.log("Create Multiple", resetPrice)}
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
