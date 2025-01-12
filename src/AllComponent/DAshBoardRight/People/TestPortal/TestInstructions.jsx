import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider } from "@mui/material";
import "./AllTestPortal.css";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { tripmHtmlTagsToNormalFormatinside } from "../../../../Util/CommonHtmlTagsToTextConvertor";

function TestInstructions({ testData, setOpen, handleOpen }) {
  return (
    <>
      <div>
        <Box className="stickyTopBox">
          <div>
            <h4 style={{ fontSize: "1.5rem" }}>
              {testData?.test_name}
              <EditIcon className="blueEdit" />
            </h4>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {" "}
            <AccessTimeIcon className="testDurationLogo" />
            <Typography style={{ color: "rgb(146 130 130)" }}>
              Test Duration :{" "}
              <span className="textColorBold">
                {`${testData?.duration_hour}Hours ${testData?.duration_minute}Mins`}
              </span>
            </Typography>
            <LocalOfferIcon
              className="testDurationLogo"
              style={{ marginLeft: "2%" }}
            />
            <Typography style={{ color: "rgb(146 130 130)" }}>
              Tags :<span className="textColorBold"> TEST MODULE X</span>
            </Typography>
          </div>

          <Box className="testInstructionsBtn " sx={{ mt: 3, mb: 2 }}>
            {/* <Box className="flexrow testInstructions"> */}
            <Typography>
              <b>Test Instructions:</b>
            </Typography>
            <Typography sx={{ color: "#000", ml: "4px" }}>
              {tripmHtmlTagsToNormalFormatinside(testData?.testInfoDetails?.length
                ? testData?.testInfoDetails[
                    testData?.testInfoDetails?.length - 1
                  ].test_section_Instruction
                : "")}
            </Typography>
            <span>
              <Typography
                sx={{
                  // marginLeft: "10px",
                  textTransform: "none",
                  color: "#19588f",
                  // ml: "-8px",
                  fontSize: "medium",
                  cursor: "pointer",
                }}
                onClick={handleOpen}
              >
                Click here to add
              </Typography>
            </span>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default TestInstructions;
