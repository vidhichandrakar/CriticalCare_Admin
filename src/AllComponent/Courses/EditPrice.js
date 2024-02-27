import { Box } from "@mui/material";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import {
  CommonTypography,
  commonButton,
  commonSelect,
  commonTextField,
} from "../../Util/CommonFields";
import { ToastContainer, toast } from "react-toastify";
import { years } from "../../Util/masterFile";

const EditPrice = ({ handleTrackerPage, handleInputChange }) => {
  const [editPriceData, setEditPriceData] = useState({
    duration: "",
    years: "",
    regularPrice: "",
    offerPrice: "",
  });

  const handleInpurPrice = (value, type) => {
    let storedValues = Object.assign({}, editPriceData);
    if (type === "duration") {
      storedValues.duration = value;
    } else if (type === "years") {
      storedValues.years = value;
    } else if (type === "regularPrice") {
      storedValues.regularPrice = value;
    } else if (type === "offerPrice") {
      storedValues.offerPrice = value;
    }
    setEditPriceData(storedValues);
    if (
      storedValues.duration &&
      storedValues.years &&
      storedValues.regularPrice &&
      storedValues.offerPrice
    ) {
      handleInputChange("editPrice", storedValues);
    }
  };
  const handlePricePage = () => {
    const storedValues = editPriceData;
    if (
      storedValues.duration &&
      storedValues.years &&
      storedValues.regularPrice &&
      storedValues.offerPrice
    ) {
      handleInputChange("editPrice", storedValues);
      handleTrackerPage(2);
    } else {
      toast.error("Required fields cannot be empty!", {
        autoClose: 500,
      });
    }
  };
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
              handleInput: handleInpurPrice,
              type: "duration",
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
            {commonSelect(
              {
                placeholder: "Year(s)",
                menuItemList: years,
                className: "categorytext",
              },
              (Option = {
                handleInput: handleInpurPrice,
                categoryValue: editPriceData.years,
                type: "years",
              })
            )}
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
              handleInput: handleInpurPrice,
              type: "regularPrice",
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
              handleInput: handleInpurPrice,
              type: "offerPrice",
            })
          )}
        </Box>
      </Box>
      <Box className="divider"></Box>
      {commonButton({
        handleTrackerPage: () => handlePricePage(),
        className: "coursesButton",
        label: "Add Content",
      })}
      <ToastContainer />
    </div>
  );
};

export default EditPrice;
