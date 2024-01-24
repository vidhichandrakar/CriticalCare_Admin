import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import img from "../../../Media/Logo.png"

const LoginLeft = () => {
  return (
    <>
      <Fragment>
        <Box className="Leftcomponent">
          <img src={img} className="Leftimg" />
        </Box>
      </Fragment>
    </>
  );
};

export default LoginLeft;
