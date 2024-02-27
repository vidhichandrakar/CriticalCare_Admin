import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModeIcon from "@mui/icons-material/Mode";
import { styled } from "@mui/material/styles";
import BannerPopUp from "./BannerPopUp";
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
const BannerCard = (props) => {
  const [storedFilePath, setStoredFilePath] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);

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
  };
  return (
    <>
      <BannerPopUp openPopUp={openPopUp} handleClickPopUp={handleClickPopUp} />
      {props.Data.map((value, index) => (
        <div className="BannerMainBox">
          <div className="InsideBannerBox">
            <main className="InsideMainBox" key={index}>
              <CardActions className="BannerHead">
                <Typography>{value.Head}</Typography>
                <Button className="Deletebtn">
                  <DeleteIcon className="Deleteicon" />
                  Delete
                </Button>
              </CardActions>

              <div class="container">
                <img
                  src={value.img}
                  alt="Avatar"
                  className="BannerImage image"
                />
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

              {storedFilePath?.map((row) => {
                return row.id === value.id ? row.value : null;
              })}

              <CardContent>
                <p className="fontSize1">{value.title}</p>
              </CardContent>
              <div className="BannerHead BorderBottom">
                <p>{value.boxtitle}</p>
                <Button className="changeBtn" onClick={handleClickPopUp}>
                  Change
                </Button>
              </div>
            </main>
          </div>
        </div>
      ))}
    </>
  );
};

export default BannerCard;
