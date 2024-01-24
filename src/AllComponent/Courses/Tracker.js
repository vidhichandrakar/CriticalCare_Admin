import React from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
const steps = [
  'Basic Information',
  'Edit price',
  'Add Content',
];
const Tracker =({trackerPage,handleTrackerPage})=>{
  return(
   <Box className="createBoxHeader trackerBox">
   <Box className="trackerMainBox"> <Stepper activeStep={trackerPage} className="trackerStep"  alternativeLabel>
      {steps.map((label,index) => (
        <Step key={index} onClick={()=>handleTrackerPage(index)}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    </Box>
  </Box>
  )
}
export default Tracker;