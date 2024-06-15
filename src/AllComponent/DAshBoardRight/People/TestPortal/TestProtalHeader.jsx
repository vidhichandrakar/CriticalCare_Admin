import React from 'react'
import "./AllTestPortal.css";
import WestIcon from '@mui/icons-material/West';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function TestProtalHeader({testData}) {
  return (
    // <div className="header">
         <div className="testNavBar header">
          <div className="abcdText">
            <Link to="/admin/TestPortal">
              <WestIcon className="abcdBackLogo" />
            </Link>
            <b>{testData?.test_name}</b>
            {console.log(testData?.test_name, "Line no 16")}
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
