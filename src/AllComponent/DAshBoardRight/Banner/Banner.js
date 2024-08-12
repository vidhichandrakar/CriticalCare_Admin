import React, { useState, useEffect } from "react";
import "../../CSSFile/Banner.css";
import { useTheme } from "@mui/material/styles";
import CourseHeader from "../../Courses/CoursesHeader";
import Card from "@mui/material/Card";
import BannerCard from "./BannerCard";
import { BannerData } from "../../../Data/JsonData";
import { Fragment } from "react";
import SideBar from "../../AdminDashboardMain/SideBar";
import Header from "../../Courses/Header";
import { banner, uploadBanner, uploadFile } from "../../ActionFactory/apiActions";
import { Box, Button, Divider, Typography, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import imge from "../../../Media/Images/banner2.jpg";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import PreviousBannerPopup from "./PreviousBannerPopup";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useDropzone } from "react-dropzone";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UploadIcon from "@mui/icons-material/Upload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from '@mui/icons-material/Close';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "Goč, Serbia",
    imgPath: imge,
  },
  {
    label: "Goč, Serbia",
    imgPath: imge,
  },
  {
    label: "Goč, Serbia",
    imgPath: imge,
  },
];
const Banner = () => {
  const [bannerAPI, setBannerAPI] = useState();
  const [openPopUp, setOpenPopUp] = useState(false);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [imageUpload, setImageUpload] = useState(false);
  const [storedBasicInfo, setStoredBasicInfo] = useState({
    Name: "",
    Description: "",
    Category: "",
    subCategory: "",
    thumbnailPath: null,
  });
  const [imageTitle, setImageTitle] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [imgUpload, setImageWhileUpload] = useState("");

  // const isFormValid = imageTitle.trim() !== '' && imageDescription.trim() !== '';
  const maxSteps = images.length;

  const handleUploadImage = () => {
    setImageUpload(!imageUpload);
  };

  const handleTitleInput = (event) => {
    setImageTitle(event.target.value);
    console.log(event.target.value, "kjgvnhbmvg");
  };

  const handleDescriptionInput = (event) => {
    setImageDescription(event.target.value);
    console.log(event.target.value, "kjgvnhbmvg");
  };

  const onInroVideoDrop = async (files) => {
    let payload = new FormData();
    payload.append("file", files[0], files[0]?.name);
    let storedValues = Object.assign({}, storedBasicInfo);
    // setLoaderState(true);
    uploadFile({
      payload,
      callBack: (response) => {
        storedValues.thumbnailPath = response?.data?.path;
        setStoredBasicInfo(storedValues);
        toast.success ("Banner Image Upload SuccessFull", {
          autoClose: 500,
        });
        // setLoaderState(false);
      },
    });
    setStoredBasicInfo(storedValues);
  };

  const {
    getRootProps: getIntroVideoRootProps,
    getInputProps: getIntroVideoInputProps,
  } = useDropzone({
    onDrop: onInroVideoDrop,
    onChange: (event) => console.log(event),
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "video/mp4": [".mp4"],
    },
  });

  const handleUploadBannerImage = () => {
    console.log(imageTitle, "imageDescription")
    console.log(imageDescription, "imageDescription")
    console.log(imageTitle == "" ,
    imageDescription == "", "imageDescription")
    if (
      imageTitle == "" ||
      imageDescription == "" ||
      storedBasicInfo?.thumbnailPath == null
    ) {
      toast.error(
        "All Field are reaquired",
        {
          autoClose: 500,
        }
      );
    } else {
    setImageUpload(!imageUpload);
    const payload = {
      title: imageTitle,
      description: imageDescription,
      image_url: storedBasicInfo?.thumbnailPath,
      link_url: "https://example.com/sale",
      priority: 1,
      display_locations: "homepage",
      start_date: "2024-04-01",
      end_date: "2024-04-10",
      created_by: 1,
    };
    uploadBanner({payload, callBack: (response) =>{ console.log(response, "resopnseesses")
    toast.success ("Banner Created SuccessFull", {
      autoClose: 500,
    });}, 
    error: (error) => {
      toast.error ("Something went wrong", {
        autoClose: 500,
      })
    }})
  } 
  };

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

  const handleStepChange = (step) => {
    setActiveStep(step);
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
                {/* <h2>{bannerAPI.title}</h2> */}
              </div>
              {console.log(bannerAPI, "BannerAPI line35")}

              <BannerCard Data={BannerData} bannerAPI={bannerAPI} />
              <div className="UploadBtton">
                <Button variant="outlined" onClick={handleUploadImage}>
                  <AddCircleOutlineRoundedIcon /> Upload Banner Image
                </Button>
                <Typography sx={{ mt: 1, fontSize: "0.7rem", color: "grey" }}>
                  *We recommend uploading an image in 942*510 pixels resolution
                </Typography>
              </div>
            </div>
            <div className="PreviewBox">
              <Typography sx={{ color: "black" }}>Preview</Typography>
              <Typography sx={{ mt: 1 }}>
                See how the banners will appear to students using your app. You
                can add upto 6 banners at a time.
              </Typography>
              <Box className="MobilePreviewBox">
                <Box className="flexrow MobilePreviewHeading">
                  <MenuIcon />
                  <Typography sx={{ ml: 1 }}>360 Critical Care</Typography>
                </Box>

                <Box className="mobilepreviewbannerbox">
                  <Typography sx={{ mb: 1 }}>IMPORTANT INFORMATION</Typography>
                  <AutoPlaySwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                    autoplay={false}
                  >
                    {images.map((step, index) => (
                      <div>
                        {Math.abs(activeStep - index) <= 2 ? (
                          <Box
                            component="img"
                            sx={{
                              height: 155,
                              display: "block",
                              maxWidth: 300,
                              overflow: "hidden",
                              width: "100%",
                            }}
                            src={step.imgPath}
                            alt={step.label}
                          />
                        ) : null}
                      </div>
                    ))}
                  </AutoPlaySwipeableViews>

                  <Box
                    className="flexrow "
                    sx={{ mt: 4, justifyContent: "space-evenly" }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          borderRadius: "100%",
                          backgroundColor: "#eae2e22b",
                          color: "#eae2e22b",
                        }}
                        className="emptycircle"
                      >
                        ..................
                      </Typography>
                      <Typography
                        sx={{
                          mt: 1,
                          backgroundColor: "#eae2e22b",
                          color: "#eae2e22b",
                        }}
                        className="emptyrec"
                      >
                        .
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          borderRadius: "100%",
                          backgroundColor: "#eae2e22b",
                          color: "#eae2e22b",
                        }}
                        className="emptycircle"
                      >
                        ..................
                      </Typography>
                      <Typography
                        sx={{
                          mt: 1,
                          backgroundColor: "#eae2e22b",
                          color: "#eae2e22b",
                        }}
                        className="emptyrec"
                      >
                        .
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          borderRadius: "100%",
                          backgroundColor: "#eae2e22b",
                          color: "#eae2e22b",
                        }}
                        className="emptycircle"
                      >
                        ..................
                      </Typography>
                      <Typography
                        sx={{
                          mt: 1,
                          backgroundColor: "#eae2e22b",
                          color: "#eae2e22b",
                        }}
                        className="emptyrec"
                      >
                        .
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          borderRadius: "100%",
                          backgroundColor: "#eae2e22b",
                          color: "#eae2e22b",
                        }}
                        className="emptycircle"
                      >
                        ..................
                      </Typography>
                      <Typography
                        sx={{
                          mt: 1,
                          backgroundColor: "#eae2e22b",
                          color: "#eae2e22b",
                        }}
                        className="emptyrec"
                      >
                        .
                      </Typography>
                    </Box>
                  </Box>
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
                <Typography sx={{ ml: "3px" }}>
                  View previous banners
                </Typography>
              </Box>
            </div>
          </div>
        </div>
        <PreviousBannerPopup
          openPopUp={openPopUp}
          handleClickPopUp={handleClickPopUp}
          bannerAPI={bannerAPI}
        />
        <div>
          <Dialog
            open={imageUpload}
            onClose={handleUploadImage}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const email = formJson.email;
                handleUploadImage();
              },
            }}
            className="dialogWidth"
          >
            <DialogTitle className="popUpheader">
              <Box className="flexrow spacebt">
                <Box className="flexrow">
                  {/* <ArrowBackIcon />  */}
                  <Typography sx={{ ml: 1 }}>Upload Data & Image</Typography>
                  
                </Box>
                <CloseIcon onClick={handleUploadImage} sx={{cursor: "pointer"}}/>
              </Box>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Box sx={{ mt: 2 }}>
                  <Typography>Title</Typography>
                  <TextField
                    inputProps={{ className: "textField" }}
                    fullWidth
                    id="outlined-multiline-static"
                    placeholder="Enter Title"
                    className="DescBoxShadow"
                    value={imageTitle}
                    onChange={handleTitleInput}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography>Description</Typography>
                  <TextField
                    inputProps={{ className: "textField" }}
                    fullWidth
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    placeholder="Enter course description"
                    className="DescBoxShadow"
                    value={imageDescription}
                    onChange={handleDescriptionInput}
                  />
                </Box>

                <div {...getIntroVideoRootProps({ className: "dropzone" })}>
                  <input {...getIntroVideoInputProps()} />
                  {/* <Box className="thumbnailUpload">
          <Button
            component="label"
            variant="outlined-multiline-static"
            startIcon={<UploadIcon className="iconThumbicon" />}
            className="iconThumb"
          >
            Upload Thumbnail Image
          </Button>
          <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
            Recommended Image size : <b>800px x 600px, PNG or JPEG file</b>
          </Typography>
          {/* <LoaderComponent loaderState={loaderState} />
          {imgUpload === "" && storedBasicInfo?.thumbnailPath && (
            <img
              src={storedBasicInfo?.thumbnailPath}
              width={140}
              height={"auto"}
            />
          )}
          {imgUpload != "" && (
            <img
              src={storedBasicInfo?.thumbnailPath}
              width={140}
              height={"auto"}
            />
          )} */}
                  {/* </Box> */}
                  <div className="UploadBttons">
                    <Button variant="outlined">
                      <AddCircleOutlineRoundedIcon /> Upload Banner Image
                    </Button>
                    <Typography
                      sx={{ mt: 1, fontSize: "0.7rem", color: "grey" }}
                    >
                      *We recommend uploading an image in 942*510 pixels
                      resolution
                    </Typography>
                    {imgUpload === "" && storedBasicInfo?.thumbnailPath && (
                      <img
                        src={storedBasicInfo?.thumbnailPath}
                        width={140}
                        height={"auto"}
                      />
                    )}
                    {imgUpload != "" && (
                      <img
                        src={storedBasicInfo?.thumbnailPath}
                        width={140}
                        height={"auto"}
                      />
                    )}
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>

            <div className="popUpDoneBtn">
              <Button
                style={{ width: "100px", float: "right" }}
                variant="contained"
                onClick={handleUploadBannerImage}
                // disabled={!isFormValid}
              >
                Done
              </Button>
            </div>
          </Dialog>
        </div>

      </div>
      
      <ToastContainer />
    </Fragment>
  );
};

export default Banner;
