import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CommonTypography } from "../../Util/CommonFields";
import { Typography } from "@mui/material";
import "../CSSFile/Duration.css";
import { useEffect } from "react";
import { getCourseDuration } from "../ActionFactory/apiActions";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DurationConfiguration = ({
  handleDuration,
  selectDurationValue,
  courseData,
  handleSelectedDuration,
}) => {
  const [courseDurationType, setCourseDurationType] = useState([{}]);

  useEffect(() => {
    if (courseData?.durations?.length) {
      let selectedDuration = courseDurationType.filter(
        (item) =>
          item?.duration_type_id === courseData?.durations[0]?.duration_type_id
      );
      handleSelectedDuration(
        selectedDuration[0]?.duration_type_name,
        selectedDuration[0]
      );
    }
  }, [courseData, courseDurationType]);

  useEffect(() => {
    getCourseDuration({
      callBack: (response) => {
        setCourseDurationType(response.data);
      },
    });
  }, []);

  const multipleEditFlow = (e) => {
    let courseData = e.target.value;
    let selectedDuration = courseDurationType.filter(
      (item) => item?.duration_type_id === courseData?.duration_type_id
    );
    handleSelectedDuration(
      selectedDuration[0]?.duration_type_name,
      selectedDuration[0]
    );
    handleDuration(selectedDuration[0]);
  };

  return (
    <div>
      <Box>
        {CommonTypography(
          { fontWeight: 600, label: "Course Duration Type" },
          (Option = {
            className: "editFirstText",
          })
        )}
        <FormControl sx={{ m: 1, minWidth: 630 }} className="categorySelect">
          <Select
            value={
              selectDurationValue?.duration_type_name
                ? selectDurationValue
                : `Select Duration Type`
            }
            renderValue={() => {
              return selectDurationValue !== "" ? (
                <Typography>{selectDurationValue}</Typography>
              ) : (
                <Typography> Select Duration Type </Typography>
              );
            }}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
            onChange={multipleEditFlow}
          >
            {courseDurationType.map((item) => (
              <MenuItem key={item.duration_type_id} value={item}>
                {item.duration_type_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography className="ErrorDisplay">
        {selectDurationValue === "Single Validity"
          ? "Course will expire after a period of time for all students based on their purchase date"
          : selectDurationValue === "Multiple Validity"
          ? "Student will have an option to choose from multiple pricing plans during purchase"
          : selectDurationValue === "Lifetime Validity"
          ? "Course will never expire for students"
          : selectDurationValue === "Course Expiry Date"
          ? "Course will expire for all students after your selected course expiry date"
          : null}
      </Typography>
    </div>
  );
};

export default DurationConfiguration;
