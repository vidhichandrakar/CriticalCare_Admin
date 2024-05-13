import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { Box, Button, Divider } from "@mui/material";
import "./AllTestPortal.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import Checkbox from '@mui/material/Checkbox';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function TestNavAndLeft() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <aside
    id="sidePart">
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
            <Typography className="testOptions">
              <b>Multiple Choice Questions</b>
            </Typography>
            <Divider />
            <Typography className="testOptions">
              <b>True/False Questions</b>
            </Typography>
            <Divider />
            <Typography className="testOptions">
              <b>Comprehension Questions</b>
            </Typography>
            <Divider />
            <Typography className="testOptions">
              <b>Fill in the Blanks Questions</b>
            </Typography>
            <Divider />
            <Typography className="testOptions">
              <b>Integer Type Questions</b>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="grading">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>
              <HdrAutoIcon className="gradingLogo" />
              <b>Grading</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider/>
            <Typography className="gradingContent">
            <div className="checkboxAndText">
            <input type="checkbox"/>
            <b>Multiple Choice</b>
            </div>
              <div className="fourOneBox">
                <Box className="boxFour">4</Box>
                <Box className="boxOne">1</Box>
              </div>
            </Typography>
            <Typography className="gradingContent">
            <div className="checkboxAndText">
            <input type="checkbox"/>
            <b>True/False</b>
            </div>
              <div className="fourOneBox">
                <Box className="boxFour">4</Box>
                <Box className="boxOne">1</Box>
              </div>
            </Typography>
            <Typography className="gradingContent">
            <div className="checkboxAndText">
            <input type="checkbox"/>
            <b>Fill In The Blanks</b>
            </div>
              <div className="fourOneBox">
                <Box className="boxFour">4</Box>
                <Box className="boxOne">1</Box>
              </div>
            </Typography>
            <Typography className="gradingContent">
            <div className="checkboxAndText">
            <input type="checkbox"/>
            <b>Integer Type</b>
            </div>
              <div className="fourOneBox">
                <Box className="boxFour">4</Box>
                <Box className="boxOne">1</Box>
              </div>
            </Typography>
            <Divider/>
            <Button className="gradingSubmitBtn">Submit</Button>
          </AccordionDetails>
        </Accordion>

        <Accordion className="grading">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>
              <FlipToFrontIcon className="gradingLogo"/>
              <b>Test Sections</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider/>
            <Typography>
              <div className="sectionOneFourQues">
                <h5>Section1 - 4 Questions</h5>
                <div><EditIcon className="editIconTestSection"/><DeleteIcon className="deleteIconTestSection"/></div>
              </div>
              <Box sx={{backgroundColor: "#e6f9ff",
               padding: "5px 17px", borderRadius: "5px", marginTop: "-13px", marginBottom: "61px"}}>abcd</Box>
            </Typography>
            <Typography>
              <Box className="addNreScsnTestSection">
                <AddCircleOutlineIcon/>Add New Section
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="grading">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>
              <FileDownloadOutlinedIcon className="gradingLogo"/>
              <b>Import Questions</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </aside>
  );
}

export default TestNavAndLeft;
