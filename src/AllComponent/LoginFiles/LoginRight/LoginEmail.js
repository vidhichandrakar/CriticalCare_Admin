import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";


const LoginEmail = ({ handleLoginOption }) => {
  const [emailValue, setEmailValue] = useState("");
  const handleEmail = (value) => {
    setEmailValue(value);
  };
  return (
    <div className="RightBox">
      <Box className="BoxWidth">
        <Typography className="loginText">Login to Admin Panel</Typography>
        <Box sx={{mt : 10}}>
        <Typography className="EmailText">Email</Typography>
        <TextField
       inputProps={{  className:"textField" }}
        sx={{ textAlign: "center !important" }}
        fullWidth
        size="small"
        placeholder="Enter Your Email"
        id="fullWidth"
        className="BoxShadow"
        onChange={(event) => handleEmail("emailId", event.target.value)}
      />
        </Box>
        <Button variant="contained"  className="LoginBtn">
          Login
        </Button>
      </Box>
    </div>
  );
}

export default LoginEmail;
