import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModeIcon from "@mui/icons-material/Mode";
import { styled } from "@mui/material/styles";
import BannerPopUp from "./BannerUpload";
import Switch from '@mui/material/Switch';
import attachmentimgae from "../../../Media/Images/undraw_attached_file_re_0n9b.svg";
import { Box } from "@mui/material";
import imge from "../../../Media/Images/banner2.jpg";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { deleteBanner } from '../../ActionFactory/apiActions';
import { ToastContainer, toast } from "react-toastify";


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
  arrow: false
});
const BannerCard = ({ Data, bannerAPI, handleClickEdit }) => {
  const [storedFilePath, setStoredFilePath] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openPopUpPreivous, setOpenPopUpPreivous] = useState(false);
  const [imagebyapi, setImagebyapi] = useState([{}])
  const [imageList, setImageList] = useState([]); // Local state to manage banner list


  useEffect(() => {
    if (bannerAPI) {
      setImageList(bannerAPI); // Initialize local state with bannerAPI data
    }
  }, [bannerAPI]);

  const handleDelete = (web_banner_id) => {
    try {
      deleteBanner({
        web_banner_id,
        callBack: (response) => {
          console.log("Banner deleted successfully:", response);
          toast.success("Banner Image deleted Successfully!", {
            autoClose: 500,
          });
          setImageList(imageList.filter((banner) => banner.web_banner_id !== web_banner_id)); // Update the list without the deleted banner
          // Optionally refresh the banner list or update state to remove the deleted banner
        },
        error: (error) => {
          console.error("Error deleting banner:", error);
        },
      });
    } catch (error) {
      console.error("Error in handleDelete:", error);
    }
  };

  const handleImageUpload = (value, id) => {
    let storedPath = [...storedFilePath];

    let array2 = [...storedPath];
    let array3 = [];
    let abc = array2.find((data) => data.id === id);
    if (abc) {
      array2.map((data) => {
        if (data.id == id) {
          let obj = Object.assign({}, data);
          obj.value = value;
          array3.push(obj);
        } else {
          array3.push(data);
        }
      });
    } else {
      array3.push(...storedPath, { id: id, value: value });
    }
    setStoredFilePath(array3);
  };

  const handleClickPopUp = () => {
    setOpenPopUp(!openPopUp);
    console.log("workksckdsnckjsdncjds")
  };

  console.log("Image List : ", imageList)

  return (
    <>
      <BannerPopUp openPopUp={openPopUp} handleClickPopUp={handleClickPopUp} bannerAPI={bannerAPI} />
      {/* {Data.map((value, index) => ( */}
      {imageList?.map((value, index) => (
        <div className="BannerMainBox">
          <div className="InsideBannerBox">
            <main className="InsideMainBox" key={index}>
              <CardActions className="BannerHead">
                <Typography>Image</Typography>
                <Button
                  className="Deletebtn"
                  onClick={() => value.web_banner_id && handleDelete(value.web_banner_id)}
                >
                  <DeleteIcon className="Deleteicon" />
                  Remove
                </Button>

              </CardActions>
              <div class="container" style={{ marginTop: "2%" }}>
                {value.web_banner_links_desktop?.length ? (
                  <img
                    src={value.web_banner_links_desktop[0].banner_url} // Use the first desktop banner URL
                    alt="Desktop Banner"
                    className="BannerImage image"
                    height="150"
                    width="300"
                  />
                ) : (
                  <img src={imge} height="120" width="250" className="BannerImage image" alt="Default Banner" />
                )}
                {/* You can similarly handle mobile banners if needed */}
                {/* <img
                  src={value.banner_url}
                  alt="Avatar"
                  className="BannerImage image"
                /> */}
                <div class="middle">
                  <Button class="text" component="label">
                    {" "}
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
              {storedFilePath?.map((row) => {
                return row.id === value.id ? row.value : null;
              })}

              {/* <CardContent> */}
              <p className="fontSize1" >{value.description}</p>
              {/* </CardContent> */}
              <div className="BannerHead BorderBottom">
                <p>{value.web_banner_title}</p>
                <Button className="changeBtn" onClick={handleClickEdit}>
                  Change
                </Button>
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
