import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const Tracker = ({
  trackerPage,
  handleTrackerPage,
  hideTrackerForEditFlow,
  courseId,
}) => {
  const steps = ["Basic Information", "Edit price", "Add Content"];
  const stepForEditFlow = ["Basic Information", "Edit price"];
  const stepForEditAddContent = ["Add Content"];

  return (
    <Box className="createBoxHeader trackerBox">
      {hideTrackerForEditFlow &&
      localStorage.getItem("addContent") === "true" ? (
        <>
          <Box className="trackerMainBox">
            {" "}
            <Stepper
              activeStep={trackerPage}
              className="trackerStep"
              alternativeLabel
            >
              {stepForEditAddContent.map((label, index) => (
                <Step key={index} onClick={() => handleTrackerPage(index)}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </>
      ) : !hideTrackerForEditFlow ? (
        <>
          <Box className="trackerMainBox">
            <Stepper
              activeStep={trackerPage}
              className="trackerStep"
              alternativeLabel
            >
              {steps.map((label, index) => (
                <Step key={index} onClick={() => handleTrackerPage(index)}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </>
      ) : (
        <>
          <Box className="trackerMainBox">
            <Stepper
              activeStep={trackerPage}
              className="trackerStep"
              alternativeLabel
            >
              {stepForEditFlow.map((label, index) => (
                <Step key={index} onClick={() => handleTrackerPage(index)}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </>
      )}
    </Box>
  );
};
export default Tracker;
