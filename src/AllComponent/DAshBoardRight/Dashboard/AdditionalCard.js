import React from "react";
import { Link } from "react-router-dom";

const AdditionalCard = (props) => {
  return (
    <>
      {props.Data.map((value, index) => (
        value.href.startsWith("http") ? (
          // External link (Zoom - opens in a new tab)
          <a
            key={index}
            href={value.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <div className="Addcard">
              <div className="AdditionalIcon">{value.icon}</div>
              <p style={{ fontSize: "1.6rem" }}>{value.heading}</p>
            </div>
          </a>
        ) : (
          // Internal links (Banner & Coupons - use React Router)
          <Link key={index} to={value.href} style={{ textDecoration: "none" }}>
            <div className="Addcard">
              <div className="AdditionalIcon">{value.icon}</div>
              <p style={{ fontSize: "1.6rem" }}>{value.heading}</p>
            </div>
          </Link>
        )
      ))}
    </>
  );
};

export default AdditionalCard;