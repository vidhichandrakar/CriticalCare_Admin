import { Box} from "@mui/material";
import React from "react";
import FormControl from "@mui/material/FormControl";
import {
  CommonTypography,
  commonButton,
  commonSelect,
  commonTextField,
} from "../../Util/CommonFields";

const EditPrice = ({ handleTrackerPage }) => {
  return (
    <div className="formMain">
      <Box sx={{ mt: "5%" }} className="editFirstBox">
        <Box>
          {CommonTypography(
            { fontWeight: 600, label: "Duration" },
            (Option = {
              className: "editFirstText",
            })
          )}
          {commonTextField(
            {
              id: "fullWidth",
              className: "BoxShadow",
              inputClassName: "textField",
              labels: "1",
            },
            (Option = {
              sx: { width: 240, marginTop: "4% !important" },
            })
          )}
        </Box>
        <Box className="marginscndBox">
          {CommonTypography(
            { fontWeight: 600, label: "Years / Months / Days" },
            (Option = {
              className: "editFirstText",
            })
          )}
          <FormControl sx={{ m: 1, minWidth: 240 }}>
            {commonSelect({
              placeholder: "Year(s)",
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
      <Box sx={{ marginTop: "5%" }} className="editFirstBox">
        <Box>
          {CommonTypography(
            { fontWeight: 600, label: "Regular Price" },
            (Option = {
              className: "editFirstText",
            })
          )}
          {commonTextField(
            {
              id: "fullWidth",
              className: "BoxShadow",
              inputClassName: "textField",
              labels: "₹ 1000",
            },
            (Option = {
              sx: { width: 240, marginTop: "4% !important" },
            })
          )}
        </Box>
        <Box className="marginscndBox">
          {CommonTypography(
            { fontWeight: 600, label: "Offer Price" },
            (Option = {
              className: "editFirstText",
            })
          )}
          {commonTextField(
            {
              id: "fullWidth",
              className: "BoxShadow",
              inputClassName: "textField",
              labels: "₹ 500",
            },
            (Option = {
              sx: { width: 240, marginTop: "4% !important" },
            })
          )}
        </Box>
      </Box>
      <Box className="divider"></Box>
      {commonButton({handleTrackerPage:()=>handleTrackerPage(2),className:"coursesButton",label:"Add Content"})}
    </div>
  );
};

export default EditPrice;
