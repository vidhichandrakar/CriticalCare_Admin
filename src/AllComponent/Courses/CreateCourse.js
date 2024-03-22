import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tracker from "./Tracker";
import CreateForm from "./CreateCourses.form";
import EditPrice from "./EditPrice";
import AddContent from "./AddContent/AddContent";
import { createCourse, getCourseById } from "../ActionFactory/apiActions";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import LoaderComponent from "../../Util/LoaderComponent";

const CreateCourses = ({ handleHeaderLabels }) => {
  const [trackerPage, setTackerPage] = useState(0);
  const [basicInfo, setBasicInfo] = useState({});
  const [editPrice, setEditPrice] = useState({});
  const [courseData, setCourseData] = useState([]);
  const [loaderState, setLoaderState] = useState(false);
  let location = useLocation();
  const courseId = location.state?.id;

  //No need to remove until vidhi want to remove
  const handleTrackerPage = (page) => {
    console.log("pageee",page)
    setTackerPage(page);
    handleHeaderLabels(basicInfo.Name);
    if (page === 2) {
      handleCreateCourse();
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    // setLoaderState(true);
=======
   
>>>>>>> 75eea5b238318e884e2936eb51ebafbfc7b2d7fb
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
    console.log("basic info",basicInfo)
    // let formData = new FormData();    //No need to remove until vidhi want to remove
    // formData.append("course_name",basicInfo?.Name)
    // formData.append("description",basicInfo?.Description)
    // formData.append("price",parseInt(editPrice?.regularPrice))
    // formData.append("offer_price",parseInt(editPrice?.offerPrice))
    // formData.append("category_id",basicInfo?.Category?.id)

    // formData.append("sub_category_id",basicInfo?.subCategory?.id)
    // formData.append("duration_id",parseInt(editPrice?.duration))
    // formData.append("duration_type_id",91)
    // formData.append("thumbnail_path",basicInfo?.thumbnailPath)
    // formData.append("content_type_id",1)
    // formData.append("modified_by",2)
    // formData.append("created_by",3)
    // console.log("hjbfguyd",form)
    const courseData = {
      course_name: basicInfo?.Name,
      description: basicInfo?.Description,
      price: parseInt(editPrice?.regularPrice),
      offer_price: parseInt(editPrice?.offerPrice),
      category_id:basicInfo?.Category?.id,
      sub_category_id: basicInfo?.subCategory?.id,
      duration_id: parseInt(editPrice?.duration),
      duration_type_id: 91,
      thumbnail_path: basicInfo?.thumbnailPath,
      content_type_id: 11,
      modified_by: 1,
      created_by: 2,
    };
    // console.log("thumbnail basic info",courseData,basicInfo?.thumbnailPath) //No need to remove until vidhi want to remove
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
      console.log("basic",value)
      setBasicInfo(value);
    } else if (type === "editPrice") {
      setEditPrice(value);
    }
  };

  return (
    <Box className="courseMainTrack">
      <Tracker
        trackerPage={trackerPage}
        handleTrackerPage={handleTrackerPage}//No need to remove until vidhi want to remove
      />
      
      {trackerPage === 0 ? (
        <CreateForm
          handleTrackerPage={handleTrackerPage}//No need to remove until vidhi want to remove
          handleInputChange={handleInputChange}
          courseData={courseData}
        />
      ) : trackerPage === 1 ? (
        <EditPrice
          handleTrackerPage={handleTrackerPage}//No need to remove until vidhi want to remove
          handleInputChange={handleInputChange}
          courseData={courseData}
        />
      ) : (
        <AddContent />
      )}
      <ToastContainer />
      <LoaderComponent
      loaderState={loaderState}
      />
    </Box>
  );
};

export default CreateCourses;
