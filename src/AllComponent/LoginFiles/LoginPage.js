import React from "react";
import LoginLeft from "./LoginLeft/LoginLeft";
import LoginEmail from "./LoginRight/LoginEmail";
import "../CSSFile/Login.css";
import { Box, Typography } from "@mui/material";
import LoginEmailandPassword from "./LoginRight/LoginEmailandPassword";

const LoginPage = () => {
  return (
    <>
      <Box className="MainBox">
        <Box className="loginBox">
          <LoginLeft />
          {/* <LoginEmail /> */}
          <LoginEmailandPassword/>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
