import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CouponHeader =({})=>{
  return(
    <Box className="couponHedaerBox">
      <Typography className="couponHeaderText">Coupon Codes</Typography>
      <Box className="couponHeaderButton">
        <Link to = "/CreateCoupon"><Button variant="contained"  className="couponButton">
       Create Coupon
      </Button>
      </Link>
      </Box>
    </Box>
  )
}
export default CouponHeader;