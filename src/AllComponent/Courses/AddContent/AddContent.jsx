import React, { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import RightBox from "./RightBox";
import {
  addContentOnCreateCourse,
  getContentType,
} from "../../ActionFactory/apiActions";
import attachmentimgae from "../../../Media/Images/undraw_attached_file_re_0n9b.svg";
import Divider from "@material-ui/core/Divider";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import NoteIcon from "@mui/icons-material/Note";
import Stack from "@mui/material/Stack";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { getCourseContentById } from "../../ActionFactory/apiActions";

function AddContent({
  handleInputChange,
  handleTrackerPage,
  courseData,
  courseIdForContent,
  // getAddedContentData,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [contentType, setContentType] = useState([]);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [videoDesc, setVideoDesc] = useState([{}]);
  const [clickedModuleIdx, setClickedModuleIdx] = useState();
  const [addModulesText, setAddModulesText] = useState("");
  const [expanded, setExpanded] = useState();
  const [error, setError] = useState(false);
  const [getAddedContentData, setGetAddedContentData] = useState({});
  const [uploadPopupOpen, setUploadPopupOpen] = useState(false)
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    courseModuleDetails: {
      module_name: "",
      course_id: 3,
    },
    courseContents: [],
  });
  const [moduleDescription, setModuleDescription] = useState([
    {
      id: 0,
      moduleName: "",
      item: [],
    },
  ]);

  useEffect(() => {
    if (courseData?.course_id) {
      getCourseContentById({
        courseId: courseData?.course_id,
        callBack: (response) => {
          let arr = [];
          let arr2 = [];
          response?.data?.map((item, index) => {
            let storedValues = Object.assign({}, item);
            storedValues.moduleName = item.module_name;
            item.courseContents.map((content) => {
              storedValues.item = [content];
            });
            arr.push(storedValues);
          });
          setModuleDescription(arr);
        },
      });
    }
    getContentType({
      callBack: (response) => {
        setContentType(response.data);
      },
    });
  }, []);
  const handleAddContent = (event, idx) => {
    event.stopPropagation();
    // if (idx === expanded) {
    //   setExpanded(null);
    // } else {
    //   setExpanded(idx);
    // }
    if (idx !== expanded) {
      setExpanded(idx);
    } 
    setAnchorEl(event.currentTarget);
    setClickedModuleIdx(idx);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVideoName = (value) => {
    let arr = [];
    setVideoDesc(value);

    moduleDescription.map((item, index) => {
      let storedValues = Object.assign({}, item);
      if (item.id === clickedModuleIdx) {
        storedValues.moduleName = addModulesText;
        storedValues.item = value;
      }
      arr.push(storedValues);
    });
    setModuleDescription(arr);
  };
  const handleCreateCourse = () => {
    // no use of this before remove double check it
    if (courseData.length !== null) {
      handleInputChange("addContent", videoDesc);
    }
    let createCourse = 3;
    handleTrackerPage(3, createCourse);
  };
  const handleAddUrl = (type, value) => {
    if (type === "uploadUrl") {
      setVideoDesc(value);
    }
  };
  const extractVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=|^youtu\.be\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  const handleUploadLink = (url, item) => {
    if (item.content_type === "Video") {
      const videoId = url ? extractVideoId(url) : null;
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;

      if (!videoId) {
        return <p>Invalid YouTube URL</p>;
      }
      // setData(embedUrl);
      return embedUrl;
    } else return url;
  };
  const handleDocumentType = (value) => {
    return (
      value === "doc" ||
      value === "HTML" ||
      value === "pdf" ||
      value === "XLS" ||
      value === "PPT" ||
      value === "TXT"
    );
  };
  const handleAddModule = () => {
    const newId = moduleDescription.length;
    let addedContent = [...moduleDescription];
    addedContent.push({
      id: newId,
      moduleName: "",
      item: [],
    });
    setModuleDescription(addedContent);
  };

  const handleImageType = (value) => {
    return value === "jpeg" || value === "png" || value === "jpg";
  };

  const handleInputOnAddContent = (e) => {
    // e.preventDefault();
    if (e === "") {
      setError(true);
    } else {
      setError(false);
      setAddModulesText(e);
    }
    let arr = [];
    setAddModulesText(e);
    moduleDescription.map((item, index) => {
      let storedValues = Object.assign({}, item);
      if (item.id === clickedModuleIdx) {
        storedValues.moduleName = e;
      }
      arr.push(storedValues);
    });
    setModuleDescription(arr);
  };

  const handleSaveModule = (index) => {
    if (addModulesText === "") {
      setError(true);
    } else {
      const payload = {
        courseModuleDetails: {
          module_name: addModulesText,
          course_id: courseIdForContent.course_id,
        },
        courseAttachments: videoDesc,
      };

      addContentOnCreateCourse({
        payload: payload,
        callBack: (response) => {},
      });
    }
  };

  const handleExit = () => {
    navigate("/admin/YourCourses");
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function callAttachFilesOneByOne(moduleDescription) {
    for (const item of moduleDescription) {
      const payload = {
        courseModuleDetails: {
          module_name: item.moduleName,
          course_id: courseIdForContent.course_id,
        },
        courseAttachments: item.item,
      };
      try {
        await addContentOnCreateCourse({
          payload: payload,
          callBack: (response) => {
            navigate("/admin/YourCourses");
          },
        });
        await sleep(100);
      } catch (error) {
        console.error("Error in adding content:", error);
      }
    }
  }
  const handleSaveAllAttachedModule = () => {
    if (addModulesText === "") {
      setError(true);
    } else {
      callAttachFilesOneByOne(moduleDescription);
    }
  };

  const handleOpenNCloseAccordian=(e, index)=>{
    console.log("eeeeee=>", e, "indexx===>",index)
    if (index === expanded) {
      setExpanded(null);
    } else {
      setExpanded(index);
      setUploadPopupOpen(true);
    }
  }
  return (
    <>
      <div style={{ height: "120px" }}>
        {moduleDescription.map((moduleItem, index) => (
          <div style={{ margin: "20px" }}>
            <Accordion
              key={moduleItem.id}
              defaultExpanded={index === 0}
              expanded={expanded === index}
            >
              <AccordionSummary
                aria-controls="panel3-content"
                expandIcon={
                  // Only ExpandMoreIcon rotates, not the buttons
                  <ExpandMoreIcon
                    sx={{
                      transform:
                        expanded === index ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      ml:2,
                     
                    }}
                    onClick={(e)=>handleOpenNCloseAccordian(e, index)}
                  />
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  {/* Module title */}
                  {index + 1}. Add Module
                  {/* Button container */}
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      color="success"
                      onClick={(event) => handleAddContent(event, index)}
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#0075FF",
                      }} // Prevents movement
                    >
                      <PlaylistAddIcon sx={{ fontSize: "1.1rem" }} />
                      <Typography sx={{ ml: "4px" }}> Add Content</Typography>
                    </Box>

                    <Box
                      color="primary"
                      onClick={() => handleSaveModule(index)}
                      // nClick={handleSaveModule}
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#0075FF",
                      }} // Prevents movement
                    >
                      <SaveIcon sx={{ fontSize: "1.1rem" }} />{" "}
                      <Typography sx={{ ml: "4px" }}>Save</Typography>
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <TextField
                  inputProps={{ className: "textField" }}
                  fullWidth
                  size="small"
                  id="fullWidth"
                  type="TestName"
                  defaultValue={moduleItem.content}
                  value={addModulesText}
                  onChange={(e) => handleInputOnAddContent(e.target.value)}
                  required
                  error={error}
                  helperText={error ? "Module name is required" : ""}
                />
              </AccordionDetails>

              <AccordionActions style={{ flexFlow: "column" }}>
                <Box className="contentInnerLeftBox">
                  {!moduleItem?.item?.length ? (
                    <Box className="noContent">
                      <img src={attachmentimgae} height="290px" width="320px" />
                    </Box>
                  ) : (
                    moduleItem?.item.map((item) =>
                      moduleItem?.content_name?.split(".")[1] === "mp4" ? (
                        <Box className="videoBox">
                          <video className="contentsVideo">
                            <source src={item.content_url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <Typography className="typoStyleVideo">
                            {item?.content_name}
                          </Typography>
                          <Box>
                            <Typography className="deleteIconContent-video">
                              Delete
                            </Typography>
                          </Box>
                        </Box>
                      ) : handleImageType(item?.content_name?.split(".")[1]) ? (
                        <Box className="videoBox">
                          <Box className="leftVideo">
                            <img
                              src={item.content_url}
                              className="contentsImg"
                            />
                            <Divider
                              orientation="vertical"
                              sx={{ marginLeft: "36px" }}
                            />
                            <Typography className="typoStyleImg">
                              {item?.content_name}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography className="deleteIconContent">
                              Delete
                            </Typography>
                          </Box>
                        </Box>
                      ) : item?.content_name?.split(".")[1] === "zip" ? (
                        <Box className="videoZipAndDoc">
                          <Box className="zipAndDoc">
                            <FolderZipIcon className="zipFolderPrevIcon" />
                            <Typography className="typoStyleZipAndDoc">
                              {item.content_name}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography className="deleteIconContent-zipAndDoc">
                              Delete
                            </Typography>
                          </Box>
                        </Box>
                      ) : handleDocumentType(
                          item?.content_name?.split(".")[1]
                        ) ? (
                        <Box className="videoZipAndDoc">
                          <Box className="zipAndDoc">
                            <a href={item.url} target="_blank">
                              <NoteIcon className="zipFolderPrevIcon" />
                            </a>
                            <Typography className="typoStyleZipAndDoc">
                              {item.content_name}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography className="deleteIconContent-zipAndDoc">
                              Delete
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <>
                          <Box className="videoBox">
                            <iframe
                              width="350"
                              height="120"
                              src={handleUploadLink(item.url, item)}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="Embedded YouTube Video"
                              style={{ border: "none", overflow: "hidden" }}
                            ></iframe>
                            <h4>Name </h4> :{" "}
                            <Typography> {item.content_name}</Typography>
                          </Box>
                        </>
                      )
                    )
                  )}
                </Box>
                <div>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    sx={{ mt: 1 }}
                  >
                    <Box>
                      <RightBox
                        contentType={contentType}
                        handleVideoName={handleVideoName}
                        handleInputChange={handleInputChange}
                        courseData={courseData}
                        handleAddUrl={handleAddUrl}
                        clickedModuleIdx={clickedModuleIdx}
                        setUploadPopupOpen={setUploadPopupOpen}
                      />
                    </Box>
                  </Popover>
                </div>
              </AccordionActions>
            </Accordion>
          </div>
        ))}
        <Button
          onClick={handleAddModule}
          sx={{
            position: "absolute",
            bottom: 30,
          }}
          variant="contained"
        >
          Add Module
        </Button>
        <Box>
          <Button
            onClick={handleSaveAllAttachedModule}
            sx={{
              position: "fixed", // Stay at the bottom even when scrolling
              left: "60%", // Center horizontally
              bottom: "30px", // Adjust the distance from the bottom
              transform: "translateX(-50%)", // Offset to truly center the button
            }}
            variant="contained"
          >
            Save Module
          </Button>
        </Box>

        <Button
          onClick={handleExit}
          sx={{
            position: "absolute",
            bottom: 30,
            right: 10,
          }}
          variant="contained"
        >
          Exit
        </Button>
      </div>
    </>
  );
}

export default AddContent;
