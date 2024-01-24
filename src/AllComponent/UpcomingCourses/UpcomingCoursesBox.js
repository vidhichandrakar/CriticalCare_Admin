import { Box, Typography, TextField, Button } from "@mui/material";
import React from "react";
import styled from 'styled-components';
import UploadIcon from "@mui/icons-material/Upload";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { CommonTypography, commonButton, commonTextField } from "../../Util/CommonFields";
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
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
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
  return (
    <Box className="courseMainTrack">
      <div className="formMainUpcoming">
        {CommonTypography({ fontWeight: 600, label: "Name" })}
        {commonTextField({
          id: "fullWidth",
          className: "BoxShadow",
          inputClassName: "textField",
          labels: "Enter course name",
        })}
        {CommonTypography({
          fontWeight: 600,
          label: "Description",
          sx: { marginTop: "3%" },
        })}
        <TextField
          inputProps={{ className: "textField" }}
          fullWidth
          id="outlined-multiline-static"
          multiline
          rows={4}
          placeholder="Enter course description here"
          className="BoxShadowUpcoming"
          // onChange={(event) => handleTextChange("emailId", event.target.value)}
        />

        {CommonTypography({
          fontWeight: 600,
          label: " Add Thumbnail",
          sx: { marginTop: "3%" },
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
        {commonButton({handleTrackerPage:()=>{},className:"coursesButton",label:"Post"})}
      </div>
    </Box>
  );
};
export default UpcomingCourseBox;
