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

function BannerPopUp({openPopUp, handleClickPopUp}) {
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [hideDropDown, setHideDropDown] = useState(false);

  
  const handleChangeOnRadio = (e) => {
    setSelectedValue(e.target.value);
    if (e.target.value === "catCourses") {
      setHideDropDown(true);
    } else {
      setHideDropDown(false);
    }
  };
  const handleInput = (value, type) => {
    setDropdownValue(value);
  };

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
          <DialogTitle className="popUpheader">Select Landing Screen</DialogTitle>
          <DialogContent>
            <DialogContentText className="popUpSubHeader">
              <div className="popUpSubHeaderText">
                Please select a landing screen where you want your students to
                be redirected on tapping the banner
              </div>
            </DialogContentText>
          </DialogContent>
          <div className="radioText">
            <Box className="popUpRadioBtn">
              <Typography>None (no action on tapping banner)</Typography>
              <Radio
                checked={selectedValue === "none"}
                onChange={handleChangeOnRadio}
                value="none"
                name="radio-buttons"
                labelPlacement="start"
                // inputProps={{ 'aria-label': 'A' }}
              />
            </Box>
            <Box className="popUpRadioBtn">
              <Typography >Store Tab</Typography>
              <Radio
                checked={selectedValue === "storeTab"}
                onChange={handleChangeOnRadio}
                value="storeTab"
                name="radio-buttons"
                labelPlacement="start"
                className="innerRdioText"
              />
            </Box>
            <Box className="popUpRadioBtn">
              <Typography>Specific Course(s)</Typography>
              <Radio
                checked={selectedValue === "specificCourses"}
                onChange={handleChangeOnRadio}
                value="specificCourses"
                name="radio-buttons"
                labelPlacement="start"
              />
            </Box>
            <Box className="popUpRadioBtn">
              <Typography>Category of Courses</Typography>
              <Radio
                checked={selectedValue === "catCourses"}
                onChange={handleChangeOnRadio}
                value="catCourses"
                name="radio-buttons"
                labelPlacement="start"
              />
            </Box>
          </div>
          {hideDropDown && (
            <FormControl
              sx={{ m: 1, minWidth: 240 }}
              className="categorySelect"
            >
              {commonSelect(
                {
                  placeholder: "Select Category",
                  menuItemList: [
                    { id: 1, label: "Category 1" },
                    { id: 2, label: "Category 2" },
                    { id: 3, label: "Category 3" },
                  ],
                  className: "categorytext",
                },
                (Option = {
                  handleInput: handleInput,
                  categoryValue: dropdownValue,
                })
              )}
            </FormControl>
          )}
          <div className="popUpDoneBtn">
            <Button
              style={{ width: "100px", float: "right" }}
              variant="contained"
            >
              Done
            </Button>
          </div>
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default BannerPopUp;
