import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import yellowEnvlope from "../../Media/Images/yellowEnvlope.jpeg";
import { Box, Tooltip, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getDuration } from "../ActionFactory/apiActions";
import { tripmHtmlTagsToNormalFormat } from "../../Util/CommonHtmlTagsToTextConvertor";

const YourCoursesCard = ({ allCourses, userData }) => {
  const [durationData, setDuration] = useState([]);
  const navigate = useNavigate();

  const handleDiscountPercent = (price, offer_price) => {
    return Math.floor(((price - offer_price) / price) * 100) + " %";
  };
  useEffect(() => {
    getDuration({
      callBack: (response) => {
        const userCallBack = response?.data;
        setDuration(userCallBack);
      },
      error: (error) => {},
    });
  }, []);
  const handleCourse = (id) => {
    navigate("/admin/Trics1FreeMockTest", { state: { id: id } });
  };

  return (
    <>
      {allCourses.length
        ? allCourses.map((item) => {
            const id = item.course_id;
            const createdBy = userData.filter(
              (user) => user.user_id === item.created_by
            );
            const durationName = durationData?.filter(
              (duraData) =>
                duraData?.duration_id ==
                item?.durations[item?.durations?.length - 1]?.duration_id
            );
            return (
              <div
                className="container courseCard"
                onClick={() => handleCourse(id)}
              >
                <div className="row" style={{ alignItems: "start" }}>
                  <div className="col-md-5">
                    {item.thumbnail_path_desktop ? (
                      <img
                        src={item.thumbnail_path_desktop}
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
                    <Tooltip arrow title={item.course_name}>
                      <Typography arrow className="courseHeader wrap-text-50">
                        {item.course_name}
                      </Typography>
                    </Tooltip>
                    <Tooltip
                      title={tripmHtmlTagsToNormalFormat(item?.description)}
                      arrow
                    >
                      <Typography
                        className="wrap-text-50"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "19ch",
                          color: "#918d8d",
                          fontSize: "0.9rem",
                        }}
                      >
                        {tripmHtmlTagsToNormalFormat(item?.description)}
                      </Typography>
                    </Tooltip>
                    {item?.durations[item?.durations?.length - 1]
                      ?.duration_type_id === 2 ? (
                      <Box>
                        <Box className="multiplevalidityAvailBox">
                          Multiple Validity Available
                        </Box>
                        <div className="duration">
                          <AccessTimeIcon className="clock" />{" "}
                          <Typography className="durationText">
                            {
                              item?.durations[item?.durations?.length - 1]
                                ?.duration
                            }{" "}
                            {
                              item?.durations[item?.durations?.length - 1]
                                ?.duration_name
                            }
                          </Typography>
                        </div>
                      </Box>
                    ) : item?.durations[item?.durations?.length - 1]
                        ?.duration_type_id === 1 ? (
                      <Box>
                        <Box className="multiplevalidityAvailBox">
                          Single Validity
                        </Box>
                        <div className="duration">
                          <AccessTimeIcon className="clock" />{" "}
                          <Typography className="durationText">
                            {
                              item?.durations[item?.durations?.length - 1]
                                ?.duration
                            }{" "}
                            {
                              item?.durations[item?.durations?.length - 1]
                                ?.duration_name
                            }
                          </Typography>
                        </div>
                      </Box>
                    ) : item?.durations[item?.durations?.length - 1]
                        ?.duration_type_id === 3 ? (
                      <Box className="multiplevalidityAvailBox">
                        LifeTime Validity
                      </Box>
                    ) : item?.durations[item?.durations?.length - 1]
                        ?.duration_type_id === 4 ? (
                      <Box className="multiplevalidityAvailBox">
                        Course Expire
                      </Box>
                    ) : null}

                    <div className="duration" style={{ marginTop: "10%" }}>
                      <div
                        className={
                          // item?.durations?.length == 3
                          item?.durations[item?.durations?.length - 1]
                            ?.duration_type_id >= 3
                            ? "priceAndOfferprice-singleValidity"
                            : "priceAndOfferprice"
                        }
                      >
                        <Typography className="offerPrice">
                          ₹
                          {
                            item.durations[item?.durations?.length - 1]
                              ?.offer_price
                          }
                        </Typography>
                        <Typography className="durationText price">
                          ₹{item.durations[item?.durations?.length - 1]?.price}
                        </Typography>
                      </div>

                      <div>
                        <Box
                          className={
                            item?.durations[item?.durations?.length - 1]
                              ?.duration_type_id >= 3
                              ? "discountPercentage-multiValidity"
                              : "discountPercentage-singleValidity"
                          }
                        >
                          <Typography>
                            {item.durations[item?.durations?.length - 1]
                              ?.offer_price &&
                            item.durations[item?.durations?.length - 1]?.price
                              ? handleDiscountPercent(
                                  item.durations[item?.durations?.length - 1]
                                    .price,
                                  item.durations[item?.durations?.length - 1]
                                    .offer_price
                                )
                              : null}
                          </Typography>
                        </Box>
                      </div>
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
