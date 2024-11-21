import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModeIcon from "@mui/icons-material/Mode";
import { styled } from "@mui/material/styles";
import BannerPopUp from "./BannerUpload";
import Switch from '@mui/material/Switch';
import imge from "../../../Media/Images/banner2.jpg";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { deleteBanner } from '../../ActionFactory/apiActions';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const BannerCard = ({ bannerAPI, handleClickEdit, handlePreviewBox }) => {
  const [storedFilePath, setStoredFilePath] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [imageList, setImageList] = useState([]); // Local state to manage banner list

  useEffect(() => {
    if (bannerAPI) {
      setImageList(bannerAPI); // Initialize local state with bannerAPI data
    }
  }, [bannerAPI]);

  const handleDelete = (web_banner_id) => {
    deleteBanner({
      web_banner_id,
      callBack: (response) => {
        console.log("Banner deleted successfully:", response);
        toast.success("Banner Image deleted Successfully!", { autoClose: 500 });
        setImageList(imageList.filter((banner) => banner.web_banner_id !== web_banner_id)); // Update the list without the deleted banner
      },
      error: (error) => {
        console.error("Error deleting banner:", error);
        toast.error("Failed to delete the banner image.");
      },
    });
  };

  const handleImageUpload = (value, id) => {
    let updatedPaths = [...storedFilePath];
    const existingEntryIndex = updatedPaths.findIndex((data) => data.id === id);

    if (existingEntryIndex > -1) {
      updatedPaths[existingEntryIndex].value = value;
    } else {
      updatedPaths.push({ id, value });
    }
    setStoredFilePath(updatedPaths);
  };

  const handleClickPopUp = () => {
    setOpenPopUp(!openPopUp);
  };

  return (
    <>
      <ToastContainer />
      <BannerPopUp openPopUp={openPopUp} handleClickPopUp={handleClickPopUp} bannerAPI={bannerAPI} />

      {imageList?.map((value, index) => (
        <div className="BannerMainBox" key={index}>
          <div className="InsideBannerBox">
            <main className="InsideMainBox">
              <CardActions className="BannerHead">
                <Typography>{value.web_banner_title}</Typography>
                <Button
                  className="Deletebtn"
                  onClick={() => value.web_banner_id && handleDelete(value.web_banner_id)}
                >
                  <DeleteIcon className="Deleteicon" />
                  Remove
                </Button>
              </CardActions>

              <div className="container" style={{ marginTop: "2%" }}>
                {value.web_banner_links_desktop?.length ? (
                  <img
                    src={value.web_banner_links_desktop[0].banner_url}
                    alt="Desktop Banner"
                    className="BannerImage image"
                    height="150"
                    width="300"
                  />
                ) : (
                  <img src={imge} height="120" width="250" className="BannerImage image" alt="Default Banner" />
                )}
                <div className="middle">
                  <Button className="text" component="label">
                    <ModeIcon className="PencilIcon" />
                    Change
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleImageUpload(event.target.value, value.id)
                      }
                    />
                  </Button>
                </div>
              </div>

              <div style={{ color: "green" }} className="flexrow">
                <CheckCircleIcon />
                <p>Image fits perfectly in banner</p>
              </div>
              {storedFilePath.map((row) => row.id === value.id && row.value)}

              <p className="fontSize1">{value.description}</p>
              <div className="BannerHead BorderBottom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ margin: "8px", flex: 1, textAlign: 'left' }}>{value.web_banner_title}</p>
                <div style={{ display: 'flex', gap: '10px' }}> {/* Container for buttons with spacing */}

                <Button
                  className="previewBtn"
                  onClick={() => handlePreviewBox(value)} // Pass the value to handlePreviewBox
                >
                  Preview
                </Button>
                <Button
                  className="changeBtn"
                  onClick={() => handleClickEdit(value)}
                >
                  Change
                </Button>
                </div>
              </div>
              <div className="RemoveButton">
                <Typography>
                  Remove banner automatically after fixed date
                </Typography>
                <Switch {...label} defaultChecked />
              </div>
            </main>
          </div>
        </div>
      ))}
    </>
  );
};

export default BannerCard;