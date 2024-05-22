import React, {
  useState,
  useEffect,
  useRef,
  setkey,
  key,
  keyDown,
} from "react";
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
import blueEnvlope from "../../../Media/Images/blueEnvlope.jpeg";
import CircularProgress from "@mui/material/CircularProgress";
import { validatePhoneNo } from "../../../Util/CommonUtils";
import loginMan from "../../../Media/Images/loginMan.png";

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
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(true);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showOTPCard, setShowOTPCard] = useState(false);

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
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (textField1Ref.current) {
      textField1Ref?.current?.focus();
    }
  }, []);

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
          setSeconds(60);
          setIsActive(true);
          setIsVisible(!isVisible);
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
      verifyOtp({
        payload,
        callBack: (response) => {
          setUserInfo({
            userId: response.data.user_id,
            userName: response.data.user_name,
            user_photo: response.data.user_photo,
          });
          navigation("/DashBoard");
          localStorage.setItem("loggedInUser", JSON.stringify(response?.data));
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
        setSeconds(60);
        setIsActive(true);
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

  const handleLoginByOTP = ({ value, type, event }) => {
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

    if (type === "otp1" && prevOtp.otp1 != "") {
      textField2Ref.current.focus();
    } else if (type === "otp2" && prevOtp.otp2 != "") {
      textField3Ref.current.focus();
    } else if (type === "otp3" && prevOtp.otp3 != "") {
      textField4Ref.current.focus();
    }
  };

  const handleLoginPhoneByOTP = (value, type) => {
    setDisableLogiBtn(false);
    if (type === "password") {
      setPhoneNo(validatePhoneNo(value, phoneNO));
    }
  };

  const handleKeyDown = (event, type, originalNum) => {
    console.log(event, "backspaceOTP");
    let prevOtp = { ...otpValue };
    if (typeof phoneNO !== "undefined" && phoneNO?.length) {
      if (phoneNO?.length === 10 && event.keyCode === 13) {
        handleUserLogin();
        setShowOTPCard(true);
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
      } else if (event.keyCode === 8) {
        if (type === "otp2") {
          let prevOtp = { ...otpValue };
          prevOtp[type] = "";
          setOtp(prevOtp);
          setTimeout(() => {
            textField1Ref?.current?.focus();
          }, 100);
        }
         else if (type === "otp3") {
          let prevOtp = { ...otpValue };
          prevOtp[type] = "";
          setOtp(prevOtp);
          setTimeout(() => {
            textField2Ref?.current?.focus();
          }, 100);
        }
       else if (type === "otp4") {
          let prevOtp = { ...otpValue };
          prevOtp[type] = "";
          setOtp(prevOtp);
          setTimeout(() => {
            textField3Ref?.current?.focus();
          }, 100);
        }
        console.log(type, event.target.value);
      }
    }
  };

  return (
    <div className="RightBox">
      <LoaderComponent loaderState={loaderState} />
      <Box
        className={
          getOTP ? "BoxWidth" : "BoxWidth phoneTextField2 initialBoxWidth"
        }
      >
        {isVisible && (
          <Box className="OTPCard">
            <Typography sx={{ mt: 1, fontSize: 21, color: "#199884" }}>
              <span className="OTPInTheBox">OTP Recieved:</span>{" "}
              <b className="OTPRecieved"> {getOTP}</b>
            </Typography>
          </Box>
        )}
        <Typography className="loginText">
          {/*   */}

          {getOTP !== "" ? (
            <img src={blueEnvlope} width={350} height={200} />
          ) : (
            <img src={loginMan} width={350} height={200} />
          )}
        </Typography>

        <Box sx={{ mt: 2 }} className="phNoBox">
          <TextField
            autoFocus
            id="fullWidth"
            placeholder="Mobile Number"
            className="phoneTextField
              BoxShadowLogin"
            sx={{ color: "#000" }}
            variant="outlined"
            inputProps={{ maxLength: 10, tabIndex: 1 }}
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
              autoFocus
              variant="standard"
              className="OTPBox"
              onChange={(event) =>
                handleLoginByOTP({ type: "otp1", value: event.target.value })
              }
              onKeyDown={(event) => handleKeyDown(event, "otp1")}
              inputRef={textField1Ref}
              inputProps={{
                maxLength: 1,
                className: "boxOtpWidth",
                tabIndex: 1,
              }}
            />
            <TextField
              variant="standard"
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
              variant="standard"
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
              variant="standard"
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
            sx={{ marginTop: "10%" }}
            onClick={() => handleUserLogin()}
          >
            Get OTP
          </Button>
        )}
        {getOTP && (
          <Box className="LoginBtnBox">
            <Box className="ResendButton">
              <p>Don't recieve the OTP ?</p>
              <Button
                variant="contained"
                className="ResendBtn"
                onClick={() => handleResendOTP()}
                disabled={seconds}
              >
                <p className="resendOTP">{seconds > 0 ? `RESEND OTP ( ${seconds} sec)` : `RESEND OTP `}</p>
              </Button>
            </Box>

            <Button
              variant="contained"
              className="LoginBtn"
              onClick={() => handleUserLogin()}
            >
              Login
            </Button>
          </Box>
        )}
      </Box>
      <ToastContainer />
    </div>
  );
};

export default LoginEmailandPassword;
