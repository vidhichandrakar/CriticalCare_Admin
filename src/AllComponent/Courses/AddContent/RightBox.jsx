import React, { Fragment, useState, useEffect } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NoteIcon from "@mui/icons-material/Note";
import ImportContent from "./AddContent/ImportContent";
import { useDropzone } from "react-dropzone";
import {
  getModuleByContentCount,
  uploadFile,
} from "../../ActionFactory/apiActions";
import ContentSlider from "./Boxes/Slider.component";
import DialogBoxes from "./Boxes/DialogBoxes.component";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Box, Popover, TextField } from "@material-ui/core";
import "../../CSSFile/Content.css";
import { ToastContainer, toast } from "react-toastify";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import { Button } from "@mui/material";
import { CommonAddLinkField } from "../../../Util/CommonAddLinkField";

const RightBox = ({
  contentType,
  handleVideoName,
  handleInputChange,
  courseData,
  handleAddUrl,
  clickedModuleIdx,
  setUploadPopupOpen,
  setAnchorEl,
  setContentData,
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
  const [driveUrl, setDriveUrl] = useState({
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
  const [subtestopened, setSubtestopen] = useState(false);
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
  const [uploadedVideoLink, setUploadedVideoLink] = useState([]);
  const [storeVideo, setStoreVideo] = useState();
  const [acceptType, setAcceptType] = useState({});
  const [uploadedFileType, setUploadedFileType] = useState({});
  const [drawerUrl, setDrawerUrl] = useState(false);
  const [contentAddedLinks, setContentAddedLinks] = useState([]);
  const [toastErrorVideo, setToastErrorVideo] = useState();
  const [anchoUrlr, setAnchorUrl] = useState(null);
  const [anchorEl, setAnchorEl1] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [inputLink, setInputLink] = useState("");
  const [link, setLink] = useState("");
  // const [moduleId, setModuleId] = useState({})
  // let moduleId = contentType.map((item)=>{
  //   return( item.module_id)})
  // let moduleId = contentType.map((item)=>{
  //   return(
  //     item.module_id
  //   )
  // })
  //
  useEffect(() => {
    if (courseData?.contents?.length) {
      setUploadedVideo(courseData.contents);
    }
    // else if (contentType){

    //   getModuleByContentCount({

    //   })

    // }
  }, []);

  const handleAddLink = (inputLink, inputName) => {
    let inputNameValue = inputName.trim();
    // if (uploadedFileType.content_type_id == 1) {
    //   if (inputNameValue && !inputNameValue.endsWith(".mp4")) {
    //     inputNameValue = inputNameValue.replace(/\s+/g, "");
    //   }
    // }
console.log("inputNameValue---------->",inputNameValue)
    setContentAddedLinks([
      ...contentAddedLinks,
      { name: inputNameValue, link: inputLink },
    ]);

    // let arr = [...uploadedVideo];
    let arr = [...uploadedVideoLink];
    let arr2 = {
      content_name: "",
      content_url: "",
      content_type_name: "",
      content_type_id: "",
    };
    arr2.content_name = inputNameValue;
    arr2.content_url = inputLink;
    arr2.content_type = uploadedFileType.content_type_name;
    arr2.content_type_name = uploadedFileType.content_type_name;
    arr2.content_type_id = uploadedFileType.content_type_id;
    if (courseData?.contents?.length) {
      arr2.course_id = courseData.course_id;
    }
    arr.push(arr2);
    setUploadedVideoLink(arr);
    console.log("arrarrarr-------->",arr)
    handleInputChange("addContent", arr);
    handleVideoName(arr);

    setVideoqopen(false);
    setImgopen(false);
    setDocopen(false);
    setZipopen(false);
  };

  //this function is for to add all items

  const onInroVideoDrop = async (files) => {
    console.log("file----->", files);
    const maxSize = 40 * 1024 * 1024; //for 40mb
    let payload = new FormData();
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        // toast?.error(`File "${file?.name}" exceeds the 40MB limit.`);
        setToastErrorVideo(
          toast?.error(`File "${file?.name}" exceeds the 40MB limit.`)
        );
        return false;
      }
      payload.append("file", files[0], files[0]?.name);
      return payload;
    });
    if (validFiles.length > 0) {
      setLoaderState(true);
      uploadFile({
        payload,
        callBack: (response) => {
          let arr = [...uploadedVideo];
          let arr2 = {
            content_name: "",
            content_url: "",
            content_type_name: "",
            content_type_id: "",
          };
          arr2.content_name = response?.data?.fileName;
          arr2.content_url = response?.data?.path;
          arr2.content_type_name = uploadedFileType.content_type_name;
          arr2.content_type_id = uploadedFileType.content_type_id;
          if (courseData?.contents?.length) {
            arr2.course_id = courseData.course_id;
          }
          arr.push(arr2);
          setUploadedVideo(arr);
          handleInputChange("addContent", arr);
          handleVideoName(arr);
          setLoaderState(false);
          setAnchorEl(false);
          setVideoqopen(false);
          setImgopen(false);
          setDocopen(false);
          setZipopen(false);
        },
      });
    }
  };

  const {
    getRootProps: getIntroVideoRootProps,
    getInputProps: getIntroVideoInputProps,
  } = useDropzone({
    onDrop: onInroVideoDrop,
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
  const handleopenDialogSubjectiveTest = () => {
    setSubtestopen(true);
  };
  const handleCloseDialogSubjectiveTest = () => {
    setSubtestopen(false);
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

  const handleClose = () => {
    setAnchorEl1(null);
  };
  const handleAddLinkUrl = () => {
    if (inputLink.trim()) {
      setLink(inputLink);
      // handleInput(inputLink, "link");
      setInputLink("");
      handleClose();
    }
  };
  const handleAddDriveUrl = () => {
    // console.log("jhgvghjk-->", driveUrl,abc);
    let docType = contentType.filter(
      (item) => item.content_type_name === "URL"
    );
    console.log(docType,"docType")
    setUploadedFileType(docType[0]);
    setAnchorEl1(true);
  };

  const onAddLink = (inputLink, inputName) => {
    handleAddLink(inputLink, inputName);
    console.log("inputLink, inputName--->", inputLink, inputName);
    setAnchorEl1(false);
    setDocopen(false);
    setVideoqopen(false);
  };

  const handleCloseDialogImg = () => {
    setImgopen(false);
  };
  const handleClickOpenIC = () => {
    setIcopen(true);
    setUploadPopupOpen(true);
  };
  const handleCloseDialogIC = () => {
    setIcopen(false);
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

  const toggleDrawer =
    (anchor, open, stateVariable, setStateVariable) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setStateVariable({ ...stateVariable, [anchor]: open });
    };

  const addContentList = [
    // {
    //   name: "Folder",
    //   Component: <FolderIcon className="folderIconRightBox" />,
    //   onClickHandler: toggleDrawer("right", true, state, setState),
    // },
    {
      name: "Video",
      Component: <VideocamIcon className="folderIconRightBox" />,
      onClickHandler: () => handleClickOpenVideo(vd, setVd),
    },
    // {
    //   name: "online Test",
    //   Component: <QuizIcon className="folderIconRightBox" />,
    //   onClickHandler: toggleDrawer("right", true, ot, setOt),
    // },
    // {
    //   name: "Subjective Test",
    //   Component: <AssignmentIcon className="folderIconRightBox" />,
    //   onClickHandler: () => handleopenDialogSubjectiveTest(st, setSt),
    // },
    {
      name: "Document",
      Component: <NoteIcon className="folderIconRightBox" />,
      onClickHandler: () => handleClickOpenDoc(doc, setDoc),
    },
    {
      name: "Drive",
      Component: <AddToDriveIcon className="folderIconRightBox" />,
      onClickHandler: () => handleAddDriveUrl(driveUrl, setDriveUrl),
    },
    // {
    //   name: "Zip File",
    //   Component: <FolderZipIcon className="folderIconRightBox" />,
    //   onClickHandler: () => handleClickOpenZip(zip, setZip),
    // },
    // {
    //   name: "Import Content",
    //   Component: <DownloadForOfflineSharpIcon className="folderIconRightBox" />,
    //   onClickHandler: () => handleClickOpenIC(ic, setIc),
    // },
    // {
    //   name: "Import Live",
    //   Component: <LiveTvIcon className="folderIconRightBox" />,
    //   onClickHandler: toggleDrawer("right", true, il, setIL),
    // },
  ];

  return (
    <Fragment>
      <div className="rightBoxComplete">
        {addContentList.map((list) => {
          return (
            <Box className="rightBoxTypography " onClick={list.onClickHandler}>
              {list.Component}
              {list.name}
            </Box>
          );
        })}
      </div>
      <ContentSlider
        toggleDrawer={toggleDrawer}
        toggleDrawerUrl={toggleDrawerUrl}
        ImportContent={ImportContent}
        setVd={setVd}
        setDoc={setDoc}
        setDriveUrl={setDriveUrl}
        setIc={setIc}
        setIl={setIL}
        setOt={setOt}
        setSt={setSt}
        setZip={setZip}
        setState={setState}
        state={state}
        vd={vd}
        doc={doc}
        driveUrl={driveUrl}
        ic={ic}
        il={il}
        ot={ot}
        st={st}
        zip={zip}
        url={url}
        handleAddUrl={handleAddUrl}
        uploadedFileType={uploadedFileType}
        uploadedVideo={uploadedVideo}
        uploadedVideoLink={uploadedVideoLink}
        setUploadedVideo={setUploadedVideo}
        setUploadedVideoLink={setUploadedVideoLink}
        handleInputChange={handleInputChange}
        courseData={courseData}
      />
      <DialogBoxes
        // setContentlink={setContentlink}
        handleAddLink={handleAddLink}
        handleCloseDialogIC={handleCloseDialogIC}
        icopened={icopened}
        handleCloseDialogImg={handleCloseDialogImg}
        imgopened={imgopened}
        handleCloseDialogZip={handleCloseDialogZip}
        zipopened={zipopened}
        handleCloseDialogDoc={handleCloseDialogDoc}
        docopened={docopened}
        handleCloseDialogVideo={handleCloseDialogVideo}
        handleCloseDialogSubjectiveTest={handleCloseDialogSubjectiveTest}
        subtestopened={subtestopened}
        videoopened={videoopened}
        imgUpload={imgUpload}
        getIntroVideoInputProps={getIntroVideoInputProps}
        getIntroVideoRootProps={getIntroVideoRootProps}
        loaderState={loaderState}
        storedBasicInfo={storedBasicInfo}
        toggleDrawerUrl={toggleDrawerUrl}
        toastErrorVideo={toastErrorVideo}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div style={{ padding: "16px" }}>
          <CommonAddLinkField onAddLink={onAddLink} />
        </div>
      </Popover>
    </Fragment>
  );
};

export default RightBox;
