import { Box, Typography, TextField, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import { ToastContainer, toast } from "react-toastify";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  CommonTypography,
  commonButton,
  commonTextField,
} from "../../Util/CommonFields";
import { getCategory, getSubcategoryList } from "../ActionFactory/apiActions";
import { useDropzone } from "react-dropzone";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { redirectRestriction } from "../../Util/RedirectRestriction";
import InputLabel from '@mui/material/InputLabel';

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
    thumbnailPath: null,
  });
  const [imgUpload, setImageWhileUpload] = useState("");
  const [cat, setCat] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [selectedCategoryList, setSelectedcategoryList] = useState("");
  const navigate = useNavigate();

  const onInroVideoDrop = async (files) => {
    console.log(files);
    let storedValues = Object.assign({}, storedBasicInfo);
    storedValues.thumbnailPath = files[0];
    await getBase64(files) // `file` your img file
      .then((res) => {
        setImageWhileUpload(res.split(",")[1]);
      }) // `res` base64 of img file
      .catch((err) => console.log(err));
    setStoredBasicInfo(storedValues);
  };

  const {
    getRootProps: getIntroVideoRootProps,
    getInputProps: getIntroVideoInputProps,
  } = useDropzone({
    onDrop: onInroVideoDrop,
    onChange: (event) => console.log(event),
    accept: "image/jpeg, image/png, image/jpg, application/pdf",
  });

  useEffect(() => {
    // if (redirectRestriction()) {
      getCategory({
        callBack: (response) => {
          const userCallBack = response?.data;
          setCat(userCallBack);
        },
        error: (error) => {
          toast.error(error.message);
        },
      });
    // } else {
    //   navigate("/admin");
    // }
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
            setSelectedcategoryList(24); //added to enable sub category
            response.data.map((item) => {
              if (item.category_id === courseData?.sub_category_id) {
                storedValues.subCategory = item;
              }
            });
          },
        });
      }

      storedValues.thumbnailPath = courseData?.thumbnail_path;
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
      storedValues.thumbnailPath = value[0];
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
      storedBasicInfo.Category === ""
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
      toast.error("Category Should not be less then 3 character", {
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
    getSubcategoryList({
      mainCatID,
      callBack: (response) => {
        setSubCategoryList(response.data);
        setSelectedcategoryList(e?.target?.value);
      },
    });
  };
  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(new Blob(file));
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }

  const handleChangeOnSubCat = (e) => {
    let mainSubCatID = e?.target?.value;
    handleInput(mainSubCatID, "subCategory");
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
          className: "BoxShadow",
          inputClassName: "textField",
          labels: "Enter course name",
        },
        (Option = {
          handleInput: handleInput,
          type: "name",
          value: storedBasicInfo.Name,
        })
      )}
      <div className="FlexRow">
        {CommonTypography({
          fontWeight: 600,
          sx: { marginTop: "5%" },
          label: "Description",
        })}

        {hideValidationTickDesc && <DoneIcon className="RightTick" />}
      </div>
      <TextField
        inputProps={{ className: "textField" }}
        fullWidth
        id="outlined-multiline-static"
        multiline
        rows={4}
        placeholder="Enter course description area"
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
        <Box className="thumbnailUpload">
          <Button
            component="label"
            variant="outlined-multiline-static"
            startIcon={<UploadIcon className="iconThumbicon" />}
            className="iconThumb"
          >
            Upload Thumbnail Image
          </Button>
          <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
            Recommended Image size : <b>800px x 600px, PNG or JPEG file</b>
          </Typography>
          <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
            {storedBasicInfo?.thumbnailPath?.name}
          </Typography>
          {imgUpload === "" && storedBasicInfo?.thumbnailPath && (
            <img
              src={`data:image/png;base64,${storedBasicInfo?.thumbnailPath}`}
              width={140}
              height={"auto"}
            />
          )}
          {imgUpload != "" && (
            <img
              src={`data:image/png;base64,${imgUpload}`}
              width={140}
              height={"auto"}
            />
          )}
        </Box>
      </div>

      <Box className="divider"></Box>
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
              label="Category"
              value={storedBasicInfo?.Category}
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
          <InputLabel >Select Sub Category</InputLabel>
            <Select
              label="Sub Category"
              value={storedBasicInfo?.subCategory}
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
        label: "Edit price",
      })}
      <ToastContainer />
    </div>
  );
};
export default CreateForm;
