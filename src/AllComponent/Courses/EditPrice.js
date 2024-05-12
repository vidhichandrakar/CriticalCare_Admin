import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import {
  CommonTypography,
  commonButton,
  commonTextField,
} from "../../Util/CommonFields";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo/DemoContainer";
import moment from "moment/moment";
import DurationConfiguration from "./DurationConfiguration";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { getDuration } from "../ActionFactory/apiActions";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

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

const EditPrice = ({ handleTrackerPage, handleInputChange, courseData }) => {
  const [selectDurationValue, setSelectedDurationValue] = useState("");
  const [expanded, setExpanded] = useState();
  const [durationType, setDurationType] = useState([{}]);
  const [durationSelectedValue, setDurationSelectedValue] = useState("");
  const [expiryDate, setExpiryDate] = useState({
    regularPrice: "235980",
    offerPrice: "789",
    startDate: "",
    duration_id: "",
    duration_type_name: "",
  });
  const [lifetimeValidation, setLifetimeValidation] = useState({
    regularPrice: "8502",
    offerPrice: "520",
    duration_type_id: "",
    duration_type_name: "",
  });
  const [singleValidity, setSingleValidity] = useState({
    duration: "",
    duration_type_id: "",
    regularPrice: "",
    offerPrice: "",
    startDate: "",
    endDate: "",
    duration_id: "",
    duration_type_name: "",
    year: "",
  });
  const [resetPrice, setResetPrice] = useState([
    {
      duration: "20",
      years: "",
      regularPrice: "400",
      offerPrice: "1000",
      startDate: "",
      endDate: "",
      duration_type_name: "",
      duration_type_id: "",
      duration_id: "",
    },
    {
      duration: "40",
      years: "",
      regularPrice: "200",
      offerPrice: "50",
      startDate: "",
      endDate: "",
      duration_type_name: "",
      duration_type_id: "",
      duration_id: "",
    },
  ]);
  const [editPriceData, setEditPriceData] = useState([
    {
      duration: "20",
      years: "",
      regularPrice: "400",
      offerPrice: "1000",
      startDate: "",
      endDate: "",
      duration_type_name: "",
      duration_type_id: "",
      duration_id: "",
    },
    {
      duration: "20",
      years: "",
      regularPrice: "400",
      offerPrice: "1000",
      startDate: "",
      endDate: "",
      duration_type_name: "",
      duration_type_id: "",
      duration_id: "",
    },
  ]);

  useEffect(() => {
    getDuration({
      callBack: (response) => {
        setDurationType(response.data);
      },
    });
  }, []);

  useEffect(() => {
    if (courseData?.length) {
      let storedValues = Object.assign({}, editPriceData);
      storedValues.duration = courseData.duration_id;
      storedValues.regularPrice = courseData.price;
      storedValues.offerPrice = courseData.offer_price;
      setEditPriceData(storedValues);
    }
  }, [courseData]);

  const handleInputPrice = (value, type, selectedIndex) => {
    // let storedValues = Object.assign({}, resetPrice);

    setEditPriceData(
      editPriceData.map((item, idx) =>
        idx === selectedIndex ? { ...item, [type]: value } : item
      )
    );
    if (type === "years") {
      setDurationSelectedValue(value.duration_name);
    }
    // handleInputChange("editPrice", editPriceData);
  };

  const handlePricePage = () => {
    if (selectDurationValue === "Multiple Validity") {
      // handleInputChange("resetPrice", resetPrice);
      handleInputChange("editPrice", editPriceData);
      handleTrackerPage(2)
    } else if (selectDurationValue === "Single Validity") {
      const storedValues = singleValidity;
      if (
        storedValues.duration &&
        storedValues.year &&
        storedValues.regularPrice &&
        storedValues.offerPrice
      ) {
        if (
          parseInt(storedValues.regularPrice) >
          parseInt(storedValues.offerPrice)
        ) {
          handleInputChange("editPrice", [storedValues]);

          handleTrackerPage(2);
        } else {
          toast.error("Offer Price Must Be Less Then Regular Price", {
            autoClose: 500,
          });
        }
      } else {
        toast.error("Required fields cannot be empty!", {
          autoClose: 500,
        });
      }
    } else if (selectDurationValue === "Lifetime Validity") {
      const storedValues = lifetimeValidation;
      handleInputChange("editPrice", [storedValues]);
      handleTrackerPage(2);
    } else if (selectDurationValue === "Course Expiry Date") {
      const storedValues = expiryDate;
      handleInputChange("editPrice", [storedValues]);
      handleTrackerPage(2);
    }
  };
  // const handleCustumDate = (e, type) => {
  //   let storedValues = Object.assign({}, editPriceData);
  //   if (type === "Sdate") {
  //     storedValues.startDate = moment(e).format("YYYY-MM-DD");
  //   } else {
  //     storedValues.endDate = moment(e).format("YYYY-MM-DD");
  //   }
  //   setEditPriceData(storedValues);
  //   handleInputChange("editPrice", storedValues);
  // };

  const handleDuration = (e) => {
    if (e.target.value.duration_type_name === "Multiple Validity") {
      setSelectedDurationValue(e?.target?.value?.duration_type_name);
      let arr = [];
      resetPrice.map((item) => {
        let storedValues1 = Object.assign({}, item);
        storedValues1.duration_type_name = e?.target?.value?.duration_type_name;
        storedValues1.duration_type_id = e?.target?.value?.duration_type_id;
        arr.push(storedValues1);
      });
      setResetPrice(arr);
    } else if (e.target.value.duration_type_name === "Single Validity") {
      let storedValues = Object.assign({}, singleValidity);
      setSelectedDurationValue(e?.target?.value?.duration_type_name);
      storedValues.duration_type_name = e?.target?.value?.duration_type_name;
      storedValues.duration_type_id = e?.target?.value?.duration_type_id;
      setSingleValidity(storedValues);
    } else if (e.target.value.duration_type_name === "Lifetime Validity") {
      let storedValues = Object.assign({}, lifetimeValidation);
      setSelectedDurationValue(e?.target?.value?.duration_type_name);
      storedValues.duration_type_name = e?.target?.value?.duration_type_name;
      storedValues.duration_type_id = e?.target?.value?.duration_type_id;
      setLifetimeValidation(storedValues);
    } else {
      let storedValues = Object.assign({}, expiryDate);
      setSelectedDurationValue(e?.target?.value?.duration_type_name);
      storedValues.duration_type_name = e?.target?.value?.duration_type_name;
      storedValues.duration_type_id = e?.target?.value?.duration_type_id;
      setExpiryDate(storedValues);
    }
  };

  const handleAddDuration = () => {
    let addedValues = [...editPriceData];
    addedValues.push({
      duration: "20",
      years: "",
      regularPrice: "400",
      offerPrice: "1000",
      startDate: "",
      endDate: "",
      duration_type_name: "",
      duration_type_id: "",
      duration_id: "",
    });
    setEditPriceData(addedValues);
    handleInputChange("editPrice", addedValues);
  };

  const handleExpanded = (index) => {
    if (index === expanded) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  const handleCancelAccord = (index) => {
    if (index === expanded) {
      setExpanded(null);
    }
    let editPrice = editPriceData.filter((item, idx) => index === idx);
    setResetPrice(
      resetPrice.map((item, idx) => (idx === index ? editPrice[0] : item))
    );
  };

  const handleDelete = (index) => {
    if (index === expanded) {
      setExpanded(null);
    }
    setResetPrice((prevItems) => {
      return prevItems.filter((item, indexRemove) => indexRemove !== index);
    });
  };

  const handleSavePrice = (index) => {
    let savedPrice = resetPrice.filter((item, idx) => index === idx);
    setResetPrice(
      resetPrice.map((item, idx) => (idx === index ? savedPrice[0] : item))
    );
  };

  const handleValidityChange = (value, type) => {
    if (selectDurationValue === "Single Validity") {
      let storedValues = Object.assign({}, singleValidity);
      if (type === "duration") {
        storedValues.duration = value;
      } else if (type === "years") {
        setDurationSelectedValue(value.target.value.duration_name);
        storedValues.year = value?.target?.value;
        storedValues.duration_id = value?.target?.value?.duration_id;
      } else if (type === "regularPrice") {
        storedValues.regularPrice = value;
      } else if (type === "offerPrice") {
        storedValues.offerPrice = value;
      } else if (type === "date") {
        storedValues.date = moment(new Date(value)).format("YYYY-MM-DD");
      }
      setSingleValidity(storedValues);
      if (
        storedValues.duration &&
        storedValues.year &&
        storedValues.regularPrice &&
        storedValues.offerPrice
      ) {
        handleInputChange("editPrice", storedValues);
      }
    } else if (selectDurationValue === "Lifetime Validity") {
      let storedValues = Object.assign({}, lifetimeValidation);
      if (type === "regularPrice") {
        storedValues.regularPrice = value;
      } else if (type === "offerPrice") {
        storedValues.offerPrice = value;
      }
      setLifetimeValidation(storedValues);
      if (storedValues.regularPrice && storedValues.offerPrice) {
        handleInputChange("editPrice", storedValues);
      }
    } else if (selectDurationValue === "Course Expiry Date") {
      let storedValues = Object.assign({}, expiryDate);
      if (type === "regularPrice") {
        storedValues.regularPrice = value;
      } else if (type === "offerPrice") {
        storedValues.offerPrice = value;
      }
      setExpiryDate(storedValues);
      if (storedValues.regularPrice && storedValues.offerPrice) {
        handleInputChange("editPrice", storedValues);
      }
    }
  };
  return (
    <div className="formMain">
      <DurationConfiguration
        handleDuration={handleDuration}
        selectDurationValue={selectDurationValue}
      />
      <br />
      {selectDurationValue === "Multiple Validity" ? (
        <div>
          {editPriceData?.map((item, index) => (
            <div>
              <Accordion
                defaultExpanded={index === 0}
                sx={{ mt: 5 }}
                style={{ borderRadius: "15px" }}
                expanded={expanded === index}
              >
                <AccordionSummary
                  style={{ marginTop: "7%" }}
                  expandIcon={
                    <Stack spacing={2} direction="row" sx={{ ml: 35 }}>
                      {expanded !== null && expanded === index ? (
                        ""
                      ) : (
                        <>
                          <Button
                            color="error"
                            onClick={() => handleDelete(index)}
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                          <Button
                            color="primary"
                            onClick={() => handleExpanded(index)}
                          >
                            <BorderColorIcon /> Edit
                          </Button>
                        </>
                      )}
                    </Stack>
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography>
                      {`${item?.duration} ${item?.years?.duration_name}  `}{" "}
                      <b style={{ color: "#18568f", marginLeft: "10px" }}>
                        {" "}
                        {`  ₹ ${item?.offerPrice}`}
                      </b>
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="accoridanBtn">
                    <Button
                      variant="text"
                      sx={{ mr: 2 }}
                      onClick={() => handleCancelAccord(index)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleSavePrice(index)}
                    >
                      Save
                    </Button>
                  </div>

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
                          handleInput: (event) =>
                            handleInputPrice(event, "duration", index),
                          type: "duration",
                          value: item.duration,
                        })
                      )}
                    </Box>

                    <Box className="marginscndBoxYears">
                      {CommonTypography(
                        { fontWeight: 600, label: "Years / Months / Days" },
                        (Option = {
                          className: "fieldSizeYears",
                        })
                      )}
                      <FormControl sx={{ m: 1, minWidth: 240 }}>
                        <Select
                          value={
                            durationSelectedValue
                              ? durationSelectedValue
                              : `Select Duration Type`
                          }
                          renderValue={() => {
                            return durationSelectedValue !== "" ? (
                              <Typography>{durationSelectedValue}</Typography>
                            ) : (
                              <Typography> Select Duration Type </Typography>
                            );
                          }}
                          // defaultValue="Years(s)"
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(event) =>
                            handleInputPrice(event.target.value, "years", index)
                          }
                        >
                          {durationType.map((item) => (
                            <MenuItem key={item.duration_id} value={item}>
                              {item.duration_name}
                            </MenuItem>
                          ))}
                        </Select>
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
                          className: "BoxShadowCourses",
                          inputClassName: "textField",
                          labels: "₹ 1000",
                        },
                        (Option = {
                          sx: { width: 240, marginTop: "4% !important" },
                          handleInput: (event) =>
                            handleInputPrice(event, "regularPrice", index),
                          type: "regularPrice",
                          value: item.regularPrice,
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
                          handleInput: (event) =>
                            handleInputPrice(event, "offerPrice", index),
                          type: "offerPrice",
                          value: item.offerPrice,
                        })
                      )}
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
          <div style={{ marginTop: "25px" }}>
            <Button
              variant="text"
              onClick={() => handleAddDuration()}
              style={{ textTransform: "none" }}
            >
              + Add Another validity
            </Button>
          </div>
        </div>
      ) : selectDurationValue === "Single Validity" ? (
        <div>
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
                  labels: "eg.1",
                },
                (Option = {
                  sx: { width: 240, marginTop: "4% !important" },
                  handleInput: (event) =>
                    handleValidityChange(event, "duration"),
                  type: "duration",
                  value: singleValidity.duration,
                })
              )}
            </Box>

            <Box className="marginscndBoxYears">
              {CommonTypography(
                { fontWeight: 600 },
                (Option = {
                  className: "fieldSizeYears",
                })
              )}
              <FormControl sx={{ m: 1, minWidth: 240 }}>
                <Select
                  value={
                    durationSelectedValue
                      ? durationSelectedValue
                      : `Select Duration Type`
                  }
                  renderValue={() => {
                    return durationSelectedValue !== "" ? (
                      <Typography>{durationSelectedValue}</Typography>
                    ) : (
                      <Typography> Select Duration Type </Typography>
                    );
                  }}
                  // defaultValue="Years(s)"
                  input={<OutlinedInput />}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={(event) => handleValidityChange(event, "years")}
                >
                  {durationType.map((item) => (
                    <MenuItem key={item.duration_id} value={item}>
                      {item.duration_name}
                    </MenuItem>
                  ))}
                </Select>
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
                  className: "BoxShadowCourses",
                  inputClassName: "textField",
                  labels: "eg. ₹ 1000",
                },
                (Option = {
                  sx: { width: 240, marginTop: "4% !important" },
                  handleInput: (event) =>
                    handleValidityChange(event, "regularPrice"),
                  type: "regularPrice",
                  value: singleValidity.regularPrice,
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
                  labels: "eg. ₹ 500",
                },
                (Option = {
                  sx: { width: 240, marginTop: "4% !important" },
                  handleInput: (event) =>
                    handleValidityChange(event, "offerPrice"),
                  type: "offerPrice",
                  value: singleValidity.offerPrice,
                })
              )}
            </Box>
          </Box>
        </div>
      ) : selectDurationValue === "Lifetime Validity" ? (
        <div>
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
                  className: "BoxShadowCourses",
                  inputClassName: "textField",
                  labels: "₹ 1000",
                },
                (Option = {
                  sx: { width: 240, marginTop: "4% !important" },
                  handleInput: (event) =>
                    handleValidityChange(event, "regularPrice"),
                  type: "regularPrice",
                  value: lifetimeValidation.regularPrice,
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
                  handleInput: (event) =>
                    handleValidityChange(event, "offerPrice"),
                  type: "offerPrice",
                  value: lifetimeValidation.offerPrice,
                })
              )}
            </Box>
          </Box>
        </div>
      ) : selectDurationValue === "Course Expiry Date" ? (
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                className="BoxShadowCourses"
                sx={{ width: 700 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ m: 0.5, mt: 0.7, background: "#fff" }}
                  />
                )}
                onChange={(event) => handleValidityChange(event, "date")}
                label="Select Expiry Date"
              />
            </DemoContainer>
          </LocalizationProvider>
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
                  className: "BoxShadowCourses",
                  inputClassName: "textField",
                  labels: "₹ 1000",
                },
                (Option = {
                  sx: { width: 240, marginTop: "4% !important" },
                  handleInput: (event) =>
                    handleValidityChange(event, "regularPrice"),
                  type: "regularPrice",
                  value: expiryDate.regularPrice,
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
                  handleInput: (event) =>
                    handleValidityChange(event, "offerPrice"),
                  type: "offerPrice",
                  value: expiryDate.offerPrice,
                })
              )}
            </Box>
          </Box>
        </div>
      ) : null}
      {/* <Box className="editFirstBox" style={{ marginTop: "10%" }}>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                className="BoxShadowCourses"
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    sx={{ m: 0.5, mt: 0.7, background: "#fff" }}
                  />
                )}
                onChange={(e) => handleCustumDate(e, "Sdate")}
                label="Select Start Date"
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className="marginscndBox">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="BoxShadowCourses"
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  sx={{ m: 0.5, mt: 0.8, background: "#fff" }}
                />
              )}
              onChange={(e) => handleCustumDate(e, "Edate")}
              label="Select End Date"
            />
          </LocalizationProvider>
        </div>
      </Box> */}

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
