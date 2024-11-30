import { Box, Button, Typography, Divider } from "@mui/material";
import React, { useState } from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TextIncreaseRoundedIcon from "@mui/icons-material/TextIncreaseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Popover from "@mui/material/Popover";
// import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const label = { inputProps: { "aria-label": "Checkbox demo" } };

function CreateQNS({
  setCqopen,
  opencreaterqns,
  handleClickOpen,
  numberOfMcqQns,
  addNewSectionNav,
  testType,
  setSelectedTypeNId,
  handleTestType,
  setMcqopen,
  setTestInfoId,
}) {
  const [selectedValue, setSelectedValue] = useState("a");
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  let count = 1;

  const handleClickOpenCQ = () => {
    setCqopen(true);
  };

  const handleClick = (event, testInfoId) => {
    setAnchorEl(event.currentTarget);
    setTestInfoId(testInfoId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const ids = open ? "simple-popover" : undefined;
  const handleClickOpenA = (e, item, index, pagee) => {
    const editedQns = item.filter((itm, insideIndex) => insideIndex === index);
    handleClickOpen(editedQns[0], index);
    let editedOptions = editedQns[0];
    localStorage.setItem("editedOptions", JSON.stringify(editedOptions));
  };

  const handleClickOpenMCQ = (type) => {
    const testTypeNId = testType.filter((item) => item.test_type_name === type);
    setSelectedTypeNId({
      test_type_id: testTypeNId[0].test_type_id,
      test_type_name: testTypeNId[0].test_type_name,
    });

    let condition = numberOfMcqQns[numberOfMcqQns?.length - 1];
    if (condition?.test_questions?.length !== 0) {
      setCqopen(true);
    } else {
      const selectedOption = testType.filter(
        (test) => test.test_type_name === type
      );
      handleTestType(selectedOption[0]);
      setMcqopen(true);
    }
  };

  return (
    <div className="MainQnsBox">
      {opencreaterqns || numberOfMcqQns?.length !== 0 ? (
        <Box>
          {numberOfMcqQns?.map((item, indexSeq) => (
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div className="BoxHead">
                    <Typography sx={{ fontSize: "1.5rem" }}>
                      <b>{item.test_section_name}</b>
                    </Typography>
                    <Button
                      sx={{ textTransform: "none" }}
                      // onClick={handleClickOpen}
                    >
                      <EditIcon sx={{ fontSize: "1.1rem", mr: "4px" }} />
                      <b>Edit Details</b>
                      {/* <KeyboardArrowUpIcon sx={{ ml: "14px", mb: "5px" }} /> */}
                    </Button>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="accordianHighlight">
                  <div className="MarksBox">
                    <StarIcon className="starIconss" />
                    <Typography>
                      Marks Per Questions {item.marks_per_question}
                    </Typography>
                  </div>
                  {item?.test_questions.length !== 0 ? (
                    item.test_questions.map((questionTest, index) => {
                      return (
                        <>
                          <div className="QnsBoxs">
                            <div className="MCQBox" key={indexSeq}>
                              <Typography
                                sx={{ color: "rgba(0, 0, 0, 0.685)" }}
                              >
                                {index + 1}. {questionTest.question_text}
                              </Typography>
                              {questionTest.question_type ===
                              "single-select" ? (
                                <>
                                  <RadioGroup name="radio-buttons-group">
                                    {questionTest.question_options.map(
                                      (option) => {
                                        return (
                                          <div className="addingDeleteOptions mt1">
                                            <Radio
                                              checked={option.is_correct}
                                              className="toDefaultPointer"
                                              value={option.option_id}
                                              name="radio-buttons"
                                              inputProps={{ "aria-label": "A" }}
                                            />
                                            <Typography>
                                              {option.option_text}
                                            </Typography>
                                          </div>
                                        );
                                      }
                                    )}
                                  </RadioGroup>
                                </>
                              ) : (
                                <div>
                                  <>
                                    <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      name="radio-buttons-group"
                                    >
                                      {questionTest.question_options.map(
                                        (option) => {
                                          return (
                                            <div className="addingDeleteOptions mt1">
                                              <Checkbox
                                                checked={option.is_correct}
                                                {...label}
                                              />
                                              <Typography>
                                                {option.option_text}
                                              </Typography>
                                            </div>
                                          );
                                        }
                                      )}
                                    </RadioGroup>
                                  </>
                                </div>
                              )}
                              {/* <Typography
                                className="noBox"
                                style={{ marginTop: "1%", marginLeft: "1%" }}
                              >
                                {"+" + item.marks_per_question}
                              </Typography> */}
                              <div className="AllBtnBox">
                                <Box
                                  className="mr123 curseorpointer"
                                  onClick={(e) =>
                                    handleClickOpenA(
                                      e,
                                      item.test_questions,
                                      index,
                                      count
                                    )
                                  }
                                  key={count}
                                  id={count}
                                  sx
                                >
                                  <EditIcon sx={{ color: "#5d5a5ae3" }} />
                                  <Typography sx={{ ml: "8px" }}>
                                    Edit
                                  </Typography>
                                </Box>
                                <Box
                                  className="curseorpointer"
                                  sx={{ marginLeft: "100px" }}
                                >
                                  <ContentCopyIcon
                                    sx={{ color: "#5d5a5ae3" }}
                                  />
                                  <Typography sx={{ ml: "8px" }}>
                                    Copy
                                  </Typography>
                                </Box>
                                <Box className="curseorpointer">
                                  <TextIncreaseRoundedIcon
                                    sx={{ color: "#5d5a5ae3" }}
                                  />{" "}
                                  <Typography sx={{ ml: "8px" }}>
                                    Edit Marks
                                  </Typography>
                                </Box>
                                <Box className="curseorpointer">
                                  <DeleteOutlineRoundedIcon
                                    sx={{ color: "#5d5a5ae3" }}
                                  />
                                  <Typography sx={{ ml: "8px" }}>
                                    Delete
                                  </Typography>
                                </Box>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <div className="CReateBox">
                      <img
                        style={{ marginTop: "2%" }}
                        src="https://cms.classplusapp.com/static/media/questionMark.fb6054ee.svg"
                        width={100}
                        height={100}
                        className="gradingImage"
                      />
                      <Typography className="headofbox">
                        Let's add questions
                      </Typography>
                      <Typography className="paraofbox">
                        You can use the{" "}
                        <span style={{ color: "#1a1a1ae3" }}>
                          'Create Questions'
                        </span>{" "}
                        &{" "}
                        <span style={{ color: "#1a1a1ae3" }}>
                          'Import Questions'
                        </span>{" "}
                        Panel on left to add questions to a section
                      </Typography>
                      <Box className="CreateBtnBox">
                        <Typography
                          className="btnqns"
                          onClick={(e) => handleClick(e, item.test_info_id)}
                        >
                          {" "}
                          Create Question
                        </Typography>
                        <Popover
                          sx={{ m: -7, mt: 0.7 }}
                          id={ids}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                        >
                          {/* <Box sx={{ p: 1, mt: -1, mr: 5 ,display: "flex" }}> */}

                          <Typography
                            className="testOptions"
                            onClick={() =>
                              handleClickOpenMCQ("Multiple Choice")
                            }
                          >
                            <b>Multiple Choice Questions</b>
                          </Typography>
                          <Divider />
                          <Typography
                            className="testOptions"
                            // onClick={() => handleClickOpenMCQ("True/False")}
                          >
                            <b>True/False Questions</b>
                          </Typography>
                          <Divider />
                          <Typography
                            className="testOptions"
                            // onClick={() => handleClickOpenMCQ("Comprehensive")}
                          >
                            <b>Comprehension Questions</b>
                          </Typography>
                          <Divider />
                          <Typography
                            className="testOptions"
                            // onClick={() => handleClickOpenMCQ("Fill in the blanks")}
                          >
                            <b>Fill in the Blanks Questions</b>
                          </Typography>
                          <Divider />
                          <Typography className="testOptions">
                            <b>Integer Type Questions</b>
                          </Typography>
                        </Popover>
                        <Typography
                          style={{
                            color: "rgba(71, 71, 71, 0.685)",
                            fontSize: "0.9rem",
                          }}
                        >
                          OR
                        </Typography>
                        <Typography className="btnqns">
                          Import Questions
                        </Typography>
                      </Box>
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>
            </>
          ))}
        </Box>
      ) : (
        <div className="CReateBox">
          <img
            style={{ marginTop: "2%" }}
            src="https://cms.classplusapp.com/static/media/questionMark.fb6054ee.svg"
            width={100}
            height={100}
            className="gradingImage"
          />
          <Typography className="headofbox">Let's add questions</Typography>
          <Typography className="paraofbox">
            You can use the{" "}
            <span style={{ color: "#1a1a1ae3" }}>'Create Questions'</span> &{" "}
            <span style={{ color: "#1a1a1ae3" }}>'Import Questions'</span> Panel
            on left to add questions to a section
          </Typography>
          <Box className="CreateBtnBox">
            <Typography className="btnqns" onClick={handleClickOpenCQ}>
              {" "}
              Create Question
            </Typography>
            <Typography
              style={{ color: "rgba(71, 71, 71, 0.685)", fontSize: "0.9rem" }}
            >
              OR
            </Typography>
            <Typography className="btnqns">Import Questions</Typography>
          </Box>
        </div>
      )}
    </div>
  );
}

export default CreateQNS;
