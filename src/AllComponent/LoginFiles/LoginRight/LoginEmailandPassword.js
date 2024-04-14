import React, { useState, useEffect, setkey, key, keyDown } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputAdornment, Typography, paperClasses } from "@mui/material";
import Button from "@mui/material/Button";
import { getUserId, login, verifyOtp } from "../../ActionFactory/apiActions";
import { redirect, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderComponent from "../../../Util/LoaderComponent";
import India from "../../../Media/Images/India.png"

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
  const [otpValue, setOtp] = useState({
    value: "",
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    disable: true,
  });
  const [seconds, setSeconds] = useState(5);
  const [isActive, setIsActive] = useState(true);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  let navigation = useNavigate();

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(interval);
            setIsActive(false);
          }
          return prevSeconds > 0 ? prevSeconds - 1 : 0;
        });
      }, 800);
    } else {
      // Enable resend button after 30 seconds
      setTimeout(() => {
        setIsResendDisabled(false);
      });
    }
    return () => clearInterval(interval);
  }, [isActive]);


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
    let typedOtp = parseInt(
      otpValue.otp1 + otpValue.otp2 + otpValue.otp3 + otpValue.otp4
    );
    setLoaderState(true);
    if (phoneNO?.length !== 10 ) {
      toast.error("Enter 10 digit phone number");
      setLoaderState(false);
    }
    else if (loginWay === "") {
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
          setSeconds(5);
    setIsActive(true);
    setIsVisible(!isVisible);
        },
        error: (error) => {
          toast.error(error.response.data.message);
          console.log(error.response.data.message);
          setLoaderState(false);
        },
      });
    }
     else if (loginWay !== "") {
        const payload = {
          phone_no: phoneNO?.toString(),
          OTP: typedOtp,
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
            setLoaderState(false);
          },
        });
      
    }
    
  };
  
  const handleResendOTP = () => {
    setLoaderState(true);
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
          setSeconds(5);
      setIsActive(true);
      setIsResendDisabled(true);
        },
        error: (error) => {
          toast.error(error.message);
          console.log(error.message);
          setLoaderState(false);
        },
      });
      
  }

  const handleLoginByOTP = ({value, type}) => {
    let prevOtp = { ...otpValue };
    console.log(prevOtp, "Line=107")
    prevOtp[type] = value;
   if (
      prevOtp.otp1 != "" &&
      prevOtp.otp2 != "" &&
      prevOtp.otp3 != "" &&
      prevOtp.otp4 != ""
    ) {
      prevOtp.disable = false;
    } else {
      prevOtp.disable = true;
    }
    setOtp(prevOtp);
    console.log(prevOtp, "Line127")
    console.log("typeee line 120", type);
    setDisableLogiBtn(false);
  };
  const handleLoginPhoneByOTP = (value, type) => {

    setDisableLogiBtn(false);
    if (type === "password") {
      setPhoneNo(validatePhoneNo(value,phoneNO));
      console.log("validatePhoneNo",validatePhoneNo(value,phoneNO));
    } 
  };

  const handleKeyDown = (event, value, originalNum) => {
    // setDisableLogiBtn(false);
    console.log(event, phoneNO);
    if (typeof phoneNO !== "undefined" && phoneNO?.length) {
      if (phoneNO?.length === 10 && event.keyCode === 13) {
        handleUserLogin();
      } else if (phoneNO?.length !== 10) {
        setLoaderState(false);
      } 
    }
  };
  // 9340290314

  return (
    <div className="RightBox">
    <LoaderComponent loaderState={loaderState} />
    <Box className="BoxWidth">
      <Typography className="loginText">
        Login to Admin Panel <span>7746003673</span>
        <Typography sx={{ mt: 1, fontSize: 21, color: "#199884" }}>
          <u>{getOTP}</u>
         
        </Typography>
        {isVisible && (
        <div>
          <p>{seconds > 0 ? `OTP expires in ${seconds} seconds` : "OTP expired"}</p>
        </div>
      )}
       
      </Typography>
        <Box sx={{ mt: 2 }}>
        <TextField
          id="fullWidth"
          placeholder="Mobile Number"
          className="phoneTextField BoxShadow BoxShadowLogin"
          sx={{ color: "#000" }}
          variant="outlined"
          inputProps={{ maxLength: 10 }}
          disabled={phoneNO?.length === 10 && getOTP !== ""}
          type="number"
          value={phoneNO}
          onKeyDown={(event) => handleKeyDown(event)}
          onChange={(event) =>
            handleLoginPhoneByOTP(event.target.value, "password")
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <p className="phoneTextFieldStartIcon">
                  <Box className="indiaBox">
                    <img src={India} className="indiaImg" />
                  </Box>{" "}
                  <p className="startText"> +91 - </p>
                </p>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {getOTP !== "" && (
        <Box sx={{ mt: 2 }} className="OTPMainBox">       
          <TextField
            id="outlined-basic"
            variant="outlined"
            className="OTPBox"
            onChange={(event) => handleLoginByOTP({type:"otp1", value:event.target.value})}
            inputProps={{ 
              maxLength: 1,
              className: "boxOtpWidth",
            }}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            className="OTPBox"
            onChange={(event) => handleLoginByOTP({type:"otp2", value:event.target.value})}
            inputProps={{
              maxLength: 1,
              className: "boxOtpWidth",
            }}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            className="OTPBox"
            onChange={(event) => handleLoginByOTP({type:"otp3", value:event.target.value})}
            inputProps={{
              maxLength: 1,
              className: "boxOtpWidth",
            }}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            className="OTPBox"
            onChange={(event) => handleLoginByOTP({type:"otp4", value:event.target.value})}
            inputProps={{
              maxLength: 1,
              className: "boxOtpWidth",
            }}
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
        <Box className="LoginBtnBox">
        <Button
          variant="contained"
          className="LoginBtn"
          onClick={() => handleUserLogin()}
        >
          Login
        </Button>
        <Button
          variant="contained"
          className="ResendBtn"
          onClick={() => handleResendOTP()}
          disabled={seconds}
        >
          <p>{isResendDisabled ? `Resend OTP (${seconds}s)` : "Resend OTP"}</p>
          {/* Resend OTP */}
        </Button>
        </Box>
      )}
     </Box>
    <ToastContainer />
  </div>
  );
};

export default LoginEmailandPassword;
