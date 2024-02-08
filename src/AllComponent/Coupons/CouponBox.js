import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const CouponBox = ({}) => {
  const arrayColumn = [1, 2, 3, 4, 5, 6, 7, 8];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetail = () => {
    setShowDetail(!showDetail);
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {arrayColumn.map((data) => (
        <Box>
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
                    <Typography>DISCOUNT</Typography>
                    <Box className="flexrow mt-2">
                      <h6>Created by 360 Critical care</h6>
                      <h6 className="UsedText">Public Coupon</h6>
                    </Box>
                  </Box>
                  <Box className="couponLastBox">
                    <h6 style={{ color: "white", backgroundColor: "red" }}>
                      EXPIRED
                    </h6>
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
                    <Stack spacing={2} direction="row">
                      <Button
                        variant="text"
                        className="showDetailsButton"
                        onClick={handleShowDetail}
                      >
                      
                        {!showDetail ? "Show Details" : "Hide Details"}
                      </Button>
                    </Stack>
                  </Box>

              
                </div>
              </Box>
            </div>
          </Box>

          {showDetail ? (
            <div className="completeCouponInfo">
              <div className="couponInfoHeading">
                <p>Coupon Information</p>
              </div>

              <div className="completeCouponInfoBoxes">
                <Box className="couponInfoBoxes">
                  <p>Total Eligible Students</p>
                  <h3>All Students</h3>
                </Box>
                <Box className="couponInfoBoxes">
                  <p>Total Assigned Courses</p>
                  <h3>1</h3>
                </Box>
                <Box className="couponInfoBoxes">
                  <p>Overall Usage Limit</p>
                  <h3>1</h3>
                </Box>
                <Box className="couponInfoBoxes">
                  <p>Usage Per Student</p>
                  <h3>1</h3>
                </Box>
                <Box className="couponInfoBoxes">
                  <p>Min Order value</p>
                  <h3>₹ 1</h3>
                </Box>
              </div>
            </div>
          ) : null}
        </Box>
      ))}
      <Popover
        sx={{ m: -7, mt: 0.7 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Typography sx={{ p: 1, mt: -1, mr: 5 }}>Edit</Typography>
        <Typography sx={{ p: 1, mt: -1, mr: 5 }}>Delete</Typography>
      </Popover>
    </div>
  );
};

export default CouponBox;
