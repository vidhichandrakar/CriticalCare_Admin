import React, { useState, useEffect } from "react";
import "../../CSSFile/Banner.css";
import CourseHeader from "../../Courses/CoursesHeader";
import Card from "@mui/material/Card";
import BannerCard from "./BannerCard";
import { BannerData } from "../../../Data/JsonData";
import { Fragment } from "react";
import SideBar from "../../AdminDashboardMain/SideBar";
import Header from "../../Courses/Header";
import { banner } from "../../ActionFactory/apiActions";
import { Box, Button, Divider, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import imge from "../../../Media/Images/banner2.jpg";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import PreviousBannerPopup from "./PreviousBannerPopup";
// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';


const Banner = () => {
  const [bannerAPI, setBannerAPI] = useState();
  const [openPopUp, setOpenPopUp] = useState(false);

  useEffect(() => {
    banner({
      callBack: (response) => {
        setBannerAPI(response.data);
      },
    });
  }, []);

  const handleClickPopUp = () => {
    setOpenPopUp(!openPopUp);
  };
  return (
    <Fragment>
      
      <div className="grid-container">
        <Header Heading="Manage Banners" subHeading="Show banners to users" />
        <SideBar />
        <div className="main-container">
          <div className="MainBannerBox">
            <div className="BannerBox">
              <div className="HeadText">
                <h2>Your Banner (3)</h2>
              </div>
              {/* {console.log(bannerAPI, "BannerAPI line35")} */}
              <BannerCard Data={BannerData} />
              <div className="UploadBtton">
                <Button variant="outlined">
                  <AddCircleOutlineRoundedIcon /> Upload Banner Image
                </Button>
                <Typography sx={{ mt: 1, fontSize: "0.7rem", color: "grey" }}>
                  *We recommend uploading an image in 942*510 pixels resolution
                </Typography>
              </div>
            </div>
            <div className="PreviewBox">
              <Typography sx={{color: "black"}}>Preview</Typography>
              <Typography sx={{mt: 1, }}>
                See how the banners will appear to students using your app. You
                can add upto 6 banners at a time.
              </Typography>
              <Box className="MobilePreviewBox">
                <Box className="flexrow MobilePreviewHeading">
                  <MenuIcon />
                  <Typography sx={{ ml: 1 }}>360 Critical Care</Typography>
                </Box>

                <Box className="mobilepreviewbannerbox">
                  <Typography sx={{mb: 1}}>IMPORTANT INFORMATION</Typography>
                  {/* <div
                    id="carouselExampleInterval"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div
                        className="carousel-item active"
                        data-bs-interval="10000"
                      >
                        <img
                          src={imge}
                          className="d-block w-100"
                          alt="..."
                          // width={250}
                          // height={150}
                        />
                      </div>
                      <div className="carousel-item" data-bs-interval="2000">
                        <img
                          src={imge}
                          className="d-block w-100"
                          alt="..."
                          width={20}
                          height={200}
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={imge}
                          className="d-block w-100"
                          alt="..."
                          width={250}
                          height={150}
                        />
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div> */}
                   <img
                          src={imge}
                          // className="d-block w-100"
                          alt="..."
                          width={250}
                          height={150}
                        />
                  <img src="" width={250} height={150} />
                </Box>
                <Box className="flexrow iconBox">
                  <Box className="flexCol">
                    <HomeIcon />
                    <Typography>Home</Typography>
                  </Box>
                  <Box className="flexCol">
                    <MenuBookIcon />
                    <Typography>Courses</Typography>
                  </Box>
                  <Box className="flexCol">
                    <ChatOutlinedIcon />
                    <Typography>Chats</Typography>
                  </Box>
                  <Box className="flexCol">
                    <AccountCircleOutlinedIcon />
                    <Typography>Profiles</Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="ViewPreviousBox " onClick={handleClickPopUp}>
                <AccessTimeOutlinedIcon />
                <Typography>View previous banners</Typography>
              </Box>
              
            </div>
          </div>
        </div>
        <PreviousBannerPopup openPopUp={openPopUp} handleClickPopUp={handleClickPopUp} />

      </div>
    </Fragment>
  );
};

export default Banner;
