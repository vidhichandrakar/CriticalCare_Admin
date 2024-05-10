import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { Box, Button, Divider } from "@mui/material";
import TestNavAndLeft from "./TestNavAndLeft";
import "./AllTestPortal.css";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import WestIcon from "@mui/icons-material/West";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AccordionActions from "@mui/material/AccordionActions";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function TestFirstPage() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
      <div className="mainFirstPage">
        <div className="testNavBar">
          <div className="abcdText">
            <Link to="/TestPortal">
              <WestIcon className="abcdBackLogo" />
            </Link>
            <b>abcd</b>
          </div>
          <div className="previewnsaveBtn">
            <Button className="previewNavBtn">Preview</Button>
            <Button className="saveTestNavBtn">Save Test</Button>
          </div>
        </div>

        <div className="testContent">
          <div className="testLeftSection">
            <TestNavAndLeft />
          </div>

          <div className="testRightSection">
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
                  Test Duration :{" "}
                  <span className="textColorBold">3hrs30mins</span>
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
                    Test Instructions: Click here to add
                  </span>
                </p>
              </Box>
            </Box>

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

              <BootstrapDialog
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
                        <Box
                          sx={{
                            backgroundColor: "#dafdda",
                            color: "#23a28d",
                            width: "27px",
                            height: "28px",
                            ml: "5px",
                          }}
                        >
                          +4
                        </Box>
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
                        <Button
                          className="saveMCQBtn"
                          href="#contained-buttons"
                        >
                          Save
                        </Button>
                        <Button
                          variant="contained"
                          disabled
                          className="nextMCQBtn"
                        >
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
                      <p>Question</p>
                    </div>
                    <div className="twoDifficultyLvlBtns">
                      <div>
                        <p>Difficulty Level</p>
                      </div>
                      <div>
                        {/* <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                          >
                            Add difficulty level
                          </AccordionSummary>
                          <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse malesuada lacus ex, sit amet
                            blandit leo lobortis eget.
                          </AccordionDetails>
                        </Accordion> */}

                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                          <InputLabel id="demo-select-small-label">
                            Add difficulty level
                          </InputLabel>
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </div>

                  <Button className="thisIsMCQBtn">
                    This is an MCQ question
                  </Button>

                  <FormControl>
                    <div className="answersAndSingle">
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        sx={{ lineHeight: "2.5rem" }}
                      >
                        Answers
                      </FormLabel>
                      {/* <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          Single
                        </AccordionSummary>
                        <AccordionDetails>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse malesuada lacus ex, sit amet blandit
                          leo lobortis eget.
                        </AccordionDetails>
                      </Accordion> */}
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">
                          Single
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={age}
                          label="Age"
                          onChange={handleChange}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <div className="addingDeleteOptions">
                        <FormControlLabel
                          className="borderingOptions"
                          value="opOne"
                          control={<Radio />}
                          label="Option 1"
                        />
                        <div>
                          <h5>Delete</h5>
                        </div>
                      </div>
                      <div className="addingDeleteOptions">
                        <FormControlLabel
                          className="borderingOptions"
                          value="opTwo"
                          control={<Radio />}
                          label="Option 2"
                        />
                        <div>
                          <h5>Delete</h5>
                        </div>
                      </div>
                      <div className="addingDeleteOptions">
                        <FormControlLabel
                          className="borderingOptions"
                          value="opThree"
                          control={<Radio />}
                          label="Option 3"
                        />
                        <div>
                          <h5>Delete</h5>
                        </div>
                      </div>
                      <div className="addingDeleteOptions">
                        <FormControlLabel
                          className="borderingOptions"
                          value="opFour"
                          control={<Radio />}
                          label="Option 4"
                        />
                        <div>
                          <h5>Delete</h5>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>

                  <Button className="addNewOptionDotted">
                    <AddCircleOutlineIcon sx={{ marginRight: "12px" }} />
                    Add new option
                  </Button>

                  <p>Solution</p>
                  <Box sx={{ border: "0.5px solid lightgrey" }}>
                    Enter detailed solution for your students
                  </Box>
                </DialogContent>
              </BootstrapDialog>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestFirstPage;
