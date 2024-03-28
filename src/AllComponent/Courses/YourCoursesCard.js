import moment from "moment/moment";
import react from "react";
import cardimg from "../../Media/Images/db7187e8-b7cf-47ed-8900-6de89dabde06.png";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { capitalize } from "@material-ui/core";

const YourCoursesCard = ({ allCourses, userData }) => {
  
  const navigate = useNavigate();

  const handleCourse =(id)=>{
    navigate("/Trics1FreeMockTest",{ state:{id:id}})
  }
  return (
    <>
      {allCourses.length
        ? allCourses.map((item) => {
          const id = item.course_id;
          const createdBy = userData.filter(user => user.user_id === item.created_by)
            console.log(createdBy, "card createdBy")
            return (
              <div className="card" onClick={()=>handleCourse(id)}>
                <Link  to={{query: {id:id}, pathname: "/Trics1FreeMockTest"}}>
                  <img src={cardimg} className="cardImage" />
                </Link>
                <div className="CardData">
                  <p className="Headp">{capitalize(item.course_name)}</p>
                  <p className="Namep">
                   Created By: {createdBy[0].user_name}
                  </p>
                  <p className="Yearp">{item.duration_type_id} Year </p>
                  <p className="Pricep">₹{item.offer_price}</p>
                </div>
              </div>
            );
          })
        : null}
    </>
  );
};

export default YourCoursesCard;
