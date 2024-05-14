import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider } from "@mui/material";
import "./AllTestPortal.css";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

function TestInstructions() {
  const [instructions, setInstructions] = React.useState(false);
  const handleClickInstruction = () => {
    setInstructions(true);
  };
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box className="stickyTopBox">
        <div>
          <h4>
            Test Details
            <EditIcon className="blueEdit" />
          </h4>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          {" "}
          <AccessTimeIcon className="testDurationLogo" />
          <Typography style={{ color: "rgb(146 130 130)" }}>
            Test Duration : <span className="textColorBold">3hrs30mins</span>
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
            <span style={{ color: "#000" }}>Test Instructions: </span>
            <span>
              <Button
                onClick={handleClickOpen}
              >
                Click here to add{" "}
              </Button>

              <BootstrapDialog
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
                    autoComplete="off"
                  >
                    <TextField id="outlined-basic" variant="outlined" />
                  </Box>
                </DialogContent>

                <DialogActions>
                  <Button
                    autoFocus
                    onClick={handleClose}
                    className="doneBtnInstPage"
                  >
                    Done
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            </span>
          </p>
        </Box>
      </Box>
    </div>
  );
}

export default TestInstructions;
