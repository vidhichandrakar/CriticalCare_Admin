import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import "./BannerPopUp.css";
import { FormHelperText, Typography } from "@mui/material";
import {
  CommonTypography,
  commonSelect,
  commonTextField,
} from "../../../Util/CommonFields";
import SelectedCoursesPopup from "./SelectedCoursesPopup";
import SearchIcon from "@mui/icons-material/Search";
import Demoimg from "../../../Media/Images/banner3.jpg";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import {
  getSubcategoryList,
  getCategory,
} from "../../ActionFactory/apiActions";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import attachmentimgae from "../../../Media/Images/undraw_attached_file_re_0n9b.svg";

import InputLabel from "@mui/material/InputLabel";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function BannerPopUp({ openPopUp, handleClickPopUp, bannerAPI }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [hideSpecipicCourse, setHideSpecipicCourse] = useState(false);
  const [hideDropDown, setHideDropDown] = useState(false);
  const [hideLinkDropDown, setHideLinkDropDown] = useState(false);
  const [hideYoutubeLinkDropDown, setHideYoutubeLinkDropDown] = useState(false);
  const [openSelectPopUp, setOpenSelectPopUp] = useState(false);
  const [openPopUps, setOpenPopUps] = useState(false);
  const [storedBasicInfo, setStoredBasicInfo] = useState({
    Name: "",
    Description: "",
    Category: "",
    subCategory: "",
    thumbnailPath: null,
  });

  const [cat, setCat] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [show, setShow] = useState(false);

  const handleChangeOnRadio = (e) => {
    setSelectedValue(e.target.value);
    if (e.target.value === "catCourses") {
      setHideDropDown(true);
    } else {
      setHideDropDown(false);
    }
  };
  const handleChangeSpecificCOursse = (e) => {
    setSelectedValue(e.target.value);
    if (e.target.value === "specificCourses") {
      setHideSpecipicCourse(true);
    } else {
      setHideSpecipicCourse(false);
    }
  };
  const handleChangeLinkOnRadio = (e) => {
    setSelectedValue(e.target.value);
    if (e.target.value === "Link") {
      setHideLinkDropDown(true);
    } else {
      setHideLinkDropDown(false);
    }
  };
  const handleChangeYoutubeLinkOnRadio = (e) => {
    setSelectedValue(e.target.value);
    if (e.target.value === "YoutubeLink") {
      setHideYoutubeLinkDropDown(true);
    } else {
      setHideYoutubeLinkDropDown(false);
    }
  };
  const handleInput = (value, type) => {
    setDropdownValue(value);
  };

  const handleClickSelected = () => {
    setShow(!show);
  };
  const handleClickPopUps = () => {
    setOpenPopUps(!openPopUps);
  };

  useEffect(() => {
    getCategory({
      callBack: (response) => {
        const userCallBack = response?.data;
        setCat(userCallBack);
      },
    });
  }, []);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value.category_name);
  };

  return (
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
        <DialogTitle className="popUpheader flexrow">
          Banner Upload
          <CloseIcon onClick={handleClickPopUp} sx={{ cursor: "pointer" }} />
        </DialogTitle>
        <DialogContent style={{ marginTop: "4%" }}>
          <Box sx={{ minWidth: 420 }}>
            <FormControl fullWidth variant="outlined">
              <Typography className="addCatHeadingCat">Type</Typography>
              <Select
                labelId="demo-simple-select-label"
                sx={{ mt: 1 }}
                id="demo-simple-select"
                // value={age}
                // label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 420 }}>
            <FormControl fullWidth variant="outlined">
              <Typography className="addCatHeadingCat">Position</Typography>
              <Select
                labelId="demo-simple-select-label"
                sx={{ mt: 1 }}
                id="demo-simple-select"
                // value={age}
                // label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

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
  );
}

export default BannerPopUp;
