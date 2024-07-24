import React, { useState } from "react";
import { Box, Button, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
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
  typesOfQns,
  selectedTypeNId,
  // setTestInstructions,
  handleOpen
}) {

  // const [testInstructions, setTestInstructions] = useState("");
  // const [open, setOpen] = useState(false);


  // const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  //   "& .MuiDialogContent-root": {
  //     padding: theme.spacing(2),
  //   },
  //   "& .MuiDialogActions-root": {
  //     padding: theme.spacing(1),
  //   },
  // }));

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleAddTestInstruction = (value) => {
  //   // console.log(value);
  //   let instruct = value
  //   console.log(instruct);
  //   setTestInstructions(instruct);
  // };
  return (
    <div className="testRightSection">
      <TestInstructions
        testData={testData}
        // setOpen={setOpen}
        handleOpen={handleOpen}
      />
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
          selectedTypeNId={selectedTypeNId}
        />
      ) : numberOfMcqQns === 0 ? (
        <AddASection handleClickOpen={handleClickOpen} />
      ) : null}

      {/* <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, alignItems: "center", textAlign: "center" }}
          id="customized-dialog-title"
        >
          Test Instructions
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <Typography gutterBottom>
            <b>Test Instructions</b>
          </Typography>
          <Box
            className="testInstTextField"
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            // noValidate
            // autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => handleAddTestInstruction(e.target.value)}
              value={testInstructions}
            />
          </Box>
          
        </DialogContent>

        <DialogActions>
          <Button
           
            onClick={handleClose}
            className="doneBtnInstPage"
          >
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog> */}
    </div>
  );
}

export default TestFirstPage;
