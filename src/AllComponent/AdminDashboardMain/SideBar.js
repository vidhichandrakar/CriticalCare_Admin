import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Media/Logo.png";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ForumIcon from "@mui/icons-material/Forum";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PersonIcon from "@mui/icons-material/Person";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SimpleMenu from "./SubMenu";
import { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

function SideBar({ openSidebarToggle, OpenSidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorE2(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickCourse = (event) => {
    setAnchorE3(event.currentTarget);
  };
  const handleCloseCourse = () => {
    setAnchorE3(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const Courseopen = Boolean(anchorE3);
  const idss = Courseopen ? "simple-popover" : undefined;

  const handleClick2 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorE2(null);
  };
  const opens = Boolean(anchorE2);
  const ids = opens ? "simple-popover" : undefined;
  let currentlyHovering = false;

  function handleClickNew(event) {
    if (anchorE2 !== event.currentTarget) {
      setAnchorE2(event.currentTarget);
    }
  }

  function handleHover() {
    currentlyHovering = true;
  }

  function handleCloseNew() {
    setAnchorE2(null);
  }

  function handleCloseHover() {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handleCloseNew();
      }
    }, 50);
  }

  // collapse
  const [openCollapse, setOpenCollapse] = React.useState(false);
  const [openPeople, setOpenPeople] = React.useState(false);
  const navigate = useNavigate();
  const handleClickCollapse = () => {
    setOpenCollapse(!openCollapse);
  };
  const handleClickPeople = () => {
    setOpenPeople(!openPeople);
  };
  const handleCoursesSubMenu = (type) => {
    switch (type) {
      case "coupons": {
        navigate("/CreateCoupon");
      }
    }
  };

  const [highlight, setHighlight] = React.useState(false);
  const handleHighlight = () =>{
    setHighlight(true);
  };

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
          <Link to="/">
            <Typography 
            id="hoverrr"
            className={highlight ? "hoverrr2" : ""}
             sx={{ mt: 1 }} onClick={handleHighlight}>
              <DashboardIcon className="icon" />
              DashBoard
            </Typography>
          </Link>

          <Link>
            <ListItemButton
              onClick={handleClickCollapse}
              className="listButton"
            >
              <MenuBookIcon className="blueHoverIcon" />
              <ListItemText primary="Courses" className="coursesHead" />
              {openCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
              <List component="div" sx={{ marginLeft: "4%" }}>
                <ul type="disc">
                  <li className="myCourses">
                    <Link to="/YourCourses" className="textDecoration">
                      <Typography
                        className="textDecoration"
                        sx={{
                          textDecoration: "none",
                          color: "greys",
                        }}
                      >
                        My Courses
                      </Typography>
                    </Link>
                  </li>
                  <li className="listDesign">
                    <Link to="/CreateCoupon" className="textDecoration">
                      <Typography
                        className="textDecoration"
                        sx={{
                          textDecoration: "none",
                          color: "greys",
                        }}
                      >
                        Manage Coupons
                      </Typography>
                    </Link>
                  </li>
                  <li className="listDesign">
                    <Link to="/User" className="textDecoration">
                      <Typography
                        className="textDecoration"
                        sx={{
                          textDecoration: "none",
                          color: "greys",
                        }}
                      >
                        Category / Sub Catoggry
                      </Typography>
                    </Link>
                  </li>
                  <li className="listDesign">
                    <Link to="/YourCourses" className="textDecoration">
                      <Typography
                        className="textDecoration"
                        sx={{
                          textDecoration: "none",
                          color: "greys",
                        }}
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
            className={highlight ? "hoverrr2" : ""}
             sx={{ mt: -2 }} onClick={handleHighlight}>
              <AssignmentIcon className="icon" />
              Test Portal
            </Typography>
          </Link>

          <Link to="/">
            <Typography 
            id="hoverrr"
            className={highlight ? "hoverrr2" : ""}
             sx={{ mt: -2 }} onClick={handleHighlight}>
              <ForumIcon className="icon" />
              Chats
            </Typography>
          </Link>

          <Link to="/Analytics">
            <Typography 
            id="hoverrr"
            className={highlight ? "hoverrr2" : ""}
             sx={{ mt: -2 }} onClick={handleHighlight}>
              <SignalCellularAltIcon className="icon" />
              Analytics
            </Typography>
          </Link>

          <Link>
            <ListItemButton onClick={handleClickPeople} className="listButton">
              <PersonIcon />
              <ListItemText primary="People" className="coursesHead" />
              {openPeople ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openPeople} timeout="auto" unmountOnExit>
              <List component="div">
               <ul>
                    <li className="myCourses">
                    <Link to="/User" className="textDecoration">
                    <Typography sx={{ textDecoration: "none" }} className="textDecoration">
                          User
                        </Typography>
                    </Link>
                    </li>
                    <li className="listDesign">
                    <Link to="/MyTeam" className="textDecoration">
                    <Typography className="textDecoration">My Team</Typography>
                    </Link>
                    </li>
                  </ul>
                 
              </List>
            </Collapse>
          </Link>

          <Link to="/Testimonial">
            <Typography 
            id="hoverrr"
            className={highlight ? "hoverrr2" : ""}
             sx={{ mt: -2 }} onClick={handleHighlight}>
              <PersonIcon className="icon" />
              Testimonial
            </Typography>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
