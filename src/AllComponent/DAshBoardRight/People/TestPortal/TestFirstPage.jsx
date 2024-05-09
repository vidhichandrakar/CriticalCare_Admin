import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import { Box, Button, Divider } from '@mui/material';
import TestNavAndLeft from './TestNavAndLeft';
import "./AllTestPortal.css";
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WestIcon from '@mui/icons-material/West';


function TestFirstPage() {
    const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      {/* <p>hellll</p> */}
      <div className='mainFirstPage'>
        <div className='testNavBar'>
            <p><WestIcon/>abcd</p>
        </div>

        <div className='testContent'>
            <div className='testLeftSection'>
            <TestNavAndLeft/>
            </div>

            <div className='testRightSection'>
              <Box className="stickyTopBox">
                <div><h4>Test Details<EditIcon className='blueEdit'/></h4></div>
                <div><span><AccessTimeIcon className='testDurationLogo'/>Test Duration: <b>3hrs30mins</b></span>
                <span><LocalOfferIcon className='tagLogo'/>Tags:<b>TEST MODULE X</b></span></div>
                <Box className="testInstructionsBtn"><p><b>Test Instructions:</b>Test Instructions: Click here to add</p></Box>
              </Box>
              
              <Box className="toAddNewSection">
                 {/* <img src={} width={200} height={200}/> */}
                 <p className='toAddNewSectionHead'>Start by adding a section</p>
                 <p>You can add & manage sections from the <b>'Test Sections'</b></p>
                 <p>panel on left</p>
                 <Button className='addNewSection'>Add new section</Button>
              </Box>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TestFirstPage
