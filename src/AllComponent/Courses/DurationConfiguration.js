import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CommonTypography } from "../../Util/CommonFields";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { Typography } from "@mui/material";

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
const DurationConfiguration = () => {
  const [selectDurationValue, setSelectedDurationValue] = useState();
  const handleDuration = (e) => {
    console.log(e.target.value);
    setSelectedDurationValue(e.target.value);
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
        <FormControl sx={{ m: 1, minWidth: 550 }} className="categorySelect">
          {/* <InputLabel htmlFor="grouped-native-select">Select Duration Type</InputLabel> */}
          <Select
            // displayEmpty
            value={selectDurationValue}
            renderValue={() => {
              return (
                <Typography>
                  {/* {"Select Duration Type"} */}
                  {selectDurationValue
                    ? selectDurationValue
                    : "Select Duration Type"}
                </Typography>
              );
            }}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
            onChange={handleDuration}
          >
            <MenuItem value={"Single Validity"}>Single Validity</MenuItem>
            <MenuItem value={"Multiple Validity"}>Multiple Validity</MenuItem>
            <MenuItem value={"Lifetime Validity"}>Lifetime Validity</MenuItem>
            <MenuItem value={"Course Expiry Date"}>Course Expiry Date</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div>Error msg</div>
    </div>
  );
};

export default DurationConfiguration;
