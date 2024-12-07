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
import { Md5Converter } from '../../../Util/md5Convertor';
import { adminLogin } from '../../ActionFactory/apiActions';

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

function MembersignupPopup({handleCloseDialog, opened}) {
  const registerUser = (type, value, path = "", inputValues) => {
    const { Name, emailId, number, hospitalName, qualification, affillation } = inputValues;
    console.log("password",Md5Converter(number))
    const password = Md5Converter(number);
    const payload = {
      user_name: Name,
      email_id: emailId,
      phone_no: parseInt(number),
      hospital_name: hospitalName,
      current_affilation: affillation,
      qualification: qualification,
      password:password,
      user_photo:"photo",
      user_type_id:2,
      block:"N"//by default "N"
    };
    adminLogin({ payload, callBack: (response) => {
      // Toaster({message:"User created successfully"})
    },
    error:(error)=>{
    console.error(error);
    // Toaster({message:"Something went wrong!"});
    }});
    // handleLoginOption(type, value, path);
  };
  
  return (
    <div>
      <BootstrapDialog
            className="PopUP"
            onClose={handleCloseDialog}
            aria-labelledby="customized-dialog-title"
            open={opened}
            sx
          >
            <DialogTitle
              sx={{ m: 0, p: 2, fontSize: "1rem" }}
              id="customized-dialog-title"
            >
              Add New Member
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
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
              {/* <Typography gutterBottom>Member Name</Typography> */}
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
          onSubmit={(submitData) => {}}
        >
          {(formik) => (
            <Form 
            onSubmit={formik.handleSubmit}
            >
              {console.log(formik.values, "formik")}
              <TextField
                inputProps={{ className: "textField" }}
                sx={{
                  textAlign: "center !important",
                //   marginTop: "15% !important",
                }}
                fullWidth
                size="small"
                label="Full Name"
                id="fullWidth"
                name="Name"
                className="BoxShadow"
                value={formik.values.Name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <RedBar />
              <TextField
                inputProps={{ className: "textField" }}
                sx={{ textAlign: "center !important" }}
                fullWidth
                size="small"
                label="Email Id"
                id="fullWidth"
                name="emailId"
                className="BoxShadow"
                value={formik.values.emailId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <RedBar />
              <TextField
                fullWidth
                // inputProps={{ maxLength: 10, className: "textField" }}
                size="small"
                label="Phone Number"
                id="fullWidth"
                sx={{ textAlign: "center !important" }}
                value={formik.values.number}
                onChange={(event) =>
                  formik.setFieldValue(
                    "number",
                    event.target.value.replace(/\D/g, "")
                  )
                }
                onBlur={formik.handleBlur}
                name="number"
                className="BoxShadow"
              />
<RedBar />
              <TextField
                fullWidth
                size="small"
                // inputProps={{ className: "textField" }}
                label="Hospital Name"
                id="fullWidth"
                className="BoxShadow"
                name="hospitalName"
                value={formik.values.hospitalName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <RedBar />
              <TextField
                fullWidth
                // inputProps={{ className: "textField" }}
                size="small"
                label="Qualification"
                id="fullWidth"
                className="BoxShadow"
                name="qualification"
                value={formik.values.qualification}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <RedBar />
              <TextField
                fullWidth
                size="small"
                label="Current Affillation"
                // inputProps={{ className: "textField" }}
                sx={{ textAlign: "center !important" }}
                id="fullWidth"
                className="BoxShadow"
                name="affillation"
                value={formik.values.affillation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              
              <Button
              sx={{mt: 2}}
                fullWidth
                variant="contained"
                disabled={isNotEmptyObject(formik.errors)}
                className="otpButton"
                onClick={() =>
                  registerUser(
                    "loggIn",
                    formik.values.number,
                    "signUp",
                    formik.values
                  )
                }
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
              </DialogContent>
          </BootstrapDialog>
    </div>
  )
}

export default MembersignupPopup
