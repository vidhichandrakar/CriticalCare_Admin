import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { Formik, Field, useFormik, ErrorMessage, Form } from "formik";

export const commonTextField = (
  { className, inputClassName, labels },
  Option = {
    sx: {},
    name: "",
    formik: null,
    value: "",

    // type: "number"
  }
) => {
  const { sx, formik, name, value } = Option;
  console.log("login", formik);
  return (
    <TextField
      inputProps={{ className: inputClassName }}
      fullWidth
      size="small"
      placeholder={labels}
      id="fullWidth"
      sx={sx}
      className={className}
      name={name}
      onBlur={formik?.formik?.handleBlur}
      onChange={formik?.formik?.handleChange}
      value={value}
      // type= "number"
    />
  );
};

export const commonSelect = ({ placeholder, menuItemList, className }, Option = {
  sx: {},
  name: "",
  formik: null,
  value: "",
}) => {
   const { sx, formik, name, value } = Option;
   console.log("login drop", formik);
  return (
    <Select
      displayEmpty
      size="small"
      renderValue={() => {
        return <em className={className}>{placeholder}</em>;
      }}
      inputProps={{ "aria-label": "Without label" }}
    >
    {/* // <Field as="select" name="selectedOption" id="selectedOption"> */}
      {menuItemList.map((menu) => (
        <MenuItem value={menu.id}>{menu.label}</MenuItem>
      ))}
      {/* // </Field> */}
    </Select> 
  );
};

export const CommonTypography = (
  { fontWeight, sx, label },
  Option = { className: "" }
) => {
  const { className } = Option;
  return (
    <Typography fontWeight={fontWeight} sx={sx} className={className}>
      {label}
    </Typography>
  );
};

export const commonButton = ({ handleTrackerPage, className, label }) => {
  return (
    <Button
      variant="contained"
      className={className}
      onClick={handleTrackerPage}
    >
      {label}
    </Button>
  );
};
