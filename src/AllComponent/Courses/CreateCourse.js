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
  const [editPrice, setEditPrice] = useState([{}]);
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
    let payload;
    try {
      const courseDetails = {
        course_name: basicInfo?.Name,
        description: basicInfo?.Description,
        about_course: basicInfo?.Description,
        team_member_id: 5,
        category_id: basicInfo?.Category?.category_id,
        sub_category_id: basicInfo?.subCategory?.category_id,
        thumbnail_path: "https://example.com/thumbnail.jpg",
        created_by: 1,
        start_date: "2024-04-30",
        end_date: "2024-05-30",
        is_publish: "Not published",
      };
      const courseAttachments = [
        {
          content_type_id: 1,
          content_url: "https://example.com/content1.mp4",
        },
        {
          content_type_id: 1,
          content_url: "https://example.com/content3.mp4",
        },
        {
          content_type_id: 2,
          content_url: "https://example.com/content2.pdf",
        },
      ];
      // formData.append("courseDetails", JSON.stringify(courseDetails));
      // formData.append("courseDurations", JSON.stringify(editPrice));
      // formData.append("courseAttachments", JSON.stringify(courseAttachments));
      payload = {
        courseDetails: courseDetails,
        courseDurations: editPrice,
        courseAttachments: courseAttachments,
      };
      console.log("patload", payload)
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
          console.log("ALL response", payload);
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
    }
    //  else if (type === "resetPrice") {
    //   setRestPrice(value);
    // }
  };

  return (
    <Box className="courseMainTrack">
      <Tracker
        trackerPage={trackerPage}
        handleTrackerPage={handleTrackerPage}
      />
      {/* {console.log("create course==basicInfo",basicInfo)} */}
      {console.log("create course==edit price ", editPrice)}
      {/* {console.log("create course==edit price ",resetPrice)} */}
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
