import React, { useState } from "react";
import { Box, Button, Divider } from "@mui/material";
import "./AllTestPortal.css";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";

function AddASection({ handleClickOpen }) {
  // const [selectedValue, setSelectedValue] = React.useState("a");

  // const handleChangeOption = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <div>
      <Box className="toAddNewSection">
        <img
          src="https://www.turnitin.com/assets/images/resources/intro-images/what-is-the-difference-between-assessment-and-grading.png"
          width={100}
          height={100}
          className="gradingImage"
        />
        <p className="toAddNewSectionHead">Start by adding a section</p>
        <p className="textColorLight">
          You can add & manage sections from the{" "}
          <span className="textColorBold">'Test Sections'</span>
        </p>
        <p className="textColorLight">panel on left</p>
        <Button className="addNewSection" onClick={handleClickOpen}>
          Add new section
        </Button>
      </Box>
    </div>
  );
}

export default AddASection;
