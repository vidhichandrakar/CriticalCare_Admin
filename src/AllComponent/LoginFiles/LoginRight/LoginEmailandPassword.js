import React, { useState, setkey, key, keyDown } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography, paperClasses } from "@mui/material";
import Button from "@mui/material/Button";
import { getUserId, login, verifyOtp } from "../../ActionFactory/apiActions";
import { redirect, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderComponent from "../../../Util/LoaderComponent";

import { validatePhoneNo } from "../../../Util/CommonUtils";

const LoginEmailandPassword = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [disbaleLoginBtn, setDisableLogiBtn] = useState(true);
  const [phoneNO, setPhoneNo] = useState();
  const [getOTP, setGetOTP] = useState("");
  const [loginWay, setLoginWay] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");
  const [hideOTPBtn, setHideOTPBtn] = useState(true);
  const [loaderState, setLoaderState] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  let navigation = useNavigate();

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
    setUserLogin(storedValues);
  };

  const handleUserLogin = () => {
    setLoaderState(true);
    if (loginWay === "") {
      const payload = {
        phone_no: phoneNO?.toString(),
      };
      login({
        
        payload,
        callBack: (response) => {
          setLoginWay("Get OTP");
          setGetOTP(response.data.OTP);
          setHideOTPBtn(false);
          setLoaderState(false);
        },
        error: (error) => {
          toast.error(error.message);
          console.log(error.message);
        },
      });
    }
    if (loginWay !== "") {
      // if (getOTP === parseInt(enteredOTP)) {
        const payload = {
          phone_no: phoneNO?.toString(),
          OTP: parseInt(enteredOTP),
        };
        verifyOtp({
          payload,
          callBack: (response) => {
            console.log("verify", response);
            setUserInfo({
              userId: response.data.user_id,
              userName: response.data.user_name,
              user_photo: response.data.user_photo,
            });
            localStorage.setItem("loggedInUser", JSON.stringify(response?.data));
            navigation("/DashBoard")
          },
          error: (error) => {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
          },
        });
      // }
    }
  };
  const handleLoginByOTP = (value, type) => {

    setDisableLogiBtn(false);
    if (type === "password") {
      setPhoneNo(validatePhoneNo(value,phoneNO));
      console.log("validatePhoneNo",validatePhoneNo(value,phoneNO));

    } else if (type === "OTP") {
      setEnteredOTP(value);
    }
  };

  return (
    <div className="RightBox">
       <LoaderComponent
      loaderState={loaderState}
      />
      <Box className="BoxWidth">
        <Typography className="loginText">
          Login to Admin Panel
          <Typography sx={{ mt: 1, fontSize: 21, color: "#199884" }}>
            <u>{getOTP}</u>
          </Typography>
        </Typography>

        <Box sx={{ mt: 2 }}>
          <TextField
            id="fullWidth"
            label="Email"
            variant="outlined"
            className="BoxShadow"
            fullWidth
            disabled
            type="email"
            onChange={(event) => handleInput(event.target.value, "email")}
          />
        </Box>

        {userLogin?.email != "" ? (
          <Box sx={{ mt: 2 }}>
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

        <Box sx={{ mt: 2 }}>
          <TextField
            id="fullWidth"
            label="Enter Phone No"
            variant="outlined"
            className="BoxShadow"
            fullWidth
            maxlength="10"
            disabled={phoneNO?.length===10 && getOTP!==""}
            type="number"
            value={phoneNO}
            onChange={(event) =>
              handleLoginByOTP(event.target.value, "password")
            }
          />
        </Box>

        {getOTP !== "" && (
          <Box sx={{ mt: 2 }}>
            <TextField
              id="fullWidth"
              label="Enter OTP"
              variant="outlined"
              className="BoxShadow"
              fullWidth
              onChange={(event) => handleLoginByOTP(event.target.value, "OTP")}
            />
          </Box>
        )}

        {hideOTPBtn && getOTP === "" && (
          <Button
            variant="contained"
            className="LoginBtn"
            onClick={() => handleUserLogin()}
          >
            Get OTP
          </Button>
        )}
        {getOTP && (
          <Button
            variant="contained"
            className="LoginBtn"
            onClick={() => handleUserLogin()}
          >
            Login
          </Button>
        )}
      </Box>
      <ToastContainer />
    </div>
  );
};

export default LoginEmailandPassword;
