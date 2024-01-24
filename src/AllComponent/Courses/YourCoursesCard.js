import react from "react";

const YourCoursesCard = (props) => {
  return (
    <>
      {props.Data.map((value, index) => (
        <div className="card">
          <img src={value.img} className="cardImage" />
          <div className="CardData">
            <p className="Headp">{value.head}</p>
            <p className="Namep">{value.Created}</p>
            <p className="Yearp">{value.Year}</p>
            <p className="Pricep">{value.Price}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default YourCoursesCard;
