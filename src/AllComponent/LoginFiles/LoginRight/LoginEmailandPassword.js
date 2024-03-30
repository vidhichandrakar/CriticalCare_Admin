import React, { useState, setkey, key, keyDown } from "react";
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
          const errorMessage =
            error?.response?.data?.message ||
            error?.response?.data ||
            "something went wrong";
          toast.error(errorMessage);
          console.log(errorMessage, error);
          setLoaderState(false);
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
          navigation("/DashBoard");
        },
        error: (error) => {
          toast.error(error.response.data.message);
          console.log(error.response.data.message);
        },
      });
      // }
    }
  };
  
  const handleLoginByOTP = (value, type, event) => {
    setDisableLogiBtn(false);
    // console.log(event);
    if (type === "password") {
      setPhoneNo(validatePhoneNo(value, phoneNO));
      // console.log("validatePhoneNo", validatePhoneNo(value, phoneNO));
    } else if (type === "OTP") {
      setEnteredOTP(value);
    }
  };



  // const [inputValue, setInputValue] = useState('');

  const handleKeyDown =(event, value, originalNum) => {
    setDisableLogiBtn(false);
    
    if(typeof(phoneNO) !== 'undefined' && phoneNO.length){
      // if(!validatePhoneNo(phoneNO)){
   if( phoneNO?.length === 10 && event.keyCode === 13){
    // if(inputValue?.length === 10 && event.keyCode === 13){

       // if( validatePhoneNo(phoneNO, originalNum) && event.keyCode === 13){
      console.log("workingg");
    // handleLoginByOTP(event);
      setPhoneNo(validatePhoneNo(value, phoneNO, originalNum));
   }
  }
   else{
    handleLoginByOTP(false);
   }
  }


  // const handleOtp = (type, value) => {
  //   setDisableLogiBtn(false);
  //   let prevOtp = { ...otpValue };
  //   prevOtp[type] = value;
  //   if (
  //     prevOtp.otp1 != "" &&
  //     prevOtp.otp2 != "" &&
  //     prevOtp.otp3 != "" &&
  //     prevOtp.otp4 != ""
  //     // prevOtp.otp5 != "" &&
  //     // prevOtp.otp6 != ""
  //   ) {
  //     prevOtp.disable = false;
  //   } else {
  //     prevOtp.disable = true;
  //   }
  //   setOtp(prevOtp);
  //   console.log("typeee", type);
  // };
  // const handleLoginType = () => {
  //   // cameFrom!=="signUp"?handleLoginOption(cameFrom==="signUp"?"loggIn":"continueOtp"):handleClick()
  //   let typedOtp = parseInt(
  //     otpValue.otp1 + otpValue.otp2 + otpValue.otp3 + otpValue.otp4
  //   );

  //   console.log("loginResponse.OTP", loginResponse?.OTP);
  //   console.log("otpValueotpValue", typedOtp, parseInt(typedOtp));
  //   if (loginResponse?.OTP === typedOtp) {
  //     createUserByID({
  //       userId: loginResponse.user_id,
  //       callBack: (response) => {
  //         localStorage.setItem("userId", loginResponse.user_id);
  //         // console.log("response use id", response.data.user_name);
  //         localStorage.setItem("userName", response.data.user_name);
  //       },
  //     });
  //     navigateHome("/AllCourses");
  //   }1

  return (
    <div className="RightBox">
      <LoaderComponent loaderState={loaderState} />
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

        {userLogin?.email !== "" ? (
          <Box sx={{ mt: 2 }}>
            <TextField
              id="fullWidth"
              label="Password"
              variant="outlined"
              className="BoxShadow"
              fullWidth
              type="password"
              onChange={(event) => handleInput(event.target.value, "password")}
            />
          </Box>
        ) : null}

        <Box sx={{ mt: 2 }}>
          {/* <TextField
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
          /> */}
          <TextField
            id="fullWidth"
            placeholder="Mobile Number"
            className="phoneTextField BoxShadow"
            sx={{ color: "#000" }}
            variant="outlined"
            inputProps={{ maxLength: 10 }}
            disabled={phoneNO?.length === 10 && getOTP !== ""}
            type="number"
            value={phoneNO}
            onKeyDown = {(event)=> handleKeyDown(event)}
            onChange={(event) =>
              handleLoginByOTP(event.target.value, "password", event)
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
          <Box sx={{ mt: 2 }}>
            <TextField
              id="fullWidth"
              label="Enter OTP"
              variant="outlined"
              className="BoxShadow"
              fullWidth
              onChange={(event) => handleLoginByOTP(event.target.value, "OTP")}
            />

            {/* <TextField
              id="outlined-basic"
              variant="outlined"
              className="OTPBox"
              onChange={(event) => handleOtp("otp1", event.target.value)}
              inputProps={{
                maxLength: 1,
                className: "boxOtpWidth",
              }}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="OTPBox"
              onChange={(event) => handleOtp("otp2", event.target.value)}
              inputProps={{
                maxLength: 1,
                className: "boxOtpWidth",
              }}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="OTPBox"
              onChange={(event) => handleOtp("otp3", event.target.value)}
              inputProps={{
                maxLength: 1,
                className: "boxOtpWidth",
              }}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="OTPBox"
              onChange={(event) => handleOtp("otp4", event.target.value)}
              inputProps={{
                maxLength: 1,
                className: "boxOtpWidth",
              }}
            /> */}
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
