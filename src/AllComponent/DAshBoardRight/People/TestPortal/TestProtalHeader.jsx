import React, { useState } from "react";
import "./AllTestPortal.css";
import WestIcon from "@mui/icons-material/West";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
function TestProtalHeader({ testData }) {
  const [openSaveBox, setOpenSaveBox] = useState(false);
  const navigate = useNavigate();
  const handleClickClose = () => {
    setOpenSaveBox(false);
    handleSave();
  };
  const handleOpenBox = () => {
    setOpenSaveBox(true);
  };
  const handleSave =()=>{
    navigate("/admin/TestPortal")
  }
  return (
    // <div className="header">
    <div className="testNavBar header">
      <div className="abcdText">
        <Link to="/admin/TestPortal">
          <WestIcon className="abcdBackLogo" />
        </Link>
        <p style={{ fontSize: "1.5rem", marginLeft: "10px" }}>
          {testData?.test_name}
        </p>
      </div>
      <div className="previewnsaveBtn">
        {/* <Button className="previewNavBtn" variant="outlined">Preview</Button> */}
        <Button
          className="saveTestNavBtn"
          variant="outlined"
          onClick={() => handleOpenBox()}
        >
          Save Test
        </Button>
      </div>
      <Dialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={openSaveBox}
        className="couponBackDrop"
        
      >
        <DialogContent  sx={{padding:"30px 80px"}}>
          <CheckCircleOutlineIcon
            sx={{
              fontSize: "3rem",
              fontWeight: 300,
              marginLeft: "40%",
              color: "green",
            }}
          ></CheckCircleOutlineIcon>
          <Typography sx={{ textAlign: "center", fontSize: "1.3rem" }}>
            Success
          </Typography>
          <Typography sx={{ marginTop: "8%" }}>
            Test Details Added Successfully
          </Typography>
        </DialogContent>
        <DialogActions sx={{justifyContent:"center"}}>
          <Button
            autoFocus
            onClick={handleClickClose}
            className="makingThisButtonBlue"
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    // </div>
  );
}

export default TestProtalHeader;
