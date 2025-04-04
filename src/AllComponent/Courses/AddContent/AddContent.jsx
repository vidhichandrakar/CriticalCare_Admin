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

import DeleteIcon from "@mui/icons-material/Delete";
import { DialogActions } from "@material-ui/core";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import RightBox from "./RightBox";
import {
  addContentOnCreateCourse,
  updateContentOnCreateCourse,
  deleteContentById,
  getContentType,
  getCoupon,
  getTest,
  putCoupon,
  updateTestPortal,
} from "../../ActionFactory/apiActions";
import attachmentimgae from "../../../Media/Images/undraw_attached_file_re_0n9b.svg";
import NoteIcon from "@mui/icons-material/Note";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { getCourseContentById } from "../../ActionFactory/apiActions";
import { ToastContainer, toast } from "react-toastify";
import { isNotEmptyObject } from "../../../Util/CommonUtils";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import ViewTestContents from "./ViewTestContents";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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
  const [couponName, setCouponName] = useState("");
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
        URL: {
          data: [],
        },
      },
    },
  ]);
  const [cat, setCat] = useState([]);
  const [catcoupon, setCatcoupon] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState("");
  const [selectedCouponId, setSelectedCouponId] = useState("");
  const [subtestopened, setSubtestopen] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [viewTestDialog, setViewTestDialog] = useState(false);

  const handleopenDialogSubjectiveTest = () => {
    setSubtestopen(true);
  };
  const handleopenDialogCoupon = () => {
    setCoupon(true);
  };
  const handlecloseDialogCoupon = () => {
    setCoupon(false);
  };
  const handleCloseDialogSubjectiveTest = () => {
    setSubtestopen(false);
  };
  const handleChange = (e) => {
    setCategoryName(e?.target?.value?.test_name);
    setSelectedTestId(e?.target?.value?.test_id);
  };
  const handleCouponChange = (e) => {
    setCouponName(e?.target?.value?.coupon_code);
    setSelectedCouponId(e?.target?.value?.coupon_id);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200, // Set the maximum height
        overflowY: "auto", // Enable scrolling for overflow
      },
    },
  };
  const [categoryName, setCategoryName] = useState("");
  const handleSaveTest = () => {
    const payload = { course_id: courseData?.course_id };
    updateTestPortal({
      payload,
      testId: selectedTestId,
      callBack: () => {
        handleCloseDialogSubjectiveTest();
      },
      error: (error) => {
        console.error(error);
      },
    });
  };
  const handleSaveCouponTest = () => {
    const payload = { course_id: courseData?.course_id };
    putCoupon({
      payload,
      coupon_id: selectedCouponId,

      callBack: () => {},
      error: () => {},
    });
    handlecloseDialogCoupon();
    setCouponName("");
  };
  const handleTransformedData = (data)=>{

    const transformedData = data.map(module => ({
      id: module.module_id || 0, // Use module_id as id
      module_name: module.module_name || "",
      contents: {
        count: module.contents?.Video?.count || "", // Use Video count if available
        Video: {
          data: module.contents?.Video?.data || [],
        },
        Document: {
          data: module.contents?.Document?.data || [],
        },
        URL: {
          data: module.contents?.URL?.data || [],
        },
      },
    }));
    
    console.log(transformedData);
    setModuleDescription(transformedData)
    
  }
  useEffect(() => {
    if (courseData?.course_id) {
      getCourseContentById({
        courseId: courseData?.course_id,
        callBack: (response) => {
          if (!isNotEmptyObject(response.data)) {
            return moduleDescription;
          } else {
            handleTransformedData(response.data.moduleDetails);
          }
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
  useEffect(() => {
    getTest({
      callBack: (response) => {
        const userCallBack = response?.data;
        setCat(userCallBack);
      },
      error: (error) => {
        // toast.error(error.message);
      },
    });
  }, []);
  useEffect(() => {
    getCoupon({
      callBack: (response) => {
        console.log(response.data, "work");
        setCatcoupon(response.data);
      },
      error: (err) => {},
    });
  }, []);
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
    let updatedModuleDescription = moduleDescription.map((module, index) => {
      
    console.log("va;lue----->", value, module);
      if (index === clickedModuleIdx) {
        if (value[0]?.content_type_name === "Video") {

          return {
            ...module,
            module_name: module.module_name,
            contents: {
              Video: {
                data: [
                  ...module?.contents?.Video?.data,
                  ...(Array.isArray(value) ? value : [value]),
                ],
              },
              Document: {
                ...module.contents.Document,
              },
              URL: {
                ...module.contents.URL,
              },
            },
          };
        } else if (value[0]?.content_type_name === "Document") {
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
              URL: {
                ...module?.contents.URL,
              },
            },
          };
        } else if (value[0]?.content_type_name === "URL") {
          console.log("module", module);
          return {
            ...module,
            module_name: module?.module_name,
            contents: {
              URL: {
                data: module?.contents?.URL
                  ? [
                      ...module?.contents?.URL?.data,
                      ...(Array.isArray(value) ? value : [value]),
                    ]
                  : [],
              },
              Document: {
                ...module?.contents.Document,
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
        URL: {
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
    let Documents = moduleDescription[0]?.contents?.Document?.data || [];
    let Video = moduleDescription[0]?.contents?.Video?.data || [];
    let Url = moduleDescription[0]?.contents?.URL?.data || [];
    let dataConcatenate = [...Video, ...Documents, ...Url];
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
      console.log("dataConcatenate-->", dataConcatenate, attachement);
      addContentOnCreateCourse({
        payload: payload,
        callBack: (response) => {
          toast.success("Module Saved Successfully");
          navigate("/admin/YourCourses");
        },
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
    console.log("pppppp---->", moduleDescription);
    for (const item of moduleDescription) {
      // console.log("item------->",item)
      if (item.course_id) {
        let attachement = [];
        let Documents = item?.contents?.Document?.data || [];
        let Video = item?.contents?.Video?.data || [];
        let Url = item?.contents?.URL?.data || [];
        console.log("ondition item---->", Url, Documents, Video);
        let dataConcatenate = [...Video, ...Documents, ...Url];
        const payload = {
          courseModuleDetails: {
            module_name: item.module_name,
            course_id: courseData?.course_id
              ? courseData?.course_id
              : courseIdForContent?.course_id,
          },
          courseAttachments: dataConcatenate,
        };
        console.log("dataConcatenate 22-->", dataConcatenate, attachement);
        try {
          await updateContentOnCreateCourse({
            payload: payload,
            callBack: (response) => {
              navigate("/admin/YourCourses");
            },
          });
          await sleep(500);
        } catch (error) {
          console.error("Error in adding content:", error);
        }
      } else {
        handleSaveModule();
      }
    }
  }
  const handleSaveAllAttachedModule = () => {
    let flag;
    moduleDescription.map((item) => {
      if (item.module_name === "") {
        // return true;
        // setError(true);
        flag = true;
      } else {
        flag = false;
      }
    });
    // let addTextCondition = addText.every((item) => item === true);
    // console.log("moduleDescription------->", moduleDescription);
    if (flag) {
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
  const handleDeleteContent = (id) => {
    if (id) {
      deleteContentById({
        contentId: id,
        callBack: (response) => {
          toast.success("Content Deleted Successfully");
          if (courseData?.course_id) {
            getCourseContentById({
              courseId: courseData?.course_id,
              callBack: (response) => {
                if (!isNotEmptyObject(response.data)) {
                  return moduleDescription;
                } else {
                  let storedValues = Object.assign({}, moduleDescription);
                  storedValues = response.data.moduleDetails;
                  setModuleDescription(storedValues);
                }
              },
              error: (error) => {
                toast.error(error.message);
              },
            });
          }
        },
        error: (errMsg) => {
          console.error(errMsg);
        },
      });
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

  const hadlleShowAddedTest = () => {
    setViewTestDialog(true);
  };
  return (
    <>
      <div>
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

                    {/* <Box
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
                    </Box> */}
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
                    {itemContent?.contents?.Video?.data?.length ? (
                      <>
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
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  width: "100%",
                                }}
                              >
                                <Typography
                                  style={{
                                    textAlign: "center",
                                  }}
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                  marginTop="10px"
                                  width="100%"
                                >
                                  {item?.content_name
                                    ? MyComponent(item?.content_name)
                                    : "Loading Video Name"}
                                </Typography>
                                <DeleteIcon
                                  className="deleteContent"
                                  onClick={() =>
                                    handleDeleteContent(item?.content_id)
                                  }
                                />
                              </Box>
                            </Card>
                          </Grid>
                        ))}
                      </>
                    ) : (
                      <>
                        <Box className="noContent">
                          <img
                            src={attachmentimgae}
                            height="290px"
                            width="320px"
                            style={{
                              textAlign: "center",
                            }}
                          />
                        </Box>
                      </>
                    )}
                  </Grid>

                  {/* ///for Documents */}

                  <Box>
                    <Typography
                      style={{
                        textAlign: "center",
                        margin: "10px",
                      }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {contentData?.contents?.Video?.count} Document
                    </Typography>
                  </Box>
                  <Grid container spacing={2} direction="row" wrap="wrap">
                  {console.log("data",itemContent)}
                    {itemContent?.contents?.Document?.data?.length ? (
                      <>
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
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  width: "100%",
                                }}
                              >
                                <Typography
                                  style={{
                                    textAlign: "center",
                                  }}
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                  marginTop="10px"
                                  width={"100%"}
                                >
                                  {item.content_name
                                    ? MyComponent(item.content_name)
                                    : "Loading Video Name"}
                                </Typography>
                                <DeleteIcon
                                  className="deleteContent"
                                  onClick={() =>
                                    handleDeleteContent(item?.content_id)
                                  }
                                />
                              </Box>
                            </Card>
                          </Grid>
                        ))}
                      </>
                    ) : (
                      <>
                        <Box>
                          <img
                            src={attachmentimgae}
                            height="290px"
                            width="320px"
                          />
                        </Box>
                      </>
                    )}
                  </Grid>

                  {/* ////for drive link */}
                  <Box>
                    <Typography
                      style={{
                        textAlign: "center",
                        margin: "10px",
                      }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {contentData?.contents?.Video?.count} Drive Url
                    </Typography>
                  </Box>
                  <Grid container spacing={2} direction="row" wrap="wrap">
                    {itemContent?.contents?.URL?.data?.length ? (
                      <>
                        {itemContent?.contents?.URL?.data?.map((item) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ maxWidth: 345, padding: "5px" }}>
                              <CardActionArea>
                                {item.content_url ? (
                                  // Render PDF preview
                                  <a href={item.content_url}>
                                    <AddToDriveIcon
                                      style={{
                                        width: "100%",
                                        height: "200px",
                                        border: "none",
                                      }}
                                    />
                                  </a>
                                ) : null}
                              </CardActionArea>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  width: "100%",
                                }}
                              >
                                <Typography
                                  style={{
                                    textAlign: "center",
                                  }}
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                  marginTop="10px"
                                  width={"100%"}
                                >
                                  {item.content_name
                                    ? MyComponent(item.content_name)
                                    : "Loading Url Name"}
                                </Typography>
                                <DeleteIcon
                                  className="deleteContent"
                                  onClick={() =>
                                    handleDeleteContent(item?.content_id)
                                  }
                                />
                              </Box>
                            </Card>
                          </Grid>
                        ))}
                      </>
                    ) : (
                      <>
                        <Box>
                          <img
                            src={attachmentimgae}
                            height="290px"
                            width="320px"
                          />
                        </Box>
                      </>
                    )}
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
            onClick={handleopenDialogSubjectiveTest}
            sx={{
              position: "absolute",
              bottom: 30,
              marginLeft: "10%",
            }}
            variant="contained"
          >
            Add Test
          </Button>
        </Box>
        <Box>
          <Button
            sx={{
              position: "fixed", // Stay at the bottom even when scrolling
              left: "41%", // Center horizontally
              bottom: "30px", // Adjust the distance from the bottom
              transform: "translateX(-50%)", // Offset to truly center the button
            }}
            variant="contained"
            onClick={hadlleShowAddedTest}
          >
            View Tests
          </Button>
        </Box>
        <Box>
          <Button
            onClick={handleopenDialogCoupon}
            sx={{
              position: "absolute",
              bottom: 30,
              marginLeft: "28%",
            }}
            variant="contained"
          >
            Add Coupon
          </Button>
        </Box>
        <Box>
          <Button
            onClick={handleSaveAllAttachedModule}
            sx={{
              position: "fixed", // Stay at the bottom even when scrolling
              left: "90%", // Center horizontally
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
        <ViewTestContents
          viewTestDialog={viewTestDialog}
          courseId={courseData?.course_id}
          setViewTestDialog={setViewTestDialog}
        />
      </div>
      <BootstrapDialog
        className="PopUP"
        onClose={handleCloseDialogSubjectiveTest}
        aria-labelledby="customized-dialog-title"
        open={subtestopened}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "1rem" }}
          id="customized-dialog-title"
        ></DialogTitle>
        <Typography sx={{ mt: -2, ml: 3, fontWeight: 600 }}>
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
        <Divider sx={{ mt: 1 }} />
        <DialogContent>
          <Box>
            <FormControl sx={{ width: 540 }}>
              <Select
                MenuProps={MenuProps}
                value={categoryName !== "" ? categoryName : "fjng"}
                renderValue={(v) => {
                  return categoryName !== "" ? (
                    <Typography>{categoryName}</Typography>
                  ) : (
                    <Typography> Select Test</Typography>
                  );
                }}
                onChange={(e) => handleChange(e)}
                className="addCatTextField"
                sx={{ mt: 2 }}
              >
                {Array.isArray(cat) &&
                  cat?.map((item) => (
                    <MenuItem key={item._id} value={item}>
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
            onClick={handleSaveTest}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <BootstrapDialog
        className="PopUP"
        onClose={handlecloseDialogCoupon}
        aria-labelledby="customized-dialog-title"
        open={coupon}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "1rem" }}
          id="customized-dialog-title"
        ></DialogTitle>
        <Typography sx={{ mt: -2, ml: 3, fontWeight: 600 }}>
          Add Coupon
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handlecloseDialogCoupon}
          sx={{
            position: "absolute",
            right: 8,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Divider sx={{ mt: 1 }} />
        <DialogContent>
          <Box>
            {console.log(couponName, "work")}
            <FormControl sx={{ width: 540 }}>
              <Select
                MenuProps={MenuProps}
                value={couponName !== "" ? couponName : "fjng"}
                renderValue={(v) => {
                  return couponName !== "" ? (
                    <Typography>{couponName}</Typography>
                  ) : (
                    <Typography> Select Coupon</Typography>
                  );
                }}
                onChange={(e) => handleCouponChange(e)}
                className="addCatTextField"
                sx={{ mt: 2 }}
              >
                {catcoupon.map((item) => (
                  <MenuItem key={item._id} value={item}>
                    {item.coupon_code}
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
            onClick={handleSaveCouponTest}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default AddContent;
