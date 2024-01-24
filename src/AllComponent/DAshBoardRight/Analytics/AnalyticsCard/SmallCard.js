import React, { Fragment } from "react";

const SmallCard = (props) => {
  return (
    <>
        {props.Data.map((value, index) => (
        <div className="Card" key={index}>
          <div className="margin20">
            <h4>{value.Heading}</h4>
            <h1>{value.numbers}</h1>
            <p>{value.Days}</p>
          </div>
        </div>
        ))}
    </>
  );
};
export default SmallCard;
