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
  createCategory,
  createSubCategory,
  getCategory,
  updateDuration,
  updateMemberDetails,
} from "../ActionFactory/apiActions";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
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

function Configuration({ hideCatConfig, handleCloseCat, selectedConfigValue }) {
  const theme = useTheme();
  const [updatedCat, setUpdatedCat] = useState({});
  const [updatedDuration, setUpdatedDuration] = useState({});
  const [saveMemberDetails, setSaveMemberDetails] = useState({});
  const [subCategory, setSubCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState();
  const [cat, setCat] = useState([]);

  useEffect(() => {
    if (selectedConfigValue === "SubCategory") {
      getCategory({
        callBack: (response) => {
          const userCallBack = response?.data;
          setCat(userCallBack);
        },
        error: (error) => {
          toast.error(error.message);
        },
      });
    }
  }, []);

  const handleInput = (value, type) => {
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
        storedValues.phone_no = value;
      }
      setSaveMemberDetails(storedValues);
    } else if (type === "SubCategory") {
      setSubCategory(value);
    }
  };
  const handleConfigChanges = () => {
    const payload = {
      category_name: updatedCat.category_name,
      created_by: JSON.parse(localStorage.getItem("loggedInUser")).user_id,
      modiefied_by: JSON.parse(localStorage.getItem("loggedInUser")).user_id,
    };
    createCategory({ payload, callBack: (response) => {} });
  };
  const handleDurationChanges = () => {
    const payload = {
      duration_name: updatedDuration.duration_name,
      created_by: JSON.parse(localStorage.getItem("loggedInUser")).user_id,
      modiefied_by: JSON.parse(localStorage.getItem("loggedInUser")).user_id,
    };
    updateDuration({ payload, callBack: (response) => {} });
  };
  const handleMemberChanges = () => {
    const payload = {
      member_name: saveMemberDetails.member_name,
      email_id: saveMemberDetails.email_id,
      phone_no: saveMemberDetails.phone_no,
    };
    updateMemberDetails({ payload, callBack: (response) => {} });
  };
  const handleSubCatChanges = () => {
    const selectedValue = selectedCategory.category_id;
    const userId = JSON.parse(localStorage.getItem("loggedInUser")).user_id;
    const payload = {
      category_name: subCategory,
      sub_category_type: "Y",
      created_by: userId.user_id,
      main_categoty_id: selectedValue,
    };
    createSubCategory({ payload, callBack: (response) => {} });
  };
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  return (
    <React.Fragment>
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
            handleCloseCat();
          },
        }}
      >
        <div style={{display:"flex",flexDirection:"row"}}><DialogTitle>Add {selectedConfigValue}</DialogTitle> <CloseIcon /></div>

        <DialogContent>
          {selectedConfigValue === "Category" ? (
            <>
              {" "}
              {CommonTypography({
                fontWeight: 600,
                label: "Category",
                className: "addCatHeading",
              })}
              {commonTextField(
                {
                  id: "fullWidth",
                  className: "BoxShadow",
                  inputClassName: "textField",
                  labels: "Enter Category Description",
                },
                (Option = {
                  handleInput: handleInput,
                  type: "description",
                })
              )}
            </>
          ) : selectedConfigValue === "Duration" ? (
            <>
              {CommonTypography({
                fontWeight: 600,
                label: "Duration",
                className: "durationHeading",
              })}
              {commonTextField(
                {
                  id: "fullWidth",
                  className: "BoxShadow-Duration",
                  inputClassName: "textField",
                  labels: "Enter Duration",
                },
                (Option = {
                  handleInput: handleInput,
                  type: "duration",
                })
              )}
            </>
          ) : selectedConfigValue === "SubCategory" ? (
            <>
              <div>
                {CommonTypography({
                  fontWeight: 600,
                  label: "Category",
                  className: "subCatHeading",
                })}
                <FormControl sx={{ m: 1, width: 300, mt: 1 }}>
                  <Select
                    label="Category"
                    value={cat.category_name}
                    onChange={(e) => handleChange(e)}
                    input={<OutlinedInput />}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                    className="css-bdhsul-MuiTypography-root-MuiDialogTitle-root"
                  >
                    {cat.map((item) => (
                      <MenuItem key={item._id} value={item}>
                        {item.category_name}
                      </MenuItem>
                    ))}
                  </Select>
                  {CommonTypography({ fontWeight: 600, label: "Sub Category" })}
                  {commonTextField(
                    {
                      id: "fullWidth",
                      className: "BoxShadow-ACat",
                      inputClassName: "textField",
                      labels: "Sub Category",
                    },
                    (Option = {
                      handleInput: handleInput,
                      type: "SubCategory",
                    })
                  )}
                </FormControl>
              </div>
            </>
          ) : (
            <>
              {CommonTypography({ fontWeight: 600, label: "Add Member" })}
              {commonTextField(
                {
                  id: "fullWidth",
                  className: "BoxShadow",
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
                  {CommonTypography({ fontWeight: 600, label: "Email ID" })}
                  {commonTextField(
                    {
                      id: "fullWidth",
                      className: "BoxShadow",
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
                  {CommonTypography({ fontWeight: 600, label: "Phone No." })}
                  {commonTextField(
                    {
                      id: "fullWidth",
                      className: "BoxShadow",
                      inputClassName: "textField",
                      labels: "Enter Phone No.",
                    },
                    (Option = {
                      handleInput: handleInput,
                      type: "phoneNo",
                    })
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCat}>Cancel</Button>
          {selectedConfigValue === "Category" ? (
            <>
              <Button onClick={handleConfigChanges} type="submit">
                Save
              </Button>
            </>
          ) : selectedConfigValue === "Duration" ? (
            <>
              <Button onClick={handleDurationChanges} type="submit">
                Save
              </Button>
            </>
          ) : selectedConfigValue === "SubCategory" ? (
            <>
              <Button onClick={handleSubCatChanges} type="submit">
                Save
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleMemberChanges} type="submit">
                Save
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Configuration;
