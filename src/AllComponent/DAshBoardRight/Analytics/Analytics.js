import React, { useState } from "react";
import "../../CSSFile/Analytics.css";
import CourseHeader from "../../Courses/CoursesHeader";
import { Box, MenuItem, Select, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import SmallCard from "./AnalyticsCard/SmallCard";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { AnalyticsSmallData } from "../../../Data/JsonData";
import { commonSelect } from "../../../Util/CommonFields";
import SideBar from "../../AdminDashboardMain/SideBar";
import moment from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RajTest from "../../AdminDashboardMain/RajTest"

const Analytics = () => {
  const [defautlValueDate, setDefaultValueDate] = useState("Last 7 days");
  const [customDate, setCustomDate] = useState(false);

  const dropdownValues = [
    { id: 1, label: "Today" },
    { id: 2, label: "Last 7 Days" },
    { id: 3, label: "Last 15 Days" },
    { id: 4, label: "Last 30 Days" },
    { id: 5, label: "Custom Date" },
  ];
  const handleChangeDate = (e) => {
    console.log(e.target.value);
    setDefaultValueDate(e.target.value);
    console.log("date pciker");

    if (e.target.value === "Last 7 Days") {
      console.log(moment().subtract(7, "days").calendar(), "7 din");
      setCustomDate(false)
    } else if (e.target.value === "Last 15 Days") {
      setCustomDate(false)
      console.log(moment().subtract(15, "days").calendar(), "15 din");
    } else if (e.target.value === "Last 30 Days") {
      console.log(moment().subtract(1, "months").calendar(), "30 days");
      setCustomDate(false)
    }
    else if(e.target.value === "Custom Date"){
      setCustomDate(true)
    }
  };
  const handleCustumDate = (e) => {
    console.log("ijhb", e, moment(new Date(e)).format("MM/DD/YYYY"));
  };
  return (
    <div className="grid-container">
      <SideBar />
      <main className="main-container m20">
        <CourseHeader
          Heading={"Analytics"}
          subHeading={
            "Analyze your sales and traffic to know your brand’s growth"
          }
        />
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <FormControl
              sx={{
                mt: 2,
                minWidth: 200,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <Select
                size="small"
                renderValue={() => {
                  return <em className={"categorytext"}>{defautlValueDate}</em>;
                }}
                inputProps={{ "aria-label": "Without label" }}
                defaultValue={defautlValueDate}
                onChange={handleChangeDate}
              >
                {dropdownValues.map((menu) => (
                  <MenuItem value={menu.label}>{menu.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {customDate &&  (
              <div className="custumDatePicker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker className="custumDatePickerBg"renderInput={(params) => <TextField size="small" {...params} sx={{m: 0.5, mt: 0.7, background: '#fff',}} />}
                      onChange={handleCustumDate}
                      label="Select Start Date"
                    />
                </LocalizationProvider>
              </div>
            )}

            {customDate && (
              <div className="custumDatePicker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker className="custumDatePickerBg"
                      onChange={handleCustumDate}
                      label="Select End Date"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            )}
          </div>

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
        <RajTest />
      </main>
     
    </div>
  );
};

export default Analytics;
