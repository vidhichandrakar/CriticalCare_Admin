import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Box, TableFooter, TextField } from "@mui/material";
import { Formik, Form, useFormik } from "formik";
import { isEmptyObject, isNotEmptyObject } from "../../../Util/CommonUtils";
import { resetpass } from "../../ActionFactory/apiActions";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Md5Converter } from "../../../Util/md5Convertor";
import { ToastContainer, toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function RedBar() {
  return (
    <Box
      sx={{
        height: 25,
        width: "30vw",
      }}
    />
  );
}

const ResetPassword = ({ handleClickClosereset, opened }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userid = JSON.parse(localStorage.getItem("loggedInUser"));
  const user_id = userid.user_id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleOldChange = (e) => {
    setOldPassword(e.target.value);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.", {
        autoClose: 1500,
      });
      return;
    }

    if (!validatePassword(newPassword)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
        {
          autoClose: 5000,
        }
      );
      return;
    }
    if (oldPassword === newPassword) {
      toast.error("NewPassWord does not match with OldPassWord", {
        autoClose: 2000,
      });
      return;
    }

    setError("");

    try {
      const payload = {
        oldPassword: Md5Converter(oldPassword),
        newPassword: Md5Converter(newPassword),
      };
      resetpass({
        payload,
        user_id,
        callBack: (response) => {
          toast.success("Password changed Successful", {
            autoClose: 1500,
          });
        },
        error: (err) => {
          toast.error("OldPassword do not match", {
            autoClose: 1500,
          });
        },
      });
    } catch (err) {
      toast.success("An error occurred. Please try again.", {
        autoClose: 1500,
      });
    }
  };

  return (
    <div>
      ,
      <BootstrapDialog
        className="PopUP"
        onClose={handleClickClosereset}
        aria-labelledby="customized-dialog-title"
        open={opened}
        sx
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "1rem" }}
          id="customized-dialog-title"
        >
          Reset Password
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClickClosereset}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <div style={{ display: "flex", justifyContent: "right" }}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form>
              <div>
                <TextField
                  inputProps={{ className: "textField" }}
                  sx={{
                    textAlign: "center !important",
                    minWidth: "35vw",
                    //   marginTop: "15% !important",
                  }}
                  fullWidth
                  size="small"
                  className="BoxShadow"
                  label="Old Password"
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handleOldChange}
                  required
                />
              </div>
              <div style={{ marginTop: "5%" }}>
                <TextField
                  inputProps={{ className: "textField" }}
                  sx={{
                    textAlign: "center !important",
                    //   marginTop: "15% !important",
                  }}
                  fullWidth
                  size="small"
                  className="BoxShadow"
                  label="New Password"
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ marginTop: "5%" }}>
                <TextField
                  inputProps={{ className: "textField" }}
                  sx={{
                    textAlign: "center !important",
                    //   marginTop: "15% !important",
                  }}
                  fullWidth
                  size="small"
                  className="BoxShadow"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginTop: "5%",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleClickClosereset}
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
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    padding: "3px 0px",
                  }}
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </BootstrapDialog>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
