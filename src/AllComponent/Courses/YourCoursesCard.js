import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import yellowEnvlope from "../../Media/Images/yellowEnvlope.jpeg";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box, Tooltip, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

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
            console.log(item, "itemline22")
            return (
              <div
                className=" container courseCard"
                onClick={() => handleCourse(id)}
              >
                <div className="row" style={{ alignItems: "start" }}>
                  <div className="col-md-5">
                    {item.thumbnail_path ? (
                      <img
                        src={`data:image/png;base64,${item.thumbnail_path}`}
                        width={180}
                        height={150}
                        style={{
                          marginTop: "3px",
                          marginLeft: "3px",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <img
                        src={yellowEnvlope}
                        width={180}
                        height={150}
                        style={{
                          marginTop: "3px",
                          marginLeft: "3px",
                          borderRadius: "8px",
                        }}
                      />
                    )}
                  </div>
                  <div className="col-md-8 rightCard">
                    <Typography className="courseHeader">
                      {item.course_name}
                    </Typography>
                    <Tooltip title={item.description}>
                      {" "}
                      <Typography className="wrap-text-50">
                        {item.description}
                      </Typography>
                    </Tooltip>
                    <div className="duration">
                      <AccessTimeIcon className="clock" />{" "}
                      <Typography className="durationText">43 hours</Typography>
                    </div>
                    <div className="duration" style={{ marginTop: "10%" }}>
                      <Typography className="offerPrice">
                        {" "}
                        ₹ {item.offer_price}{" "}
                      </Typography>
                      <Typography className="durationText price">
                        {item.price}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-md-2 lastCard">
                    {item.is_publish === "published" ? (
                      <div className="flag vertical">
                        {/* <StarRateIcon className="starIcon" /> */}
                        Publish
                      </div>
                    ) : (
                      <p className=" flag vertical Npublish">Not Publish</p>
                    )}

                    {/* <Box className="flag vertical"> Publish</Box> */}
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
