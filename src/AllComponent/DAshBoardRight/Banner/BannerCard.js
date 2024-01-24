import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import img from "../../../Media/Images/banner2.jpg";
import Typography from "@mui/material/Typography";
import ModeIcon from "@mui/icons-material/Mode";

const BannerCard = (props) => {
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
                // style={{width:"100%"}}
              />
              <div class="middle">
                <Button class="text">
                  {" "}
                  <ModeIcon className="PencilIcon" />
                  change
                </Button>
              </div>
            </div>
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
