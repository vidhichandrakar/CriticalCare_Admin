import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Trics1FreeMockTest from "../DAshBoardRight/Courses/Trics1FreeMockTest";
import { Button } from "@mui/material";


const YourCoursesCard = ({Data}) => {
  // const [showComponentA, setShowComponentA] = useState(true);
  // const HandleClick = () => {
  //   setShowComponentA((prevShowComponentA) => !prevShowComponentA);
  // };

  return (
    <>
      {Data.map((value, index) => {
        const {head, Created, Year, Price} = value
        return <>
        {/* <div className="card"> */}
        {/* {showComponentA ?  */}
        <Button className="card"
        //  onClick={HandleClick}
         >
          <Link to="/Trics1FreeMockTest">
            <img src={value.img} className="cardImage" />
          </Link>
          <div className="CardData" key={index}>
            <p className="Headp">{head}</p>
            <p className="Namep">{Created}</p>
            <p className="Yearp">{Year}</p>
            <p className="Pricep">{Price}</p>
          </div>
          </Button> 
          {/* : <Trics1FreeMockTest />} */}
        {/* </div> */}
        </>
})}
    </>
  );
};

export default YourCoursesCard;
