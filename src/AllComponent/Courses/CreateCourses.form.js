import { Box, Typography, TextField } from "@mui/material";
import React from "react";
import styled from 'styled-components';
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
  return (
    <div className="formMain">
      {CommonTypography({ fontWeight: 600, label: "Name" })}
      {commonTextField({
        id: "fullWidth",
        className: "BoxShadow",
        inputClassName: "textField",
        labels: "Enter course name",
      })}
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
        // onChange={(event) => handleTextChange("emailId", event.target.value)}
      />
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
          <VisuallyHiddenInput type="file" />
        </Button>
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
            })}
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
        handleTrackerPage: () => handleTrackerPage(1),
        className: "coursesButton",
        label: "Edit price",
      })}
    </div>
  );
};
export default CreateForm;
