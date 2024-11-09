import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "../../CSSFile/Coupon.css";
import { getCoupon, putCoupon } from "../../ActionFactory/apiActions";

const CreateCouponForm = ({}) => {
  const [coupontype, setCoupontype] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [discountamount, setDiscountamount] = useState()
  const [discountpercent, setDiscountpercent] = useState()
  const [minimumorder, setMinimumorder] = useState()

  const handleFlatDiscount = (event) => {
    setDiscountamount(event.target.value)
  }

const handleCreateCoupon = () => {
  const payload = {
    coupon_type: coupontype,
    coupon_code:"string value",
    coupon_max_user:50,
    start_date: startDate,
    end_date: endDate,
    discount_amount: discountamount, 
    discount_percent: discountpercent,
    minimum_order: minimumorder,
    created_by: 1 
  };
  putCoupon({
    payload, callBack: (response) => {},
    error: (error) => {
    }
  })
}
  
  return (
    <Box className="courseMainTrack">
      <div className="formMain">
        <Typography fontWeight={600} required>
          Discount Type
        </Typography>
 
        <FormControl className="radioButtonForm">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            className="SpaceBetween"
          >
            <FormControlLabel
              value="female"
              control={<Radio className="radio-icon" />}
              label="Years / Months / days"
            />
            <FormControlLabel
              value="male"
              control={<Radio className="radio-icon" />}
              label="Percent Discount"
              className="scndRadioBtn"
            />
          </RadioGroup>
        </FormControl>
        <Typography fontWeight={600} sx={{ marginTop: "5%" }}>
          Flat Discount
        </Typography>
        <TextField
          inputProps={{ className: "textField" }}
          sx={{ mt: 1 }}
          fullWidth
          size="small"
          placeholder="Enter discount amount"
          id="fullWidth"
          className="BoxShadow"
          InputProps={{
            startAdornment: (
              <CurrencyRupeeIcon sx={{ color: "#aca9a9", fontSize: "1.1em" }} />
            ),
          }}
          onChange={handleFlatDiscount}
        />
        <Box sx={{ marginTop: "5%" }} className="editFirstBox">
          <Box>
            <Typography fontWeight={600} className="editFirstText">
              Start Date
            </Typography>
            <TextField
              sx={{ width: 280, marginTop: "4% !important" }}
              inputProps={{ className: "textField" }}
              fullWidth
              size="small"
              placeholder="01/10/2024"
              id="fullWidth"
              className="BoxShadow"
              // onChange={handleRegularPrice}
            />
          </Box>
          <Box className="marginscndBox">
            <Typography fontWeight={600} className="editFirstText">
             End Date
            </Typography>
            <TextField
              sx={{ width: 280, marginTop: "4% !important" }}
              inputProps={{ className: "textField" }}
              fullWidth
              size="small"
              placeholder="01/10/2024"
              id="fullWidth"
              className="BoxShadow"
              // onChange={handleOfferPrice}
            />
          </Box>
        </Box>
        <Box sx={{ marginTop: "5%" }} className="editFirstBox">
          <Box>
            <Typography fontWeight={600} className="editFirstText">
             Minimum Order Value
            </Typography>
            <TextField
              sx={{ width: 280, marginTop: "4% !important" }}
              inputProps={{ className: "textField" }}
              fullWidth
              size="small"
              placeholder="1"
              id="fullWidth"
              className="BoxShadow"
              InputProps={{
                startAdornment: (
                  <CurrencyRupeeIcon sx={{ color: "#aca9a9", fontSize: "1.1em" }} />
                ),
              }}
              // onChange={handleRegularPrice}
            />
          </Box>
          <Box className="marginscndBox">
            <Typography fontWeight={600} className="editFirstText">
             No of Use
            </Typography>
            <TextField
              sx={{ width: 280, marginTop: "4% !important" }}
              inputProps={{ className: "textField" }}
              fullWidth
              size="small"
              placeholder="-1"
              id="fullWidth"
              className="BoxShadow"
              // onChange={handleOfferPrice}
            />
          </Box>
        </Box>
        <Typography fontWeight={600} sx={{ marginTop: "5%" }}>
          Coupon code
        </Typography>
        <TextField
          inputProps={{ className: "textField" }}
          fullWidth
          sx={{ mt: 1 }}
          size="small"
          placeholder="1"
          id="fullWidth"
          className="BoxShadow"
          // onChange={handleMinimumorder}
        />
        <Box className="divider"></Box>
        <Button variant="contained" className="coursesButton"
        onClick={handleCreateCoupon}>
          Create
        </Button>
      </div>
    </Box>
  );
};

export default CreateCouponForm;
