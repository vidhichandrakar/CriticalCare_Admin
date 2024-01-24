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
            <Box className="couponRightBox">
              <h5>2023/08/27, 05:39 am - 2023/08/29, 06:30 pm</h5>
            </Box>
            <Box className="couponLastBox">
              <MoreVertIcon
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
              />
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
