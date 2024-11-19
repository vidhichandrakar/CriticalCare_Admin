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
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { banner, bannerPage, uploadBanner, uploadFile, updateBanner, bannerPosition, bannerType, bannerPositionapi, bannerTypeapi } from "../../ActionFactory/apiActions";
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
import Switch from '@mui/material/Switch';


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
  const [activeStatus, setActiveStatus] = useState("N"); // Default to inactive
  const [bannerEnabled, setBannerEnabled] = useState(false);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [bannerAPI, setBannerAPI] = useState();
  const [openPopUp, setOpenPopUp] = useState(false);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [storedBasicInfo, setStoredBasicInfo] = useState({
    Name: "",
    Description: "",
    Category: "",
    subCategory: "",
    thumbnailPath: [],
  });
  const [imageTitle, setImageTitle] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [imgUpload, setImageWhileUpload] = useState("");
  const [bannerType, setBannerType] = useState("");
  const [bannerPosition, setBannerPosition] = useState("");
  const [bannerSelectedPage, setBannerSelectedPage] = useState("");
  const [bannerPageData, setBannerPage] = useState([])
  const [bannerTypeData, setBannerTypeData] = useState([])
  const [bannerPositionData, setBannerPositionData] = useState([])
  const maxSteps = images.length;

  const [imagePreviewsMobile, setImagePreviewsMobile] = useState([]);
  const [storedMobileInfo, setStoredMobileInfo] = useState({
    thumbnailPath: [], // Store paths for mobile banner images
  });

  const [isEditMode, setIsEditMode] = useState(false); // New state variable to control Add/Edit mode
  const [imageUpload, setImageUpload] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);



  const handleUploadImage = () => {
    setIsEditMode(false); // Set to Add mode
    setImageTitle('');
    setBannerSelectedPage('');
    setBannerType('');
    setBannerPosition('');
    setActiveStatus("N");
    setStoredBasicInfo({ thumbnailPath: [] });
    setStoredMobileInfo({ thumbnailPath: [] });
    setImageUpload(true); // Open dialog
    //setImageUpload(!imageUpload);
  };

  const handleTitleInput = (event) => {
    setImageTitle(event.target.value);
  };

  const handleDescriptionInput = (event) => {
    setImageDescription(event.target.value);
  };

  const onMobileImageDrop = async (files) => {
    let storedValues = { ...storedMobileInfo };
    const newPreviews = [...imagePreviewsMobile];

    for (let i = 0; i < files.length; i++) {
      let payload = new FormData();
      payload.append("file", files[i], files[i]?.name);

      await uploadFile({
        payload,
        callBack: (response) => {
          storedValues.thumbnailPath.push(response?.data?.path);

          let reader = new FileReader();
          reader.onloadend = () => {
            newPreviews.push(reader.result);
            setImagePreviewsMobile(newPreviews);
          };
          reader.readAsDataURL(files[i]);

          toast.success("Mobile Banner Image Uploaded Successfully!", {
            autoClose: 500,
          });
        },
      });
    }

    setStoredMobileInfo(storedValues);
  };


  // Updated function using onIntroVideoDrop
  const onIntroVideoDrop = async (files) => {
    let storedValues = { ...storedBasicInfo };
    const newPreviews = [...imagePreviews];

    // Loop through all selected files (for multiple images)
    for (let i = 0; i < files.length; i++) {
      let payload = new FormData();

      payload.append("file", files[i], files[i]?.name);

      // Upload each image
      await uploadFile({
        payload,
        callBack: (response) => {
          // Store the uploaded image path in the state

          storedValues.thumbnailPath.push(response?.data?.path);
          // Update preview with the response data (for image preview)
          let reader = new FileReader();
          reader.onloadend = () => {
            newPreviews.push(reader.result); // Store preview
            setImagePreviews(newPreviews);
          };
          reader.readAsDataURL(files[i]); // Convert to base64 for preview

          toast.success("Banner Image Uploaded Successfully!", {
            autoClose: 500,
          });
        },
      });
    }

    // Update state with the new values
    setStoredBasicInfo(storedValues);
  };
  const {
    getRootProps: getMobileImageRootProps,
    getInputProps: getMobileImageInputProps,
  } = useDropzone({
    onDrop: onMobileImageDrop,
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
    multiple: true,
  });

  const {
    getRootProps: getIntroVideoRootProps,
    getInputProps: getIntroVideoInputProps,
  } = useDropzone({
    onDrop: onIntroVideoDrop,
    onChange: (event) => console.log(event),
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "video/mp4": [".mp4"],
    },
    multiple: true, // Allow multiple images
  });

  const handleBannerStatusToggle = () => {
    setBannerEnabled(!bannerEnabled);
    setActiveStatus(bannerEnabled ? "N" : "Y"); // Update activeStatus based on toggle
  };

  const bannerArrayDesktop = storedBasicInfo?.thumbnailPath.map(url => ({ banner_url: url }));
  const bannerArrayMobile = storedMobileInfo.thumbnailPath.map(url => ({ banner_url: url }));

  const handleUploadBannerImage = () => {
    if (
      imageTitle === "" ||
      (!bannerArrayDesktop.length && !bannerArrayMobile.length) || // Check for both arrays
      bannerType === "" ||
      bannerPosition === "" ||
      bannerSelectedPage === ""
    ) {
      toast.error(
        "All fields are required",
        {
          autoClose: 500,
        }
      );
    } else {
      setImageUpload(!imageUpload);
      const bannerArrayDesktop = storedBasicInfo.thumbnailPath.map(url => ({
        banner_url: url,
        banner_redlink: "#"  // Default link value
      }));
      const bannerArrayMobile = storedMobileInfo.thumbnailPath.map(url => ({
        banner_url: url,
        banner_redlink: "#"  // Default link value
      }));

      const payload = {
        "webpage_id": bannerSelectedPage,
        "web_banner_title": imageTitle,
        "web_banner_type_id": bannerType,
        "web_banner_position_id": bannerPosition,
        "web_banner_links_desktop": bannerArrayDesktop,
        "web_banner_links_mobile": bannerArrayMobile,
        "active_status": activeStatus, // Send activeStatus with payload
      };

      // Call the appropriate API based on mode
      if (isEditMode) {
        // Update existing banner (PUT)
        updateBanner({
          payload,
          callBack: (response) => {
            console.log("Update response:", response);
            toast.success("Banner Updated Successfully");
            // Refresh banner data if necessary
            banner({
              callBack: (response) => {
                console.log("Updated API response:", response.data);
                setBannerAPI(response.data);
              },
            });
          },
          error: (error) => {
            toast.error("Something went wrong");
          },
        });
      } else {
        // Add new banner (POST)
        uploadBanner({
          payload,
          callBack: (response) => {
            console.log("Add response:", response);
            toast.success("Banner Created Successfully");
            // Refresh banner data if necessary
            banner({
              callBack: (response) => {
                console.log("API response:", response.data);
                setBannerAPI(response.data);
              },
            });
          },
          error: (error) => {
            toast.error("Something went wrong");
          },
        });
      }
    }
  };

  const handleBannerChange = (type, value) => {
    if (type === "type") {
      setBannerType(value);
      // If bannerType is 2, set bannerPosition to 1 automatically
      if (value === 2) {
        setBannerPosition(1);
      }
    }
    else if (type === "position") {
      setBannerPosition(value);
    }
    else if (type === "bannerPage") {
      setBannerSelectedPage(value);
    }
  }
  useEffect(() => {
    banner({
      callBack: (response) => {
        setBannerAPI(response.data);

      },
    });
    bannerPage({
      callBack: (response) => setBannerPage(response.data)
    });
    bannerPositionapi({
      callBack: (response) => setBannerPositionData(response.data)
    });
    bannerTypeapi({
      callBack: (response) => setBannerTypeData(response.data)
    });
  }, []);

  const handleClickPopUp = () => {
    setOpenPopUp(!openPopUp);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const handleClickEdit = (banner) => {
    setIsEditMode(true);
    setSelectedBanner(banner);

    setImageTitle(banner.web_banner_title);
    setBannerSelectedPage(banner.webpage_id);
    setBannerType(banner.web_banner_type_id);
    setBannerPosition(banner.web_banner_position_id);
    setActiveStatus(banner.active_status);

    setStoredBasicInfo({ thumbnailPath: banner.web_banner_links_desktop?.map(link => link.banner_url) || [] });
    setStoredMobileInfo({ thumbnailPath: banner.web_banner_links_mobile?.map(link => link.banner_url) || [] });

    setImageUpload(true); // Open dialog
  }

  const handlePreviewBox = (bannerData) => {
    // Get the banner_url from the mobile links
    const mobileBannerUrl = bannerData.web_banner_links_mobile?.[0]?.banner_url;

    // Assuming you have a state to store the preview image URL
    setPreviewImage(mobileBannerUrl);  // Update preview image state
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

              <BannerCard Data={BannerData} bannerAPI={bannerAPI} handleClickEdit={handleClickEdit} handlePreviewBox={handlePreviewBox} />

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
                    {/* Check if previewImage exists, if so show that, else show default images */}
                    {previewImage ? (
                      <div>
                        <Box
                          component="img"
                          sx={{
                            height: 155,
                            display: "block",
                            maxWidth: 300,
                            overflow: "hidden",
                            width: "100%",
                          }}
                          src={previewImage} // Display the preview image
                          alt="Preview Banner"
                        />
                      </div>
                    ) : (
                      images.map((step, index) => (
                        <div key={index}>
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
                      ))
                    )}
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
            onClose={() => setImageUpload(false)}
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
                  <Typography sx={{ ml: 1, mt: 1 }}>{isEditMode ? "Edit Banner" : "Upload Banner"}</Typography>

                </Box>
                <CloseIcon onClick={() => setImageUpload(false)} sx={{ cursor: "pointer" }} />
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
                <Box sx={{ minWidth: 420 }}>
                  <FormControl fullWidth variant="outlined" >
                    <Typography className="addCatHeadingCat">Banner Pages</Typography>
                    <Select
                      labelId="demo-simple-select-label"
                      sx={{ mt: 1 }}
                      id="demo-simple-select"
                      value={bannerSelectedPage}
                      // label="Age"
                      onChange={(event) => handleBannerChange("bannerPage", event.target.value)}
                    >
                      {bannerPageData?.map(banner => <MenuItem value={banner.webpage_id}>{banner.webpage_text}</MenuItem>)}

                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 420 }}>
                  <FormControl fullWidth variant="outlined" >
                    <Typography className="addCatHeadingCat">Type</Typography>
                    <Select
                      labelId="demo-simple-select-label"
                      sx={{ mt: 1 }}
                      id="demo-simple-select"
                      value={bannerType}
                      // label="Age"
                      onChange={(event) => handleBannerChange("type", event.target.value)}
                    >
                      {bannerTypeData?.map(banner => <MenuItem value={banner.web_banner_type_id}>{banner.web_banner_type_text}</MenuItem>)}

                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 420 }}>
                  <FormControl fullWidth variant="outlined" >
                    <Typography className="addCatHeadingCat">Position</Typography>
                    <Select
                      labelId="demo-simple-select-label"
                      sx={{ mt: 1 }}
                      id="demo-simple-select"
                      value={bannerPosition}
                      // label="Age"
                      onChange={(event) => handleBannerChange("position", event.target.value)}
                    >
                      {bannerPositionData?.map(banner => <MenuItem value={banner.web_banner_position_id}>{banner.web_banner_position_text}</MenuItem>)}

                    </Select>
                  </FormControl>
                </Box>
                {/* Toggle Switch Below Position Box */}
                <Box sx={{ mt: 3 }}>
                  <Typography className="addCatHeadingCat">Enable Banner</Typography>
                  <Switch
                    checked={bannerEnabled}
                    onChange={handleBannerStatusToggle}
                  />
                </Box>
                {/*<Typography>Banner Type: {bannerPosition}</Typography>*/}

                {/* Image Upload and Preview Dialog */}
                {imageUpload && (
                  <div className="UploadBttons">
                    <div {...getIntroVideoRootProps({ className: "dropzone" })}>
                      <input {...getIntroVideoInputProps()} />
                      <Button variant="outlined">
                        <AddCircleOutlineRoundedIcon /> <span style={{ marginLeft: "1%" }}>Upload Desktop Banner Image</span>
                      </Button>
                    </div>
                    <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
                      {imagePreviews.map((src, index) => (
                        <Box key={index} sx={{ position: "relative", mr: 2, mb: 2 }}>
                          <img src={src} alt={`Preview ${index}`} width="140" height={"auto"} />
                        </Box>
                      ))}
                    </Box>
                  </div>
                )}

                <div className="UploadBttons">
                  <div {...getMobileImageRootProps({ className: "dropzone" })}>
                    <input {...getMobileImageInputProps()} />
                    <Button variant="outlined">
                      <AddCircleOutlineRoundedIcon /> <span style={{ marginLeft: "1%" }}>Upload Mobile Banner Image</span>
                    </Button>
                  </div>
                  <Typography
                    sx={{ mt: 2, fontSize: "0.7rem", color: "grey" }}
                  >
                    *We recommend uploading an image in 942*510 pixels
                    resolution
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
                    {imagePreviewsMobile.map((src, index) => (
                      <Box key={index} sx={{ position: "relative", mr: 2, mb: 2 }}>
                        <img src={src} alt={`Mobile Preview ${index}`} width="140" height={"auto"} />
                      </Box>
                    ))}
                  </Box>
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