import {
  Box,
  Typography,
  TextField,
  Input,
  Dialog,
  IconButton,
  Chip,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import AddLinkIcon from "@mui/icons-material/AddLink";
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
  getBatch,
  getCategory,
  getSubcategoryList,
  getTeam,
  uploadFile,
} from "../ActionFactory/apiActions";
import { useDropzone } from "react-dropzone";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import LoaderComponent from "../../Util/LoaderComponent";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CancelIcon from "@mui/icons-material/Cancel";
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
// let acceptTypes;
const CreateForm = ({ handleTrackerPage, handleInputChange, courseData }) => {
  const [hideValidationTickName, sethideValidationTickName] = useState(false);
  const [hideValidationTickDesc, sethideValidationTickDesc] = useState(false);
  const [storedBasicInfo, setStoredBasicInfo] = useState({
    Name: "",
    Description: "",
    Category: "",
    subCategory: "",
    thumbnail_path_desktop: null,
    thumbnail_path_mobile: null,
    thumbnail_video_path: null,
    thumbnail_video_description: null,
    team_member_id: "",
  });
  const [imgUpload, setImageWhileUpload] = useState("");
  const [cat, setCat] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [selectedCategoryList, setSelectedcategoryList] = useState("");
  const [loaderState, setLoaderState] = useState(false);
  const [teamMember, setTeamMember] = useState([]);
  const [selectedTeamMemberName, setSelectedTeamMemberName] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [batchList, setBatchList] = useState([])
  const [link, setLink] = useState("");
  const [inputLink, setInputLink] = useState("");
  const [batchValue, setBatchValue] = useState("")
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  let acceptType;

  const onInroVideoDrop = async (files) => {
    const maxSize = 40 * 1024 * 1024;
    let payload = new FormData();
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        toast?.error(`File "${file?.name}" exceeds the 40MB limit.`);
        return false;
      }
      payload.append("file", files[0], files[0]?.name);
      return payload;
    });
    if (validFiles.length > 0) {
      let storedValues = Object.assign({}, storedBasicInfo);
      setLoaderState(true);
      uploadFile({
        payload,
        callBack: (response) => {
          if (acceptType === "desktop") {
            storedValues.thumbnail_path_desktop = response?.data?.path;
          } else if (acceptType === "mobile") {
            storedValues.thumbnail_path_mobile = response?.data?.path;
          } else if (acceptType === "video") {
            storedValues.thumbnail_video_path = response?.data?.path;
          }
          console.log("introo", storedValues)
          setStoredBasicInfo(storedValues);
          setLoaderState(false);
        },
      });
    }
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
    },
  });

  const {
    getRootProps: getIntroVideoTypeRootProps,
    getInputProps: getIntroVideoTypeFormatRootProps,
  } = useDropzone({
    onDrop: onInroVideoDrop,
    onChange: (event) => console.log(event),
    accept: { "video/mp4": [".mp4"] },
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
    getBatch({
      callBack: (response) => {
        const { data } = response
        if (data) {
          setBatchList(data);
        } else {
          setBatchList([])
        }
      }
    })
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
      // console.log("curse Data--->",courseData.teamMembers[0].member_name )
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

      storedValues.thumbnail_path_desktop = courseData?.thumbnail_path_desktop;
      storedValues.thumbnail_path_mobile = courseData?.thumbnail_path_mobile;
      storedValues.thumbnail_video_path = courseData?.thumbnail_video_path;
      setLink(courseData?.thumbnail_video_description);
      if (courseData?.team_member_id) {
        const presentTeamMembers = teamMember.filter(member => courseData?.team_member_id.includes(member.member_id));

        setSelectedTeamMemberName(presentTeamMembers);
      }

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
      if (value.length >= 11) {
        sethideValidationTickDesc(true);
      } else {
        sethideValidationTickDesc(false);
      }
    } else if (type === "category") {
      storedValues.Category = value;
    } else if (type === "subCategory") {
      storedValues.subCategory = value;
    } else if (type == "file") {
      storedValues.thumbnail_path_desktop = value[0];
      storedValues.thumbnail_path_mobile = value[0];
      storedValues.thumbnail_video_path = value[0];
    } else if (type === "link") {
      storedValues.thumbnail_video_description = value;
    } else if (type === "teamMember") {
      if(value.length){
      const memberIds = value.map(member => member.member_id);

      storedValues.team_member_id = memberIds
      }
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


  const handleChangeOnTeamMember = (event) => {
    setSelectedTeamMemberName(event.target.value);
    handleInput(event.target.value,"teamMember")
  };
  const handleDelete = (memberToDelete) => {
    setSelectedTeamMemberName((prev) =>
      prev.filter((member) => member.member_id !== memberToDelete.member_id)
    );
    setTimeout(() => {
      
    handleInput(selectedTeamMemberName,"teamMember")
    }, 2000);
  };
  const handleUpload = (type) => {
    acceptType = type;
  };

  const handleClick = (event) => {
    console.log("event---->", event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddLink = () => {
    if (inputLink.trim()) {
      setLink(inputLink);
      handleInput(inputLink, "link");
      setInputLink("");
      handleClose();
    }
  };
  const handleBatchChange = (event) => {
    console.log(event?.target?.value)
    setBatchValue(event?.target?.value)
  }
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
          sx: { marginTop: "5%" },
          label: "Description",
        })}

        {hideValidationTickDesc && (
          <CheckCircleRoundedIcon className="RightTick" />
        )}
      </div>

      <ReactQuill
        value={storedBasicInfo?.Description}
        onChange={(event) => handleInput(event, "description")}
        placeholder="Enter course description..."
        className="custom-editor"
        multiline
        rows={4}
        fullWidth
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
          ],
        }}
      />
      {CommonTypography({
        fontWeight: 600,
        sx: { marginTop: "5%" },
        label: "Add Thumbnail",
      })}

      <Box className="categoryBox">
        <div {...getIntroVideoRootProps({ className: "dropzone" })}>
          <input {...getIntroVideoInputProps()} />
          <Box className="thumbnailUpload">
            <Button
              component="label"
              variant="outlined-multiline-static"
              startIcon={<UploadIcon className="iconThumbicon" />}
              className="iconThumb"
              onClick={() => handleUpload("desktop")}
            >
              Upload Desktop Image
            </Button>
            <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
              Recommended Image size : <b>800px x 600px, PNG or JPEG file</b>
            </Typography>
            <LoaderComponent loaderState={loaderState} />
            {imgUpload === "" && storedBasicInfo?.thumbnail_path_desktop && (
              <img
                src={storedBasicInfo?.thumbnail_path_desktop}
                width={140}
                height={"auto"}
              />
            )}
            {imgUpload != "" && (
              <img
                src={storedBasicInfo?.thumbnail_path_desktop}
                width={140}
                height={"auto"}
              />
            )}
          </Box>
        </div>

        <Box sx={{ marginTop: "1%" }}>
          <div {...getIntroVideoRootProps({ className: "dropzone" })}>
            <input {...getIntroVideoInputProps()} />
            <Box className="rightCat">
              <Box>
                <Button
                  component="label"
                  variant="outlined-multiline-static"
                  startIcon={<UploadIcon className="iconThumbicon" />}
                  className="iconThumb"
                  onClick={() => handleUpload("mobile")}
                >
                  Upload Mobile Image
                </Button>
                <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
                  Recommended Image size :{" "}
                  <b>800px x 600px, PNG or JPEG file</b>
                </Typography>
                <LoaderComponent loaderState={loaderState} />
                {imgUpload === "" && storedBasicInfo?.thumbnail_path_mobile && (
                  <img
                    src={storedBasicInfo?.thumbnail_path_mobile}
                    width={140}
                    height={"auto"}
                  />
                )}
                {imgUpload != "" && (
                  <img
                    src={storedBasicInfo?.thumbnail_path_mobile}
                    width={140}
                    height={"auto"}
                  />
                )}
              </Box>
            </Box>
          </div>
        </Box>
      </Box>

      {CommonTypography({
        fontWeight: 600,
        sx: { marginTop: "5%" },
        label: "Add Video Or Link",
      })}
      <Box className="categoryBox">
        <div {...getIntroVideoTypeRootProps({ className: "dropzone" })}>
          <input {...getIntroVideoTypeFormatRootProps()} />
          <Box className="thumbnailUpload">
            <Button
              component="label"
              variant="outlined-multiline-static"
              startIcon={<UploadIcon className="iconThumbicon" />}
              className="iconThumb"
              onClick={() => handleUpload("video")}
            >
              Upload Video
            </Button>
            <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
              Recommended Image size : <b>800px x 600px, PNG or JPEG file</b>
            </Typography>
            <LoaderComponent loaderState={loaderState} />
            {imgUpload === "" && storedBasicInfo?.thumbnail_video_path && (
              <video width="140" height="auto" controls>
                <source
                  src={storedBasicInfo?.thumbnail_video_path}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
            {imgUpload != "" && (
              <img
                src={storedBasicInfo?.thumbnail_video_path}
                width={140}
                height={"auto"}
              />
            )}
          </Box>
        </div>

        <Box sx={{ marginTop: "1%" }}>
          <Box className="rightCat">
            <Box>
              <Button
                startIcon={<AddLinkIcon />}
                onClick={handleClick}
                variant="text"
              >
                Add Link
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <div style={{ padding: "16px" }}>
                  <TextField
                    label="Enter Link"
                    variant="outlined"
                    size="small"
                    value={inputLink}
                    onChange={(e) => setInputLink(e.target.value)}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddLink}
                    style={{ marginTop: "8px" }}
                  >
                    Add Link
                  </Button>
                </div>
              </Popover>

              <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
                Recommended Image size : <b>800px x 600px, PNG or JPEG file</b>
              </Typography>
              <LoaderComponent loaderState={loaderState} />
              <div style={{ marginTop: "16px" }}>
                {link && (
                  <p>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#0073e6", textDecoration: "none" }}
                    >
                      {link}
                    </a>
                  </p>
                )}
              </div>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ marginTop: "5%" }} className="categoryBox">
        <Box>
          {CommonTypography(
            { fontWeight: 600, label: "Add Faculty Name" },
            (Option = {
              className: "editFirstText",
            })
          )}
          <FormControl sx={{ m: 1, minWidth: 240 }} className="categorySelect">
            <Select
              multiple
              value={selectedTeamMemberName}
              // label="Faculty Name"
              onChange={handleChangeOnTeamMember}
              // input={<OutlinedInput label="Select Faculty Name" />}
              renderValue={(selected) => (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {selected.map((member) => (
                    <Chip key={member._id} label={member.member_name} onDelete={() => handleDelete(member)}
                    deleteIcon={<CancelIcon />}
       />
                  ))}
                </div>
              )}
            >
              {teamMember
        .filter((item) => !selectedTeamMemberName.includes(item)) // Filter out already selected members
        .map((item) => (
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
              onChange={handleBatchChange}
              value={batchValue}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {batchList?.map(data => <MenuItem value={data}>
                {data?.batch_name}
              </MenuItem>)}
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
