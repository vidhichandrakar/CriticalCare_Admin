import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LoaderComponent from "../../../../Util/LoaderComponent";
import FolderIcon from "@mui/icons-material/Folder";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { CommonAddLinkField } from "../../../../Util/CommonAddLinkField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useEffect } from "react";
import { getTest } from "../../../ActionFactory/apiActions";
import { DialogActions } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import { ToastContainer, toast } from "react-toastify";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogBoxes = ({
  handleAddLink,
  handleCloseDialogIC,
  icopened,
  handleCloseDialogImg,
  imgopened,
  handleCloseDialogZip,
  zipopened,
  handleCloseDialogDoc,
  docopened,
  handleCloseDialogVideo,
  videoopened,
  handleCloseDialogSubjectiveTest,
  subtestopened,
  imgUpload,
  getIntroVideoInputProps,
  getIntroVideoRootProps,
  loaderState,
  storedBasicInfo,
  toggleDrawerUrl,
  toastErrorVideo,
}) => {
  const [cat, setCat] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const onAddLink = (inputLink, inputName) => {
    handleAddLink(inputLink, inputName);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200, // Set the maximum height
        overflowY: "auto", // Enable scrolling for overflow
      },
    },
  };

  return (
    <>
      <BootstrapDialog
        className="PopUP"
        onClose={handleCloseDialogIC}
        aria-labelledby="customized-dialog-title"
        open={icopened}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            //  fontSize: "1rem",
            ml: 2,
          }}
          id="customized-dialog-title"
        >
          <b> Import Content</b>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialogIC}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <Box>
            <Box className="ParaBox">
              <Typography>
                Select the entire course (MAX 5) or any set of content you want
                to import from the list of available Courses.
              </Typography>
            </Box>
            <Box className="SearchBox">
              <Typography>Selected(0)</Typography>
              <Box>
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search yours courses here"
                  inputProps={{ "aria-label": "search google maps" }}
                />
              </Box>
            </Box>
            <Box className="SelectMainBox">
              <Box className="SelectBox">
                <Checkbox {...label} />
                <Box className="DataBox">
                  <FolderIcon className="IconFolder" />
                  <Box>
                    <Typography>TRICS 1 2023 SEASON 1</Typography>
                    <Typography className="FilesPara">
                      <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="SelectBox">
                <Checkbox {...label} />
                <Box className="DataBox">
                  <FolderIcon className="IconFolder" />
                  <Box>
                    <Typography>TRICS 1 2023 SEASON 1</Typography>
                    <Typography className="FilesPara">
                      <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="SelectBox">
                <Checkbox {...label} />
                <Box className="DataBox">
                  <FolderIcon className="IconFolder" />
                  <Box>
                    <Typography>TRICS 1 2023 SEASON 1</Typography>
                    <Typography className="FilesPara">
                      <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="SelectBox">
                <Checkbox {...label} />
                <Box className="DataBox">
                  <FolderIcon className="IconFolder" />
                  <Box>
                    <Typography>TRICS 1 2023 SEASON 1</Typography>
                    <Typography className="FilesPara">
                      <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="SelectBox">
                <Checkbox {...label} />
                <Box className="DataBox">
                  <FolderIcon className="IconFolder" />
                  <Box>
                    <Typography>TRICS 1 2023 SEASON 1</Typography>
                    <Typography className="FilesPara">
                      <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="SelectBox">
                <Checkbox {...label} />
                <Box className="DataBox">
                  <FolderIcon className="IconFolder" />
                  <Box>
                    <Typography>TRICS 1 2023 SEASON 1</Typography>
                    <Typography className="FilesPara">
                      <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="SelectBox">
                <Checkbox {...label} />
                <Box className="DataBox">
                  <FolderIcon className="IconFolder" />
                  <Box>
                    <Typography>TRICS 1 2023 SEASON 1</Typography>
                    <Typography className="FilesPara">
                      <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="SelectBox">
                <Checkbox {...label} />
                <Box className="DataBox">
                  <FolderIcon className="IconFolder" />
                  <Box>
                    <Typography>TRICS 1 2023 SEASON 1</Typography>
                    <Typography className="FilesPara">
                      <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <Box className="ButtonBOx">
          <Button variant="outlined" disabled className="CancelBtn">
            Cancel
          </Button>
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Import Selected
          </Button>
        </Box>
      </BootstrapDialog>

      <BootstrapDialog
        className="PopUP"
        onClose={handleCloseDialogDoc}
        aria-labelledby="customized-dialog-title"
        open={docopened}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "1rem" }}
          id="customized-dialog-title"
        ></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialogDoc}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <Box className="VideoBox">
            <UploadFileRoundedIcon className="VideoIcon" />
            <Box className="videoDottedBorder">
              <Typography gutterBottom className="UploadDoc">
                <b> Upload Documents(s)</b>
              </Typography>
              <Typography className="VideoPara">
                You can upload upto 20 files at a time. Maximum file size that
                can be attached is 40 MB.
              </Typography>

              <div {...getIntroVideoRootProps({ className: "dropzone" })}>
                <input {...getIntroVideoInputProps()} />
                <Box className="thumbnailUpload buttonBOx">
                  <Button
                    variant="contained"
                    className="SelectButton"
                    // onClick={handleCreateTeam}
                  >
                    Select File(s)
                  </Button>
                  <Typography
                    sx={{ marginTop: "3%" }}
                    className="fontRecommend"
                  >
                    Recommended Image size :{" "}
                    <b>800px x 600px, PNG or JPEG file</b>
                  </Typography>
                  <LoaderComponent loaderState={loaderState} />
                  {imgUpload === "" && storedBasicInfo?.thumbnailPath && (
                    <img
                      src={storedBasicInfo?.thumbnailPath}
                      width={140}
                      height={"auto"}
                    />
                  )}
                  {imgUpload != "" && (
                    <img
                      src={storedBasicInfo?.thumbnailPath}
                      width={140}
                      height={"auto"}
                    />
                  )}
                </Box>
              </div>
            </Box>

            <Box sx={{ marginTop: "12px" }}>Or</Box>
            <CommonAddLinkField onAddLink={onAddLink} />
          </Box>
        </DialogContent>
      </BootstrapDialog>

      {/* <BootstrapDialog
        className="PopUP"
        onClose={handleCloseDialogSubjectiveTest}
        aria-labelledby="customized-dialog-title"
        open={subtestopened}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "1rem" }}
          id="customized-dialog-title"
        ></DialogTitle>
        <Typography sx={{mt: -2, ml:3, fontWeight: 600}}>
        Add Subjective Test
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialogSubjectiveTest}
          sx={{
            position: "absolute",
            right: 8,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Divider sx={{mt:1}}/>
        <DialogContent>
          <Box>
          <FormControl sx={{ width: 540 }}>
              <Select
               MenuProps={MenuProps}
                value={categoryName!==""? categoryName : "fjng" }
                renderValue={(v) => {
                  console.log(categoryName,"categoryName")
                  console.log(v,"categoryName")
                  return categoryName !== "" ? (
                    <Typography>{categoryName}</Typography>
                  ) : (
                    <Typography> Select Test</Typography>
                  );
                }}
                onChange={(e) => handleChange(e)}
                className="addCatTextField"
                sx={{mt: 2}}
              >
                {cat.map((item) => (
                  <MenuItem key={item._id} value={item} >
                    {item.test_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
                        <Button
                          sx={{
                            textTransform: "none",
                            padding: "3px 0px",
                            marginRight: "16px",
                          }}
                          variant="outlined"
                          // onClick={handleConfigChanges}
                        >
                          Save
                        </Button>
        </DialogActions>
      </BootstrapDialog> */}

      <BootstrapDialog
        className="PopUP"
        onClose={handleCloseDialogVideo}
        aria-labelledby="customized-dialog-title"
        open={videoopened}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "1rem" }}
          id="customized-dialog-title"
        ></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialogVideo}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <Box className="VideoBox">
            <UploadFileRoundedIcon className="VideoIcon" />
            <Box className="videoDottedBorder">
              <Typography gutterBottom className="UploadDoc">
                <b> Upload Video(s) dfds</b>
              </Typography>
              <Typography className="VideoPara">
                You can upload upto 20 files at a time. Maximum file size that
                can be attached is 40 MB.
              </Typography>

              <div {...getIntroVideoRootProps({ className: "dropzone" })}>
                <input {...getIntroVideoInputProps()} />
                <Box className="thumbnailUpload buttonBOx">
                  <Button
                    variant="contained"
                    className="SelectButton"
                    // onClick={handleCreateTeam}
                  >
                    Select File(s)
                  </Button>
                  <Typography
                    sx={{ marginTop: "3%" }}
                    className="fontRecommend"
                  >
                    Recommended Image size :{" "}
                    <b>800px x 600px, PNG or JPEG file</b>
                  </Typography>
                  <LoaderComponent loaderState={loaderState} />
                  {imgUpload === "" && storedBasicInfo?.thumbnailPath && (
                    <img
                      src={storedBasicInfo?.thumbnailPath}
                      width={140}
                      height={"auto"}
                    />
                  )}
                  {imgUpload != "" && (
                    <img
                      src={storedBasicInfo?.thumbnailPath}
                      width={140}
                      height={"auto"}
                    />
                  )}
                </Box>
              </div>
            </Box>

            <Box sx={{ marginTop: "12px" }}>Or</Box>
            <CommonAddLinkField onAddLink={onAddLink} />
          </Box>
          <ToastContainer />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default DialogBoxes;
