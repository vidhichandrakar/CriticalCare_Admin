import { Box, Typography } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
const CouponBox = ({}) => {
  const arrayColumn = [1, 2, 3, 4, 5, 6, 7, 8];
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  
  return (
    <>
      {arrayColumn.map((data) => (
        <Box className="courseMainCoupon">
          <div
            className="formMainCoupon"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Box className="couponLeftBox">
              <Typography>₹ 8000 OFF</Typography>
              <Box className="yellowBox">
                {" "}
                <Typography style={{ marginBottom: "8%" }}>
                  <b>DISCOUNT10</b>
                </Typography>{" "}
              </Box>
            </Box>
            <Box className="verticalDivider"></Box>
           
           <Box className="flexcol width60">
           <div className="flexrow">
            <Box className="DiscountBox">
              <Typography>
                DISCOUNT
              </Typography>
              <Box className="flexrow mt-2">
                <h6>
                  Created by 360 Critical care
                </h6>
                <h6 className="UsedText">
                  Public Coupon
                </h6>
              </Box>
            </Box>
            <Box className="couponLastBox">
              <h6 style={{color: "white", backgroundColor: "red"}}>EXPIRED</h6>
              <MoreVertIcon
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
              />
            </Box>
            </div> 
            <div className="flexrow">
            <Box className="couponRightBox flexrow">
              <h6>2023/08/27, 05:39 am - 2023/08/29, 06:30 pm</h6>
              <h6 className="UsedText">Used 1 times</h6>
            </Box>
            <Box>
              <p className="ShowHideBtn">Show Details</p>
            </Box>
          

            </div>
            </Box>
           
          </div>
        </Box>
      ))}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Typography sx={{ p: 1 }}>Edit</Typography>
        <Typography sx={{ p: 1 }}>Delete</Typography>
      </Popover>
    </>
  );
};
export default CouponBox;
