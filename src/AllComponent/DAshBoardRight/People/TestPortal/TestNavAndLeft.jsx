import React, { useCallback, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { Box, Button, Divider } from "@mui/material";
import "./AllTestPortal.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FlipToFrontIcon from "@mui/icons-material/FlipToFront";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { removeTestSection } from "../../../ActionFactory/apiActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function TestNavAndLeft({
  setMcqopen,
  testType,
  handleTestType,
  setCqopen,
  numberOfMcqQns,
  setSelectedTypeNId,
  setAddNewSectionNav,
  getTestByIdData,
}) {
  const [expanded, setExpanded] = useState(false);
  const handleClickOpenMCQ = (type) => {
    const testTypeNId = testType.filter((item) => item.test_type_name === type);
    setSelectedTypeNId({
      test_type_id: testTypeNId[0].test_type_id,
      test_type_name: testTypeNId[0].test_type_name,
    });
    if (numberOfMcqQns[0]?.test_questions_count === 0) {
      const selectedOption = testType.filter(
        (test) => test.test_type_name === type
      );
      handleTestType(selectedOption[0]);
      setMcqopen(true);
    } else {
      setCqopen(true);
    }
  };

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleAddSectionNav = (type) => {
    setAddNewSectionNav(type);
    const selectedOption = testType.filter((test) => test.test_type_name);
    handleTestType(selectedOption[0]);
    setMcqopen(true);
  };

  const handleDeletSections = (item, index) => {
    console.log("jhjkl", item?.test_info_id, "index--->", index);
    removeTestSection({
      testInfoId: item?.test_info_id,
      callBack: (response) => {
        getTestByIdData();
      },
    });
  };
  return (
    <aside id="sidePart">
      <Box className="completeLeftBox">
        <Accordion
          className="createQuestions"
          expanded={expanded}
          onChange={handleExpansion}
          slots={{ transition: Fade }}
          slotProps={{ transition: { timeout: 400 } }}
          sx={{
            "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
            "& .MuiAccordionDetails-root": {
              display: expanded ? "block" : "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>
              <HelpOutlineIcon className="circleQuestion" />
              <b>Create Questions</b>
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Divider />
            <Typography
              className="testOptions"
              onClick={() => handleClickOpenMCQ("Multiple Choice")}
            >
              <b>Multiple Choice Questions</b>
            </Typography>
            <Divider />
            <Divider />
            <Typography
              className="testOptions"
              onClick={() => handleClickOpenMCQ("Comprehensive")}
            >
              <b>Comprehension Questions</b>
            </Typography>
            <Divider />
            <Divider />
          </AccordionDetails>
        </Accordion>

        <Accordion className="grading">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>
              <FlipToFrontIcon className="gradingLogo" />
              <b>Test Sections</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <Divider />
            {/* <Box className="testsectionnameMainBox"> */}
            <Box className="testsectionname">
              {numberOfMcqQns?.map((item, index) => {
                return (
                  <Box>
                    <div className="sectionOneFourQues">
                      <h5> {item?.test_section_name}</h5>
                      <div style={{ marginRight: "3%" }}>
                        <EditIcon className="editIconTestSection" />
                        <DeleteIcon
                          onClick={() => handleDeletSections(item, index)}
                          className="deleteIconTestSection"
                        />
                      </div>
                    </div>
                    <Divider />
                  </Box>
                );
              })}
            </Box>
            <Box>
              <Box
                className="addNreScsnTestSection"
                onClick={() => handleAddSectionNav("addNewSectionNav")}
              >
                <AddCircleOutlineIcon
                  sx={{ position: "relative", top: "5px", right: "5px" }}
                />
                Add New Section
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </aside>
  );
}

export default TestNavAndLeft;
