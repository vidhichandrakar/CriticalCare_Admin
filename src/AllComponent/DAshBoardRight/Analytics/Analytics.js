import React from "react";
import "../../CSSFile/Analytics.css";
import CourseHeader from "../../Courses/CoursesHeader";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import SmallCard from "./AnalyticsCard/SmallCard";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { AnalyticsSmallData } from "../../../Data/JsonData";
import { commonSelect } from "../../../Util/CommonFields";
import SideBar from "../../AdminDashboardMain/SideBar";

const Analytics = () => {
  return (
    <div className='grid-container'>
      <SideBar />
    <main className="main-container m20">
      <CourseHeader
        Heading={"Analytics"}
        subHeading={
          "Analyze your sales and traffic to know your brand’s growth"
        }
      />
      <div>
        
         <FormControl sx={{ mt: 2, minWidth: 100, backgroundColor: '#fff', borderRadius: 3 }}>
            {commonSelect({
              placeholder: "Today",
              menuItemList: [
                { id: 1, label: "Option 1" },
                { id: 2, label: "Option 2" },
                { id: 3, label: "Option 3" },
              ],
              className: "categorytext",
            })}
          </FormControl>
        <Box className="CardsRow">
          <SmallCard Data={AnalyticsSmallData} />
        </Box>
        <Box className="CardsCol">
          <div className="CardCol">
            <div className="row">
              <CurrencyRupeeIcon className="RupeeIcon" />
              <div className="col">
                <h4>Google Analytics</h4>
                <p>
                  View all your activities of website and app on the Google
                  Analytics
                </p>
              </div>
            </div>
            <ChevronRightIcon className="RightIcon" />
          </div>
          <div className="CardCol">
            <div className="row">
              <SignalCellularAltIcon className="SignalIcon" />
              <div className="col">
                <h4>Google Analytics</h4>
                <p>
                  View all your activities of website and app on the Google
                  Analytics
                </p>
              </div>
            </div>
            <ChevronRightIcon className="RightIcon" />
          </div>
        </Box>
      </div>
    </main>
    </div>
  );
}

export default Analytics;
