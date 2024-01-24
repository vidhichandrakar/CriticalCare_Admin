import React, { useState, setkey, key, keyDown } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

const LoginEmailandPassword = () => {
  const [emailValue, setEmailValue] = useState("");
  const handleEmail = (value) => {
    setEmailValue(value);
  };

  const [key, setkey] = useState("");
  const keyDown = (value) => {
    setkey(value);
    console.log(value);
  };
  return (
    <div className="RightBox">
      <Box className="BoxWidth">
        <Typography className="loginText">Login to Admin Panel</Typography>
        <Box sx={{ mt: 10 }}>
          <Typography className="EmailText">Email</Typography>
          <TextField
            inputProps={{ className: "textField" }}
            sx={{ textAlign: "center !important" }}
            fullWidth
            size="small"
            placeholder="Enter Your Email"
            id="fullWidth"
            className="BoxShadow"
            onChange={(event) => keyDown(event.target.value)}
          />
        </Box>

        {key ? (
          <Box sx={{ mt: 4 }}>
            <Typography className="EmailText">Password</Typography>
            <TextField
              inputProps={{ className: "textField" }}
              sx={{ textAlign: "center !important" }}
              fullWidth
              size="small"
              placeholder="Enter Your Password"
              id="fullWidth"
              className="BoxShadow"
              onKeyDown={keyDown}
            />
          </Box>
        ) : null}

        <Button variant="contained" className="LoginBtn">
          Login
        </Button>
      </Box>
    </div>
  );
}

export default LoginEmailandPassword;
