import { blue } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";

const OfferCard = (props) => {
  return (
    <>
    {props.Data.map((value) => (
      <main className="Offer-card">
        <div className="CardRow">
          <div className="OfferIcon" >
            {value.icon}
          </div>
          <div className=" OfferCardText">
            <h3>{value.head}</h3>
            <p>{value.title}</p>
          </div>
        </div>
        <Link to={value.href} style={{textDecoration: 'none', color: "#13aaeb" }}><div className="OfferButton">
          <span>{value.button}</span>
          <div className="ArrowIcon">{value.arrow}</div> 
        </div>
        </Link>
      </main>
      ))}
    </>
  );
};

export default OfferCard;
