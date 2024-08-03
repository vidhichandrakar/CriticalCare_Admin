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
import Demoimg from "../../../Media/Images/banner3.jpg";
import moment from "moment/moment";
import CloseIcon from '@mui/icons-material/Close';

function PreviousBannerPopup({ openPopUp, handleClickPopUp, bannerAPI }) {
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
          <DialogTitle className="popUpheader flexrow"> <Typography>Previous bannes</Typography>
          <CloseIcon onClick={handleClickPopUp} sx={{cursor: "pointer"}}/></DialogTitle>
          <DialogContent>
            <DialogContentText className="popUpSubHeader">
              <div className="popUpSubHeaderText">
               See the banners you have previously shown to student on your app.
              </div>
              
            </DialogContentText>
          </DialogContent>
          <Box className="BannerCArdBox">
            {bannerAPI?.map((value, index) => (
              <Box className="PreviosCardBannerBox flexrow">
                <img src={value.image_url} width={250} height={120} />
                <Box sx={{ ml: 2 }}>
                  <Typography sx={{color: "grey"}}>Displayed on:</Typography>
                  <Typography>
                  {moment(value.start_date).format("YYYY-MM-DD") + " - " + moment(value.end_date).format("YYYY-MM-DD")}
                  </Typography>
                  <Typography sx={{color: "grey"}}>Title:</Typography>
                  <Typography>{value.title}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default PreviousBannerPopup;
