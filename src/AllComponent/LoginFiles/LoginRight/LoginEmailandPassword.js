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
           <TextField  id="fullWidth" label="Email" variant="outlined"
            className="BoxShadow"
            fullWidth
           onChange={(event) => keyDown(event.target.value)} />
        </Box>

        {key ? (
          <Box sx={{ mt: 0 }}>
            <TextField  id="fullWidth" label="Password" variant="outlined"
            className="BoxShadow"
            fullWidth
            onKeyDown={keyDown} />
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
