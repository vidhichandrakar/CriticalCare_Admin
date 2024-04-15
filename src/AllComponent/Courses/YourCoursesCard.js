import moment from "moment/moment";
import react from "react";
import cardimg from "../../Media/Images/db7187e8-b7cf-47ed-8900-6de89dabde06.png";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { capitalize } from "@material-ui/core";
import StarRateIcon from '@mui/icons-material/StarRate';

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
            console.log("item",item.is_publish)
            return (
              <div className="card" onClick={()=>handleCourse(id)}>
                <div className="publishBox">
                {item.is_publish==="published"?<div className="publish"><StarRateIcon className="starIcon"/><p className="/">Publish</p></div>:<p className="Npublish">Not Publish</p>}
                <Link  to={{query: {id:id}, pathname: "/Trics1FreeMockTest"}}>
                  <img src={`data:image/png;base64,${item.thumbnail_path}`} className="cardImage" height={"auto"} />
                </Link>
                </div>
                <div className="CardData">
                  <b className="Headp">{capitalize(item.course_name)}</b>
                  <p className="Namep">
                   Created By: {createdBy[0]?.user_name}
                  </p>
                  <p className="Yearp">{item.duration_type_id} Year </p>
                  <b className="Pricep">₹{item.price}</b>
                </div>
              </div>
            );
          })
        : null}
    </>
  );
};

export default YourCoursesCard;
