import React, {useState} from "react";
import { Box, Button, Divider } from "@mui/material";
import "./AllTestPortal.css";
import AddASection from "./AddASection";
import TestInstructions from "./TestInstructions";


function TestFirstPage() {

  return (
         <div className="testRightSection">

            <TestInstructions/>
            <AddASection/>
          </div>
        
  );
}

export default TestFirstPage;
