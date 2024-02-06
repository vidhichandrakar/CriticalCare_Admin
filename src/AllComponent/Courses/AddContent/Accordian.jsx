import { Box } from "@mui/material";
import React from "react";
import "./Accordian.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Accordian=()=> {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Show Detail Button</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="completeCouponInfo">
              <div className="couponInfoHeading">
                <h5>Coupon Information</h5>
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
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography>Accordion 2</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion> */}
    </div>
  );
}

export default Accordian;
