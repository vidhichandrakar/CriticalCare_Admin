import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CommonTypography, commonTextField } from "../../Util/CommonFields";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  addwebinar,
  createCategory,
  createSubCategory,
  getBlogs,
  getBlogsbyId,
  getCategory,
  getCategoryById,
  getTestByID,
  postBlog,
  updateCategory,
  updateDuration,
  updateMemberDetails,
  uploadFile,
} from "../ActionFactory/apiActions";
import { ToastContainer, toast } from "react-toastify";
import { Box, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { validatePhoneNo } from "../../Util/CommonUtils";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDropzone } from "react-dropzone";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AddBolg from "../AddBlog/AddBolg.jsx";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import UploadIcon from "@mui/icons-material/Upload";
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

function Configuration({
  hideCatConfig,
  handleCloseCat,
  selectedConfigValue,
  category_id = 0,
  catdata,
  openId,
}) {
  const theme = useTheme();
  const [updatedCat, setUpdatedCat] = useState({ category_name: "" });
  const [updatedDuration, setUpdatedDuration] = useState({ duration_name: "" });
  const [saveMemberDetails, setSaveMemberDetails] = useState({
    member_name: "",
    email_id: "",
    phone_no: "",
  });
  const [subCategory, setSubCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({ category_id: "" });
  const [cat, setCat] = useState([]);
  const [number, setNumber] = useState("");
  const [startValue, setStartValue] = useState(null);
  const [endvalue, setEndvalue] = useState(null);
  const [webinarstitle, setWebinarstitle] = useState("");
  const [webinarsurl, setWebinarsurl] = useState("");
  const [webinarsDisplayLocation, setWebinarsDisplayLocation] = useState("");
  const [storedMobileInfo, setStoredMobileInfo] = useState({
    thumbnailPath: [], // Store paths for Team member images
  });
  const [imagePreviewsMobile, setImagePreviewsMobile] = useState([]); const [imgUpload, setImageWhileUpload] = useState("");
    const [loaderState, setLoaderState] = useState(false);  
      const [popForBlog, setPopForBlog] = useState(false);
    const [addBlogDetails, setAddBlogDetails] = useState({
      title: "",
      description: "",
      image_url: "",
      display_locations: "",
      popular: "N", //hard coded need to check it with Backend ppl
      created_by: "",
    });

    const onInroVideoDrop = async (files) => {
      let payload = new FormData();
      payload.append("file", files[0], files[0]?.name);
      let changedValue = Object.assign({}, addBlogDetails);
      setLoaderState(true);
      uploadFile({
        payload,
        callBack: (response) => {
          changedValue.image_url = response?.data?.path;
          setAddBlogDetails(changedValue);
          setLoaderState(false);
        },
      });
      // setStoredBasicInfo(storedValues);
    };

    const {
      getRootProps: getIntroVideoRootProps,
      getInputProps: getIntroVideoInputProps,
    } = useDropzone({
      onDrop: onInroVideoDrop,
      onChange: (event) => console.log(event),
      accept: {
        "image/jpeg": [".jpeg"],
        "image/png": [".png"],
        "image/jpg": [".jpg"],
        "video/mp4": [".mp4"],
      },
    });
     useEffect(() => {
      console.log(openId, "ids")
      getBlogsbyId({
          bloglist_id: openId,
          callBack: (response) => {
            const userCallBack = response?.data;
            // setBlogCards(userCallBack);
          },
        });
      }, [openId]);
 
  
  const onMobileImageDrop = async (files) => {
    let storedValues = { ...storedMobileInfo };
    const newPreviews = [...imagePreviewsMobile];

    for (let i = 0; i < files.length; i++) {
      let payload = new FormData();
      payload.append("file", files[i], files[i]?.name);

      await uploadFile({
        payload,
        callBack: (response) => {
          storedValues.thumbnailPath.push(response?.data?.path);
          let reader = new FileReader();
          reader.onloadend = () => {
            newPreviews.push(reader.result);
            setImagePreviewsMobile(newPreviews);
          };
          reader.readAsDataURL(files[i]);

          toast.success("Team Member  Image Uploaded Successfully!", {
            autoClose: 500,
          });
        },
      });
    }

    setStoredMobileInfo(storedValues);
  };

  const {
    getRootProps: getMobileImageRootProps,
    getInputProps: getMobileImageInputProps,
  } = useDropzone({
    onDrop: onMobileImageDrop,
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
    multiple: true,
  });
 

  const handleTitleChange = (e) => {
    setWebinarstitle(e.target.value);
  };
  const handleUrlChange = (e) => {
    setWebinarsurl(e.target.value);
  };
  // const handleDisplayLocationChange = (e) => {
  //   setWebinarsDisplayLocation(e.target.value);
  // };
  // console.log("hbwedfdskl",selectedConfigValue)
  useEffect(() => {
    console.log("hbwedfdskl",selectedConfigValue)
    if (selectedConfigValue === "SubCategory") {
      
      // getCategory({
      //   callBack: (response) => {
      //     const userCallBack = response;
      //     setCat(userCallBack);
      //   },
      //   error: (error) => {
      //     toast.error(error.message);
      //   },
      // });
      getCategoryById({
        category_id,
        callBack: (response) => {
          let storedValues = Object.assign({}, updatedCat);
          storedValues.category_name = response?.data?.category_name;
          setCat(response);
        },
        error: (error) => {
          toast.error(error.message);
        },
      });
    } else if (selectedConfigValue === "Category" && category_id != 0) {
      getCategoryById({
        category_id,
        callBack: (response) => {
          let storedValues = Object.assign({}, updatedCat);
          storedValues.category_name = response?.data?.category_name;
          setUpdatedCat(storedValues);
        },
        error: (error) => {
          toast.error(error.message);
        },
      });
    }
    
  }, [selectedConfigValue]);

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
        storedValues.phone_no = validatePhoneNo(
          value,
          saveMemberDetails.phone_no
        );
      }
      setSaveMemberDetails(storedValues);
    } else if (type === "SubCategory") {
      setSubCategory(value);
    }
  };
  const handleConfigChanges = () => {
    if (updatedCat.category_name === "") {
      toast.error("Enter Category");
    } else {
      if(category_id){
        const payload = {
          category_name: updatedCat.category_name,
          created_by: JSON.parse(localStorage.getItem("loggedInUser")).user_id,
          modiefied_by: JSON.parse(localStorage.getItem("loggedInUser")).user_id,
        };
        updateCategory({
          category_id,
          payload,
          callBack: (response) => {
            toast.success("Category created successfully!");
            setUpdatedCat({ category_name: "" });
            handleCloseCat();
            window.location.reload()
          },
        });
      }else{
        const payload = {
          category_name: updatedCat.category_name,
          created_by: JSON.parse(localStorage.getItem("loggedInUser")).user_id,
          modiefied_by: JSON.parse(localStorage.getItem("loggedInUser")).user_id,
        };
        createCategory({
          payload,
          callBack: (response) => {
            toast.success("Category created successfully!");
            setUpdatedCat({ category_name: "" });
            handleCloseCat();
            window.location.reload()
          },
        });
      }
     
    }
  };

  const handleDurationChanges = () => {
    if (updatedDuration.duration_name === "") {
      toast.error("Enter Duration");
    } else {
      const payload = {
        duration_name: updatedDuration.duration_name,
        created_by: JSON.parse(localStorage.getItem("loggedInUser")).user_id,
        modiefied_by: JSON.parse(localStorage.getItem("loggedInUser")).user_id,
      };
      updateDuration({
        payload,
        callBack: (response) => {
          toast.success("Successful duration created");
          setUpdatedCat({ category_name: "" });
          handleCloseCat();
        },
      });
    }
  };

  const handleMemberChanges = () => {
    if (
      saveMemberDetails.member_name === "" ||
      saveMemberDetails.email_id === "" ||
      saveMemberDetails.phone_no === ""
    ) {
      toast.error("There is some empty space");
    } else {
      const payload = {
        member_name: saveMemberDetails.member_name,
        email_id: saveMemberDetails.email_id,
        phone_no: saveMemberDetails.phone_no,
        member_photo_url: "string",
        member_type_id: 1,
      };
      updateMemberDetails({
        payload,
        callBack: (response) => {
          toast.success("Member Successful created");
          setUpdatedCat({ category_name: "" });
          handleCloseCat();
        },
      });
    }
  };
  const handleSubCatChanges = () => {
    const selectedValue = selectedCategory.category_id;
    if (subCategory === "" || selectedValue === "") {
      toast.error("Sub Category not be empty");
    } else {
      const userId = JSON.parse(localStorage.getItem("loggedInUser")).user_id;
      const payload = {
        category_name: subCategory,
        sub_category_type: "Y",
        created_by: userId,
        main_category_id: selectedValue,
      };
      createSubCategory({
        payload,
        callBack: (response) => {
          setUpdatedCat({ category_name: "" })
          handleCloseCat();
          toast.success("Category created successfully!");
        },
      });
    }
  };

  const handleWebinarChanges = () => {
    const payload = {
      title: webinarstitle,
      url: webinarsurl,
      start_date: startValue,
      End_date: endvalue,
      display_locations: "webinarsDisplayLocation",
      created_by: 1,
      active_status: "Y",
      createdAt: "2024-09-16T10:04:53.927Z",
      UpdatedAT: "2024-09-16T10:10:23.149Z",
    };

    addwebinar({
      payload,
      callBack: (response) => {
        setUpdatedCat({ category_name: "" });
        handleCloseCat();
        toast.success("Webinar created successfully!");
      },
    });
  };

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

   const handleBlogInputChange = (e, type) => {
      let typedValues = Object.assign({}, addBlogDetails);
      if (type == "description") {
        typedValues.description = e;
      } else if (type == "displayLocation") {
        typedValues.display_locations = e;
      } else if (type == "title") {
        typedValues.title = e;
      }
      typedValues.created_by = JSON.parse(
        localStorage.getItem("loggedInUser")
      ).user_id;
      setAddBlogDetails(typedValues);
    };
    const handleSaveBlog = () => {
      // setPopForBlog(false);
      setLoaderState(true);
      postBlog({
        payload: addBlogDetails,
        callBack: (response) => {
          // loaderState
          toast.success("Blog posted Successfully", {
            autoClose: 500,
          });
          setLoaderState(false);
          setPopForBlog(false);
          handleCloseCat();
        },
      });
    };
  
  return (
    <React.Fragment>
       {console.log(cat, "cat")}
      <Dialog
        open={hideCatConfig}
        onClose={handleCloseCat}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            setUpdatedCat({ category_name: "" });
            handleCloseCat();
          },
        }}
        className="configurationDialog"
        // sx={{maxWidth: 6999}}
      >
        <DialogTitle style={{ display: "flex", flexDirection: "row" }}>
          <Typography style={{ width: "100%", fontSize: "1.3rem" }}>
            Add {selectedConfigValue}
          </Typography>{" "}
          <CloseIcon
            className="closeHover"
            onClick={() => {
              setUpdatedCat({ category_name: "" });
              handleCloseCat();
            }}
          />
        </DialogTitle>

        <DialogContent className="confiDivider">
          {selectedConfigValue === "Category" ? (
            <>
              <DialogContent dividers>
                {CommonTypography(
                  {
                    fontWeight: 600,
                    label: "Category",
                  },
                  (Option = {
                    className: "addCatHeadingCat",
                  })
                )}
                {commonTextField(
                  {
                    id: "fullWidth",
                    className: "BoxShadow addCatTextFieldCat",
                    inputClassName: "textField",
                    labels: "Enter Category Name",
                  },
                  (Option = {
                    handleInput: handleInput,
                    type: "description",
                    value: updatedCat.category_name,
                  })
                )}
              </DialogContent>
            </>
          ) : selectedConfigValue === "Duration" ? (
            <>
              <DialogContent dividers>
                {CommonTypography(
                  {
                    fontWeight: 600,
                    label: "Duration",
                  },
                  (Option = {
                    className: "addCatHeading",
                  })
                )}
                {commonTextField(
                  {
                    id: "fullWidth",
                    className: "BoxShadow-Duration addCatTextField",
                    inputClassName: "textField",
                    labels: "Enter Duration",
                  },
                  (Option = {
                    handleInput: handleInput,
                    type: "duration",
                  })
                )}
              </DialogContent>
            </>
          ) : selectedConfigValue === "SubCategory" ? (
            <>
              <DialogContent dividers>
                <div>
                  {CommonTypography(
                    {
                      fontWeight: 600,
                      label: "Category",
                    },
                    (Option = {
                      className: "addCatHeading",
                    })
                  )}
                  <FormControl sx={{ width: 540 }}>
                    <Select
                      value={catdata.category_name}
                      onChange={(e) => handleChange(e)}
                      className="addCatTextField "
                    >
                    
               {catdata.map((item) => (
                        <MenuItem key={item._id} value={item}>
                          {item.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {CommonTypography(
                      { fontWeight: 600, label: "Sub Category" },
                      (Option = {
                        className: "addCatHeading",
                      })
                    )}
                    {commonTextField(
                      {
                        id: "fullWidth",
                        className: "BoxShadow-ACat addCatTextField ",
                        inputClassName: "textField PaddingOnly",
                        // labels: "Sub Category",
                      },
                      (Option = {
                        handleInput: handleInput,
                        type: "SubCategory",
                      })
                    )}
                  </FormControl>
                </div>
              </DialogContent>
            </>
          ) : selectedConfigValue === "AddBlog" ? (
            <>
              <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Paper
                sx={(theme) => ({
                  p: 2,
                  margin: "auto",
                  // maxWidth: 1000,
                  flexGrow: 5,
                  backgroundColor: "#fff",
                  ...theme.applyStyles("dark", {
                    backgroundColor: "#1A2027",
                  }),
                })}
              >
                <Grid spacing={1}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box>
                      Title
                      <TextField
                        fullWidth
                        placeholder="title"
                        id="fullWidth"
                        sx={{ mt: 1, mb: 2 }}
                        onChange={(e) =>
                          handleBlogInputChange(e.target.value, "title")
                        }
                      />
                    </Box>
                    <Box>
                      Description
                      <TextField
                        inputProps={{ className: "textField" }}
                        fullWidth
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        placeholder="Enter course description"
                        className="DescBoxShadow"
                        // value={storedBasicInfo.Description}
                        onChange={(e) =>
                          handleBlogInputChange(e.target.value, "description")
                        }
                      />
                    </Box>
                    <Box mt={2}>
                      Display Locations
                      <TextField
                        fullWidth
                        placeholder="title"
                        id="fullWidth"
                        sx={{ mt: 1, mb: 2 }}
                        onChange={(e) =>
                          handleBlogInputChange(
                            e.target.value,
                            "displayLocation"
                          )
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12}>
                    {/* <Box > */}
                    {/* <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      class="rounded-circle mr-1"
                      alt="William Harris"
                      width="270"
                      height="365"
                    /> */}
                    {/* </Box> */}
                    <div {...getIntroVideoRootProps({ className: "dropzone" })}>
                      <input {...getIntroVideoInputProps()} />
                      <Box className="thumbnailUpload">
                        <Typography
                          sx={{ marginTop: "3%" }}
                          className="fontRecommend"
                        ></Typography>
                        {/* <LoaderComponent loaderState={loaderState} /> */}
                        {imgUpload === "" && addBlogDetails?.image_url && (
                          <img
                            src={addBlogDetails?.image_url}
                            width="270"
                            height="365"
                          />
                        )}
                        {imgUpload != "" && (
                          <img
                            src={addBlogDetails?.image_url}
                            width={140}
                            height={"auto"}
                          />
                        )}
                        <Button
                          component="label"
                          variant="outlined-multiline-static"
                          startIcon={<UploadIcon className="iconThumbicon" />}
                          className="iconThumb"
                        >
                          Upload Thumbnail Image
                        </Button>
                      </Box>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </DialogContentText>
          </DialogContent>
            </>
          ) : selectedConfigValue === "Webinar" ? (
            <>
              <DialogContent dividers>
                {CommonTypography({ fontWeight: 600, label: "Title" })}
                <TextField
                  fullWidth
                  placeholder="title"
                  id="fullWidth"
                  sx={{ mt: 1, mb: 2 }}
                  onChange={handleTitleChange}
                />
                <Typography>{webinarstitle}</Typography>
                {CommonTypography({ fontWeight: 600, label: "Url" })}
                <TextField
                  fullWidth
                  placeholder="Url"
                  id="fullWidth"
                  sx={{ mt: 1, mb: 2 }}
                  onChange={handleUrlChange}
                />
                <div className="flexrow mt4">
                  <div className="flexcol">
                    {CommonTypography({ fontWeight: 600, label: "Start Date" })}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DateTimePicker", "DateTimePicker"]}
                        sx={{ minWidth: 200 }}
                      >
                        <DateTimePicker
                          value={startValue}
                          onChange={(newValue) => setStartValue(newValue)}
                          sx={{ minWidth: 200 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="flexcol ml2">
                    {CommonTypography({ fontWeight: 600, label: "End Date" })}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DateTimePicker", "DateTimePicker"]}
                        // sx={{maxWidth: 100}}
                      >
                        <DateTimePicker
                          value={endvalue}
                          onChange={(newValue) => setEndvalue(newValue)}
                          sx={{ maxWidth: 20 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
                {/* {CommonTypography(
                  { fontWeight: 600, label: "Display Locations" },
                  (Option = {
                    className: "addCatHeading",
                  })
                )}
                <TextField
                  fullWidth
                  placeholder="Display Locations"
                  id="fullWidth"
                  sx={{ mt: 1, mb: 2 }}
                  onChange={handleDisplayLocationChange}
                /> */}
              </DialogContent>
            </>
          ) : (
            <>
              <DialogContent dividers>
                {CommonTypography(
                  { fontWeight: 600, label: "Add Member" },
                  (Option = {
                    className: "addCatHeading",
                  })
                )}
                {commonTextField(
                  {
                    id: "fullWidth",
                    className: "BoxShadow addCatTextField",
                    inputClassName: "textField",
                    labels: "Enter Member name",
                  },
                  (Option = {
                    handleInput: handleInput,
                    type: "memberName",
                  })
                )}
                <div className="flexrow mt4">
                  <div className="flexcol">
                    {CommonTypography(
                      { fontWeight: 600, label: "Email ID" },
                      (Option = {
                        className: "addCatHeading",
                      })
                    )}
                    {commonTextField(
                      {
                        className: "BoxShadow addCatTextField",
                        inputClassName: "textField",
                        labels: "Enter Email name",
                      },
                      (Option = {
                        handleInput: handleInput,
                        type: "emailId",
                      })
                    )}
                  </div>
                  <div className="flexcol ml2">
                    {CommonTypography(
                      { fontWeight: 600, label: "Phone No." },
                      (Option = {
                        className: "addCatHeading",
                      })
                    )}
                    {commonTextField(
                      {
                        id: "fullWidth",
                        className: "BoxShadow addCatTextField width100",
                        inputClassName: "textField",
                        labels: "Enter Phone No.",
                      },
                      (Option = {
                        handleInput: handleInput,
                        type: "phoneNo",
                        inputType: "number",
                        value: saveMemberDetails.phone_no,
                      })
                    )}
                  </div>
                 
                </div>
                <div className="UploadBttons">
                  <div {...getMobileImageRootProps({ className: "dropzone" })}>
                    <input {...getMobileImageInputProps()} />
                    <Button variant="outlined">
                      <AddCircleOutlineRoundedIcon /> <span style={{ marginLeft: "1%" }}>Upload Team Member Image</span>
                    </Button>
                  </div>
                  <Typography
                    sx={{ mt: 2, fontSize: "0.7rem", color: "grey" }}
                  >
                    *We recommend uploading an image in 942*510 pixels
                    resolution
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
                    {imagePreviewsMobile.map((src, index) => (
                      <Box key={index} sx={{ position: "relative", mr: 2, mb: 2 }}>
                        <img src={src} alt={`Mobile Preview ${index}`} width="140" height={"auto"} />
                      </Box>
                    ))}
                  </Box>
                </div>
              </DialogContent>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleCloseCat}
            sx={{
              borderColor: "red",
              color: "red",
              textTransform: "none",
              marginRight: "12px",
              padding: "3px 0px",
            }}
          >
            Cancel
          </Button>
          {selectedConfigValue === "Category" ? (
            <>
              <Button
                sx={{
                  textTransform: "none",
                  padding: "3px 0px",
                  marginRight: "16px",
                }}
                variant="outlined"
                onClick={handleConfigChanges}
              >
                Save
              </Button>
            </>
          ) : selectedConfigValue === "Duration" ? (
            <>
              <Button
                sx={{
                  textTransform: "none",
                  padding: "3px 0px",
                  marginRight: "16px",
                }}
                variant="outlined"
                onClick={handleDurationChanges}
              >
                Save
              </Button>
            </>
          ) : selectedConfigValue === "SubCategory" ? (
            <>
              <Button
                sx={{
                  textTransform: "none",
                  padding: "3px 0px",
                  marginRight: "16px",
                }}
                variant="outlined"
                onClick={handleSubCatChanges}
              >
                Save
              </Button>
            </>
          ) : selectedConfigValue === "Webinar" ? (
            <>
              <Button
                sx={{
                  textTransform: "none",
                  padding: "3px 0px",
                  marginRight: "16px",
                }}
                variant="outlined"
                onClick={handleWebinarChanges}
              >
                Save
              </Button>
            </>
          ) : selectedConfigValue === "AddBlog" ? (
            <>
              <Button
                sx={{
                  textTransform: "none",
                  padding: "3px 0px",
                  marginRight: "16px",
                }}
                variant="outlined"
                onClick={handleSaveBlog}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={{
                  textTransform: "none",
                  padding: "3px 0px",
                  marginRight: "16px",
                }}
                variant="outlined"
                onClick={handleMemberChanges}
              >
                Save
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* <ToastContainer /> */}
    </React.Fragment>
  );
}

export default Configuration;
