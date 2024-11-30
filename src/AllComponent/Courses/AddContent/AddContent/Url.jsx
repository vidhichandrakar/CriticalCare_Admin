import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import {
  CommonTypography,
  commonTextField,
} from "../../../../Util/CommonFields";
import { uploadFile } from "../../../ActionFactory/apiActions";

const Url = ({
  anchor,
  handelclose,
  handleAddUrl,
  uploadedFileType,
  uploadedVideo,
  setUploadedVideo,
  handleInputChange,
  courseData,
}) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [open, setOpen] = useState(true);
  const [url, setUrl] = useState("");
  const [contentName, setContentName] = useState("");

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleInput = (value, type) => {
    if (type === "contentName") {
      setContentName(value);
    } else if (type === "url") {
      setUrl(value);
    }
  };

  const handleUpload = (e) => {
    let uploadedUrl = [...uploadedVideo];
    let arr = {
      content_name: contentName,
      content_url: url,
      content_type: uploadedFileType.content_type_name,
      content_type_id: uploadedFileType.content_type_id,
    };
    uploadedUrl.push(arr);
    setUploadedVideo(uploadedUrl);
    handleAddUrl("uploadUrl", uploadedUrl);
    handleInputChange("addContent", uploadedUrl);
  };

  return (
    <Box
      className="folderDrawer"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h2 style={{ marginLeft: "4%" }}>Add URL</h2>
      <IconButton
        aria-label="close"
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Box onClick={handelclose("right", false)}>
          <CloseIcon />
        </Box>
      </IconButton>
      <Divider />

      <Box className="FolderNameBox">
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <Box>
            {CommonTypography({ fontWeight: 600, label: "Content Name" })}
            {commonTextField(
              {
                id: "fullWidth",
                className: "BoxShadow mt2",
                inputClassName: "textField PaddingOnly",
                labels: "Enter Content name",
              },
              (Option = {
                handleInput: handleInput,
                type: "contentName",
              })
            )}
          </Box>
          <Box sx={{ mt: 2 }}>
            {CommonTypography({ fontWeight: 600, label: "URL" })}
            {commonTextField(
              {
                id: "fullWidth",
                className: "BoxShadow mt2",
                inputClassName: "textField PaddingOnly",
                labels: "Paste URL Path",
              },
              (Option = {
                handleInput: handleInput,
                type: "url",
              })
            )}
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mt: "323px" }} />
      <Box className="UploadBtnBox">
        <Button className="folderDrawerSaveBtn" onClick={handleUpload}>
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default Url;
