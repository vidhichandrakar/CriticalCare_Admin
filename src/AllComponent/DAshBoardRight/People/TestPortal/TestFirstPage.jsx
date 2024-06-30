import React, { useState } from "react";
import { Box, Button, Divider } from "@mui/material";
import "./AllTestPortal.css";
import AddASection from "./AddASection";
import TestInstructions from "./TestInstructions";
import CreateQNS from "./CreateQNS";

function TestFirstPage({
  testData,
  openqns,
  setCqopen,
  opencreaterqns,
  handleClickOpen,
  noOfQuestion,
  numberOfMcqQns,
  setNumberOfMcqQns,
}) {
  return (
    <div className="testRightSection">
      <TestInstructions testData={testData} />
      {openqns ? (
        <CreateQNS
          setCqopen={setCqopen}
          opencreaterqns={opencreaterqns}
          testData={testData}
          handleClickOpen={handleClickOpen}
          numberOfMcqQns={numberOfMcqQns}
          setNumberOfMcqQns={setNumberOfMcqQns}
        />
      ) : (
        <AddASection handleClickOpen={handleClickOpen} />
      )}
    </div>
  );
}

export default TestFirstPage;
