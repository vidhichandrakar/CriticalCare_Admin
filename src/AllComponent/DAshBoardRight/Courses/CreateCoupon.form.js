import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "../../CSSFile/Coupon.css";
import { getCoupon, putCoupon } from "../../ActionFactory/apiActions";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";

const CreateCouponForm = ({}) => {
  const [coupontype, setCoupontype] = useState()
  const [startDate, setStartDate] = useState(dayjs('2022-04-17'))
  const [endDate, setEndDate] = useState(dayjs('2022-04-17'))
  const [discountamount, setDiscountamount] = useState()
  const [totaluser, setTotaluser] = useState()
  const [minimumorder, setMinimumorder] = useState()
  const [couponcode, setCouponcode] = useState()

  const handleFlatDiscount = (event) => {
    setDiscountamount(event.target.value)
  }
  const handleStartDate = (event) => {
    setStartDate(event)
  }
  const handleEndDate = (event) => {
    setEndDate(event)
  }
  const handleNoOfUse = (event) => {
    setTotaluser(event.target.value)
  }
  const handleMinimumOrder = (event) => {
    setMinimumorder(event.target.value)
  }
  const handleCouponCOde = (event) => {
    setCouponcode(event.target.value)
  }
  const handleChange = (event) => {
    setCoupontype(event.target.value);
  }

const handleCreateCoupon = () => {
  const payload = {
    coupon_type: coupontype,
    coupon_code: couponcode,
    coupon_max_user:totaluser,
    start_date:   moment(new Date(startDate)).format("YYYY-MM-DD"),
    end_date:   moment(new Date(endDate)).format("YYYY-MM-DD"),
    discount_amount: discountamount, 
    discount_percent: "discountpercent",
    minimum_order: minimumorder,
    created_by: JSON.parse(
      localStorage.getItem("loggedInUser")
    ).user_id, 
  };
  putCoupon({
    payload,
    callBack: (response) => {},
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
            onChange={handleChange}
          >
            <FormControlLabel
              value="Flat Discounts"
              control={<Radio className="radio-icon" />}
              label="Flat Discounts"
            />
            <FormControlLabel
              value="Percent Discount"
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
          sx={{ mt: 1,width: "93%" }}
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
        <DatePicker
          // label="Controlled picker"
          value={startDate}
          onChange={handleStartDate}
        />
      </DemoContainer>
    </LocalizationProvider>
          </Box>
          <Box className="marginscndBox">
            <Typography fontWeight={600} className="editFirstText">
             End Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
        <DatePicker
          // label="Controlled picker"
          value={endDate}
          onChange={handleEndDate}
        />
      </DemoContainer>
    </LocalizationProvider>
          </Box>
          
        </Box>
        <Box sx={{ marginTop: "5%" }} className="editFirstBox">
          <Box>
            <Typography fontWeight={600} className="editFirstText">
             Minimum Order Value
            </Typography>
            <TextField
              sx={{ width: 260, marginTop: "4% !important" }}
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
              onChange={handleMinimumOrder}
            />
          </Box>
          <Box className="marginscndBox">
            <Typography fontWeight={600} className="editFirstText">
             No of Use
            </Typography>
            <TextField
              sx={{ width: 260, marginTop: "4% !important" }}
              inputProps={{ className: "textField" }}
              fullWidth
              size="small"
              placeholder="-1"
              id="fullWidth"
              className="BoxShadow"
              onChange={handleNoOfUse}
            />
          </Box>
        </Box>
        <Typography fontWeight={600} sx={{ marginTop: "5%" }}>
          Coupon code
        </Typography>
        <TextField
          inputProps={{ className: "textField" }}
          fullWidth
          sx={{ mt: 1,width: "93%" }}
          size="small"
          placeholder="1"
          id="fullWidth"
          className="BoxShadow"
          onChange={handleCouponCOde}
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
