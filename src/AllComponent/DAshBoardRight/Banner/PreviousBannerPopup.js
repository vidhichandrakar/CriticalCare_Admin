import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import "./BannerPopUp.css";
import { Typography } from "@mui/material";
import { commonSelect } from "../../../Util/CommonFields";
import Demoimg from "../../../Media/Images/banner3.jpg"

function PreviousBannerPopup({openPopUp, handleClickPopUp}) {

  
 

  return (
    <>
      <React.Fragment>
        <Dialog
          open={openPopUp}
          onClose={handleClickPopUp}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              handleClickPopUp();
            },
          }}
        >
          <DialogTitle className="popUpheader">Previous bannes</DialogTitle>
          <DialogContent>
            <DialogContentText className="popUpSubHeader">
              <div className="popUpSubHeaderText">
                Please select a landing screen where you want your students to
                be redirected on tapping the banner
              </div>
            </DialogContentText>
          </DialogContent>
          <Box className="BannerCArdBox">
          
        <Box className="flexrow PreviosCardBannerBox">
            <img src={Demoimg} width={250} height={120} />
            <Box sx={{ml: 1}}>
                <Typography>Displayed on:</Typography>
                <Typography>2023/06/14 - 2024/07/19</Typography>
                <Typography>Landing Screen:</Typography>
                <Typography>Specific Course(s) - 1 Selected</Typography>
            </Box>
        </Box>
        <Box className="flexrow PreviosCardBannerBox">
            <img src={Demoimg} width={250} height={120} />
            <Box sx={{ml: 1}}>
                <Typography>Displayed on:</Typography>
                <Typography>2023/06/14 - 2024/07/19</Typography>
                <Typography>Landing Screen:</Typography>
                <Typography>Specific Course(s) - 1 Selected</Typography>
            </Box>
        </Box>
        <Box className="flexrow PreviosCardBannerBox">
            <img src={Demoimg} width={250} height={120} />
            <Box sx={{ml: 1}}>
                <Typography>Displayed on:</Typography>
                <Typography>2023/06/14 - 2024/07/19</Typography>
                <Typography>Landing Screen:</Typography>
                <Typography>Specific Course(s) - 1 Selected</Typography>
            </Box>
        </Box>
        <Box className="flexrow PreviosCardBannerBox">
            <img src={Demoimg} width={250} height={120} />
            <Box sx={{ml: 1}}>
                <Typography>Displayed on:</Typography>
                <Typography>2023/06/14 - 2024/07/19</Typography>
                <Typography>Landing Screen:</Typography>
                <Typography>Specific Course(s) - 1 Selected</Typography>
            </Box>
        </Box>
        <Box className="flexrow PreviosCardBannerBox">
            <img src={Demoimg} width={250} height={120} />
            <Box sx={{ml: 1}}>
                <Typography>Displayed on:</Typography>
                <Typography>2023/06/14 - 2024/07/19</Typography>
                <Typography>Landing Screen:</Typography>
                <Typography>Specific Course(s) - 1 Selected</Typography>
            </Box>
        </Box>  
          </Box>
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default PreviousBannerPopup;
