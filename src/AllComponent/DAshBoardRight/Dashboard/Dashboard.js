import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Header from "../../Courses/CoursesHeader";
import Header from "../../Courses/Header";
import { AdditionalData, OfferData } from "../../../Data/JsonData";
import AdditionalCard from "./AdditionalCard";
import OfferCard from "./OfferCard";
import SideBar from "../../AdminDashboardMain/SideBar";
import { useEffect } from "react";
import { redirectRestriction } from "../../../Util/RedirectRestriction";

const Dashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!redirectRestriction()) {
      navigate("/admin");
    }
  }, []);
  return (
    <div className="grid-container">
      <Header
            Heading={"Hi 360 Critical Care,"}
            subHeading={"Welcome to your Dashboard"}
            OpenSidebar={OpenSidebar}
          />
      <SideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      
      <main className="main-container">
 
         
        <div className="DashBoardMAinBox">
          
          <div className="AdditionalBox ">
            <h1 className="TextHeading">Additional Offerings</h1>
            <div className="Additionalmain-cards">
              <AdditionalCard Data={AdditionalData} />
            </div>
          </div>
          <div className="OurOfferBox ">
            <h1 className="TextHeading" style={{paddingTop: "10px"}}>Our Offerings</h1>
            <div className="Offer-main-cards">
              <OfferCard Data={OfferData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
