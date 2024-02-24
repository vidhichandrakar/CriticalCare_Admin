import moment from "moment/moment";
import react from "react";
import cardimg from "../../Media/Images/db7187e8-b7cf-47ed-8900-6de89dabde06.png";
import { Link } from "react-router-dom";

const YourCoursesCard = ({ allCourses }) => {
  return (
    <>
      {allCourses.length
        ? allCourses.map((item) => {
          const id = item.Course_Id;

            return (
              <div className="card">
                <Link  to={{query: {id:id}, pathname: "/Trics1FreeMockTest"}}>
                  <img src={cardimg} className="cardImage" />
                </Link>
                <div className="CardData">
                  <p className="Headp">{item.CourseName}</p>
                  <p className="Namep">
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                  </p>
                  <p className="Yearp">{item.Price}</p>
                  <p className="Pricep">{item.Offer_Price}</p>
                </div>
              </div>
            );
          })
        : null}
    </>
  );
};

export default YourCoursesCard;
