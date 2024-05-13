import React from 'react'
import "./AllTestPortal.css";
import WestIcon from '@mui/icons-material/West';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function TestProtalHeader() {
  return (
    // <div className="header">
         <div className="testNavBar header">
          <div className="abcdText">
            <Link to="/TestPortal">
              <WestIcon className="abcdBackLogo" />
            </Link>
            <b>abcd</b>
          </div>
          <div className="previewnsaveBtn">
            <Button className="previewNavBtn" variant="outlined">Preview</Button>
            <Button className="saveTestNavBtn" variant="outlined" disabled>Save Test</Button>
          </div>
        </div>
    // </div>
  )
}

export default TestProtalHeader
