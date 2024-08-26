import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider } from "@mui/material";
import "./AllTestPortal.css";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { getTestById } from "../../../ActionFactory/apiActions";

function TestInstructions({ testData, setOpen, handleOpen }) {
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

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleAddTestInstruction = (e) => {
  //   console.log(e.target.value);
  //   setTestInstructions(e.target.value);
  // };

  return (
    <>
    <div>
      <Box className="stickyTopBox">
        <div>
          <h4 style={{fontSize: "1.5rem"}}>
            {testData?.test_name}
            <EditIcon className="blueEdit" />
          </h4>
        </div>
        {/* {console.log("testInstructions==>", testInstructions)} */}
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

        <Box className="testInstructionsBtn flexrow" sx={{mt: 3,mb:2}}>
          {/* <Box className="flexrow testInstructions"> */}
            <Typography><b>Test Instructions:</b></Typography>{" "}
            <Typography sx={{ color: "#000", ml: "4px" }}>
              {testData?.testInfoDetails?.length
                ? testData?.testInfoDetails[
                    testData?.testInfoDetails?.length - 1
                  ].test_section_Instruction
                : ""}
            </Typography>
            <span>
              <Typography
                sx={{marginLeft: "10px",
                  textTransform: "none",
                  color: "#19588f",
                  // ml: "-8px",
                  fontSize: "medium",
                  cursor: "pointer"
                }}
                onClick={handleOpen}
              >
                Click here to add{" "} 
              </Typography>

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
                    noValidate
                    // autoComplete="off"
                  >
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      onChange={(e) => handleAddTestInstruction(e)}
                      value={testInstructions}
                    />
                  </Box>
                </DialogContent>

                <DialogActions>
                  <Button
                    autoFocus
                    onClick={() => handleClose()}
                    className="doneBtnInstPage"
                  >
                    Add
                  </Button>
                </DialogActions>
              </BootstrapDialog> */}
            </span>
          {/* </Box> */}
        </Box>
      </Box>
    </div>
     
    </>
  );
}

export default TestInstructions;
