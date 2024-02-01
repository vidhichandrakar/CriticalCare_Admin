import React  from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const SubMenuNew = () =>{
    return (
        <>
        <div>
        <Link to="/CreateCoupon" className="textDecoration">
            {" "}
            <Typography sx={{ p: 1, textDecoration: "none" }}>
              Manage Coupons
            </Typography>
          </Link>
         <Link to="/User" className="textDecoration">
            {" "}
            <Typography sx={{ p: 1, textDecoration: "none" }}>
              Category / Sub Catoggry
            </Typography>
          </Link>
       
          <Link to="/UpcomingCoursesMain" className="textDecoration">
            {" "}
            <Typography sx={{ p: 1, textDecoration: "none" }}>
              Upcoming Course / Blogs{" "}
            </Typography>
          </Link>
         
        </div>
        </>
    )
}

export default SubMenuNew;