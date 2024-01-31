import { Box } from "@mui/material";
import React from "react";
import FormControl from "@mui/material/FormControl";
import {
  CommonTypography,
  commonButton,
  commonSelect,
  commonTextField,
} from "../../Util/CommonFields";
import { Formik, Field, useFormik, ErrorMessage, Form } from "formik";
import { commmonNameDescriptionSchema } from "../ValidationSchema/UpcomingCoursesBoxSchema";
import "../CSSFile/Courses.css";

const EditPrice = ({ handleTrackerPage }) => {
  const formik = useFormik({
    initialValues: {
      regularPrice: "",
      offerPrice:""
    },
    validationSchema: commmonNameDescriptionSchema,
    // validateOnChange: true,
    // validate: (values) => {
    //   const errors = {};
    //   if (!values.regularPrice) {
    //     errors.regularPrice = "Required";
    //     values.regularPrice.replace(values.regularPrice, '');
    //     console.log("values if ",values.regularPrice);
    //   }
    //   else if (values.regularPrice!==number){
    //     // values.regularPrice.replace(/\D/g, "");
    //    values.regularPrice.replace(values.regularPrice, '');
    //     errors.regularPrice="number  sd"

    //   }
    //   return errors;
    // },

  });

  return (
    <Formik>
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
                formik: { formik },
                name: "regularPrice",
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                value: formik.values.regularPrice,
                // pattern:"[0-9]*"
              })
            )}
            {formik.touched.regularPrice && formik.touched.regularPrice && (
              <span className="formikValidaionRedBorder">
                {formik.errors.regularPrice}
              </span>
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
                formik: { formik },
                name: "offerPrice",
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                value: formik.values.offerPrice,
                
              })
            )}
                        {formik.touched.offerPrice && formik.touched.offerPrice && (
              <span className="formikValidaionRedBorder">
                {formik.errors.offerPrice}
              </span>
            )}
          </Box>
        </Box>
        <Box className="divider"></Box>
        {commonButton({
          handleTrackerPage: () => handleTrackerPage(2),
          className: "coursesButton",
          label: "Add Content",
        })}
      </div>
    </Formik>
  );
};

export default EditPrice;
