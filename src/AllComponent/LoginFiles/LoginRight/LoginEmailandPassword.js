import React, { useState, setkey, key, keyDown } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { login } from "../../ActionFactory/apiActions";
import { useNavigate } from "react-router-dom";

const LoginEmailandPassword = () => {
  const [emailValue, setEmailValue] = useState("");
  const [key, setkey] = useState("");
  const [userLogin, setUserLogin] = useState({});
  const navigate = useNavigate();

  const handleEmail = (value) => {
    setEmailValue(value);
  };

  const handleInput = (value, type) => {
    setkey(value);
    let storedValues = Object.assign({}, userLogin);
    if (type === "email") {
      storedValues.email = value;
    } else if (type === "password") {
      storedValues.password = value;
    }
    setUserLogin(storedValues);
  };

  const handleUserLogin = () => {
    const payload = {
      user_name: userLogin.email,
      password: userLogin.password,
    };
    console.log("payload", payload);
    login({
      payload,
      callBack: (response) => {
        navigate("/DashBoard");
      },
    });
  };
  return (
    <div className="RightBox">
      <Box className="BoxWidth">
        {/* {console.log("userLogin", userLogin)} */}
        <Typography className="loginText">Login to Admin Panel</Typography>
        <Box sx={{ mt: 10 }}>
          <TextField
            id="fullWidth"
            label="Email"
            variant="outlined"
            className="BoxShadow"
            fullWidth
            type="email"
            onChange={(event) => handleInput(event.target.value, "email")}
          />
        </Box>

        {key ? (
          <Box sx={{ mt: 0 }}>
            <TextField
              id="fullWidth"
              label="Password"
              variant="outlined"
              className="BoxShadow"
              fullWidth
              onKeyDown={keyDown}
              type="password"
              onChange={(event) => handleInput(event.target.value, "password")}
            />
          </Box>
        ) : null}

        <Button
          variant="contained"
          className="LoginBtn"
          onClick={handleUserLogin}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default LoginEmailandPassword;
