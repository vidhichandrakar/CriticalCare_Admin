import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

export const CommonAddLinkField = ({ onAddLink }) => {
  const [inputLink, setInputLink] = useState("");
  const [inputName, setInputName] = useState("");

  // const handleNameChange = (e) => {
  //   console.log("eee-->",e.target.value)
  //   // let value = e.target.value.trim(); // Remove leading and trailing spaces
  //   // if (value && !value.endsWith(".mp4")) {
  //   //   value = value.replace(/\s+/g, "") + ".mp4"; // Remove all spaces and add .mp4
  //   // }
  //   setInputName(value);
  // };

  return (
    <div style={{ margin: "10px", display: "inline-grid", width: "100%" }}>
      <Box display="flex" gap={2} alignItems="center">
      <TextField
        label="Enter Name"
        variant="outlined"
        size="small"
        value={inputName}
        onChange={(e)=> setInputName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Enter Link"
        variant="outlined"
        size="small"
        value={inputLink}
        onChange={(e) => setInputLink(e.target.value)}
        fullWidth
      />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onAddLink(inputLink,inputName)}
        style={{ marginTop: "8px" }}
      >
        Add Link
      </Button>
    </div>
  );
};
