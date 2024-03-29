import { Box, Typography, TextField, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";

import { ToastContainer, toast } from "react-toastify";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DoneIcon from "@mui/icons-material/Done";
import "react-toastify/dist/ReactToastify.css";
import {
  CommonTypography,
  commonButton,
  commonSelect,
  commonTextField,
} from "../../Util/CommonFields";
import { Category, Description } from "@mui/icons-material";
import { category, subCategory } from "../../Util/masterFile";
import { getCategory } from "../ActionFactory/apiActions";
import { useDropzone } from "react-dropzone";
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

const CreateForm = ({ handleTrackerPage, handleInputChange, courseData }) => {
  const [hideValidationTickName, sethideValidationTickName] = useState(false);
  const [hideValidationTickDesc, sethideValidationTickDesc] = useState(false);
  const [storedBasicInfo, setStoredBasicInfo] = useState({
    Name: "",
    Description: "",
    Category: "",
    subCategory: "",
    thumbnailPath: null,
  });
  const [cat, setCat] = useState([]);
  const onInroVideoDrop = async (files) => {
    console.log(files);
    let storedValues = Object.assign({}, storedBasicInfo);
    storedValues.thumbnailPath = files;
    setStoredBasicInfo(storedValues);
  };
  const {
    acceptedFiles,
    fileRejections,
    getRootProps: getIntroVideoRootProps,
    getInputProps: getIntroVideoInputProps,
  } = useDropzone({
    onDrop: onInroVideoDrop,
    onChange: (event) => console.log(event),
    accept: "image/jpeg, image/png, image/jpg, application/pdf",
  });
  useEffect(() => {
    getCategory({
      // courseId,
      callBack: (response) => {
        const userCallBack = response?.data;
        setCat(userCallBack);
      },
      error: (error) => {
        toast.error(error.message);
        console.log(error.message);
        // setLoaderState(false);
      },
    });
  }, []);

  useEffect(() => {
    let storedValues = Object.assign({}, storedBasicInfo);
    storedValues.Name = courseData?.course_name;
    if (storedValues.Name?.length >= 4) {
      sethideValidationTickName(true);
    }
    storedValues.Description = courseData?.description;
    if (storedValues.Description?.length >= 4) {
      sethideValidationTickDesc(true);
    }
    subCategory.map((item) => {
      if (item.id === courseData.sub_category_id) {
        storedValues.subCategory = item;
      }
    });
    storedValues.thumbnailPath = courseData?.thumbnail_path;
    setStoredBasicInfo(storedValues);
  }, [courseData]);

  const handleInput = (value, type) => {
    let storedValues = Object.assign({}, storedBasicInfo);
    if (/^\s/.test(value)) value = "";
    if (type === "name") {
      storedValues.Name = value;

      if (value.length >= 4) {
        sethideValidationTickName(true);
      } else {
        sethideValidationTickName(false);
      }
    } else if (type === "description") {
      storedValues.Description = value;
      if (value.length >= 4) {
        sethideValidationTickDesc(true);
      } else {
        sethideValidationTickDesc(false);
      }
    } else if (type === "category") {
      storedValues.Category = value;
    } else if (type === "subCategory") {
      storedValues.subCategory = value;
    } else if (type == "file") {
      storedValues.thumbnailPath = value;
    }
    setStoredBasicInfo(storedValues);
    if (
      hideValidationTickDesc &&
      hideValidationTickName &&
      storedValues.Category
    ) {
      handleInputChange("basicInfo", storedValues);
    }
  };

  const handleEditPrice = () => {
    console.log("edit", storedBasicInfo);
    if (
      storedBasicInfo.Name?.length <= 3 &&
      storedBasicInfo.Description?.length <= 3 &&
      storedBasicInfo.Category === ""
    ) {
      toast.error(
        "Name & Description & Category Should not be less then 3 character",
        {
          autoClose: 500,
        }
      );
    } else if (storedBasicInfo.Name?.length <= 3) {
      toast.error("Name Should not be less then 3 character", {
        autoClose: 500,
      });
    } else if (storedBasicInfo.Description?.length <= 3) {
      toast.error("Description Should not be less then 3 character", {
        autoClose: 500,
      });

      ///need to aaddd type the toster in common util file
    } else if (storedBasicInfo.Category === "") {
      toast.error("Category Should not be less then 3 character", {
        autoClose: 500,
      });
    } else {
      handleInputChange("basicInfo", storedBasicInfo);
      handleTrackerPage(1);
    }
  };
  const handleInputFile = (file) => {
    console.log(file);
  };
  return (
    <div className="formMain">
      <div className="FlexRow">
        {CommonTypography({ fontWeight: 600, label: "Name" })}
        {hideValidationTickName && <DoneIcon className="RightTick" />}
      </div>
      {commonTextField(
        {
          id: "fullWidth",
          className: "BoxShadow",
          inputClassName: "textField",
          labels: "Enter course name",
        },
        (Option = {
          handleInput: handleInput,
          type: "name",
          value: storedBasicInfo.Name,
        })
      )}
      <div className="FlexRow">
        {CommonTypography({
          fontWeight: 600,
          sx: { marginTop: "5%" },
          label: "Description",
        })}

        {hideValidationTickDesc && <DoneIcon className="RightTick" />}
      </div>
      <TextField
        inputProps={{ className: "textField" }}
        fullWidth
        id="outlined-multiline-static"
        multiline
        rows={4}
        placeholder="Enter course description area"
        className="DescBoxShadow"
        value={storedBasicInfo.Description}
        onChange={(event) => handleInput(event.target.value, "description")}
      />
      {CommonTypography({
        fontWeight: 600,
        sx: { marginTop: "5%" },
        label: "Add Thumbnail",
      })}

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
        <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
          {storedBasicInfo?.thumbnailPath?.length && storedBasicInfo?.thumbnailPath[0]?.name}
        </Typography>
      </Box>
      </div>
    
      <Box className="divider"></Box>
      <Box sx={{ marginTop: "5%" }} className="categoryBox">
        <Box>
          {CommonTypography(
            { fontWeight: 600, label: "Category" },
            (Option = {
              className: "editFirstText",
            })
          )}

          <FormControl sx={{ m: 1, minWidth: 240 }} className="categorySelect">
            {commonSelect(
              {
                placeholder: "Select Category",
                menuItemList: category,
                className: "categorytext",
              },
              (Option = {
                handleInput: handleInput,
                categoryValue: storedBasicInfo.Category,
                type: "category",
              })
            )}
          </FormControl>
        </Box>
        <Box className="rightCat">
          {CommonTypography(
            { fontWeight: 600, label: "Sub Category" },
            (Option = {
              className: "editFirstText",
            })
          )}
          <FormControl sx={{ m: 1, minWidth: 240 }} className="categorySelect">
            {commonSelect(
              {
                placeholder: "Select Sub Category",
                menuItemList: subCategory,
                className: "categorytext",
              },
              (Option = {
                handleInput: handleInput,
                categoryValue: storedBasicInfo.subCategory,
                type: "subCategory",
              })
            )}
          </FormControl>
        </Box>
      </Box>
      {commonButton({
        handleTrackerPage: () => handleEditPrice(),
        className: "coursesButton",
        label: "Edit price",
      })}
      <ToastContainer />
    </div>
  );
};
export default CreateForm;
