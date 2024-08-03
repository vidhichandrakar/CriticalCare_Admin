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
import { Typography } from "@mui/material";
import { CommonTypography, commonSelect, commonTextField } from "../../../Util/CommonFields";
import SelectedCoursesPopup from "./SelectedCoursesPopup";
import SearchIcon from "@mui/icons-material/Search";
import Demoimg from "../../../Media/Images/banner3.jpg"
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import Checkbox from '@mui/material/Checkbox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { getSubcategoryList, getCategory } from "../../ActionFactory/apiActions";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import attachmentimgae from "../../../Media/Images/undraw_attached_file_re_0n9b.svg";

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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function BannerPopUp({openPopUp, handleClickPopUp, bannerAPI}) {

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
  const [show, setShow]= useState(false)


  
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
    console.log(e.target.value.category_name, "Lineno109")    
  };

  return (
    <> <SelectedCoursesPopup openPopUps={openPopUps} handleClickPopUps={handleClickPopUps} />
{show ? 
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
          className="dialogWidth"
        >
          <DialogTitle className="popUpheader">
            <Box className="flexrow spacebt"> 
              <Box className="flexrow" >
                <ArrowBackIcon onClick={handleClickSelected} sx={{cursor: "pointer"}}/> 
                <Typography sx={{ml:1}}>Selected Course(s) - 1 Selected </Typography>
              </Box> 
              <Box  sx={{cursor: "pointer"}}>
                 <CloseIcon onClick={handleClickPopUp}/>
              </Box>

            </Box></DialogTitle>
          <DialogContent>
            <DialogContentText>
            <div>
              <Paper
                component="form"
                sx={{
                  ml: 0,
                  mt: "41px",
                  mb: "15px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#e4e4e459",
                  borderRadius: "10px",
                }}
              >
                <IconButton sx={{ p: "10px" }} aria-label="menu">
                  <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search your course by name"
                  inputProps={{ "aria-label": "search your course by name" }}
                />
              </Paper>
            </div>
            </DialogContentText>
            
          </DialogContent>
          <Box className="radioText">
            <div>
           <Typography>
            Courses (3)
           </Typography>
          </div>
          <Box className="CoursePopupMainBox">
          <div className="flexrow CoursePopupBox">
          <Checkbox {...label} defaultChecked />
          <img src={Demoimg} width={120} height={60}/>
          <Typography sx={{ml: 2}}> Trics 1 Free Mock Test For EDIC - 1</Typography>
          </div>
          <div className="flexrow CoursePopupBox">
          <Checkbox {...label}  />
          <img src={Demoimg} width={120} height={60}/>
          <Typography sx={{ml: 2}}> Trics 1 Free Mock Test For EDIC - 1</Typography>
          </div>
          <div className="flexrow CoursePopupBox">
          <Checkbox {...label}  />
          <img src={Demoimg} width={120} height={60}/>
          <Typography sx={{ml: 2}}> Trics 1 Free Mock Test For EDIC - 1</Typography>
          </div>
          <div className="flexrow CoursePopupBox">
          <Checkbox {...label}  />
          <img src={Demoimg} width={120} height={60}/>
          <Typography sx={{ml: 2}}> Trics 1 Free Mock Test For EDIC - 1</Typography>
          </div>
          <div className="flexrow CoursePopupBox">
          <Checkbox {...label}  />
          <img src={Demoimg} width={120} height={60}/>
          <Typography sx={{ml: 2}}> Trics 1 Free Mock Test For EDIC - 1</Typography>
          </div>
          <div className="flexrow CoursePopupBox">
          <Checkbox {...label}  />
          <img src={Demoimg} width={120} height={60}/>
          <Typography sx={{ml: 2}}> Trics 1 Free Mock Test For EDIC - 1</Typography>
          </div>
          <div className="flexrow CoursePopupBox">
          <Checkbox {...label}  />
          <img src={Demoimg} width={120} height={60}/>
          <Typography sx={{ml: 2}}> Trics 1 Free Mock Test For EDIC - 1</Typography>
          </div>
          <div className="flexrow CoursePopupBox">
          <Checkbox {...label}  />
          <img src={Demoimg} width={120} height={60}/>
          <Typography sx={{ml: 2}}> Trics 1 Free Mock Test For EDIC - 1</Typography>
          </div>
          </Box>
            </Box>
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
  
             :
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
          <DialogTitle className="popUpheader flexrow">Select Landing Screen
          
          <CloseIcon onClick={handleClickPopUp} sx={{cursor: "pointer"}}/>
          </DialogTitle>
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
                onChange={handleChangeSpecificCOursse}
                value="specificCourses"
                name="radio-buttons"
                labelPlacement="start"
              />
            </Box>
            {hideSpecipicCourse && (
            <Box sx={{ml:1, width: "95%"}}>
             <div className="BannerHead BorderBottom">
                <Button className="changeBtn" onClick={handleClickSelected}>
                 Select Course
                </Button>
              </div>
            </Box>
          )}
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
            {hideDropDown && (
              <Box sx={{ml:1}}>
            <FormControl
              sx={{minWidth: 550, mt: -1 }}
              className="categorySelect"
            >
            <Select
                    value={cat.category_name}
                    onChange={(e) => handleChange(e)}
                    className="addCatTextField"
                  >
                    {cat.map((item) => (
                      <MenuItem key={item._id} value={item}>
                        {item.category_name}
                      </MenuItem>
                    ))}
                  </Select>
               </FormControl>
               </Box>
          )}
            <Box className="popUpRadioBtn">
              <Typography>External Link</Typography>
              <Radio
                checked={selectedValue === "Link"}
                onChange={handleChangeLinkOnRadio}
                value="Link"
                name="radio-buttons"
                labelPlacement="start"
              />

            </Box>
            {hideLinkDropDown && (
              <Box sx={{ml:1}}>
            <FormControl
              sx={{ m: 1, minWidth: 550, mt: -1 }}
              className="categorySelect"
            >
              {commonTextField(
                {
                  placeholder: "Select Category",
                  className: "categorytext",
                },
                (Option = {
                  handleInput: handleInput,
                  categoryValue: dropdownValue,
                })
              )}
              <Typography sx={{fontSize: "0.9rem", color: "grey"}}>Note: The Students will be able to see this link within the app itself.</Typography>

            </FormControl>
            </Box>
          )}
            <Box className="popUpRadioBtn">
              <Typography>Youtube Link</Typography>
              <Radio
                checked={selectedValue === "YoutubeLink"}
                onChange={handleChangeYoutubeLinkOnRadio}
                value="YoutubeLink"
                name="radio-buttons"
                labelPlacement="start"
              />

            </Box>
            {hideYoutubeLinkDropDown && (
              <Box sx={{ml:1}}>
            <FormControl
              sx={{ m: 1, minWidth: 550, mt: -1 }}
              className="categorySelect"
            >
              {commonTextField(
                {
                  placeholder: "Select Category",
                  className: "categorytext",
                },
                (Option = {
                  handleInput: handleInput,
                  categoryValue: dropdownValue,
                })
              )}
              <Typography sx={{fontSize: "0.9rem", color: "grey"}}>Note: The Students will be able to see this link within the app itself.</Typography>
            </FormControl>
            </Box>
          )}
          <Box className="popUpRadioBtn">
              <Typography>Free Course material</Typography>
              <Radio
                checked={selectedValue === "FreeCourse"}
                onChange={handleChangeYoutubeLinkOnRadio}
                value="YoutubeLink"
                name="radio-buttons"
                labelPlacement="start"
              />

            </Box>
          </div>
          
         

          <div className="popUpDoneBtn">
            <Button
              style={{ width: "100px", float: "right" }}
              variant="contained"
            >
              Done
            </Button>
          </div>
        </Dialog>
             </React.Fragment>}
      
    </>
  );
}

export default BannerPopUp;
