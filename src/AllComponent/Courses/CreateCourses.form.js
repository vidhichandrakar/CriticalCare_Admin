import { Box, Typography, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Formik, Field, useFormik, ErrorMessage, Form } from "formik";
import {commmonNameDescriptionSchema} from "../ValidationSchema/UpcomingCoursesBoxSchema";
import "../CSSFile/Courses.css";
import {
  CommonTypography,
  commonButton,
  commonSelect,
  commonTextField,
} from "../../Util/CommonFields";
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
const CreateForm = ({ handleTrackerPage }) => {
  const formik = useFormik({
    initialValues: {
      courseDescription: "here is",
      courseName: "Rajdeepak",
      fileUploadType: null,
      SelectCategory:null
    },
    validationSchema: commmonNameDescriptionSchema,
    onSubmit:(value)=>{
      console.log("valus=====>/", value);
    }
  });

  const handleEditPrice=()=>{
    // handleTrackerPage(1);
    console.log("formik.values.courseDescription",formik.values.courseDescription)
    if(formik.values.courseDescription && formik.values.courseName){
      console.log("jjkjn ");
    }


  }

  return (
    <div className="formMain">
      {CommonTypography({ fontWeight: 600, label: "Name" })}
      {commonTextField(
        {
          id: "fullWidth",
          className: "BoxShadow",
          inputClassName: "textField",
          labels: "Enter course name",
        },
        (Option = {
          formik: { formik },
          name: "courseName",
          value: formik.values.courseName,
        })
      )}
      {formik.touched.courseName && formik.errors.courseName && (
        <span className="formikValidaionRedBorder">
          {formik.errors.courseName}
        </span>
      )}
      {CommonTypography({
        fontWeight: 600,
        sx: { marginTop: "5%" },
        label: "Description",
      })}
      <TextField
        inputProps={{ className: "textField" }}
        fullWidth
        id="outlined-multiline-static"
        multiline
        rows={4}
        placeholder="Enter course description area"
        className="BoxShadow"
        name="courseDescription"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.courseDescription}
        // onChange={(event) => handleTextChange("emailId", event.target.value)}
      />
      {formik.touched.courseDescription && formik.errors.courseDescription && (
        <span className="formikValidaionRedBorder">
          {formik.errors.courseDescription}
        </span>
      )}
      {CommonTypography({
        fontWeight: 600,
        sx: { marginTop: "5%" },
        label: "Add Thumbnail",
      })}

      <Box className="thumbnailUpload">
        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadIcon className="iconThumbicon" />}
          className="iconThumb"
        >
          Upload Thumbnail Image
          <VisuallyHiddenInput
            type="file"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="fileUploadType"
            value={formik.values.fileUploadType}
            accept=".jpg, .png,"
          />
        </Button>
        <Typography>updlod{formik.values.fileUploadType}</Typography>
        <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
          Recommended Image size : <b>800px x 600px, PNG or JPEG file</b>
        </Typography>
      </Box>
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
            {commonSelect({
              placeholder: "Select Category",
              menuItemList: [
                { id: 1, label: "Option 1" },
                { id: 2, label: "Option 2" },
                { id: 3, label: "Option 3" },
              ],
              className: "categorytext",
            },
            (Option = {
              formik: { formik },
              name: "SelectCategory",
              // value: formik.values.SelectCategory,
            })
            )}
          </FormControl>
        </Box>
        {/* {formik.touched.SelectCategory && formik.errors.SelectCategory && (
        <span className="formikValidaionRedBorder">
          {formik.errors.SelectCategory}
        </span>
      )} */}
        <Box className="rightCat">
          {CommonTypography(
            { fontWeight: 600, label: "Sub Category" },
            (Option = {
              className: "editFirstText",
            })
          )}
          <FormControl sx={{ m: 1, minWidth: 240 }} className="categorySelect">
            {commonSelect({
              placeholder: "Select Sub Category",
              menuItemList: [
                { id: 1, label: "Option 1" },
                { id: 2, label: "Option 2" },
                { id: 3, label: "Option 3" },
              ],
              className: "categorytext",
            })}
          </FormControl>
        </Box>
      </Box>

      
      {commonButton({
        handleTrackerPage: () => handleEditPrice(),
        className: "coursesButton",
        label: "Edit price",
      })}
    </div>
  );
};
export default CreateForm;
