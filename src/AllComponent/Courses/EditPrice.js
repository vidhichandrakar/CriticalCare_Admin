import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import "../CSSFile/Analytics.css";
import FormControl from "@mui/material/FormControl";
import {
  CommonTypography,
  commonButton,
  commonSelect,
  commonTextField,
} from "../../Util/CommonFields";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { years } from "../../Util/masterFile";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo/DemoContainer";
import moment from "moment/moment";
import DurationConfiguration from "./DurationConfiguration";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const EditPrice = ({ handleTrackerPage, handleInputChange, courseData }) => {
  const [selectDurationValue, setSelectedDurationValue] = useState("");
  const [expanded, setExpanded] = useState();
  const [expiryDate, setExpiryDate] = useState({
    regularPrice: "10000",
    offerPrice: "1000",
    startDate: "",
  });
  const [lifetimeValidation, setLifetimeValidation] = useState({
    regularPrice: "10000",
    offerPrice: "1000",
  });
  const [singleValidity, setSingleValiduty] = useState({
    duration: "20",
    years: { id: 1, label: "Month(s)" },
    regularPrice: "10000",
    offerPrice: "1000",
    startDate: "",
    endDate: "",
  });
  const [resetPrice, setResetPrice] = useState([
    {
      duration: "20",
      years: { id: 1, label: "Month(s)" },
      regularPrice: "10000",
      offerPrice: "1000",
      startDate: "",
      endDate: "",
    },
    {
      duration: "10",
      years: { id: 1, label: "years" },
      regularPrice: "4500",
      offerPrice: "450",
      startDate: "",
      endDate: "",
    },
  ]);
  const [editPriceData, setEditPriceData] = useState([
    {
      duration: "20",
      years: { id: 1, label: "Month(s)" },
      regularPrice: "10000",
      offerPrice: "1000",
      startDate: "",
      endDate: "",
    },
    {
      duration: "10",
      years: { id: 1, label: "years" },
      regularPrice: "4500",
      offerPrice: "450",
      startDate: "",
      endDate: "",
    },
  ]);

  useEffect(() => {
    if (courseData?.length) {
      let storedValues = Object.assign({}, editPriceData);
      storedValues.duration = courseData.duration_id;
      storedValues.regularPrice = courseData.price;
      storedValues.offerPrice = courseData.offer_price;
      setEditPriceData(storedValues);
    }
  }, [courseData]);

  const handleInpurPrice = (value, type, selectedIndex) => {
    setResetPrice(
      resetPrice.map((item, idx) =>
        idx === selectedIndex ? { ...item, [type]: value } : item
      )
    );
  };

  const handlePricePage = () => {
    const storedValues = editPriceData;
    if (
      storedValues.duration &&
      storedValues.years &&
      storedValues.regularPrice &&
      storedValues.offerPrice
    ) {
      if (
        parseInt(storedValues.regularPrice) > parseInt(storedValues.offerPrice)
      ) {
        handleInputChange("editPrice", storedValues);

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
    // console.log(e.target.value);
    setSelectedDurationValue(e.target.value);
  };

  const handleAddDuration = () => {
    let addedValues = [...resetPrice];
    addedValues.push({
      duration: "3",
      years: { id: 1, label: "Days(s)" },
      regularPrice: "",
      offerPrice: "10",
      startDate: "",
      endDate: "",
    });
    setResetPrice(addedValues);
  };

  const handleExpanded = (index) => {
    // console.log("odk", index);
    if (index === expanded) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  const handleCancelAccord = (index) => {
    // console.log(index);
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
    setEditPriceData((prevItems) => {
      return prevItems.filter((item, indexRemove) => indexRemove !== index);
    });
  };

  const handleSavePrice = (index) => {
    let savedPrice = resetPrice.filter((item, idx) => index === idx);
    setResetPrice(
      resetPrice.map((item, idx) => (idx === index ? savedPrice[0] : item))
    );

    // console.log("reset price", resetPrice, savedPrice);
  };
  return (
    <div className="formMain">
      <DurationConfiguration
        handleDuration={handleDuration}
        selectDurationValue={selectDurationValue}
      />
      <br />

      {console.log("selectDurationValue", selectDurationValue)}
      {selectDurationValue === "Multiple Validity" ? (
        <div>
          {resetPrice?.map((item, index) => (
            <div>
              <Accordion
                defaultExpanded={index === 0}
                sx={{ mt: 5 }}
                style={{ borderRadius: "15px" }}
                expanded={expanded === index}
              >
                <AccordionSummary
                  style={{marginTop:"7%"}}
                  expandIcon={ <Stack spacing={2} direction="row" sx={{ ml: 35 }}>
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
                </Stack>}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography>
                      {`${item?.duration} ${item?.years?.label}  `}{" "}
                      {/* <FiberManualRecordIcon fontSize="small" />{" "} */}
                      {/* <CurrencyRupeeIcon color="primary" /> */}
                     <b style={{color:"#18568f", marginLeft:"10px"}}> {`  ₹ ${item?.offerPrice}`}</b>
                    </Typography>
                   
                  </div>
                </AccordionSummary>
                <AccordionDetails >
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
                            handleInpurPrice(event, "duration", index),
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
                        {commonSelect(
                          {
                            placeholder: "Year(s)",
                            menuItemList: years,
                            className: "categorytext",
                          },
                          (Option = {
                            handleInput: (event) =>
                              handleInpurPrice(event, "years", index),

                            categoryValue: item?.years,
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
                          className: "BoxShadowCourses",
                          inputClassName: "textField",
                          labels: "₹ 1000",
                        },
                        (Option = {
                          sx: { width: 240, marginTop: "4% !important" },
                          handleInput: (event) =>
                            handleInpurPrice(event, "regularPrice", index),
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
                            handleInpurPrice(event, "offerPrice", index),
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
            <Button variant="text" onClick={() => handleAddDuration()} style={{textTransform:"none"}}>
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
                  labels: "1",
                },
                (Option = {
                  sx: { width: 240, marginTop: "4% !important" },
                  // handleInput: (event) =>
                  //   handleInpurPrice(event, "duration", index),
                  type: "duration",
                  value: singleValidity.duration,
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
                {commonSelect(
                  {
                    placeholder: "Year(s)",
                    menuItemList: years,
                    className: "categorytext",
                  },
                  (Option = {
                    // handleInput: (event) =>
                    //   handleInpurPrice(event, "years", index),

                    categoryValue: singleValidity?.years,
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
                  className: "BoxShadowCourses",
                  inputClassName: "textField",
                  labels: "₹ 1000",
                },
                (Option = {
                  sx: { width: 240, marginTop: "4% !important" },
                  // handleInput: (event) =>
                  //   handleInpurPrice(event, "regularPrice", index),
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
                  labels: "₹ 500",
                },
                (Option = {
                  sx: { width: 240, marginTop: "4% !important" },
                  // handleInput: (event) =>
                  //   handleInpurPrice(event, "offerPrice", index),
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
                  // handleInput: (event) =>
                  //   handleInpurPrice(event, "regularPrice", index),
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
                  // handleInput: (event) =>
                  //   handleInpurPrice(event, "offerPrice", index),
                  type: "offerPrice",
                  value: lifetimeValidation.offerPrice,
                })
              )}
            </Box>
          </Box>
        </div>
      ) : selectDurationValue === "Course Expiry Date" ? (
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
                  // handleInput: (event) =>
                  //   handleInpurPrice(event, "regularPrice", index),
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
                  // handleInput: (event) =>
                  //   handleInpurPrice(event, "offerPrice", index),
                  type: "offerPrice",
                  value: expiryDate.offerPrice,
                })
              )}
            </Box>
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
                    // onChange={(e) => handleCustumDate(e, "Sdate")}
                    label="Select Start Date"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
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
