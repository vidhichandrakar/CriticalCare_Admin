import React from 'react'
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
          width: "30vw"
        }}
      />
    );
  }


function ResetPassword({handleClickClosereset, opened}) {
  return (
    <div>,
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
              <Formik
          initialValues={{
            Name: "",
            emailId: "",
            number: "",
            hospitalName: "",
            qualification: "",
            affillation: "",
          }}
          validate={(data, nam) => {
            let errorMsg = {};
            let {
              Name,
              emailId,
              number,
              hospitalName,
              qualification,
              affillation,
            } = data;
            if (!Name) errorMsg.Name = "Name is mandatory";
            if (!number) errorMsg.number = "Contact Number is mandatory";
            if (!emailId) {
              errorMsg.emailId = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailId)
            ) {
              errorMsg.emailId = "Invalid email address";
            }
            if (!qualification)
              errorMsg.qualification = "Qualification is mandatory";
            if (!affillation)
              errorMsg.affillation = "Affiliation address is mandatory";
            if (!hospitalName) errorMsg = "Hospital Name is mandatory";

            return errorMsg;
          }}
          validateOnChange={true}
        //   onSubmit={(submitData) => {}}
        >
          {(formik) => (
            <Form 
            // onSubmit={formik.handleSubmit}
            >
              {console.log(formik)}
              <TextField
                // inputProps={{ className: "textField" }}
                sx={{
                  textAlign: "center !important",
                //   marginTop: "15% !important",
                }}
                fullWidth
                size="small"
                label="Old Password"
                type='password'
                id="fullWidth"
                name="Name"
                className="BoxShadow"
                // value={formik.values.Name}
                // onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <RedBar />
              <TextField
                // inputProps={{ className: "textField" }}
                sx={{ textAlign: "center !important" }}
                fullWidth
                size="small"
                label="Enter Password"
                type='password'
                id="fullWidth"
                name="emailId"
                className="BoxShadow"
                // value={formik.values.emailId}
                // onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <RedBar />
              <TextField
                fullWidth
                // inputProps={{ maxLength: 10, className: "textField" }}
                size="small"
                label="Confirm Password"
                type='password'
                id="fullWidth"
                sx={{ textAlign: "center !important" }}
                // value={formik.values.number}
                // onChange={(event) =>
                //   formik.setFieldValue(
                //     "number",
                //     event.target.value.replace(/\D/g, "")
                //   )
                // }
                // onBlur={formik.handleBlur}

                name="number"
                className="BoxShadow"
              />
              
              <Button
              sx={{mt: 2}}
                fullWidth
                variant="contained"
                disabled={isNotEmptyObject(formik.errors)}
                className="otpButton"
                // onClick={() =>
                //   registerUser(
                //     "loggIn",
                //     formik.values.number,
                //     "signUp",
                //     formik.values
                //   )
                // }
              >
                Rest Password
              </Button>
            </Form>
          )}
        </Formik>
              </DialogContent>
          </BootstrapDialog>
    </div>
  )
}

export default ResetPassword
