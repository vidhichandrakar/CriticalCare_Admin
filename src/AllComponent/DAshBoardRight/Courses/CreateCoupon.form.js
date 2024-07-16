import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "../../CSSFile/Coupon.css";

const CreateCouponForm = ({}) => {
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
        />
        <Box sx={{ marginTop: "5%" }} className="editFirstBox">
          <Box>
            <Typography fontWeight={600} className="editFirstText">
              Regular Price
            </Typography>
            <TextField
              sx={{ width: 280, marginTop: "4% !important" }}
              inputProps={{ className: "textField" }}
              fullWidth
              size="small"
              placeholder="01/10/2024"
              id="fullWidth"
              className="BoxShadow"
            />
          </Box>
          <Box className="marginscndBox">
            <Typography fontWeight={600} className="editFirstText">
              Offer Price
            </Typography>
            <TextField
              sx={{ width: 280, marginTop: "4% !important" }}
              inputProps={{ className: "textField" }}
              fullWidth
              size="small"
              placeholder="01/10/2024"
              id="fullWidth"
              className="BoxShadow"
            />
          </Box>
        </Box>
        <Typography fontWeight={600} sx={{ marginTop: "5%" }}>
          Minimum Order Value
        </Typography>
        <TextField
          inputProps={{ className: "textField" }}
          fullWidth
          sx={{ mt: 1 }}
          size="small"
          placeholder="1"
          id="fullWidth"
          className="BoxShadow"
          InputProps={{
            startAdornment: (
              <CurrencyRupeeIcon sx={{ color: "#aca9a9", fontSize: "1.1em" }} />
            ),
          }}
        />
        <Box className="divider"></Box>
        <Button variant="contained" className="coursesButton">
          Create
        </Button>
      </div>
    </Box>
  );
};

export default CreateCouponForm;
