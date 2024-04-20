import moment from "moment/moment";
import React, { useState } from "react";
import cardimg from "../../Media/Images/db7187e8-b7cf-47ed-8900-6de89dabde06.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { capitalize } from "@material-ui/core";
import StarRateIcon from "@mui/icons-material/StarRate";
import yellowEnvlope from "../../Media/Images/yellowEnvlope.jpeg";
import { Box, Typography } from "@mui/material";

const YourCoursesCard = ({ allCourses, userData }) => {
  const navigate = useNavigate();
  const handleCourse = (id) => {
    navigate("/Trics1FreeMockTest", { state: { id: id } });
  };
  return (
    <>
      {allCourses.length
        ? allCourses.map((item) => {
            const id = item.course_id;
            const createdBy = userData.filter(
              (user) => user.user_id === item.created_by
            );
            return (
              <div className=" container courseCard" onClick={() => handleCourse(id)}>
                <div className="row">
                  <div className="col-md-5">
                  <img src={cardimg} width={200} height={"auto"} style={{marginTop:"3px", marginLeft:"3px", borderRadius:"8px"}}/>
                </div>
                <div className="col-md-8 rightCard">
                  {/* <Typography>hfdghjsdikjhhhhhhhhhhhhhhhhhhhhhhhhhhh</Typography> */}
                </div>
                <div className="col-md-2 lastCard">
                  <Box className="flag"></Box>
                </div>
                </div>
              </div>
            );
          })
        : null}
    </>
  );
};

export default YourCoursesCard;
