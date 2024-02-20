import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import img from "../../../Media/Images/banner2.jpg";
import Typography from "@mui/material/Typography";
import ModeIcon from "@mui/icons-material/Mode";
import { styled } from "@mui/material/styles";
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

  const handleImageUpload = (value, id) => {
    let storedPath = [...storedFilePath];
    let data = { id: id, value: value };
    storedPath.push(data);
    setStoredFilePath(storedPath);
    console.log("value and id", storedPath);
    console.log("storedFilePath", storedFilePath);
  };
  return (
    <>
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
              {/* <div>kjhbn</div> */}
              
              {console.log("storedFilePathksdfv",storedFilePath)}
              {storedFilePath?.map((row) => {
                console.log("71", row.id, row.value);
                console.log("72", value.id);
                return row.id === value.id ? row.value : null;
              })}

              <CardContent>
                <p className="fontSize1">{value.title}</p>
              </CardContent>
              <div className="BannerHead BorderBottom">
                <p>{value.boxtitle}</p>
                <Button className="changeBtn">Change</Button>
              </div>
            </main>
          </div>
        </div>
      ))}
    </>
  );
};

export default BannerCard;
