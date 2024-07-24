import { Box, Button, Typography, Divider } from "@mui/material";
import React, { useState } from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
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
  selectedTypeNId,
}) {
  const [selectedValue, setSelectedValue] = useState("a");
  let count = 1;
  const handleClickOpenCQ = () => {
    setCqopen(true);
  };

  const handleClickOpenA = (e, item, index) => {
    const editedQns = item.filter((itm, insideIndex) => insideIndex === index);
    handleClickOpen(editedQns[0], index);
    let editedOptions = editedQns[0];
    localStorage.setItem("editedOptions", JSON.stringify(editedOptions));
  };

  return (
    <div className="MainQnsBox">
      <div className="BoxHead">
        <Typography>
          <b>abcd - 1Questions</b>
        </Typography>
        <Button sx={{ textTransform: "none" }} onClick={handleClickOpen}>
          <EditIcon sx={{ fontSize: "1.1rem", mr: "4px" }} />
          <b>Edit Details</b>
          <KeyboardArrowUpIcon sx={{ ml: "14px", mb: "5px" }} />
        </Button>
      </div>
      {/* {console.log("selectedTypeNId",selectedTypeNId)} */}
      <div className="MarksBox">
        <StarBorderOutlinedIcon className="starIconss" />
        <Typography>Max. Section Marks: 4.00</Typography>
      </div>
      {opencreaterqns || numberOfMcqQns?.length ? (
        <Box>
          {numberOfMcqQns?.map((item, indexSeq) => (
            // let count = 0
            <div className="QnsBoxs">
              <div className="MCQBox" key={indexSeq}>
                {item.test_questions.map((questionTest, index) => {
                  return (
                    <>
                      <Typography sx={{ color: "rgba(0, 0, 0, 0.685)" }}>
                        {count++}. {questionTest.question_text}
                      </Typography>
                      {questionTest.question_type === "single-select" ? (
                        <>
                          <RadioGroup
                            name="radio-buttons-group"
                          >
                            {questionTest.question_options.map((option) => {
                              return (
                                <div className="addingDeleteOptions mt1">
                                  <Radio
                                    checked={option.is_correct}
                                    className="toDefaultPointer"
                                    value={option.option_id}
                                    name="radio-buttons"
                                    inputProps={{ "aria-label": "A" }}
                                  />
                                  <Typography>{option.option_text}</Typography>
                                </div>
                              );
                            })}
                          </RadioGroup>
                        </>
                      ) : (
                        <div>
                          <>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              // defaultValue="female"
                              name="radio-buttons-group"
                            >
                              {questionTest.question_options.map((option) => {
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
                              })}
                            </RadioGroup>
                          </>
                        </div>
                      )}

                      <Typography
                        className="noBox"
                        style={{ marginTop: "1%", marginLeft: "1%" }}
                      >
                        {"+" + item.marks_per_question}
                      </Typography>
                      <div className="AllBtnBox">
                        <Box
                          className="mr123 curseorpointer"
                          onClick={(e) =>
                            handleClickOpenA(e, item.test_questions, index)
                          }
                        >
                          <EditIcon />
                          <Typography>Edit</Typography>
                        </Box>
                        <Box className="curseorpointer">
                          <ContentCopyIcon />
                          <Typography>Copy</Typography>
                        </Box>
                        <Box className="curseorpointer">
                          <TextIncreaseRoundedIcon />{" "}
                          <Typography>Edit Marks</Typography>
                        </Box>
                        <Box className="curseorpointer">
                          <DeleteOutlineRoundedIcon />
                          <Typography>Delete</Typography>
                        </Box>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
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
