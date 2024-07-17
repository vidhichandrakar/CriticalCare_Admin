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
  setQuestionId,
  setResetSelectedOptns,
  typesOfQns
}) {
  return (
    <div className="testRightSection">
      <TestInstructions testData={testData} />
      {numberOfMcqQns?.length !== 0 ? (
        <CreateQNS
          setCqopen={setCqopen}
          opencreaterqns={opencreaterqns}
          testData={testData}
          handleClickOpen={handleClickOpen}
          numberOfMcqQns={numberOfMcqQns}
          setNumberOfMcqQns={setNumberOfMcqQns}
          setResetSelectedOptns={setResetSelectedOptns}
          typesOfQns={typesOfQns}
        />
      ) : numberOfMcqQns === 0 ? (
        <AddASection handleClickOpen={handleClickOpen} />
      ) : null}
    </div>
  );
}

export default TestFirstPage;
