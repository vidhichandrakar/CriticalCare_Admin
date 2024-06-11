import React from "react";
import Url from "../AddContent/Url";
import ZipFile from "../AddContent/ZipFile";
import SubjectiveTest from "../AddContent/SubjectiveTest";
import OnlineTest from "../AddContent/OnlineTest";
import ImportLive from "../AddContent/ImportLive";
import Image from "../AddContent/Image";
import Video from "../AddContent/Video";
import AddContentDrawer from "../AddContentDrawer";
import { Drawer } from "@mui/material";
import Document from "../AddContent/Document";

const ContentSlider = ({
  toggleDrawer,
  setState,
  ImportContent,
  toggleDrawerUrl,
  state,
  vd,
  doc,
  image,
  ic,
  il,
  ot,
  st,
  zip,
  setVd,
  setDoc,
  setImage,
  setIc,
  setIl,
  setOt,
  setSt,
  setZip,
  url,
}) => {
  return (
    <>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false, state, setState)}
      >
        <AddContentDrawer
          anchor={"right"}
          handelclose={toggleDrawer}
          toggleDrawer={toggleDrawer}
          state={state}
          setState={setState}
        />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={vd["right"]}
        onClose={toggleDrawer("right", false, vd, setVd)}
      >
        {Video("right")}
      </Drawer>
      <Drawer
        anchor={"right"}
        open={doc["right"]}
        onClose={toggleDrawer("right", false, doc, setDoc)}
      >
        {Document("right")}
      </Drawer>
      <Drawer
        anchor={"right"}
        open={image["right"]}
        onClose={toggleDrawer("right", false, image, setImage)}
      >
        {Image("right")}
      </Drawer>
      <Drawer
        anchor={"right"}
        open={ic["right"]}
        onClose={toggleDrawer("right", false, ic, setIc)}
      >
        {ImportContent("right")}
      </Drawer>
      <Drawer
        anchor={"right"}
        open={il["right"]}
        onClose={toggleDrawer("right", false, il, setIl)}
      >
        {ImportLive("right")}
      </Drawer>
      <Drawer
        anchor={"right"}
        open={ot["right"]}
        onClose={toggleDrawer("right", false, ot, setOt)}
      >
        <OnlineTest handelclose={toggleDrawer} />
      </Drawer>
      <Drawer
        anchor={"right"}
        open={st["right"]}
        onClose={toggleDrawer("right", false, st, setSt)}
      >
        {SubjectiveTest("right")}
      </Drawer>
      <Drawer
        anchor={"right"}
        open={zip["right"]}
        onClose={toggleDrawer("right", false, zip, setZip)}
      >
        {ZipFile("right")}
      </Drawer>
      <Drawer
        anchor={"right"}
        open={url["right"]}
        onClose={toggleDrawerUrl("right", false)}
      >
        <Url handelclose={toggleDrawerUrl} anchor={"right"} />
      </Drawer>
    </>
  );
};

export default ContentSlider;
