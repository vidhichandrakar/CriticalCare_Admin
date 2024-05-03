import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Media/Logo.png";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ForumIcon from "@mui/icons-material/Forum";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Configuration from "../Configuration/Configuration";

function SideBar({ openSidebarToggle, OpenSidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);
  const opens = Boolean(anchorE2);
  const [openCollapse, setOpenCollapse] = useState(
    localStorage.getItem("subMenuCourses") === "true" ? true : false
  );
  const [openPeople, setOpenPeople] = useState(
    localStorage.getItem("subMenuPeople") === "true" ? true : false
  );
  const [hideCatConfig, setHideCatConfig] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const Courseopen = Boolean(anchorE3);
  const idss = Courseopen ? "simple-popover" : undefined;
  const [hideSubConfig, setHideSubConfig] = useState(false);
  const [selectedConfigValue, setSelectedConfigValue] = useState("");
  const [highlight, setHighlight] = useState(false);
  const [highlightPeople, setHighlightPeople] = useState(false);
  const [handleCollapse, setHandleCollapse] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setHighlight(window.location.pathname.replace("/", ""));
    setHighlightPeople(window.location.pathname.replace("/", ""));
  }, [localStorage.getItem("activeMenu")]);

  const handleCatConfig = (value) => {
    setHideCatConfig(true);
    setSelectedConfigValue(value);
  };

  const handleCloseCat = () => {
    setHideCatConfig(false);
  };

  const handleClickPeople = () => {
    setOpenPeople(!openPeople);
    if (!openPeople) {
      localStorage.setItem("subMenuPeople", true);
      setHighlightPeople("User");
      localStorage.setItem("subMenuCourses", false);
    }
  };

  const handleClickCollapse = () => {
    setOpenCollapse(!openCollapse);
    if (!openCollapse) {
      localStorage.setItem("subMenuCourses", true);
      setHighlightPeople("YourCourses");
      localStorage.setItem("subMenuPeople", false);
    }
  };

  const handleHighlight = (type) => {
    localStorage.setItem("activeMenu", type);
    localStorage.setItem("subMenuPeople", false);
    if (
      type === "YourCourses" ||
      type === "CreateCoupon" ||
      type === "catagory" ||
      type === "upcoimgCourses" ||
      type === "Testimonial"
    ) {
      localStorage.setItem("subMenuCourses", true);
    } else {
      localStorage.setItem("subMenuCourses", false);
    }
  };

  const handleHighlightPeople = (type) => {
    setHighlightPeople(type);
    // setHighlight(null);
    localStorage.setItem("activeMenu", type);
    if (type === "User" || type === "MyTeam") {
      setHighlightPeople(type);
      localStorage.setItem("subMenuPeople", true);
    } else {
      localStorage.setItem("subMenuPeople", false);
    }
  };

  const handleHideSubCat = () => {
    setHideSubConfig(!hideSubConfig);
    // localStorage.setItem("subMenuCourses", false);
    // localStorage.setItem("subMenuPeople", false);
    console.log("comfguraion");
  };

  function handleCloseNew() {
    setAnchorE2(null);
  }

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="Sider-Box">
        <div className="sidebar-title">
          <div className="sidebar-brand">
            <img src={Logo} className="SideBarLogo" />
          </div>
          <span className="icon close_icon" onClick={OpenSidebar}>
            X
          </span>
        </div>

        <div className="sidebar-list sidebar-list-item BottomLine">
          <Link to="/DashBoard">
            <Typography
              id="hoverrr"
              className={highlight === "DashBoard" ? "hoverrr2" : ""}
              sx={{ mt: 1 }}
              onClick={() => handleHighlight("DashBoard")}
            >
              <DashboardIcon className="icon" />
              DashBoard
            </Typography>
          </Link>

          <Link to="/YourCourses">
            <ListItemButton
              onClick={handleClickCollapse}
              className="listButton"
            >
              <MenuBookIcon className="blueHoverIcon" />
              <ListItemText primary="Courses" className="coursesHead" />
              {openCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse
              in={openCollapse}
              // timeout="auto"
              unmountOnExit
            >
              <List component="div" sx={{ marginLeft: "1%" }}>
                <ul type="disc">
                  <li className="myCourses">
                    <Link to="/YourCourses" className="textDecoration">
                      <Typography
                        id="hoverrr"
                        className={
                          highlight === "YourCourses"
                            ? "hoverrr2 paddingD"
                            : "paddingD"
                        }
                        sx={{ mt: 1, color: "grey" }}
                        onClick={() => handleHighlight("YourCourses")}
                      >
                        My Courses
                      </Typography>
                    </Link>
                  </li>
                  <li className="listDesign">
                    <Link to="/CreateCoupon" className="textDecoration">
                      <Typography
                        id="hoverrr"
                        className={
                          highlight === "CreateCoupon"
                            ? "hoverrr2 paddingD"
                            : "paddingD"
                        }
                        sx={{ mt: 1, color: "grey" }}
                        onClick={() => handleHighlight("CreateCoupon")}
                      >
                        Manage Coupons
                      </Typography>
                    </Link>
                  </li>
                  <li className="listDesign">
                    <Link to="/User" className="textDecoration">
                      <Typography
                        id="hoverrr"
                        className={
                          highlight === "catagory"
                            ? "hoverrr2 paddingD"
                            : "paddingD"
                        }
                        sx={{ mt: 1, color: "grey" }}
                        onClick={() => handleHighlight("catagory")}
                      >
                        Category / Sub Category
                      </Typography>
                    </Link>
                  </li>
                  <li className="listDesign">
                    <Link to="/YourCourses" className="textDecoration">
                      <Typography
                        id="hoverrr"
                        className={
                          highlight === "upcomingCourses"
                            ? "hoverrr2 paddingD"
                            : "paddingD"
                        }
                        sx={{ mt: 1, color: "grey" }}
                        onClick={() => handleHighlight("upcomingCourses")}
                      >
                        Upcoming Course / Blogs
                      </Typography>
                    </Link>
                  </li>
                </ul>
              </List>
            </Collapse>
          </Link>
          <Link to="/TestPortal">
            <Typography
              id="hoverrr"
              className={highlight === "TestPortal" ? "hoverrr2" : ""}
              sx={{ mt: -2 }}
              onClick={() => handleHighlight("TestPortal")}
            >
              <AssignmentIcon className="icon" />
              Test Portal
            </Typography>
          </Link>

          <Link to="/Chat">
            <Typography
              id="hoverrr"
              className={highlight === "chats" ? "hoverrr2" : ""}
              sx={{ mt: -2 }}
              onClick={() => handleHighlight("chats")}
            >
              <ForumIcon className="icon" />
              Chats
            </Typography>
          </Link>

          <Link to="/Analytics">
            <Typography
              id="hoverrr"
              className={highlight === "Analytics" ? "hoverrr2" : ""}
              sx={{ mt: -2 }}
              onClick={() => handleHighlight("Analytics")}
            >
              <SignalCellularAltIcon className="icon" />
              Analytics
            </Typography>
          </Link>

          <Link to="/User">
            <ListItemButton onClick={handleClickPeople} className="listButton">
              <PersonIcon />
              <ListItemText primary="People" className="coursesHead" />
              {openPeople ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse
              in={openPeople}
              // timeout="auto"
              unmountOnExit
            >
              <List component="div">
                <ul>
                  <li className="myCourses">
                    <Link to="/User" className="textDecoration">
                      <Typography
                        id="hoverrr"
                        className={
                          highlightPeople === "User"
                            ? "hoverrr2 paddingD"
                            : "paddingD"
                        }
                        sx={{ textDecoration: "none", color: "grey" }}
                        onClick={() => handleHighlightPeople("User")}
                      >
                        User
                      </Typography>
                    </Link>
                  </li>
                  <li className="listDesign">
                    <Link to="/MyTeam" className="textDecoration">
                      <Typography
                        id="hoverrr"
                        className={
                          highlightPeople === "MyTeam"
                            ? "hoverrr2 paddingD"
                            : "paddingD"
                        }
                        sx={{ textDecoration: "none", color: "grey" }}
                        onClick={() => handleHighlightPeople("MyTeam")}
                      >
                        My Team
                      </Typography>
                    </Link>
                  </li>
                </ul>
              </List>
            </Collapse>
          </Link>

          <Link to="/Testimonial">
            <Typography
              id="hoverrr"
              className={highlight === "Testimonial" ? "hoverrr2" : ""}
              sx={{ mt: -2 }}
              onClick={() => handleHighlight("Testimonial")}
            >
              <PersonIcon className="icon" />
              Testimonial
            </Typography>
          </Link>
          <Link>
            <ListItemButton onClick={handleHideSubCat} className="listButton">
              <PersonIcon />
              <ListItemText primary="Configuration" className="coursesHead" />
              {hideSubConfig ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={hideSubConfig} timeout="auto" unmountOnExit>
              <List component="div">
                <ul>
                  <li
                    className="myCourses"
                    onClick={() => handleCatConfig("Category")}
                  >
                    <Link className="textDecoration">
                      <Typography
                        sx={{ textDecoration: "none", color: "grey" }}
                        className="textDecoration"
                      >
                        Category
                      </Typography>
                    </Link>
                  </li>
                  <li
                    className="listDesign"
                    onClick={() => handleCatConfig("SubCategory")}
                  >
                    <Link className="textDecoration">
                      <Typography
                        sx={{ textDecoration: "none", color: "grey" }}
                        className="textDecoration"
                      >
                        Sub Category
                      </Typography>
                    </Link>
                  </li>
                  <li
                    className="listDesign"
                    onClick={() => handleCatConfig("Duration")}
                  >
                    <Link className="textDecoration">
                      <Typography
                        sx={{ textDecoration: "none", color: "grey" }}
                        className="textDecoration"
                      >
                        Duration
                      </Typography>
                    </Link>
                  </li>
                  <li className="listDesign">
                    <Link
                      className="textDecoration"
                      onClick={() => handleCatConfig("Team Member")}
                    >
                      <Typography
                        sx={{ textDecoration: "none", color: "grey" }}
                        className="textDecoration"
                      >
                        Team Member
                      </Typography>
                    </Link>
                  </li>
                </ul>
              </List>
            </Collapse>
          </Link>
        </div>
        {hideCatConfig && (
          <Configuration
            selectedConfigValue={selectedConfigValue}
            handleCloseCat={handleCloseCat}
            hideCatConfig={hideCatConfig}
          />
        )}
      </div>
    </aside>
  );
}

export default SideBar;
