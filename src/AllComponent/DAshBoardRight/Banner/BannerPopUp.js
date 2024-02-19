import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import "./BannerPopUp.css";
import { Typography } from "@mui/material";
import { commonSelect } from "../../../Util/CommonFields";

function BannerPopUp({openPopUp, handleClickPopUp}) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [hideDropDown, setHideDropDown] = useState(false);

  
  const handleChangeOnRadio = (e) => {
    console.log(e);
    console.log("radio btun");
    console.log(e.target.value);
    setSelectedValue(e.target.value);
    if (e.target.value === "catCourses") {
      setHideDropDown(true);
    } else {
      setHideDropDown(false);
    }
  };
  const handleInput = (value, type) => {
    console.log(value);
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
              console.log(email);
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
                // inputProps={{ 'aria-label': 'B' }}
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
