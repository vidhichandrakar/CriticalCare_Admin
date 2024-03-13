import React, { useState, setkey, key, keyDown } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { login } from "../../ActionFactory/apiActions";
import { useNavigate } from "react-router-dom";

const LoginEmailandPassword = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [disbaleLoginBtn, setDisableLogiBtn] = useState(true);
  let token;

  const handleInput = (value, type) => {
    let storedValues = Object.assign({}, userLogin);
    if (type === "email") {
      storedValues.email = value;
      setDisableLogiBtn(true);
    } else if (type === "password") {
      if (value === "") {
        setDisableLogiBtn(true);
      } else {
        storedValues.password = value;
        setDisableLogiBtn(false);
      }
    }
    // else if()
    setUserLogin(storedValues);
  };

  const handleUserLogin = () => {
    const payload = {
      user_name: userLogin.email,
      password: userLogin.password,
    };
    login({
      payload,
      callBack: (response) => {
        localStorage.setItem("accessToken", response.data.token);
        token = localStorage.getItem("accessToken");
      },
    });
  };
  return (
    <div className="RightBox">
      <Box className="BoxWidth">
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

        {userLogin?.email != "" ? (
          <Box sx={{ mt: 0 }}>
            <TextField
              id="fullWidth"
              label="Password"
              variant="outlined"
              className="BoxShadow"
              fullWidth
              // onKeyDown={keyDown}
              type="password"
              onChange={(event) => handleInput(event.target.value, "password")}
            />
          </Box>
        ) : null}

        <Button
          variant="contained"
          className="LoginBtn"
          onClick={handleUserLogin}
          disabled={disbaleLoginBtn}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default LoginEmailandPassword;
