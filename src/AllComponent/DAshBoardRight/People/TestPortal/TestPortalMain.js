import React, { useEffect, useState } from "react";
import TestNavAndLeft from "./TestNavAndLeft";
import TestProtalHeader from "./TestProtalHeader";
import TestFirstPage from "./TestFirstPage";
import { useLocation } from "react-router-dom";
import {
  createNumberOfQuestions,
  createTestInfo,
  editQuestions,
  getTestById,
  getTestType,
} from "../../../ActionFactory/apiActions";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
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
import LoaderComponent from "../../../../Util/LoaderComponent";
import CustomTextEditor from "../../../../Util/CustomTextEditor";
import ReactQuill from "react-quill";
import EditIcon from "@mui/icons-material/Edit";
import { tripmHtmlTagsToNormalFormatinside } from "../../../../Util/CommonHtmlTagsToTextConvertor";

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
  const [testInfoId, setTestInfoId] = useState();
  const [numberOfMcqQns, setNumberOfMcqQns] = useState();
  const [loaderState, setLoaderState] = useState(false);
  const [open, setOpen] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState();
  const [openAddOptions, setAddOptions] = useState(false);
  const [openeditoptions, setOpeneditoptions] = useState(false);
  const [addOptionText, setAddOptionText] = useState("");
  const [typesOfQns, setTypesOfQns] = useState("");
  const [selectedTypeQns, setSelectedTypeQns] = useState("single-select");
  const [openInstruction, setOpenInstruction] = useState(false);
  const [instructionsString, setInstructionsString] = useState("");
  const [testInstructions, setTestInstructions] = useState("");
  const [selectedTypeNId, setSelectedTypeNId] = useState();
  const [addNewSectionNav, setAddNewSectionNav] = useState();
  const [content, setContent] = useState("");
  const [editpopup, setEditpopup] = useState("")

  const handleClickOpen = (editedQns, index) => {
    setEditedQuestion(editedQns);
    setTypesOfQns(editedQns.question_type);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeOption = (e, option_id, question_id) => {
    if (typesOfQns === "single-select") {
      let selectedOption = Object.assign({}, editedQuestion);
      if (selectedOption?.question_id === question_id) {
        selectedOption?.question_options.map((option) => {
          if (option?.option_id === option_id) {
            option.is_correct = e.target.checked;
          } else {
            option.is_correct = false;
          }
        });
      }
      setEditedQuestion(selectedOption);
    } else {
      let selectedOption = Object.assign({}, editedQuestion);
      if (selectedOption?.question_id === question_id) {
        selectedOption?.question_options.map((option) => {
          if (option?.option_id === option_id) {
            option.is_correct = e.target.checked;
          }
        });
      }
      setEditedQuestion(selectedOption);
    }
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
    if (addNewSectionNav === "addNewSectionNav") {
      setMcqopen(false);
      const payload = {
        test_id: test_id,
        test_type_id: selectedTestType.test_type_id,
        test_section_name: sectionName,
        test_section_Instruction: sectionInstruction,
        no_of_question: 5,
        marks_per_question: 4,
      };
      createTestInfo({
        payload,
        callBack: (res) => {
          getTestByIdData();
          setTestInfoId(res.data.test_info_id);
        },
      });
    } else {
      setOpenqns(!openqns);
      setCqopen(true);
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
            setTestInfoId(res.data.test_info_id);
          },
        });
      }
    }
  };

  useEffect(() => {
    getTestByIdData();
    getTestType({
      callBack: (response) => {
        setTestType(response?.data);
      },
    });
  }, [test_id]);

  const handleCreateQns = () => {
    setOpenreateqns(!opencreaterqns);
    setCqopen(false);

    const payload = {
      test_id: test_id,
      test_type_id: selectedTypeNId?.test_type_id,
      test_type_name: selectedTypeNId?.test_type_name,
      test_section_name: numberOfMcqQns[numberOfMcqQns?.length - 1]
        ?.test_section_name
        ? numberOfMcqQns[numberOfMcqQns?.length - 1]?.test_section_name
        : sectionName,
      test_section_Instruction: numberOfMcqQns[numberOfMcqQns.length - 1]
        ?.test_section_Instruction
        ? numberOfMcqQns[numberOfMcqQns.length - 1]?.test_section_Instruction
        : sectionInstruction,
      no_of_question: parseInt(noOfQuestion),
      marks_per_question: parseInt(marksPerQues),
    };

    if (noOfQuestion && marksPerQues) {
      createTestInfo({
        id: testInfoId,
        payload,
        callBack: (res) => {
          const count = noOfQuestion;

          const divArray = Array.from({ length: count });
          let arr = [];
          divArray.map((item) => {
            if (selectedTypeNId?.test_type_name === "Multiple Choice") {
              arr.push({
                question_text:
                  "What is the normal range of adult human body temperature?",
                question_type: "single-select",
                options: [
                  { option_text: "35.5 - 36.5 °C", is_correct: false },
                  { option_text: "36.1 - 37.2 °C", is_correct: false },
                  { option_text: "37.5 - 38.5 °C", is_correct: true },
                  { option_text: "38.0 - 39.0 °C", is_correct: false },
                ],
              });
            } else if (selectedTypeNId?.test_type_name === "True/False") {
              arr.push({
                question_text:
                  "What is the normal range of adult human body temperature?",
                question_type: "single-select",
                options: [
                  { option_text: "True", is_correct: true },
                  { option_text: "False", is_correct: false },
                ],
              });
            } else if (
              selectedTypeNId?.test_type_name === "Fill in the blanks"
            ) {
              arr.push({
                question_text:
                  "Our nation bird is ______. Who is very beautifull",
                question_type: "single-select",
                options: [
                  { option_text: "Peacock", is_correct: true },
                  { option_text: "Sparrow", is_correct: false },
                  { option_text: "Parrot", is_correct: false },
                  { option_text: "Crow", is_correct: false },
                ],
              });
            }
          });
          const loadPay = {
            test_info_id: testInfoId,
            questions: arr,
          };
          setLoaderState(true);
          createNumberOfQuestions({
            payload: loadPay,
            callBack: (res) => {
              setLoaderState(false);
              getTestByIdData();
            },
          });
        },
      });
    }
  };
  const getTestByIdData = () => {
    getTestById({
      test_id: test_id,
      callBack: (response) => {
        setTestData(response?.data[0]);
        const numOfQns = response?.data[0]?.testInfoDetails;
        setNumberOfMcqQns(numOfQns);
        if (numOfQns[numOfQns?.length - 1]?.test_info_id) {
          setTestInfoId(numOfQns[numOfQns?.length - 1]?.test_info_id);
        }
      },
    });
  };

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

  const handleEditQestion = (e) => {
    let editedTextQuestion = Object.assign({}, editedQuestion);
    editedTextQuestion.question_text = e;
    setEditedQuestion(editedTextQuestion);
  };

  const handleRadioOptionChanges = (e) => {
    let editedOptionText = Object.assign({}, editedQuestion);
    editedOptionText?.question_options.map((option) => {
      if (option.option_id === selectedOptionId) {
        option.option_text = e;
      }
    });
    setEditedQuestion(editedOptionText);
  };
  const handleOptionEditorChange=(e)=>{
    setEditpopup(e)
   
  }
  const handleUpdate=()=>{
    let editedOptionText = Object.assign({}, editedQuestion);
    editedOptionText?.question_options.map((option) => {
      if (option.option_id === selectedOptionId) {
        option.option_text = editpopup;
      }
      
    });
    setEditedQuestion(editedOptionText);
    handleCloseDialogForEdit()
  }
  const handleDeleteOption = (index, option) => {
    let deletedOption = Object.assign({}, editedQuestion);
    const upatedOptions = editedQuestion.question_options.filter(
      (item, insideIndex) => insideIndex !== index
    );
    deletedOption.question_options = upatedOptions;
    setEditedQuestion(deletedOption);
  };
  const [selectedOptionId, setSelectedOptionId] = useState("")
  const handleEditOption = (index, option_text, option_id) => {
    setOpeneditoptions(true);
    // setEditpopup(option_text);
    setSelectedOptionId(option_id)
  };
  const handleCloseDialogForEdit = () => {
    setOpeneditoptions(false);
    setEditpopup("")
  };

  const handleAddOptionPop = (e) => {
    setAddOptions(true);
  };

  const handleCloseDialogForAdd = () => {
    setAddOptions(false);
  };

  const handleAddOptionText = (e) => {
    setAddOptionText(e);
  };
  const handleAddOption = () => {
    let addedOptions = [...editedQuestion.question_options];
    let questionId = editedQuestion?.question_options[0].question_id;
    addedOptions.push({
      is_correct: false,
      option_text: addOptionText,
      question_id: questionId,
    });
    let addedOptn = Object.assign({}, editedQuestion);
    addedOptn.question_options = addedOptions;
    setEditedQuestion(addedOptn);
    setAddOptions(false);
  };

  const handelSaveOption = () => {
    // if (typesOfQns === "single-select") {
    editQuestions({
      questionId: editedQuestion?.question_id,
      payload: {
        question_text: editedQuestion.question_text,
        question_type: typesOfQns,
        options: editedQuestion.question_options,
      },
      callBack: (response) => {
        setOpen(false);
        getTestByIdData();
      },
    });
  };

  const handleTypeOfQns = (e) => {
    setTypesOfQns(e.target.value);
    const editedOptions = JSON.parse(localStorage.getItem("editedOptions"));
    if (e.target.value != editedOptions.question_type) {
      editedOptions?.question_options.map((item, index) => {
        if (index === 0) {
          item.is_correct = true;
        } else {
          item.is_correct = false;
        }
      });
    }
    setEditedQuestion(editedOptions);
  };
  const handleChange = (event) => {
    setInstructionsString(event.target.value);
  };

  const handleOpen = () => {
    setOpenInstruction(true);
  };

  const handleCloseInstruction = () => {
    setOpenInstruction(false);
  };

  const handleAddInstruction = () => {
    const payload = {
      test_id: test_id,
      test_type_id: selectedTestType.test_type_id,
      test_section_name: "for testing", //need to work on this
      test_section_Instruction: testInstructions,
      no_of_question: 5,
      marks_per_question: 4,
    };
    if (testInstructions) {
      createTestInfo({
        id: testInfoId,
        payload,
        callBack: (res) => {
          getTestByIdData();
          // setTestInfoId(res.data.test_info_id);
          setOpenInstruction(false);
        },
      });
    }
  };
  const handleAddTestInstruction = (value) => {
    setTestInstructions(value);
  };
  const handleChangeOnEditor = (e) => {
    setContent(e);
  };
  return (
    <div className="grid-container-TestPortal ">
      <TestProtalHeader testData={testData} />
      <LoaderComponent loaderState={loaderState} />
      <TestNavAndLeft
        setMcqopen={setMcqopen}
        testType={testType}
        handleTestType={handleTestType}
        setCqopen={setCqopen}
        numberOfMcqQns={numberOfMcqQns}
        setSelectedTypeNId={setSelectedTypeNId}
        setAddNewSectionNav={setAddNewSectionNav}
      />

      <TestFirstPage
        testData={testData}
        openqns={openqns}
        setCqopen={setCqopen}
        opencreaterqns={opencreaterqns}
        handleClickOpen={handleClickOpen}
        noOfQuestion={noOfQuestion}
        numberOfMcqQns={numberOfMcqQns}
        setNumberOfMcqQns={setNumberOfMcqQns}
        typesOfQns={typesOfQns}
        setOpenInstruction={setOpenInstruction}
        selectedTypeNId={selectedTypeNId}
        handleOpen={handleOpen}
        addNewSectionNav={addNewSectionNav}
        testType={testType}
        setSelectedTypeNId={setSelectedTypeNId}
        handleTestType={handleTestType}
        setMcqopen={setMcqopen}
        setTestInfoId={setTestInfoId}
      />
      <BootstrapDialog
        onClose={() => setOpenInstruction(false)}
        aria-labelledby="customized-dialog-title"
        open={openInstruction}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, alignItems: "center", textAlign: "center" }}
          id="customized-dialog-title"
        >
          Test Instructions
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenInstruction(false)}
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
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={handleChange}
              value={instructionsString}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus
            onClick={() => setOpenInstruction(false)}
            className="doneBtnInstPage"
          >
            Done
          </Button>
        </DialogActions>
      </BootstrapDialog>
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
                // defaultValue="1"
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
                // defaultValue="4"
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
                <Button variant="contained" disabled className="previousMCQBtn">
                  Previous
                </Button>
                <Button onClick={handelSaveOption} className="saveMCQBtn">
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
                  <option value="java" selected>
                    Add difficulty level
                  </option>
                </select>
              </div>
            </div>
          </div>
          {/* 
          <TextField
            className="thisIsMCQBtn"
            id="outlined-helperText"
            defaultValue="This is an MCQ question"
            value={editedQuestion?.question_text}
            onChange={(e) => handleEditQestion(e)}
          /> */}
          <ReactQuill
            value={editedQuestion?.question_text}
            onChange={(e) => handleEditQestion(e)}
            defaultValue="This is an MCQ question"
            className="thisIsMCQBtn"
            id="outlined-helperText"
            fullWidth
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ align: [] }]
              ],
            }}
          />

          <FormControl sx={{width: "100%"}}>
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
                onChange={handleTypeOfQns}
                value={typesOfQns}
              >
                <option value="multi-select">Multiple Choice</option>
                <option value="single-select" selected>
                  Single
                </option>
              </select>
            </div>
            {typesOfQns === "single-select" ? (
              <>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  {editedQuestion?.question_options?.map((item, index) => {
                    return (
                      <div className="addingDeleteOptions" style={{justifyContent: "space-between"}}>
                         <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Radio
                          checked={item.is_correct}
                          onChange={(e) =>
                            handleChangeOption(
                              e,
                              item.option_id,
                              item.question_id
                            )
                          }
                          value="a"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "A" }}
                        />
                        <Box  className="optionsFeid">{tripmHtmlTagsToNormalFormatinside(item.option_text)}</Box></Box>
                        <div className="deleteComponent">
                          <EditIcon
                            className="deleteIconSixthPage"
                            onClick={(e) =>
                              handleEditOption(index, item.option_text, item.option_id)
                            }
                          />

                          <DeleteIcon
                            className="deleteIconSixthPage"
                            onClick={(e) =>
                              handleDeleteOption(index, item.option_id)
                            }
                          />
                        </div>
                        
                      </div>
                    );
                  })}
                </RadioGroup>
              </>
            ) : typesOfQns === "multi-select" ? (
              <>
                {editedQuestion?.question_options?.map((item, index) => {
                  return (
                    
                      <Box className="CheckBOx">
                        <Checkbox
                          onChange={(e) =>
                            handleChangeOption(
                              e,
                              item.option_id,
                              item.question_id
                            )
                          }
                          checked={item.is_correct}
                          {...label}
                        />
                        <TextField
                          className="optionsFeid"
                          id="outlined-helperText"
                          defaultValue="Option 1"
                          value={item.option_text}
                          onChange={(e) =>
                            handleRadioOptionChanges(e, item.option_id)
                          }
                        />
                        <div className="deleteComponent">
                          <EditIcon
                            className="deleteIconSixthPage"
                            onClick={(e) =>
                              handleEditOption(index, item.option_text, item.option_id)
                            }
                          />

                          <DeleteIcon
                            className="deleteIconSixthPage"
                            onClick={(e) =>
                              handleDeleteOption(index, item.option_id)
                            }
                          />
                        </div>
                        {/* <Box
                          onClick={(e) =>
                            handleDeleteOption(index, item.option_id)
                          }
                          style={{ cursor: "pointer", alignItems: "center", display: "flex" }}
                        >
                          <DeleteIcon className="deleteIconSixthPage" />
                          Delete
                        </Box> */}
                      </Box>
                    
                  );
                })}
              </>
            ) : null}
          </FormControl>

          <Button
            onClick={(e) => handleAddOptionPop(e)}
            className="addNewOptionDotted"
          >
            <AddCircleOutlineIcon sx={{ marginRight: "12px" }} />
            Add New option
          </Button>
          <div>
            <BootstrapDialog
              className="optionsFeid"
              onClose={handleCloseDialogForEdit}
              aria-labelledby="customized-dialog-title"
              open={openeditoptions}
            >
              <DialogTitle
                sx={{ m: 0, p: 2, fontSize: "1rem" }}
                id="customized-dialog-title"
              >
                Edit Option
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleCloseDialogForEdit}
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
                <ReactQuill
                  value={editpopup}
                  onChange={(e)=>handleOptionEditorChange(e)}
                  defaultValue="This is an MCQ question"
                  className="thisIsMCQBtn"
                  id="outlined-helperText"
                  fullWidth
                  modules={{
                    toolbar: [
                      [ "paragraph"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline", "strike"],
                      [{ color: [] }, { background: [] }],
                      [{ align: [] }],
                      ["image"]
                    ],
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  className="CreateBtn"
                  onClick={(e) => handleUpdate()}
                >
                  Update
                </Button>
              </DialogActions>
            </BootstrapDialog>
            <BootstrapDialog
              className="optionsFeid"
              onClose={handleCloseDialogForAdd}
              aria-labelledby="customized-dialog-title"
              open={openAddOptions}
            >
              <DialogTitle
                sx={{ m: 0, p: 2, fontSize: "1rem" }}
                id="customized-dialog-title"
              >
                Add Option
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleCloseDialogForAdd}
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
                {/* <TextField
                  inputProps={{ className: "textField" }}
                  fullWidth
                  size="small"
                  // placeholder="e.g. General Knowledge"
                  id="fullWidth"
                  className="optionsFeid"
                  type="TestName"
                  // value={addTest?.testName}
                  onChange={(e) => handleAddOptionText(e.target.value)}
                /> */}
                <ReactQuill
                  // value={editpopup}
                  onChange={(e) => handleAddOptionText(e)}
                  // defaultValue="This is an MCQ question"
                  className="thisIsMCQBtn"
                  id="outlined-helperText"
                  fullWidth
                  modules={{
                    toolbar: [
                      [ "paragraph"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline", "strike"],
                      [{ color: [] }, { background: [] }],
                      [{ align: [] }],
                      ["image"]
                    ],
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  className="CreateBtn"
                  onClick={(e) => handleAddOption(e)}
                >
                  Add
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </div>

          {/* <p>Solution</p>
          <TextField
            className="thisIsMCQBtn"
            id="outlined-helperText"
            defaultValue="Enter detailed solution for your students"
          /> */}
        </DialogContent>
      </BootstrapDialog>
      <BootstrapDialog
        onClose={handleCloseInstruction}
        aria-labelledby="customized-dialog-title"
        open={openInstruction}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, alignItems: "center", textAlign: "center" }}
          id="customized-dialog-title"
        >
          Test Instructions
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseInstruction}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent
          dividers
          style={{
            height: "500px",
            width: "550px",
          }}
        >
          <Typography gutterBottom>
            <b>Test Instructions</b>
          </Typography>

          <CustomTextEditor
            value={content}
            onChange={(e) => handleChangeOnEditor(e)}
            placeholder="Write something..."
            // style={{
            //   height: "500px",
            //   width: "800px",
            // }}
          />
          {/* </Box> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAddInstruction} className="doneBtnInstPage">
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default TestPortalMain;
