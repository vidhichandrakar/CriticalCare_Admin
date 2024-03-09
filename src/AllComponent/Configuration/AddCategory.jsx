import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CommonTypography, commonTextField } from "../../Util/CommonFields";
import {
  createCategory,
  updateDuration,
  updateMemberDetails,
} from "../ActionFactory/apiActions";

function AddCategory({ hideCatConfig, handleCloseCat, selectedConfigValue }) {
  const [updatedCat, setUpdatedCat] = useState({});
  const [updatedDuration, setUpdatedDuration] = useState({});
  const [saveMemberDetails, setSaveMemberDetails] = useState({});

  const handleInput = (value, type) => {
    if (
      type === "description" ||
      type === "createdBy" ||
      type === "modifiedBy"
    ) {
      console.log("fisr if");
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
      console.log("Seckon if");
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
      console.log("tied if");
      let storedValues = Object.assign({}, saveMemberDetails);
      if (type === "memberName") {
        storedValues.member_name = value;
        console.log("tied menemese");
      } else if (type === "emailId") {
        console.log("mail if");
        storedValues.email_id = value;
      } else if (type === "phoneNo") {
        console.log("phone if");
        storedValues.phone_no = value;
      }
      setSaveMemberDetails(storedValues);
    }
  };
  const handleConfigChanges = () => {
    const payload = {
      category_name: updatedCat.category_name,
      created_by: updatedCat.created_by,
      modiefied_by: updatedCat.modiefied_by,
    };
    console.log("payloadpayload", payload);
    createCategory({ payload, callBack: (response) => {} });
  };
  const handleDurationChanges = () => {
    const payload = {
      duration_name: updatedDuration.duration_name,
      created_by: updatedCat.created_by,
      modiefied_by: updatedCat.modiefied_by,
    };
    console.log("payloadpayload", payload);
    updateDuration({ payload, callBack: (response) => {} });
  };
  const handleMemberChanges = () => {
    const payload = {
      member_name: saveMemberDetails.member_name,
      email_id: saveMemberDetails.email_id,
      phone_no: saveMemberDetails.phone_no,
    };
    console.log("payloadpayload", payload);
    updateMemberDetails({ payload, callBack: (response) => {} });
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
            console.log(email);
            handleCloseCat();
          },
        }}
      >
        {console.log("saveMemberDetails", saveMemberDetails)}
        {/* {console.log("updatedDuration", updatedDuration)}
        {console.log("updatedCat", updatedCat)} */}
        <DialogTitle>Add {selectedConfigValue}</DialogTitle>
        <DialogContent>
          {selectedConfigValue === "category" ? (
            <>
              {" "}
              {CommonTypography({ fontWeight: 600, label: "Category" })}
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
              {CommonTypography({ fontWeight: 600, label: "Created By" })}
              {commonTextField(
                {
                  id: "fullWidth",
                  className: "BoxShadow",
                  inputClassName: "textField",
                  labels: "Enter Created By",
                },
                (Option = {
                  handleInput: handleInput,
                  type: "createdBy",
                  //   value: storedBasicInfo.Name,
                })
              )}
              {CommonTypography({ fontWeight: 600, label: "Modified By" })}
              {commonTextField(
                {
                  id: "fullWidth",
                  className: "BoxShadow",
                  inputClassName: "textField",
                  labels: "Enter Modified By",
                },
                (Option = {
                  handleInput: handleInput,
                  type: "modifiedBy",
                  //   value: storedBasicInfo.Name,
                })
              )}
            </>
          ) : selectedConfigValue === "duration" ? (
            <>
              {CommonTypography({ fontWeight: 600, label: "Duration" })}
              {commonTextField(
                {
                  id: "fullWidth",
                  className: "BoxShadow",
                  inputClassName: "textField",
                  labels: "Enter Duration",
                },
                (Option = {
                  handleInput: handleInput,
                  type: "duration",
                  //   value: storedBasicInfo.Name,
                })
              )}
              {CommonTypography({ fontWeight: 600, label: "Created By" })}
              {commonTextField(
                {
                  id: "fullWidth",
                  className: "BoxShadow",
                  inputClassName: "textField",
                  labels: "Enter Created By",
                },
                (Option = {
                  handleInput: handleInput,
                  type: "createdBy",
                  //   value: storedBasicInfo.Name,
                })
              )}
              {CommonTypography({ fontWeight: 600, label: "Modified By" })}
              {commonTextField(
                {
                  id: "fullWidth",
                  className: "BoxShadow",
                  inputClassName: "textField",
                  labels: "Enter Modified By",
                },
                (Option = {
                  handleInput: handleInput,
                  type: "modifiedBy",
                  //   value: storedBasicInfo.Name,
                })
              )}
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
                  //   value: storedBasicInfo.Name,
                })
              )}
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
                  //   value: storedBasicInfo.Name,
                })
              )}
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
                  //   value: storedBasicInfo.Name,
                })
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCat}>Cancel</Button>
          {selectedConfigValue === "category" ? (
            <>
              <Button onClick={handleConfigChanges} type="submit">
                Save
              </Button>
            </>
          ) : selectedConfigValue === "duration" ? (
            <>
              <Button onClick={handleDurationChanges} type="submit">
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

export default AddCategory;
