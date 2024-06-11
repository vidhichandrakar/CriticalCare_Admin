import React, { Fragment, useState, useEffect } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NoteIcon from "@mui/icons-material/Note";
import LandscapeIcon from "@mui/icons-material/Landscape";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import DownloadForOfflineSharpIcon from "@mui/icons-material/DownloadForOfflineSharp";
import ImportContent from "./AddContent/ImportContent";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../../ActionFactory/apiActions";
import ContentSlider from "./Boxes/Slider.component";
import DialogBoxes from "./Boxes/DialogBoxes.component";
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
    (anchor, open, stateVariable, setVariable) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setVariable({ ...stateVariable, [anchor]: open });
    };

  const addContentList = [
    {
      name: "Folder",
      Component: <FolderIcon className="folderIconRightBox" />,
      onClickHandler: () => () => toggleDrawer("right", true, state, setState)
    },
    {
      name: "Video",
      Component: <AssignmentIcon className="folderIconRightBox" />,
      onClickHandler: () => handleClickOpenVideo(vd, setVd)
    },
    {
      name: "online Test",
      Component: <AssignmentIcon className="folderIconRightBox" />,
      onClickHandler: () => toggleDrawer("right", true, ot, setOt)
    },
    {
      name: "Subjective Test",
      Component: <AssignmentIcon className="folderIconRightBox" />,
      onClickHandler: () => toggleDrawer("right", true, st, setSt)
    },
    {
      name: "Document",
      Component: <NoteIcon className="folderIconRightBox" />,
      onClickHandler: () => handleClickOpenDoc(doc, setDoc)
    },
    {
      name: "Image",
      Component: <LandscapeIcon className="folderIconRightBox" />,
      onClickHandler: () => handleClickOpenImg(image, setImage)
    },
    {
      name: "Zip File",
      Component: <FolderZipIcon className="folderIconRightBox" />,
      onClickHandler: () => handleClickOpenZip(zip, setZip)
    },
    {
      name: "Import Content",
      Component: <DownloadForOfflineSharpIcon className="folderIconRightBox" />,
      onClickHandler: () => handleClickOpenIC(ic, setIc)
    },
    {
      name: "Import Live",
      Component: <DownloadForOfflineSharpIcon className="folderIconRightBox" />,
      onClickHandler: () => toggleDrawer("right", true, il, setIL)
    },
  ];

  return (
    <Fragment>
      {console.log("addd", addContentList)}
      <div className="rightBoxComplete">
        {addContentList.map((list) => {
          return (
            <Typography
              className="rightBoxTypography "
              onClick={list.onClickHandler}
            >
              {list.Component}
              {list.name}
            </Typography>
          );
        })}
      </div>
      <ContentSlider
        toggleDrawer={toggleDrawer}
        toggleDrawerUrl={toggleDrawerUrl}
        ImportContent={ImportContent}
        setVd={setVd}
        setDoc={setDoc}
        setImage={setImage}
        setIc={setIc}
        setIl={setIL}
        setOt={setOt}
        setSt={setSt}
        setZip={setZip}
        setState={setState}
        state={state}
        vd={vd}
        doc={doc}
        image={image}
        ic={ic}
        il={il}
        ot={ot}
        st={st}
        zip={zip}
        url={url}
      />
      <DialogBoxes
        handleCloseDialogIC={handleCloseDialogIC}
        icopened={icopened}
        handleCloseDialogImg={handleCloseDialogImg}
        imgopened={imgopened}
        handleCloseDialogZip={handleCloseDialogZip}
        zipopened={zipopened}
        handleCloseDialogDoc={handleCloseDialogDoc}
        docopened={docopened}
        handleCloseDialogVideo={handleCloseDialogVideo}
        videoopened={videoopened}
        imgUpload={imgUpload}
        getIntroVideoInputProps={getIntroVideoInputProps}
        getIntroVideoRootProps={getIntroVideoRootProps}
        loaderState={loaderState}
        storedBasicInfo={storedBasicInfo}
        toggleDrawerUrl={toggleDrawerUrl}
      />
    </Fragment>
  );
};

export default RightBox;
