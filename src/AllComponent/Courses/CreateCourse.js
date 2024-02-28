import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tracker from "./Tracker";
import CreateForm from "./CreateCourses.form";
import EditPrice from "./EditPrice";
import AddContent from "./AddContent/AddContent";
import { createCourse, getCourseById } from "../ActionFactory/apiActions";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
const CreateCourses = ({ handleHeaderLabels }) => {
  const [trackerPage, setTackerPage] = useState(0);
  const [basicInfo, setBasicInfo] = useState({});
  const [editPrice, setEditPrice] = useState({});
  const [courseData, setCourseData] = useState([]);
  let location = useLocation();
  const courseId = location.state?.id;

  const handleTrackerPage = (page) => {
    setTackerPage(page);
    console.log("dkjskdj", basicInfo);
    handleHeaderLabels(basicInfo.Name);
    if (page === 2) {
      handleCreateCourse();
    }
  };

  useEffect(() => {
    console.log("courseId==>", courseId);
    getCourseById({
      courseId,
      callBack: (response) => {
        const userCallBack = response?.data;
        setCourseData(userCallBack);
      },
    });
  }, [courseId]);

  const handleCreateCourse = () => {
    const courseData = {
      CourseName: basicInfo?.Name,
      Description: basicInfo?.Description,
      Price: parseInt(editPrice?.regularPrice),
      Offer_Price: parseInt(editPrice?.offerPrice),
      Sub_Category_Id: basicInfo?.subCategory?.id,
      Duration_Id: parseInt(editPrice?.duration),
      Duration_Type_id: 91,
      thumbnail_path: basicInfo?.thumbnailPath,
      content_type_id: 11,
      Created_by: 1,
      Modiefied_by: 2,
    };
    createCourse({
      courseData,
      callBack: (response) => {
        toast.success("Course added successfully!", {
          autoClose: 500,
        });
      },
      error: () => {
        toast.error("Something went wrong!", {
          autoClose: 500,
        });
      },
    });
  };

  const handleInputChange = (type, value) => {
    if (type === "basicInfo") {
      setBasicInfo(value);
    } else if (type === "editPrice") {
      setEditPrice(value);
    }
  };

  return (
    <Box className="courseMainTrack">
      {console.log("courseData====Create", courseData)}
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
        />
      ) : (
        <AddContent />
      )}
      <ToastContainer />
    </Box>
  );
};

export default CreateCourses;
