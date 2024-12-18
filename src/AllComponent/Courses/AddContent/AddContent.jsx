import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  TextField,
  Typography,
  CardContent,
} from "@mui/material";
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
import NoteIcon from "@mui/icons-material/Note";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { getCourseContentById } from "../../ActionFactory/apiActions";
import { ToastContainer, toast } from "react-toastify";

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
  const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
  // const [anchorEl1, setAnchorEl1] = useState(null);
  // const [link, setLink] = useState("");
  // const [aadedInputLink, setAddedInputLink] = useState(false);
  // const open1 = Boolean(anchorEl1);
  const [contentData, setContentData] = useState([]);
  const [isCourseCreationMode, setIsCourseCreationMode] = useState(true);
  const navigate = useNavigate();

  const [addedItemsInModules, setAddedItemsInModules] = useState([]);
  const [moduleDescription, setModuleDescription] = useState([
    {
      id: 0,
      module_name: "",
      contents: {
        count: "",
        Video: {
          data: [],
        },
        Document: {
          data: [],
        },
      },
    },
  ]);

  useEffect(() => {
    if (courseData?.course_id) {
      getCourseContentById({
        courseId: courseData?.course_id,
        callBack: (response) => {
          let storedValues = Object.assign({}, moduleDescription);
          storedValues = response.data.moduleDetails;
          setModuleDescription(storedValues);
        },
        error: (error) => {
          toast.error(error.message);
        },
      });
    }
    getContentType({
      callBack: (response) => {
        setContentType(response.data);
      },
    });
  }, [courseData]);

  const handleAddContent = (event, idx) => {
    event.stopPropagation();
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
    let updatedModuleDescription = moduleDescription.map((module) => {
      if (module.id === clickedModuleIdx) {
        if (value[0]?.content_type === "Video") {
          return {
            ...module,
            module_name: module.module_name,
            contents: {
              Video: {
                data: [
                  ...module.contents.Video.data,
                  ...(Array.isArray(value) ? value : [value]),
                ],
              },
              Document: {
                ...module.contents.Document,
              },
            },
          };
        } else if (value[0]?.content_type === "Document") {
          return {
            ...module,
            module_name: module.module_name,
            contents: {
              Document: {
                data: [
                  ...module.contents.Document.data,
                  ...(Array.isArray(value) ? value : [value]),
                ],
              },
              Video: {
                ...module.contents.Video,
              },
            },
          };
        }
      }
      return module;
    });
    setModuleDescription(updatedModuleDescription);
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
      module_name: "",
      contents: {
        count: "",
        Video: {
          data: [],
        },
        Document: {
          data: [],
        },
      },
    });
    setModuleDescription(addedContent);
  };

  const handleImageType = (value) => {
    return value === "jpeg" || value === "png" || value === "jpg";
  };

  const handleInputOnAddContent = (e, index) => {
    let arr = [];
    setAddModulesText(e);
    moduleDescription.map((item, idx) => {
      let storedValues = Object.assign({}, item);
      if (idx === index) {
        storedValues.module_name = e;
      }
      arr.push(storedValues);
    });
    setModuleDescription(arr);
  };

  const handleSaveModule = (index) => {
    let attachement = [];
    let Documents = moduleDescription[0]?.contents.Document.data;
    let Video = moduleDescription[0]?.contents.Video.data;
    let dataConcatenate;
    if (Documents) {
      attachement = attachement.concat(Documents);
    }
    if (Video) {
      dataConcatenate = attachement.concat(Video);
    }
    if (moduleDescription[0]?.module_name === "") {
      setError(true);
    } else {
      const payload = {
        courseModuleDetails: {
          module_name: moduleDescription[0]?.module_name,
          course_id: courseData?.course_id
            ? courseData?.course_id
            : courseIdForContent?.course_id,
        },
        courseAttachments: dataConcatenate,
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
      let attachement = [];
      let Documents = item?.contents.Document.data;
      let Video = item?.contents.Video.data;
      let dataConcatenate;
      if (Documents) {
        attachement = attachement.concat(Documents);
      }
      if (Video) {
        dataConcatenate = attachement.concat(Video);
      }
      const payload = {
        courseModuleDetails: {
          module_name: item.module_name,
          course_id: courseData?.course_id
            ? courseData?.course_id
            : courseIdForContent?.course_id,
        },
        courseAttachments: dataConcatenate,
      };
      try {
        await addContentOnCreateCourse({
          payload: payload,
          callBack: (response) => {
            navigate("/admin/YourCourses");
          },
        });
        await sleep(500);
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

  const handleOpenNCloseAccordian = (e, index) => {
    if (index === expanded) {
      setExpanded(null);
    } else {
      setExpanded(index);
      setUploadPopupOpen(true);
    }
  };

  const isYouTubeLink = (url) => {
    return /youtube\.com|youtu\.be/.test(url);
  };
  const extractYouTubeId = (url) => {
    const regExp =
      /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };
  const getThumbnailUrl = (url) => {
    if (isYouTubeLink(url)) {
      const videoId = extractYouTubeId(url);
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return url; // For other video links, assume the URL points to the video file.
  };
  const MyComponent = (name) => {
    const truncatedName =
      name?.length > 10 ? `${name.substring(0, 15)}...` : name;

    return truncatedName;
  };
  const isPdfFile = (url) => url.endsWith(".pdf");
  return (
    <>
      <div style={{ height: "120px" }}>
        {moduleDescription?.map((itemContent, index) => (
          <div style={{ margin: "20px" }}>
            <Accordion
              key={itemContent.id}
              defaultExpanded={index === 0}
              expanded={expanded === index}
            >
              <AccordionSummary
                aria-controls="panel3-content"
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      transform:
                        expanded === index ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      ml: 2,
                    }}
                    onClick={(e) => handleOpenNCloseAccordian(e, index)}
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
                  {itemContent?.module_name
                    ? `${index + 1}. ${itemContent?.module_name} `
                    : `${index + 1}. Add Module`}

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
                  defaultValue={itemContent.module_name}
                  value={itemContent.module_name}
                  onChange={(e) =>
                    handleInputOnAddContent(e.target.value, index)
                  }
                  required
                  error={error}
                  helperText={error ? "Module name is required" : ""}
                />
              </AccordionDetails>
              <AccordionActions style={{ flexFlow: "column" }}>
                <Box className="contentInnerLeftBox">
                  <Box>
                    <Typography
                      style={{
                        textAlign: "center",
                      }}
                      gutterBottom
                      variant="h5"
                      component="div"
                      // backgroundColor="#f4f9fd"
                    >
                      {contentData?.contents?.Video?.count} Video
                    </Typography>
                  </Box>
                  {/* // for Video Test // */}
                  <Grid container spacing={2} direction="row" wrap="wrap">
                    {itemContent?.contents?.Video?.data?.map((item) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ maxWidth: 345, padding: "5px" }}>
                          <CardActionArea>
                            {isYouTubeLink(item?.content_url) ? (
                              // Render YouTube video with thumbnail
                              <CardMedia
                                component="iframe"
                                height="200"
                                src={`https://www.youtube.com/embed/${extractYouTubeId(
                                  item?.content_url
                                )}`}
                                allowFullScreen
                                title="YouTube Video"
                              />
                            ) : (
                              // Render other videos
                              <CardMedia
                                component="video"
                                height="200"
                                controls
                                src={item?.content_url}
                                poster={getThumbnailUrl(item?.content_url)} // Use thumbnail as a poster
                                title="Video Content"
                              />
                            )}
                          </CardActionArea>
                          <Typography
                            style={{
                              textAlign: "center",
                            }}
                            gutterBottom
                            variant="h5"
                            component="div"
                            marginTop="10px"
                          >
                            {item?.content_name
                              ? MyComponent(item?.content_name)
                              : "Loading Video Name"}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {/* ///for Documents */}

                  <Box>
                    <Typography
                      style={{
                        textAlign: "center",
                        margin: "20px",
                      }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {contentData?.contents?.Video?.count} Document
                    </Typography>
                  </Box>
                  <Grid container spacing={2} direction="row" wrap="wrap">
                    {itemContent?.contents?.Document?.data?.map((item) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ maxWidth: 345, padding: "5px" }}>
                          <CardActionArea>
                            {isPdfFile(item.content_url) ? (
                              // Render PDF preview
                              <iframe
                                src={item.content_url}
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  border: "none",
                                }}
                                title="PDF Preview"
                              ></iframe>
                            ) : null}
                          </CardActionArea>
                          <Typography
                            style={{
                              textAlign: "center",
                            }}
                            gutterBottom
                            variant="h5"
                            component="div"
                            marginTop="10px"
                          >
                            {item.content_name
                              ? MyComponent(item.content_name)
                              : "Loading Video Name"}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
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
                        setAnchorEl={setAnchorEl}
                        contentType={contentType}
                        handleVideoName={handleVideoName}
                        handleInputChange={handleInputChange}
                        courseData={courseData}
                        handleAddUrl={handleAddUrl}
                        clickedModuleIdx={clickedModuleIdx}
                        setUploadPopupOpen={setUploadPopupOpen}
                        setContentData={setContentData}
                        setAddedItemsInModules={setAddedItemsInModules}
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
