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

function TestInstructions({ testData, setOpenInstruction }) {
  const [instructions, setInstructions] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickClose = () => {
    setInstructions(false);
  };
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleChange=(event)=>{
  //   setInstructionsString(event.target.value)
  // }
  return (
    <>
    <div>
      <Box className="stickyTopBox">
        <div>
          <h4>
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

        <Box className="testInstructionsBtn">
          <p>
            <b>Test Instructions:</b>{" "}
            <span style={{ color: "#000" }}>
              {testData?.testInfoDetails?.length
                ? testData?.testInfoDetails[
                    testData?.testInfoDetails?.length - 1
                  ].test_section_Instruction
                :""}
            </span>
            <span>
              <Button
                sx={{
                  textTransform: "none",
                  color: "black",
                  ml: "-8px",
                  fontSize: "medium",
                }}
                onClick={()=>setOpenInstruction(true)}
              >
                Click here to add{" "}
              </Button>

            
            </span>
          </p>
        </Box>
      </Box>
    </div>
     
    </>
  );
}

export default TestInstructions;
