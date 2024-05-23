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
          onClick={toggleDrawervd("right", true)}
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
          onClick={toggleDrawerD("right", true)}
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
          onClick={toggleDrawerZ("right", true)}
        >
          <FolderZipIcon className="folderIconRightBox" />
          Zip File
        </Typography>
        <Typography
          className="rightBoxTypography "
          onClick={toggleDrawerIC("right", true)}
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
        {AddContentDrawer("right")}
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
        {OnlineTest("right")}
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
    </Fragment>
  );
};

export default RightBox;
