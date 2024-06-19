import React, { useEffect, useState } from "react";
import TestNavAndLeft from "./TestNavAndLeft";
import TestProtalHeader from "./TestProtalHeader";
import TestFirstPage from "./TestFirstPage";
import { useLocation } from "react-router-dom";
import {
  createNumberOfQuestions,
  createTestInfo,
  getNumberOfQuestions,
  getTestById,
  getTestType,
} from "../../../ActionFactory/apiActions";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import Checkbox from "@mui/material/Checkbox";
import FlipToFrontIcon from "@mui/icons-material/FlipToFront";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsIcon from "@mui/icons-material/Settings";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import LaunchIcon from "@mui/icons-material/Launch";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { Box, Button, TextField, Typography } from "@mui/material";
import TipsAndUpdatesTwoToneIcon from "@mui/icons-material/TipsAndUpdatesTwoTone";
import Stack from "@mui/material/Stack";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function TestPortalMain() {
  let location = useLocation();
  const test_id = location.state?.id;
  const [testData, setTestData] = useState([]);
  const [mcqopened, setMcqopen] = useState(false);
  const [openqns, setOpenqns] = useState(false);
  const [opencreaterqns, setOpenreateqns] = useState(false);
  const [cqopened, setCqopen] = useState(false);
  const [testType, setTestType] = useState([]);
  const [selectedTestType, setSelectedTestType] = useState({});
  const [sectionName, setSectionName] = useState("");
  const [sectionInstruction, setSectionInstruction] = useState("");
  const [marksPerQues, setMarksPerQues] = useState("");
  const [noOfQuestion, setNoOfQuestion] = useState("");
  const [testInfoId,setTestInfoId] = useState();
  
  const [selectedValue, setSelectedValue] = useState("a");
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeOption = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleTestType = (value) => {
    setSelectedTestType(value);
  };
  const handleClickOpenCQ = () => {
    setCqopen(true);
  };
  const handleCloseDialogCQ = () => {
    setCqopen(false);
  };

  const handleCloseDialogMCQ = () => {
    setMcqopen(false);
  };
  const handleAddSection = () => {
    setOpenqns(!openqns);
    setMcqopen(false);
    const payload = {
      test_id: test_id,
      test_type_id: selectedTestType.test_type_id,
      test_section_name: sectionName,
      test_section_Instruction: sectionInstruction,
      no_of_question: 5,
      marks_per_question: 4,
    };
    if (sectionName && sectionInstruction) {
      createTestInfo({
        payload,
        callBack: (res) => {
          getTestByIdData();
          // console.log("iuhgfghij",res.data.test_info_id);
          setTestInfoId(res.data.test_info_id);
        },
      });
    }
  };
  const handleCreateQns = () => {
    setOpenreateqns(!opencreaterqns);
    setCqopen(false);
    const payload = {
      test_id: test_id,
      test_type_id: selectedTestType.test_type_id,
      test_section_name: sectionName,
      test_section_Instruction: sectionInstruction,
      no_of_question: noOfQuestion,
      marks_per_question: marksPerQues,
    };
    {console.log("testInfoIdtestInfoId",testInfoId)}
    if (noOfQuestion && marksPerQues) {
      createTestInfo({
        id: testInfoId,
        payload,
        callBack: (res) => {
          console.log(res);
          getTestByIdData();
          const count = noOfQuestion;
      
        const divArray = Array.from({ length: count });
        let arr =[];
        divArray.map((item)=>{
          arr.push( {
            "question_text": "What is the normal range of adult human body temperature?",
            "question_type": "single-select",
            "options": [
              { "option_text": "35.5 - 36.5 °C", "is_correct": false },
              { "option_text": "36.1 - 37.2 °C", "is_correct": false },
              { "option_text": "37.5 - 38.5 °C", "is_correct": true },
              { "option_text": "38.0 - 39.0 °C", "is_correct": false }
            ]
          })
        })
          const loadPay = {
            test_id: test_id,
            questions:arr
          }
          createNumberOfQuestions({
            payload: loadPay,
            callBack:(res)=>{
              console.log("number questions",res);
            }
          })
        },
      });
    }
  };
  const getTestByIdData = () => {
    getTestById({
      test_id: test_id,
      callBack: (response) => {
        setTestData(response?.data[0]);
        console.log(
          "response?.dataresponse?.data line no 153",
          response?.data[0]
        );
        console.log("testData line no 153", testData);
        // console.log("testData.no of question line no 153", testData?.testInfoDetails[0]?.no_of_question)
      },
    });
  };
  useEffect(() => {
    getTestByIdData();
    getTestType({
      callBack: (response) => {
        console.log("data", response);
        setTestType(response?.data);
      },
    });
  }, [test_id]);
  const handleSectionInfo = (value, type) => {
    if (type === "sectionName") {
      setSectionName(value);
    } else if (type === "sectionInstruction") {
      setSectionInstruction(value);
    } else if (type === "noOfQuestion") {
      setNoOfQuestion(value);
    } else if (type === "marksPerQues") {
      setMarksPerQues(value);
    }
  };
  return (
    <div className="grid-container-TestPortal ">
      <TestProtalHeader testData={testData} />
      {console.log("test type", selectedTestType)}
      <TestNavAndLeft
        setMcqopen={setMcqopen}
        testType={testType}
        handleTestType={handleTestType}
      />
      <TestFirstPage
        testData={testData}
        openqns={openqns}
        setCqopen={setCqopen}
        opencreaterqns={opencreaterqns}
        handleClickOpen={handleClickOpen}
        noOfQuestion={noOfQuestion}
      />

      <BootstrapDialog
        className="PopUP"
        onClose={handleCloseDialogMCQ}
        aria-labelledby="customized-dialog-title"
        open={mcqopened}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "1rem" }}
          id="customized-dialog-title"
        >
          Add New Section
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialogMCQ}
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
            <b>Section Name</b>
          </Typography>
          <TextField
            inputProps={{ className: "textField" }}
            fullWidth
            size="small"
            placeholder="Enter the Section Name"
            id="fullWidth"
            className="BoxShadowInputField"
            type="TestName"
            onChange={(event) =>
              handleSectionInfo(event.target.value, "sectionName")
            }
          />
          <Typography gutterBottom sx={{ mt: 3 }}>
            <b>Section Instructions</b>
          </Typography>
          <TextField
            id="fullWidth"
            multiline
            rows={3}
            sx={{ width: "100%" }}
            onChange={(event) =>
              handleSectionInfo(event.target.value, "sectionInstruction")
            }
          />
          <Box className="BulbBox">
            <TipsAndUpdatesTwoToneIcon className="bulbIcon" />
            <Typography>
              You can give students choice of which questions to Attempt in the
              section by editing section details after Adding Questions.{" "}
              <a href="#" style={{ textDecoration: "none" }}>
                View Example
              </a>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="AddSectionBtn"
            onClick={handleAddSection}
          >
            Add Section
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <BootstrapDialog
        className="PopUP"
        onClose={handleCloseDialogCQ}
        aria-labelledby="customized-dialog-title"
        open={cqopened}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "1rem" }}
          id="customized-dialog-title"
        ></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialogCQ}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            borderBottom: "2px solid #eee",
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers sx={{ mt: "26px" }}>
          <Box className="NumberBOx">
            <Box>
              <Typography>
                <b>No. of questions</b>
              </Typography>
              <TextField
                id="outlined-size-small"
                defaultValue="1"
                size="small"
                onChange={(event) =>
                  handleSectionInfo(event.target.value, "noOfQuestion")
                }
              />
            </Box>
            <Box>
              <Typography>
                <b>Marks per question</b>
              </Typography>
              <TextField
                id="outlined-size-small"
                defaultValue="4"
                size="small"
                onChange={(event) =>
                  handleSectionInfo(event.target.value, "marksPerQues")
                }
              />
            </Box>
          </Box>

          <Box className="CheckBOx">
            <Checkbox {...label} />
            <Typography>Negative Marks</Typography>
          </Box>

          <Box className="PartialBOx">
            <Typography>
              Partial Marking <span className="red">New</span>
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Off</Typography>
              <AntSwitch
                defaultChecked
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>On</Typography>
            </Stack>
          </Box>

          <Box className="BulbBox">
            <Typography>
              Now give mark to your students even if they are partially correct!
            </Typography>
            <a href="#" style={{ textDecoration: "none", color: "#0075FF" }}>
              <b>View Example</b>
            </a>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="AddSectionBtn"
            onClick={handleCreateQns}
          >
            Create Questions
          </Button>
        </DialogActions>
      </BootstrapDialog>
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
        </BootstrapDialog>
    </div>
  );
}

export default TestPortalMain;
