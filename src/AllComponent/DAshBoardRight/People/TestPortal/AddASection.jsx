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

function AddASection({handleClickOpen}) {
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

        {/* <BootstrapDialog
          className="completeDailogBox"
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <div className="multipleChoiceHeader">
              <div className="multipleChoiceAndMarks">
                <span>
                  <b>1. </b> Multiple Choice{" "}
                </span>
                <span>
                  <Box className="plusFourGreenBG">+4</Box>
                </span>
              </div>

              <div className="mcqbuttons">
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    disabled
                    className="previousMCQBtn"
                  >
                    Previous
                  </Button>
                  <Button className="saveMCQBtn" href="#contained-buttons">
                    Save
                  </Button>
                  <Button variant="contained" disabled className="nextMCQBtn">
                    Next
                  </Button>
                </Stack>
              </div>
            </div>
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
            <div className="addDifficultyLvlSection">
              <div>
                <p>
                  <b>Question</b>
                </p>
              </div>
              <div className="twoDifficultyLvlBtns">
                <div>
                  <p>Difficulty Level</p>
                </div>
                <div>
                  <label for="difficulty"></label>
                  <select
                    name="Add difficulty level"
                    id="Add difficulty level"
                    className="addDiffLevelDropDown"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="c++" disabled>
                      C++
                    </option>
                    <option value="java" selected>
                      Add difficulty level
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <TextField
              className="thisIsMCQBtn"
              id="outlined-helperText"
              defaultValue="This is an MCQ question"
            />
            

            <FormControl>
              <div className="answersAndSingle">
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={{ lineHeight: "2.5rem" }}
                >
                  <b>Answers</b>
                </FormLabel>

                <select
                  name="Add difficulty level"
                  id="Add difficulty level"
                  className="singleDropDown"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="c++" disabled>
                    C++
                  </option>
                  <option value="java" selected>
                    Single
                  </option>
                </select>
              </div>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <div className="addingDeleteOptions">
                  <Radio
                    checked={selectedValue === "a"}
                    onChange={handleChangeOption}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <TextField
                    className="optionsFeid"
                    id="outlined-helperText"
                    defaultValue="Option 1"
                  />

                  <div className="deleteComponent">
                    <h5>
                      <DeleteIcon className="deleteIconSixthPage" />
                      Delete
                    </h5>
                  </div>
                </div>

                <div className="addingDeleteOptions">
                  <Radio
                    checked={selectedValue === "b"}
                    onChange={handleChangeOption}
                    value="b"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <TextField
                    className="optionsFeid"
                    id="outlined-helperText"
                    defaultValue="Option 2"
                  />
                  <div>
                    <h5>
                      <DeleteIcon className="deleteIconSixthPage" />
                      Delete
                    </h5>
                  </div>
                </div>

                <div className="addingDeleteOptions">
                  <Radio
                    checked={selectedValue === "c"}
                    onChange={handleChangeOption}
                    value="c"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <TextField
                    className="optionsFeid"
                    id="outlined-helperText"
                    defaultValue="Option 3"
                  />
                  <div>
                    <h5>
                      <DeleteIcon className="deleteIconSixthPage" />
                      Delete
                    </h5>
                  </div>
                </div>

                <div className="addingDeleteOptions">
                  <Radio
                    checked={selectedValue === "d"}
                    onChange={handleChangeOption}
                    value="d"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <TextField
                    className="optionsFeid"
                    id="outlined-helperText"
                    defaultValue="Option 4"
                  />
                  <div>
                    <h5>
                      <DeleteIcon className="deleteIconSixthPage" />
                      Delete
                    </h5>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>

            <Button className="addNewOptionDotted">
              <AddCircleOutlineIcon sx={{ marginRight: "12px" }} />
              Add new option
            </Button>

            <p>Solution</p>
            <TextField
              className="thisIsMCQBtn"
              id="outlined-helperText"
              defaultValue="Enter detailed solution for your students"
            />
          </DialogContent>
        </BootstrapDialog> */}
      </Box>
    </div>
  );
}

export default AddASection;
