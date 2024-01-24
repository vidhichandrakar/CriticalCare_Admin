import React from "react";
import { Link } from "react-router-dom";

const AdditionalCard = (props) => {
  return (
    <>
    {props.Data.map((value, index) => (
      <Link to={value.href} style={{textDecoration: "none"}}>
        <div className="Addcard">
        <div className="AdditionalIcon">{value.icon}</div>
        <h1>{value.heading}</h1>
      </div>
      </Link>
      ))}
    </>
  );
};

export default AdditionalCard;
