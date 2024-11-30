import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import UploadIcon from "@mui/icons-material/Upload";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  CommonTypography,
  commonButton,
  commonTextField,
} from "../../Util/CommonFields";
import { getBlog, uploadFile } from "../ActionFactory/apiActions";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

const UpcomingCourseBox = ({}) => {
  const [blogName, setBlogName] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogImgUpload, setBlogImageUpload] = useState("");
  const [imgUpload, setImageWhileUpload] = useState("");
  const [storedBasicInfo, setStoredBasicInfo] = useState({
    Name: "",
    Description: "",
    Category: "",
    subCategory: "",
    thumbnailPath: null,
  });

  const handleBlogName = (event) => {
    setBlogName(event.target.value);
  };
  const handleBlogDescriptionInput = (event) => {
    setBlogDescription(event.target.value);
  };

  const handlePostButton = () => {
    if (
      blogName == "" ||
      blogDescription == "" ||
      storedBasicInfo?.thumbnailPath == null
    ) {
      toast.error("All Field are reaquired", {
        autoClose: 500,
      });
    } else {
      const payload = {
        title: blogName,
        description: blogDescription,
        image_url: storedBasicInfo?.thumbnailPath,
        display_locations: "display_locations",
        popular: "N",
        created_by: 1,
        createdAt: "2024-09-16T08:10:27.213Z",
        updatedAt: "2024-09-16T08:10:27.213Z",
        bloglist_id: 2,
      };
      getBlog({
        payload,
        callBack: (response) => {
          console.log(response, "BLogresopnseesses");
        },
      });
    }
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
        // toast.success ("Banner Image Upload SuccessFull", {
        //   autoClose: 500,
        // });
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

  return (
    <Box className="courseMainTrack">
      <div className="formMainUpcoming">
        {CommonTypography({ fontWeight: 600, label: "Name" })}

        <TextField
          inputProps={{ className: "textField" }}
          fullWidth
          id="outlined-multiline-static"
          multiline
          placeholder="Enter course name"
          className="BoxShadowUpcoming"
          onChange={handleBlogName}
        />
        {CommonTypography({
          fontWeight: 600,
          label: "Description",
          sx: { marginTop: "2%" },
        })}
        <TextField
          inputProps={{ className: "textField" }}
          fullWidth
          id="outlined-multiline-static"
          multiline
          rows={4}
          onChange={handleBlogDescriptionInput}
          placeholder="Enter course description here"
          className="BoxShadowUpcoming"
        />
        {CommonTypography({
          fontWeight: 600,
          label: " Add Thumbnail",
          sx: { marginTop: "3%" },
        })}
        {/* <Box className="thumbnailUpload">
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadIcon className="iconThumbicon" />}
            className="iconThumb"
          >
            Upload Thumbnail Image
            <VisuallyHiddenInput type="file" />
          </Button>
          <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
            Recommended Image size : <b>800px x 600px, PNG or JPEG file</b>
          </Typography>
        </Box> */}
        <div {...getIntroVideoRootProps({ className: "dropzone" })}>
          <input {...getIntroVideoInputProps()} />
          <Box className="thumbnailUpload">
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
            {/* <LoaderComponent loaderState={loaderState} /> */}
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
          </Box>
        </div>
        <Box className="divider-upcoming"></Box>

        {CommonTypography({
          fontWeight: 600,
          label: "Choose Section",
          sx: { marginTop: "3%" },
        })}
        <FormGroup sx={{ marginLeft: "5px", marginTop: "1%" }}>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  "&:hover": { bgcolor: "transparent" },
                }}
                disableRipple
                color="default"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
                inputProps={{ "aria-label": "Checkbox demo" }}
                defaultChecked
              />
            }
            label="Blogs"
            className="checkboxDesign"
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  "&:hover": { bgcolor: "transparent" },
                }}
                disableRipple
                color="default"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
                inputProps={{ "aria-label": "Checkbox demo" }}
              />
            }
            label="Upcoming Courses"
            className="checkboxDesign"
          />
        </FormGroup>
        {/* {commonButton({handleTrackerPage:()=>{},className:"coursesButton",label:"Post"})} */}
        <Button onClick={handlePostButton} className="coursesButton">
          Post
        </Button>
      </div>
      <ToastContainer />
    </Box>
  );
};
export default UpcomingCourseBox;
