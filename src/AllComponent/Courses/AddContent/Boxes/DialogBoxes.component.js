import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import LoaderComponent from "../../../../Util/LoaderComponent";
import FolderIcon from "@mui/icons-material/Folder";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import { TextField } from "@mui/material";
import TipsAndUpdatesTwoToneIcon from "@mui/icons-material/TipsAndUpdatesTwoTone";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
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
  imgUpload,
  getIntroVideoInputProps,
  getIntroVideoRootProps,
  loaderState,
  storedBasicInfo,
  toggleDrawerUrl,
}) => {
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
        onClose={handleCloseDialogImg}
        aria-labelledby="customized-dialog-title"
        open={imgopened}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "1rem" }}
          id="customized-dialog-title"
        ></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialogImg}
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
                <b> Upload Image(s)</b>
              </Typography>
              <Typography className="VideoPara">
                You can upload upto 20 files at a time. Maximum file size that
                can be attached is 4 MB.
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

            <Typography
              className="orPasteURL"
              onClick={toggleDrawerUrl("right", true)}
            >
              Paste URL
            </Typography>
          </Box>
        </DialogContent>
      </BootstrapDialog>
      <BootstrapDialog
        className="PopUP"
        onClose={handleCloseDialogZip}
        aria-labelledby="customized-dialog-title"
        open={zipopened}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "1rem" }}
          id="customized-dialog-title"
        ></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialogZip}
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
                <b> Upload Zip File(s)</b>
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

            <Typography
              className="orPasteURL"
              onClick={toggleDrawerUrl("right", true)}
            >
              Paste URL
            </Typography>
          </Box>
        </DialogContent>
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

            <Typography
              className="orPasteURL"
              onClick={toggleDrawerUrl("right", true)}
            >
              Paste URL
            </Typography>
          </Box>
        </DialogContent>
      </BootstrapDialog>
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
                <b> Upload Video(s)</b>
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
            <Typography
              className="orPasteURL"
              onClick={toggleDrawerUrl("right", true)}
            >
              Paste URL
            </Typography>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default DialogBoxes;
