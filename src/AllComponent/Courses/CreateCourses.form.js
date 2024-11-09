import {
  Box,
  Typography,
  TextField,
  Input,
  Dialog,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  CommonTypography,
  commonButton,
  commonTextField,
} from "../../Util/CommonFields";
import {
  getCategory,
  getSubcategoryList,
  getTeam,
  uploadFile,
} from "../ActionFactory/apiActions";
import { useDropzone } from "react-dropzone";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import LoaderComponent from "../../Util/LoaderComponent";
import DialogContent from "@mui/material/DialogContent";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import CloseIcon from "@mui/icons-material/Close";

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

const CreateForm = ({ handleTrackerPage, handleInputChange, courseData }) => {
  const [hideValidationTickName, sethideValidationTickName] = useState(false);
  const [hideValidationTickDesc, sethideValidationTickDesc] = useState(false);
  const [storedBasicInfo, setStoredBasicInfo] = useState({
    Name: "",
    Description: "",
    Category: "",
    subCategory: "",
    thumbnailPathForDeskTop: null,
    thumbnailPathForMobile: null,
    thumbnailPathForVideo: null,
    team_member_id: "",
  });
  const [imgUpload, setImageWhileUpload] = useState("");
  const [cat, setCat] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [selectedCategoryList, setSelectedcategoryList] = useState("");
  const [loaderState, setLoaderState] = useState(false);
  const [teamMember, setTeamMember] = useState([]);
  const [selectedTeamMemberName, setSelectedTeamMemberName] = useState("");
  const [videoopened, setVideoqopen] = useState(false);
  const [url, setUrl] = useState({ left: false });
  const [showVideoDialog, setShowVideoPopUp] = useState(false);
  let uploadType = "";

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const onInroVideoDrop = async (files) => {
    console.log("upload typw====--->", uploadType);
    let payload = new FormData();
    payload.append("file", files[0], files[0]?.name);
    let storedValues = Object.assign({}, storedBasicInfo);
    setLoaderState(true);
    uploadFile({
      payload,
      callBack: (response) => {
        if (uploadType === "desktop") {
          storedValues.thumbnailPathForDeskTop = response?.data?.path;
        } else if (uploadType === "mobile") {
          storedValues.thumbnailPathForMobile = response?.data?.path;
        } else if (uploadType === "video") {
          storedValues.thumbnailPathForVideo = response?.data?.path;
        }

        setStoredBasicInfo(storedValues);
        setLoaderState(false);
      },
    });
    // setStoredBasicInfo(storedValues);
  };
  const handleUploadType = (type) => {
    console.log("type-->", type);
    setShowVideoPopUp(true);
    uploadType = type;
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
    getCategory({
      callBack: (response) => {
        const userCallBack = response?.data;
        setCat(userCallBack);
      },
      error: (error) => {
        toast.error(error.message);
      },
    });
    getTeam({
      callBack: (response) => {
        const userCallBack = response?.data;
        setTeamMember(userCallBack);
      },
      error: (error) => {
        toast.error(error.message);
      },
    });
  }, []);

  useEffect(() => {
    if (courseData !== "") {
      let storedValues = Object.assign({}, storedBasicInfo);
      storedValues.Name = courseData?.course_name;
      if (storedValues.Name?.length >= 4) {
        sethideValidationTickName(true);
      }
      storedValues.Description = courseData?.description;
      if (storedValues.Description?.length >= 4) {
        sethideValidationTickDesc(true);
      }
      cat.map((item) => {
        if (item.category_id === courseData?.category_id) {
          storedValues.Category = item;
        }
      });
      if (courseData?.category_id) {
        getSubcategoryList({
          mainCatID: courseData.category_id,
          callBack: (response) => {
            setSubCategoryList(response.data);

            // setSelectedcategoryList(24); //added to enable sub category
            let subCatLength = response.data.sub_category;
            if (subCatLength?.length === undefined) {
              setSelectedcategoryList();
            } else {
              setSelectedcategoryList(24); //added to enable sub category
            }
            response.data.map((item) => {
              if (item.category_id === courseData?.sub_category_id) {
                storedValues.subCategory = item;
              }
            });
          },
        });
      }

      storedValues.thumbnailPathForDeskTop = courseData?.thumbnail_path;
      storedValues.thumbnailPathForMobile = courseData?.thumbnail_path;

      setStoredBasicInfo(storedValues);
    }
  }, [courseData, cat]);

  const handleInput = (value, type) => {
    let storedValues = Object.assign({}, storedBasicInfo);
    if (/^\s/.test(value)) value = "";
    if (type === "name") {
      storedValues.Name = value;

      if (value.length >= 4) {
        sethideValidationTickName(true);
      } else {
        sethideValidationTickName(false);
      }
    } else if (type === "description") {
      storedValues.Description = value;
      if (value.length >= 4) {
        sethideValidationTickDesc(true);
      } else {
        sethideValidationTickDesc(false);
      }
    } else if (type === "category") {
      storedValues.Category = value;
    } else if (type === "subCategory") {
      storedValues.subCategory = value;
    } else if (type == "file") {
      storedValues.thumbnailPathForDeskTop = value[0];
      storedValues.thumbnailPathForMobile = value[0];
    }
    setStoredBasicInfo(storedValues);

    if (
      hideValidationTickDesc &&
      hideValidationTickName &&
      storedValues.Category
    ) {
      handleInputChange("basicInfo", storedValues);
    }
  };

  const handleEditPrice = () => {
    if (
      storedBasicInfo.Name?.length <= 3 &&
      storedBasicInfo.Description?.length <= 3 &&
      storedBasicInfo.Category === "" &&
      storedBasicInfo.team_member_id === ""
    ) {
      toast.error(
        "Name & Description & Category Should not be less then 3 character",
        {
          autoClose: 500,
        }
      );
    } else if (storedBasicInfo.Name?.length <= 3 || !storedBasicInfo.Name) {
      toast.error("Name Should not be less then 3 character", {
        autoClose: 500,
      });
    } else if (
      storedBasicInfo.Description?.length <= 3 ||
      !storedBasicInfo.Description
    ) {
      toast.error("Description Should not be less then 3 character", {
        autoClose: 500,
      });

      ///need to aaddd type the toster in common util file
    } else if (storedBasicInfo.Category === "") {
      toast.error("Please Select Category", {
        autoClose: 500,
      });
    } else if (storedBasicInfo.team_member_id === "") {
      toast.error("Please Select Team Member", {
        autoClose: 500,
      });
    } else {
      handleInputChange("basicInfo", storedBasicInfo);
      handleTrackerPage(1);
    }
  };

  const handleChangeOnCat = (e) => {
    let mainCatID = e?.target?.value?.category_id;
    handleInput(e?.target?.value, "category");
    let updatedSubValue = Object.assign({}, storedBasicInfo);
    updatedSubValue.subCategory = "";
    updatedSubValue.Category = e?.target?.value;

    setStoredBasicInfo(updatedSubValue);
    getSubcategoryList({
      mainCatID,
      callBack: (response) => {
        setSubCategoryList(response.data);

        if (response.data.length === 0) {
          setSelectedcategoryList("");
        } else {
          setSelectedcategoryList(e?.target?.value);
        }
      },
    });
  };

  const handleChangeOnSubCat = (e) => {
    let mainSubCatID = e?.target?.value;
    handleInput(mainSubCatID, "subCategory");
  };

  const handleChangeOnTeamMember = (e) => {
    let teamMemberId = Object.assign({}, storedBasicInfo);
    teamMemberId.team_member_id = e.target.value.member_id;
    setStoredBasicInfo(teamMemberId);
    setSelectedTeamMemberName(e.target.value.member_name);
  };

  const toggleDrawerUrl = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setVideoqopen(false);
    setUrl({ url, [anchor]: open });
  };

  const handleCloseVideoDialog = () => {
    setShowVideoPopUp(false);
  };

  return (
    <div className="formMain">
      <div className="FlexRow">
        {CommonTypography({ fontWeight: 600, label: "Name" })}
        {hideValidationTickName && (
          <CheckCircleRoundedIcon className="RightTick" />
        )}
      </div>
      {commonTextField(
        {
          id: "fullWidth",
          className: "BoxShadow mt2",
          inputClassName: "textField PaddingOnly",
          labels: "Enter course name",
        },
        (Option = {
          handleInput: handleInput,
          type: "name",
          value: storedBasicInfo.Name,
        })
      )}
      <div className="FlexRow" style={{ marginTop: "30px" }}>
        {CommonTypography({
          fontWeight: 600,
          // sx: { marginTop: "5%" },
          label: "Description",
        })}

        {hideValidationTickDesc && (
          <CheckCircleRoundedIcon className="RightTick" />
        )}
      </div>
      <TextField
        inputProps={{ className: "textField" }}
        fullWidth
        id="outlined-multiline-static"
        multiline
        rows={4}
        placeholder="Enter course description"
        className="DescBoxShadow"
        value={storedBasicInfo.Description}
        onChange={(event) => handleInput(event.target.value, "description")}
      />
      {CommonTypography({
        fontWeight: 600,
        sx: { marginTop: "5%" },
        label: "Add Thumbnail",
      })}
      <div {...getIntroVideoRootProps({ className: "dropzone" })}>
        <input {...getIntroVideoInputProps()} />
        <Box sx={{ marginTop: "5%" }} className="categoryBox">
          <Box>
            <Button
              component="label"
              variant="outlined-multiline-static"
              startIcon={<UploadIcon className="iconThumbicon" />}
              className="iconThumb"
              onClick={() => handleUploadType("desktop")}
            >
              Upload Desktop Image
            </Button>
            <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
              Recommended Image size : <b>800px x 600px, PNG or JPEG file</b>
            </Typography>
            <LoaderComponent loaderState={loaderState} />
            {imgUpload === "" && storedBasicInfo?.thumbnailPathForDeskTop && (
              <img
                src={storedBasicInfo?.thumbnailPathForDeskTop}
                width={140}
                height={"auto"}
              />
            )}
            {imgUpload != "" && (
              <img
                src={storedBasicInfo?.thumbnailPathForDeskTop}
                width={140}
                height={"auto"}
              />
            )}
          </Box>

          <Box className="rightCat">
            <Box>
              <Button
                component="label"
                variant="outlined-multiline-static"
                startIcon={<UploadIcon className="iconThumbicon" />}
                className="iconThumb"
                onClick={() => handleUploadType("mobile")}
              >
                Upload Mobile Image
              </Button>
              <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
                Recommended Image size : <b>800px x 600px, PNG or JPEG file</b>
              </Typography>
              <LoaderComponent loaderState={loaderState} />
              {imgUpload === "" && storedBasicInfo?.thumbnailPathForMobile && (
                <img
                  src={storedBasicInfo?.thumbnailPathForMobile}
                  width={140}
                  height={"auto"}
                />
              )}
              {imgUpload != "" && (
                <img
                  src={storedBasicInfo?.thumbnailPathForMobile}
                  width={140}
                  height={"auto"}
                />
              )}
            </Box>
          </Box>
        </Box>
      </div>
      {console.log(" upload type==>", uploadType)}
      {/* <Box className="divider"></Box> */}
      {CommonTypography({
        fontWeight: 600,
        sx: { marginTop: "5%" },
        label: "Add Video Description",
      })}
      <Box sx={{ marginTop: "5%" }} className="categoryBox">
        <Box>
          <Button
            component="label"
            variant="outlined-multiline-static"
            startIcon={<UploadIcon className="iconThumbicon" />}
            className="iconThumb"
            onClick={() => handleUploadType("video")}
          >
            Upload Video
          </Button>
          <LoaderComponent loaderState={loaderState} />
          {/* need to add new the p */}
          <BootstrapDialog
            onClose={handleCloseVideoDialog}
            aria-labelledby="customized-dialog-title"
            open={showVideoDialog}
          >
            <Dialog open={showVideoDialog}>
              <IconButton
                aria-label="close"
                onClick={handleCloseVideoDialog}
                sx={(theme) => ({
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: theme.palette.grey[500],
                })}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent>
                <Box className="VideoBox">
                  <UploadFileRoundedIcon className="VideoIcon" />
                  <div {...getIntroVideoRootProps({ className: "dropzone" })}>
                    <input {...getIntroVideoInputProps()} />
                    <Box className="videoDottedBorder">
                      <Typography gutterBottom className="UploadDoc">
                        <b> Upload Video(s)</b>
                      </Typography>
                      <Typography className="VideoPara">
                        You can upload upto 20 files at a time. Maximum file
                        size that can be attached is 40 MB.
                      </Typography>

                      <Box className="thumbnailUpload buttonBOx">
                        <Button
                          variant="contained"
                          className="SelectButton"
                          // onClick={handleCreateTeam}
                        >
                          Select File(s)
                        </Button>
                        <Typography
                          sx={{ marginTop: "3%" }}
                          className="fontRecommend"
                        >
                          Recommended Image size :{" "}
                          <b>800px x 600px, PNG or JPEG file</b>
                        </Typography>
                        <LoaderComponent loaderState={loaderState} />
                        {imgUpload === "" && storedBasicInfo?.thumbnailPathForVideo && (
                          <img
                            src={storedBasicInfo?.thumbnailPathForVideo}
                            width={140}
                            height={"auto"}
                          />
                        )}
                        {imgUpload != "" && (
                          <img
                            src={storedBasicInfo?.thumbnailPathForVideo}
                            width={140}
                            height={"auto"}
                          />
                        )}
                      </Box>
                    </Box>
                  </div>
                  <Box sx={{ marginTop: "12px" }}>Or</Box>
                  <Typography
                    className="orPasteURL"
                    onClick={toggleDrawerUrl("right", true)}
                  >
                    Paste URL
                  </Typography>
                </Box>
              </DialogContent>
            </Dialog>
          </BootstrapDialog>
        </Box>
        <Box className="rightCat">
          <Box>
            <p className="iconThumb">Add Video to see the description</p>{" "}
          </Box>
        </Box>
      </Box>
      {/* <Box className="divider"></Box> */}
      <Box sx={{ marginTop: "5%" }} className="categoryBox">
        <Box>
          {CommonTypography(
            { fontWeight: 600, label: "Add Team Memeber" },
            (Option = {
              className: "editFirstText",
            })
          )}
          <FormControl sx={{ m: 1, minWidth: 240 }} className="categorySelect">
            <Select
              value={
                selectedTeamMemberName !== ""
                  ? selectedTeamMemberName
                  : `Select Team Member`
              }
              renderValue={() => {
                return selectedTeamMemberName !== "" ? (
                  <Typography>{selectedTeamMemberName}</Typography>
                ) : (
                  <Typography> Select Team Member</Typography>
                );
              }}
              onChange={(e) => handleChangeOnTeamMember(e)}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {teamMember.map((item) => (
                <MenuItem key={item._id} value={item}>
                  {item.member_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box className="rightCat">
          {CommonTypography(
            { fontWeight: 600, label: "Add Batch" },
            (Option = {
              className: "editFirstText",
            })
          )}
          <FormControl sx={{ m: 1, minWidth: 240 }} className="categorySelect">
            <Select
              // value={
              //   storedBasicInfo?.subCategory
              //     ? storedBasicInfo?.subCategory
              //     : `Select Sub Category`
              // }
              // renderValue={() => {
              //   return storedBasicInfo.subCategory !== "" ? (
              //     <Typography>
              //       {storedBasicInfo?.subCategory?.category_name}
              //     </Typography>
              //   ) : (
              //     <Typography> Select Sub Category</Typography>
              //   );
              // }}
              // onChange={(e) => handleChangeOnSubCat(e)}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
              // disabled={selectedCategoryList === ""}
            >
              {/* {subCategoryList?.map((item) => ( */}
              <MenuItem>
                {/* {item.category_name} */}
                batch
              </MenuItem>
              {/* ))} */}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ marginTop: "5%" }} className="categoryBox">
        <Box>
          {CommonTypography(
            { fontWeight: 600, label: "Category" },
            (Option = {
              className: "editFirstText",
            })
          )}
          <FormControl sx={{ m: 1, minWidth: 240 }} className="categorySelect">
            <Select
              value={
                storedBasicInfo?.Category?.category_name
                  ? storedBasicInfo?.Category?.category_name
                  : `Select Category Type`
              }
              renderValue={() => {
                return storedBasicInfo?.Category !== "" ? (
                  <Typography>
                    {storedBasicInfo?.Category?.category_name}
                  </Typography>
                ) : (
                  <Typography> Select Category</Typography>
                );
              }}
              onChange={(e) => handleChangeOnCat(e)}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {cat.map((item) => (
                <MenuItem key={item._id} value={item}>
                  {item.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box className="rightCat">
          {CommonTypography(
            { fontWeight: 600, label: "Sub Category" },
            (Option = {
              className: "editFirstText",
            })
          )}
          <FormControl sx={{ m: 1, minWidth: 240 }} className="categorySelect">
            <Select
              value={
                storedBasicInfo?.subCategory
                  ? storedBasicInfo?.subCategory
                  : `Select Sub Category`
              }
              renderValue={() => {
                return storedBasicInfo.subCategory !== "" ? (
                  <Typography>
                    {storedBasicInfo?.subCategory?.category_name}
                  </Typography>
                ) : (
                  <Typography> Select Sub Category</Typography>
                );
              }}
              onChange={(e) => handleChangeOnSubCat(e)}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
              disabled={selectedCategoryList === ""}
            >
              {subCategoryList?.map((item) => (
                <MenuItem key={item.category_id} value={item}>
                  {item.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {commonButton({
        handleTrackerPage: () => handleEditPrice(),
        className: "coursesButton",
        label: "Save & Next",
      })}
      <ToastContainer />
    </div>
  );
};
export default CreateForm;
