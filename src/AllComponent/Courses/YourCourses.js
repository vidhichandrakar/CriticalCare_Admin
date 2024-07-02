import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSSFile/YourCourses.css";
import CourseHeader from "./CoursesHeader";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "@mui/material/Button";
import Folder from "../../Media/Images/folder.avif";
import SearchBar from "../../Util/SearchBar";
import YourCoursesCard from "./YourCoursesCard";
import { YourCoursesCardData } from "../../Data/JsonData";
import SideBar from "../AdminDashboardMain/SideBar";
import { Link } from "react-router-dom";
import { getAllCourses, getAllUsersApi, getCategory, getCourseDuration, getAllCoursesFilter } from "../ActionFactory/apiActions";
import LoaderComponent from "../../Util/LoaderComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirectRestriction } from "../../Util/RedirectRestriction";
import Header from "./Header";
import { Box, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
// import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { TextField } from "@mui/material";
import { CommonTypography, commonTextField } from "../../Util/CommonFields";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { validatePhoneNo } from "../../Util/CommonUtils";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
// import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";




const YourCourses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [loaderState, setLoaderState] = useState(false);
  const [userData, setUserData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [state, setState] = React.useState({
    right: false,
  });
  const [testName, setTestName] = useState([])
  const [cat, setCat] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [durationType, setDurationType] = useState([{}]);
  const [updatedCat, setUpdatedCat] = useState({});
  const [updatedDuration, setUpdatedDuration] = useState({});
  const [saveMemberDetails, setSaveMemberDetails] = useState({});
  const [subCategory, setSubCategory] = useState({});
  const [durationname, setDurationname] = useState({});

  useEffect(() => {
     
      getCategory({
        callBack: (response) => {
          const userCallBack = response?.data;
          setCat(userCallBack);
        },
        error: (error) => {
          toast.error(error.message);
        },
      });
      getCourseDuration({
        callBack: (response) => {
          setDurationType(response.data);
        },
      });
    
  }, []);

  const handleFilterChange = ({duration_type_id = "", category_id = "" , is_publish = ""}) => {
    console.log(filterValue, durationname ,selectedCategory, "line90 publishdurationcategory")
    getAllCoursesFilter({

      duration_type_id: duration_type_id,
      category_id: category_id,
      is_publish: filterValue ,
      callBack: (response) =>{
        console.log(response, "line95")
        const userCallBack = response?.data;
        setAllCourses(userCallBack);
        setCourseData(userCallBack);
      },
      error: () =>{

      }
    })
  }
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
    handleFilterChange({category_id: e.target.value})
    
  };

  const handleDurationChange = (e) => {
    
    setDurationname(e.target.value.duration_type_id);
    handleFilterChange({duration_type_id : e.target.value.duration_type_id})
    
    console.log(e, "line120 handleduratipon")
    console.log(e.target.value.duration_type_id, "line121 handleduratipon")
    console.log(durationname, "line124 handleduratipon")
   
  };

  const handleInput = (value, type, event) => {
    if (
      type === "description" ||
      type === "createdBy" ||
      type === "modifiedBy"
    ) {
      let storedValues = Object.assign({}, updatedCat);
      if (type === "description") {
        storedValues.category_name = value;
      } else if (type === "createdBy") {
        storedValues.created_by = parseInt(value);
      } else if (type === "modifiedBy") {
        storedValues.modiefied_by = parseInt(value);
      }
      setUpdatedCat(storedValues);
    } else if (type === "duration") {
      let storedValues = Object.assign({}, updatedDuration);
      if (type === "duration") {
        storedValues.duration_name = value;
      }
      setUpdatedDuration(storedValues);
    } else if (
      type === "memberName" ||
      type === "emailId" ||
      type === "phoneNo"
    ) {
      let storedValues = Object.assign({}, saveMemberDetails);
      if (type === "memberName") {
        storedValues.member_name = value;
      } else if (type === "emailId") {
        storedValues.email_id = value;
      } else if (type === "phoneNo") {
        storedValues.phone_no = validatePhoneNo(value, saveMemberDetails.phone_no);
      }
      setSaveMemberDetails(storedValues);
    } else if (type === "SubCategory") {
      setSubCategory(value);
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const list = (anchor) => (
    <Box
      // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      
      // onKeyDown={toggleDrawer(anchor, false)}
    >
    <Box className="FilterHead">
      <Typography>Filter</Typography>
      <CloseIcon onClick={toggleDrawer(anchor, false)}/>
    </Box>
      <Divider />
      <Box>
        <Box className="CategoriesBOx">
          {/* <Typography>Categories / Sub-categories</Typography> */}
          {/* <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginTop: 1
          }}
        >
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={testName}
            disableCloseOnSelect
            getOptionLabel={(option) => option.test_name}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.test_name}
              </li>
            )}
            style={{ width: "100%", borderRadius: "10px", backgroundColor: "white" }}
            renderInput={(params) => (
              <TextField
                {...params}
                // label="Select tests or folders"
                placeholder="Categories / Sub-categories"
                className="stylingAutofield"
              />
            )}
          />
        </Box> */}
         <div>
                {CommonTypography(
                  {
                    fontWeight: 600,
                    label: "Categories / Sub-categories",
                  },
                  (Option = {
                    className: "addCatHeading",
                  })
                )}
                <FormControl sx={{ width: 540 }}>
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
              </div>
        </Box>
        <Box className="CategoriesBOx">
          <Typography>Course Type</Typography>
          <FormControl sx={{ width: 540 }}>
                  <Select

                    value={durationType.duration_name}
                    onChange={(e) => handleDurationChange(e)}
                    className="addCatTextField"
                  >
                    {durationType.map((item) => (
                      <MenuItem key={item.duration_id} value={item}>
                        {item.duration_type_name}
                        {console.log(item, "item line 234")}
                      </MenuItem>
                    ))}
                  </Select>
                  
                </FormControl>
          <Box>

          </Box>
        </Box>
        <Box className="CategoriesBOx">
          <Typography>Course Status</Typography>
          <Box
          sx={{
           marginTop: 1,
           display: "flex",
           flexDirection: "row",
           justifyContent: "space-evenly"

          }}
        >
             <Button
             variant="outlined"
            value={"published"}
            sx={{mt: 1}}
            onClick={() => handleFilterCourse("published")}
            
          >
            Publish
          </Button>
          <Button
          variant="outlined"
            value={"not published"}
            sx={{mt: 1}}
            onClick={() => handleFilterCourse("not published")}
          >
            Not Publish
          </Button>
          <Button
          variant="outlined"
            value={"published"}
            sx={{mt: 1}}
            onClick={() => handleFilterCourse("All Courses")}
          >
            All Courses
          </Button>
        </Box>
        </Box>
      </Box>
    </Box>
  );


  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const authorized = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (redirectRestriction()) {
      setLoaderState(true);
      getAllCourses({
        callBack: (response) => {
          const userCallBack = response?.data;
          setAllCourses(userCallBack);
          setCourseData(userCallBack);
          getAllUsersApi({
            callBack: (response) => {
              const userCallBack = response?.data;
              setUserData(userCallBack);
              setLoaderState(false);
            },
            error: (error) => {
              toast.error(error.message);
              console.log(error.message);
              setLoaderState(false);
            },
          });
          setLoaderState(false);
        },
        error: (error) => {
          toast.error(error.message);
          console.log(error.message);
          setLoaderState(false);
        },
      });
    } else {
      navigate("/admin");
    }
  }, []);

  // useEffect(() => {
  //   if (filterValue == "All Courses") {
  //     setAllCourses(courseData);
  //   } 
  //   else {
  //     const filterCourseData = courseData?.filter(
  //       (item) => item?.is_publish == filterValue
  //     );
  //     setAllCourses(filterCourseData);
  //   }
  //   //  else {
  //   //   const filterCourseType = courseData?.filter(
  //   //     (item) => item?.is_publish == filterValue
  //   //   );
  //   //   setAllCourses(filterCourseData);
  //   // }
  // }, [filterValue]); 

  const handleFilterCourse = (type) => {
    setFilterValue(type);
  };

  return (
    <div className="grid-container">
      <Header
        Heading={"My Courses"}
        subHeading={"Add/View courses of your brand"}
      />
      <SideBar />
      <main className="main-container">
        <LoaderComponent loaderState={loaderState} />
        <Box className="subHeaderMycourses">
          <div className="wid100">
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

          <div className="MyCOurseFilterBtn filterButton" onClick={toggleDrawer('right', true)}>
            <Button className="filterButtonssss" >
              <FilterAltIcon /> Filter
            </Button>
          </div>
          <div>
     
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </Drawer>
    
    </div>
        </Box>
        {/* <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{ mt: "5px" }}
          value={value}
        >
          <MenuItem
            sx={{ mb: -1 }}
            value={"published"}
            onClick={() => handleFilterCourse("published")}
          >
            <span className="ccLogout">Publish</span>
          </MenuItem>
          <Divider />

          <MenuItem
            sx={{ mt: -1, mb : -1 }}
            value={"not published"}
            onClick={() => handleFilterCourse("not published")}
          >
            <span className="ccLogout">Not Publish</span>
          </MenuItem>

          <Divider />
          <MenuItem
            sx={{ mt: -1 }}
            value={"published"}
            onClick={() => handleFilterCourse("All Courses")}
          >
            <span className="ccLogout">All Courses</span>
          </MenuItem>
        </Popover> */}

        <Box className="Add-main-cards">
          <YourCoursesCard
            allCourses={allCourses}
            userData={userData}
            Data={YourCoursesCardData}
          />
        </Box>
        <div>
          <Box
            sx={{
              top: "88%",
              position: "absolute",
              zIndex: 1111111111111,
              right: 0,
            }}
            className="addCircle"
            onClick={() => navigate("/admin/CreateCourses")}
          >
            <AddRoundedIcon className="addIcon" />
          </Box>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
};

export default YourCourses;
