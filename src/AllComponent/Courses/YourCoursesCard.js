import moment from "moment/moment";
import react from "react";
import cardimg from "../../Media/Images/db7187e8-b7cf-47ed-8900-6de89dabde06.png";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

const YourCoursesCard = ({ allCourses }) => {
  
  const navigate = useNavigate();

  const handleCourse =(id)=>{
    navigate("/Trics1FreeMockTest",{ state:{id:id}})
  }
  return (
    <>
      {allCourses.length
        ? allCourses.map((item) => {
          const id = item.course_id;

            return (
              <div className="card" onClick={()=>handleCourse(id)}>
                <Link  to={{query: {id:id}, pathname: "/Trics1FreeMockTest"}}>
                  <img src={cardimg} className="cardImage" />
                </Link>
                <div className="CardData">
                  <p className="Headp">{item.course_name}</p>
                  <p className="Namep">
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                  </p>
                  <p className="Yearp">{item.price}</p>
                  <p className="Pricep">{item.offer_price}</p>
                </div>
              </div>
            );
          })
        : null}
    </>
  );
};

export default YourCoursesCard;
