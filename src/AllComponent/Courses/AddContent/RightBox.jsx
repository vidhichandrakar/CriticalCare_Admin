import React, { Fragment, useState, useEffect } from "react";
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
import UrlFile from "./AddContent/Url";
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
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import Url from "./AddContent/Url";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const RightBox = ({
  contentType,
  handleVideoName,
  handleInputChange,
  courseData,
}) => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [vd, setVd] = useState({
    left: false,
  });
  const [ot, setOt] = useState({
    left: false,
  });
  const [st, setSt] = useState({
    left: false,
  });
  const [doc, setDoc] = useState({
    left: false,
  });
  const [image, setImage] = useState({
    left: false,
  });
  const [zip, setZip] = useState({
    left: false,
  });
  const [ic, setIc] = useState({
    left: false,
  });
  const [il, setIL] = useState({
    left: false,
  });
  const [url, setUrl] = useState({
    left: false,
  });
  const [videoopened, setVideoqopen] = useState(false);
  const [docopened, setDocopen] = useState(false);
  const [zipopened, setZipopen] = useState(false);
  const [imgopened, setImgopen] = useState(false);
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
  const [uploadedVideo, setUploadedVideo] = useState([]);
  const [storeVideo, setStoreVideo] = useState();
  const [acceptType, setAcceptType] = useState({});
  const [uploadedFileType, setUploadedFileType] = useState({});
  const [drawerUrl, setDrawerUrl] = useState(false);

  useEffect(() => {
    if (courseData?.contents?.length) {
      setUploadedVideo(courseData.contents);
    }
  }, []);

  const onInroVideoDrop = async (files) => {
    let payload = new FormData();
    payload.append("file", files[0], files[0]?.name);
    setLoaderState(true);
    uploadFile({
      payload,
      callBack: (response) => {
        let arr = [...uploadedVideo];
        let arr2 = {
          content_name: "",
          content_url: "",
          content_type: "",
          content_type_id: "",
        };
        arr2.content_name = response?.data?.fileName;
        arr2.content_url = response?.data?.path;
        arr2.content_type = uploadedFileType.content_type_name;
        arr2.content_type_id = uploadedFileType.content_type_id;
        if (courseData?.contents?.length) {
          arr2.course_id = courseData.course_id;
        }
        arr.push(arr2);
        setUploadedVideo(arr);
        handleInputChange("addContent", arr);
        handleVideoName(arr);
        setLoaderState(false);
        setVideoqopen(false);
        setImgopen(false);
        setDocopen(false);
        setZipopen(false);
      },
    });
  };

  const {
    getRootProps: getIntroVideoRootProps,
    getInputProps: getIntroVideoInputProps,
  } = useDropzone({
    onDrop: onInroVideoDrop,
    onChange: (event) => console.log(event),
    accept: acceptType,
  });

  const handleClickOpenVideo = () => {
    setAcceptType({
      "video/mp4": [".mp4"],
    });
    setVideoqopen(true);
    let videoType = contentType.filter(
      (item) => item.content_type_name === "Video"
    );
    setUploadedFileType(videoType[0]);
  };
  const handleCloseDialogVideo = () => {
    setVideoqopen(false);
  };
  const handleClickOpenDoc = () => {
    setAcceptType({
      "document/doc": [".doc"],
      "document/pdf": [".pdf"],
      "document/HTML ": [".HTML "],
      "document/XLS ": [".XLS "],
      "document/PPT ": [".PPT "],
      "document/TXT": [".TXT"],
    });
    setDocopen(true);
    let docType = contentType.filter(
      (item) => item.content_type_name === "Document"
    );
    setUploadedFileType(docType[0]);
  };
  const handleCloseDialogDoc = () => {
    setDocopen(false);
  };
  const handleClickOpenZip = () => {
    setAcceptType({
      "zip/zip": [".zip"],
    });
    setZipopen(true);
    let zipType = contentType.filter(
      (item) => item.content_type_name === "Zip File"
    );
    setUploadedFileType(zipType[0]);
  };
  const handleCloseDialogZip = () => {
    setZipopen(false);
  };
  const handleClickOpenImg = () => {
    setAcceptType({
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    });
    setImgopen(true);
    let imgType = contentType.filter(
      (item) => item.content_type_name === "Image"
    );
    setUploadedFileType(imgType[0]);
  };
  const handleCloseDialogImg = () => {
    setImgopen(false);
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
  const toggleDrawerUrl = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setVideoqopen(false);
    setDocopen(false);
    setImgopen(false);
    setZipopen(false);
    setUrl({ url, [anchor]: open });
  };

  const handleDrawerUrl = () => {
    setDrawerUrl(true);
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
          // onClick={toggleDrawerI("right", true)}
          onClick={handleClickOpenImg}
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
        <Typography
          className="rightBoxTypography "
          onClick={toggleDrawerUrl("right", true)}
        >
          <DownloadForOfflineSharpIcon className="folderIconRightBox" />
          URL
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
      <Drawer
        anchor={"right"}
        open={url["right"]}
        onClose={toggleDrawerUrl("right", false)}
      >
        <Url handelclose={toggleDrawerUrl} />
      </Drawer>
      <BootstrapDialog
        className="PopUP"
        onClose={handleCloseDialogIC}
        aria-labelledby="customized-dialog-title"
        open={icopened}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "1rem", ml: 2 }}
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
            {" "}
            Cancel
          </Button>
          <Button variant="contained">Import Selected</Button>
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
            <Typography gutterBottom className="UploadDoc">
              <b> Upload Image(s)</b>
            </Typography>
            <Typography className="VideoPara">
              You can upload upto 20 files at a time. Maximum file size that can
              be attached is 4 MB.
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
            <Typography
              className="orPasteURL"
              onClick={toggleDrawerUrl("right", true)}
            >
              Or paste URL
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
            <Typography
              className="orPasteURL"
              onClick={toggleDrawerUrl("right", true)}
            >
              Or paste URL
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
            <Typography
              className="orPasteURL"
              onClick={toggleDrawerUrl("right", true)}
            >
              Or paste URL
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
            <Typography
              className="orPasteURL"
              onClick={toggleDrawerUrl("right", true)}
            >
              Or paste URL
            </Typography>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </Fragment>
  );
};

export default RightBox;
