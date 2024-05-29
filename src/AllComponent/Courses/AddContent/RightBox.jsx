import React, { Fragment, useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { Box, Button, Typography } from "@mui/material";
// import FolderIcon from '@mui/icons-material/Folder';
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NoteIcon from "@mui/icons-material/Note";
import LandscapeIcon from "@mui/icons-material/Landscape";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import DownloadForOfflineSharpIcon from "@mui/icons-material/DownloadForOfflineSharp";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import AddContentDrawer from "./AddContentDrawer";
import Video from "./AddContent/Video";
import Document from "./AddContent/Document";
import Image from "./AddContent/Image";
import ImportContent from "./AddContent/ImportContent";
import ImportLive from "./AddContent/ImportLive";
import OnlineTest from "./AddContent/OnlineTest";
import SubjectiveTest from "./AddContent/SubjectiveTest";
import ZipFile from "./AddContent/ZipFile";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import TipsAndUpdatesTwoToneIcon from "@mui/icons-material/TipsAndUpdatesTwoTone";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { useDropzone } from "react-dropzone";
import UploadIcon from "@mui/icons-material/Upload";
import LoaderComponent from "../../../Util/LoaderComponent";
import {
  getCategory,
  getSubcategoryList,
  uploadFile,
} from "../../ActionFactory/apiActions";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const RightBox = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [vd, setVd] = React.useState({
    left: false,
  });
  const [ot, setOt] = React.useState({
    left: false,
  });
  const [st, setSt] = React.useState({
    left: false,
  });
  const [doc, setDoc] = React.useState({
    left: false,
  });
  const [image, setImage] = React.useState({
    left: false,
  });
  const [zip, setZip] = React.useState({
    left: false,
  });
  const [ic, setIc] = React.useState({
    left: false,
  });
  const [il, setIL] = React.useState({
    left: false,
  });
  const [videoopened, setVideoqopen] = useState(false);
  const [docopened, setDocopen] = useState(false);
  const [zipopened, setZipopen] = useState(false);
  const [icopened, setIcopen] = useState(false);
  const [loaderState, setLoaderState] = useState(false);
  const [imgUpload, setImageWhileUpload] = useState("");
  const [storedBasicInfo, setStoredBasicInfo] = useState({
    Name: "",
    Description: "",
    Category: "",
    subCategory: "",
    thumbnailPath: null,
  });
  const [storeVideo, setStoreVideo] = useState();

  const onInroVideoDrop = async (files) => {
    // setLoaderState(true);
    setVideoqopen(false);
    setStoreVideo(files[0]);
    setVd({ vd, ["right"]: true });
    setDocopen(false);
    setDoc({ doc, ["right"]: true });
    // toggleDrawervd("right", true);
    // uploadFile({
    //   payload,
    //   callBack: (response) => {
    //     storedValues.thumbnailPath = response?.data?.path;
    //     setStoredBasicInfo(storedValues);
    //     setLoaderState(false);
    //   },
    // });
    // setStoredBasicInfo(storedValues);
  };

  const {
    getRootProps: getIntroVideoRootProps,
    getInputProps: getIntroVideoInputProps,
  } = useDropzone({
    onDrop: onInroVideoDrop,
    onChange: (event) => console.log(event),
    accept: {
      "video/mp4": [".mp4"],
    },
  });

  const handleClickOpenVideo = () => {
    setVideoqopen(true);
  };
  const handleCloseDialogVideo = () => {
    setVideoqopen(false);
  };
  const handleClickOpenDoc = () => {
    setDocopen(true);
  };
  const handleCloseDialogDoc = () => {
    setDocopen(false);
  };
  const handleClickOpenZip = () => {
    setZipopen(true);
  };
  const handleCloseDialogZip = () => {
    setZipopen(false);
  };
  const handleClickOpenIC = () => {
    setIcopen(true);
  };
  const handleCloseDialogIC = () => {
    setIcopen(false);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const toggleDrawervd = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setVd({ vd, [anchor]: open });
  };
  const toggleDrawerOT = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOt({ ot, [anchor]: open });
  };
  const toggleDrawerST = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSt({ st, [anchor]: open });
  };
  const toggleDrawerD = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDoc({ doc, [anchor]: open });
  };
  const toggleDrawerI = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setImage({ image, [anchor]: open });
  };
  const toggleDrawerZ = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setZip({ zip, [anchor]: open });
  };
  const toggleDrawerIC = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIc({ ic, [anchor]: open });
  };
  const toggleDrawerIL = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIL({ il, [anchor]: open });
  };
  return (
    <Fragment>
      <div className="rightBoxComplete">
        <Typography
          className="rightBoxTypography "
          onClick={toggleDrawer("right", true)}
        >
          <FolderIcon className="folderIconRightBox" />
          Folder
        </Typography>
        <Typography
          className="rightBoxTypography "
          // onClick={toggleDrawervd("right", true)}
          onClick={handleClickOpenVideo}
        >
          <PlayCircleIcon className="folderIconRightBox" />
          Video
        </Typography>
        <Typography
          className="rightBoxTypography "
          onClick={toggleDrawerOT("right", true)}
        >
          <AssignmentIcon className="folderIconRightBox" />
          Online Test
        </Typography>
        <Typography
          className="rightBoxTypography "
          onClick={toggleDrawerST("right", true)}
        >
          <AssignmentIcon className="folderIconRightBox" />
          Subjective Test
        </Typography>
        <Typography
          className="rightBoxTypography "
          // onClick={toggleDrawerD("right", true)}
          onClick={handleClickOpenDoc}
        >
          <NoteIcon className="folderIconRightBox" />
          Document
        </Typography>
        <Typography
          className="rightBoxTypography "
          onClick={toggleDrawerI("right", true)}
        >
          <LandscapeIcon className="folderIconRightBox" />
          Image
        </Typography>
        <Typography
          className="rightBoxTypography "
          // onClick={toggleDrawerZ("right", true)}
          onClick={handleClickOpenZip}
        >
          <FolderZipIcon className="folderIconRightBox" />
          Zip File
        </Typography>
        <Typography
          className="rightBoxTypography "
          // onClick={toggleDrawerIC("right", true)}
          onClick={handleClickOpenIC}
        >
          <DownloadForOfflineSharpIcon className="folderIconRightBox" />
          Import Content
        </Typography>
        <Typography
          className="rightBoxTypography "
          onClick={toggleDrawerIL("right", true)}
        >
          <DownloadForOfflineSharpIcon className="folderIconRightBox" />
          Import Live
        </Typography>
      </div>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        <AddContentDrawer handelclose={toggleDrawer} />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={vd["right"]}
        onClose={toggleDrawervd("right", false)}
      >
        {Video("right")}
      </Drawer>
      <Drawer
        anchor={"right"}
        open={doc["right"]}
        onClose={toggleDrawerD("right", false)}
      >
        {Document("right")}
      </Drawer>
      <Drawer
        anchor={"right"}
        open={image["right"]}
        onClose={toggleDrawerI("right", false)}
      >
        {Image("right")}
      </Drawer>
      <Drawer
        anchor={"right"}
        open={ic["right"]}
        onClose={toggleDrawerIC("right", false)}
      >
        {ImportContent("right")}
      </Drawer>
      <Drawer
        anchor={"right"}
        open={il["right"]}
        onClose={toggleDrawerIL("right", false)}
      >
        {ImportLive("right")}
      </Drawer>
      <Drawer
        anchor={"right"}
        open={ot["right"]}
        onClose={toggleDrawerOT("right", false)}
      >
        {/* {OnlineTest("right")} */}
        <OnlineTest handelclose={toggleDrawerOT} />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={st["right"]}
        onClose={toggleDrawerST("right", false)}
      >
        {SubjectiveTest("right")}
      </Drawer>
      <Drawer
        anchor={"right"}
        open={zip["right"]}
        onClose={toggleDrawerZ("right", false)}
      >
        {ZipFile("right")}
      </Drawer>
      <BootstrapDialog
        className="PopUP"
        onClose={handleCloseDialogIC}
        aria-labelledby="customized-dialog-title"
        open={icopened}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "1rem",ml: 2 }}
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
              <Typography>
                Selected(0)
              </Typography>
            <Box>
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search yours courses here"
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
              </Box>
            </Box>
          {/* niche wale box me map lagana hae api ane ke baad */}
            <Box className="SelectMainBox">
              
              <Box className="SelectBox">
            <Checkbox {...label} />
              <Box className="DataBox">
                <FolderIcon className="IconFolder"/>
                <Box>
                    <Typography>
                      TRICS 1 2023 SEASON 1
                    </Typography>
                    <Typography className="FilesPara">
                     <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                </Box>
              </Box>
              </Box>
               <Box className="SelectBox">
            <Checkbox {...label} />
              <Box className="DataBox">
                <FolderIcon className="IconFolder"/>
                <Box>
                    <Typography>
                      TRICS 1 2023 SEASON 1
                    </Typography>
                    <Typography className="FilesPara">
                     <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                </Box>
              </Box>
              </Box>
              <Box className="SelectBox">
            <Checkbox {...label} />
              <Box className="DataBox">
                <FolderIcon className="IconFolder"/>
                <Box>
                    <Typography>
                      TRICS 1 2023 SEASON 1
                    </Typography>
                    <Typography className="FilesPara">
                     <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                </Box>
              </Box>
              </Box>
               <Box className="SelectBox">
            <Checkbox {...label} />
              <Box className="DataBox">
                <FolderIcon className="IconFolder"/>
                <Box>
                    <Typography>
                      TRICS 1 2023 SEASON 1
                    </Typography>
                    <Typography className="FilesPara">
                     <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                </Box>
              </Box>
              </Box>
              <Box className="SelectBox">
            <Checkbox {...label} />
              <Box className="DataBox">
                <FolderIcon className="IconFolder"/>
                <Box>
                    <Typography>
                      TRICS 1 2023 SEASON 1
                    </Typography>
                    <Typography className="FilesPara">
                     <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                </Box>
              </Box>
              </Box>
               <Box className="SelectBox">
            <Checkbox {...label} />
              <Box className="DataBox">
                <FolderIcon className="IconFolder"/>
                <Box>
                    <Typography>
                      TRICS 1 2023 SEASON 1
                    </Typography>
                    <Typography className="FilesPara">
                     <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                </Box>
              </Box>
              </Box>
              <Box className="SelectBox">
            <Checkbox {...label} />
              <Box className="DataBox">
                <FolderIcon className="IconFolder"/>
                <Box>
                    <Typography>
                      TRICS 1 2023 SEASON 1
                    </Typography>
                    <Typography className="FilesPara">
                     <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                </Box>
              </Box>
              </Box>
               <Box className="SelectBox">
            <Checkbox {...label} />
              <Box className="DataBox">
                <FolderIcon className="IconFolder"/>
                <Box>
                    <Typography>
                      TRICS 1 2023 SEASON 1
                    </Typography>
                    <Typography className="FilesPara">
                     <b> 2 video(s), 298 File(s), 9 test(s)</b>
                    </Typography>
                </Box>
              </Box>
              </Box>
           
            
            </Box>
          </Box>
          
        </DialogContent>
        <Box className="ButtonBOx" >
            <Button variant="outlined" disabled className="CancelBtn"> Cancel</Button>
            <Button variant="contained" >
              Import Selected
            </Button>
          </Box>
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
            <Typography gutterBottom className="UploadDoc">
              <b> Upload Zip File(s)</b>
            </Typography>
            <Typography className="VideoPara">
              You can upload upto 20 files at a time. Maximum file size that can
              be attached is 40 MB.
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
                <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
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
            <Typography gutterBottom className="UploadDoc">
              <b> Upload Documents(s)</b>
            </Typography>
            <Typography className="VideoPara">
              You can upload upto 20 files at a time. Maximum file size that can
              be attached is 40 MB.
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
                <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
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
            <Typography gutterBottom className="UploadDoc">
              <b> Upload Video(s)</b>
            </Typography>
            <Typography className="VideoPara">
              You can upload upto 20 files at a time. Maximum file size that can
              be attached is 40 MB.
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
                <Typography sx={{ marginTop: "3%" }} className="fontRecommend">
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
        </DialogContent>
      </BootstrapDialog>
    </Fragment>
  );
};

export default RightBox;
