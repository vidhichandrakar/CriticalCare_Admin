import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import img from "../../../Media/Logo.png"
import manSitting from "../../../Media/Images/manSitting.jpeg";


const LoginLeft = () => {
  return (
    <>
      <Fragment>
        <Box className="Leftcomponent">
        
          <img src={img} className="Leftimg" />
          <img src={manSitting} width={450} height={400}/>
        </Box>
      </Fragment>
    </>
  );
};

export default LoginLeft;
