import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';

const LoaderComponent = ({ loaderState }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loaderState}
        // onClick={handleLoader}
      >
        <CircularProgress color="inherit" size={100} />
      </Backdrop>
    </Box>
  );
};

export default LoaderComponent;
