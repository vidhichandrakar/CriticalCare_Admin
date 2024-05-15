import React, {useState} from "react";
import { Box, Button, Divider } from "@mui/material";
import "./AllTestPortal.css";
import AddASection from "./AddASection";
import TestInstructions from "./TestInstructions";
import CreateQNS from "./CreateQNS";


function TestFirstPage() {

  return (
         <div className="testRightSection">

            <TestInstructions/>
            <AddASection/>
            {/* <CreateQNS /> */}
          </div>
        
  );
}

export default TestFirstPage;
