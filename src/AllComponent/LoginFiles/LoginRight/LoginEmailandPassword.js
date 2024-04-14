import React, { useState, useRef, setkey, key, keyDown } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputAdornment, Typography, paperClasses } from "@mui/material";
import Button from "@mui/material/Button";
import { getUserId, login, verifyOtp } from "../../ActionFactory/apiActions";
import { redirect, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderComponent from "../../../Util/LoaderComponent";
import India from "../../../Media/Images/India.png";

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
  let navigation = useNavigate();

  const handleUserLogin = () => {
    let typedOtp = parseInt(
      otpValue.otp1 + otpValue.otp2 + otpValue.otp3 + otpValue.otp4
    );
    setLoaderState(true);
    if (phoneNO?.length !== 10) {
      toast.error("Enter 10 digit phone number");
      setLoaderState(false);
    } else if (loginWay === "") {
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
          toast.error(error.response.data.message);
          setLoaderState(false);
        },
      });
    } else if (loginWay !== "") {
      const payload = {
        phone_no: phoneNO?.toString(),
        OTP: typedOtp,
      };
      console.log("payload login", payload);
      verifyOtp({
        payload,
        callBack: (response) => {
          setUserInfo({
            userId: response.data.user_id,
            userName: response.data.user_name,
            user_photo: response.data.user_photo,
          });
          localStorage.setItem("loggedInUser", JSON.stringify(response?.data));
          navigation("/DashBoard");
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
      },
      error: (error) => {
        toast.error(error.message);
        setLoaderState(false);
      },
    });
  };


  const handleNextTextField = () => {
    textField2Ref.current.focus();
  };

  const [key, setKey] = useState(null);
  const handleLoginByOTP2 = (value, type, event) => {
    let prevOtp2 = { ...otpValue };
    prevOtp2[type] = value;
    if (typeof phoneNO !== "undefined" && phoneNO?.length) {
      if (
        prevOtp2.otp1 != "" ||
        prevOtp2.otp2 != "" ||
        prevOtp2.otp3 != "" ||
        prevOtp2.otp4 != ""
      ) {
        prevOtp2.disable = false;
      } else if (
        ("otp1" || "otp2" || "otp3" || "otp4") &&
        event.keyCode === 9
      ) {
        handleLoginByOTP2(value);
      }
      setOtp(prevOtp2);
      setDisableLogiBtn(false);
    }
  };

  const textField1Ref = useRef(null);
  const textField2Ref = useRef(null);
  const textField3Ref = useRef(null);
  const textField4Ref = useRef(null);
  const handleLoginByOTP = ({ value, type }) => {
    let prevOtp = { ...otpValue };
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
    setDisableLogiBtn(false);

    if (type === "otp1") {
      textField2Ref.current.focus();
    } else if (type === "otp2") {
      textField3Ref.current.focus();
    } else if (type === "otp3") {
      textField4Ref.current.focus();
    }
  };

  const handleLoginPhoneByOTP = (value, type) => {
    setDisableLogiBtn(false);
    if (type === "password") {
      setPhoneNo(validatePhoneNo(value, phoneNO));
    }
  };

  const handleKeyDown = (event, value, originalNum) => {
    let prevOtp = { ...otpValue };
    if (typeof phoneNO !== "undefined" && phoneNO?.length) {
      if (phoneNO?.length === 10 && event.keyCode === 13) {
        handleUserLogin();
      } else if (phoneNO?.length !== 10) {
        setLoaderState(false);
      } else if (
        prevOtp.otp1 != "" &&
        prevOtp.otp2 != "" &&
        prevOtp.otp3 != "" &&
        prevOtp.otp4 != "" &&
        event.keyCode === 13
      ) {
        prevOtp.disable = false;
        handleUserLogin();
      }
    }
  };

  return (
    <div className="RightBox">
      <LoaderComponent loaderState={loaderState} />
      <Box className={getOTP ? "BoxWidth" : "BoxWidth phoneTextField2"}>
        <Typography className="loginText">
          Login to Admin Panel <span>7746003673</span>
          <Typography sx={{ mt: 1, fontSize: 21, color: "#199884" }}>
            <u>{getOTP}</u>
          </Typography>
        </Typography>
        <Box sx={{ mt: 2 }} className="phNoBox">
          <TextField
            id="fullWidth"
            placeholder="Mobile Number"
            className="phoneTextField
              BoxShadowLogin"
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
              onChange={
                (event) =>
                  handleLoginByOTP({ type: "otp1", value: event.target.value })
              }
              onKeyDown={(event) => handleKeyDown(event, "otp1")}
              inputRef={textField1Ref}
              inputProps={{
                maxLength: 1,
                className: "boxOtpWidth",
              }}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="OTPBox"
              onChange={(event) =>
                handleLoginByOTP({ type: "otp2", value: event.target.value })
              }
              onKeyDown={(event) => handleKeyDown(event, "otp2")}
              inputRef={textField2Ref}
              inputProps={{
                maxLength: 1,
                className: "boxOtpWidth",
              }}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="OTPBox"
              onChange={(event) =>
                handleLoginByOTP({ type: "otp3", value: event.target.value })
              }
              onKeyDown={(event) => handleKeyDown(event, "otp3")}
              inputRef={textField3Ref}
              inputProps={{
                maxLength: 1,
                className: "boxOtpWidth",
              }}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="OTPBox"
              onChange={(event) =>
                handleLoginByOTP({ type: "otp4", value: event.target.value })
              }
              onKeyDown={(event) => handleKeyDown(event, "otp4")}
              inputRef={textField4Ref}
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
            >
              Resend OTP
            </Button>
          </Box>
        )}
      </Box>
      <ToastContainer />
    </div>
  );
};

export default LoginEmailandPassword;

 
