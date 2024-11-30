import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import UploadIcon from "@mui/icons-material/Upload";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Box, TextField } from "@mui/material";
import LoaderComponent from "../../Util/LoaderComponent";
import { useDropzone } from "react-dropzone";
import { postBlog, uploadFile } from "../ActionFactory/apiActions";
import { ToastContainer, toast } from "react-toastify";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
function AddBolg({ popForBlog, setPopForBlog }) {
  const [open, setOpen] = useState(false);
  const [imgUpload, setImageWhileUpload] = useState("");
  const [loaderState, setLoaderState] = useState(false);
  const [addBlogDetails, setAddBlogDetails] = useState({
    title: "",
    description: "",
    image_url: "",
    display_locations: "",
    popular: "N", //hard coded need to check it with Backend ppl
    created_by: "",
  });

  const onInroVideoDrop = async (files) => {
    let payload = new FormData();
    payload.append("file", files[0], files[0]?.name);
    let changedValue = Object.assign({}, addBlogDetails);
    setLoaderState(true);
    uploadFile({
      payload,
      callBack: (response) => {
        changedValue.image_url = response?.data?.path;
        setAddBlogDetails(changedValue);
        setLoaderState(false);
      },
    });
    // setStoredBasicInfo(storedValues);
  };

  const {
    getRootProps: getIntroVideoRootProps,
    getInputProps: getIntroVideoInputProps,
  } = useDropzone({
    onDrop: onInroVideoDrop,
    onChange: (event) => console.log(event),
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "video/mp4": [".mp4"],
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setPopForBlog(false);
  };

  const handleBlogInputChange = (e, type) => {
    let typedValues = Object.assign({}, addBlogDetails);
    if (type == "description") {
      typedValues.description = e;
    } else if (type == "displayLocation") {
      typedValues.display_locations = e;
    } else if (type == "title") {
      typedValues.title = e;
    }
    typedValues.created_by = JSON.parse(
      localStorage.getItem("loggedInUser")
    ).user_id;
    setAddBlogDetails(typedValues);
  };
  const handleSaveBlog = () => {
    // setPopForBlog(false);
    setLoaderState(true);
    postBlog({
      payload: addBlogDetails,
      callBack: (response) => {
        // loaderState
        toast.success("Blog posted Successfully", {
          autoClose: 500,
        });
        setLoaderState(false);
        setPopForBlog(false);
      },
    });
  };

  return (
    <>
      <div>
        <Dialog
          open={popForBlog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Add Blog"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Paper
                sx={(theme) => ({
                  p: 2,
                  margin: "auto",
                  // maxWidth: 1000,
                  flexGrow: 5,
                  backgroundColor: "#fff",
                  ...theme.applyStyles("dark", {
                    backgroundColor: "#1A2027",
                  }),
                })}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box>
                      Title
                      <TextField
                        fullWidth
                        placeholder="title"
                        id="fullWidth"
                        sx={{ mt: 1, mb: 2 }}
                        onChange={(e) =>
                          handleBlogInputChange(e.target.value, "title")
                        }
                      />
                    </Box>
                    <Box>
                      Description
                      <TextField
                        inputProps={{ className: "textField" }}
                        fullWidth
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        placeholder="Enter course description"
                        className="DescBoxShadow"
                        // value={storedBasicInfo.Description}
                        onChange={(e) =>
                          handleBlogInputChange(e.target.value, "description")
                        }
                      />
                    </Box>
                    <Box mt={2}>
                      Display Locations
                      <TextField
                        fullWidth
                        placeholder="title"
                        id="fullWidth"
                        sx={{ mt: 1, mb: 2 }}
                        onChange={(e) =>
                          handleBlogInputChange(
                            e.target.value,
                            "displayLocation"
                          )
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12}>
                    {/* <Box > */}
                    {/* <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      class="rounded-circle mr-1"
                      alt="William Harris"
                      width="270"
                      height="365"
                    /> */}
                    {/* </Box> */}
                    <div {...getIntroVideoRootProps({ className: "dropzone" })}>
                      <input {...getIntroVideoInputProps()} />
                      <Box className="thumbnailUpload">
                        <Typography
                          sx={{ marginTop: "3%" }}
                          className="fontRecommend"
                        ></Typography>
                        <LoaderComponent loaderState={loaderState} />
                        {imgUpload === "" && addBlogDetails?.image_url && (
                          <img
                            src={addBlogDetails?.image_url}
                            width="270"
                            height="365"
                          />
                        )}
                        {imgUpload != "" && (
                          <img
                            src={addBlogDetails?.image_url}
                            width={140}
                            height={"auto"}
                          />
                        )}
                        <Button
                          component="label"
                          variant="outlined-multiline-static"
                          startIcon={<UploadIcon className="iconThumbicon" />}
                          className="iconThumb"
                        >
                          Upload Thumbnail Image
                        </Button>
                      </Box>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSaveBlog}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer />
      </div>
    </>
  );
}

export default AddBolg;
