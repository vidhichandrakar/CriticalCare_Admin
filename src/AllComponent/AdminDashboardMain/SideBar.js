import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Media/Logo.png";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ForumIcon from "@mui/icons-material/Forum";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PersonIcon from "@mui/icons-material/Person";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

function SideBar({ openSidebarToggle, OpenSidebar }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;


  const handleClick2 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorE2(null);
  };
  const opens = Boolean(anchorE2);
  const ids = opens ? "simple-popover" : undefined;

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
              className="hoverrr"
              sx={{ mt: -2 }}
            >
              <DashboardIcon className="icon" />
              DashBoard
            </Typography>
          </Link>

          <Link>
          <div>
            <Typography
              onClick={handleClick2}
              className="hoverrr"
              sx={{ mt: -2 }}
            >
              <MenuBookIcon className="icon" />
              Courses
            </Typography>
            <Popover
              id={ids}
              open={opens}
              anchorEl={anchorE2}
              onClose={handleClose2}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{ ml: 20 }}
            >
              <Link to="/YourCourses">
                {" "}
                <Typography sx={{ p: 1, textDecoration: "none",textDecorationLine: 'none', color: 'greys' }}>
                  My Courses
                </Typography>
              </Link>
              <Link to="/CreateCoupon">
                {" "}
                <Typography sx={{ p: 1, textDecoration: "none" }}>
                  Manage Coupons
                </Typography>
              </Link>
              <Link to="/User">
                {" "}
                <Typography sx={{ p: 1, textDecoration: "none" }}>
                  Category / Sub Catoggry
                </Typography>
              </Link>
              <Link to="/UpcomingCoursesMain">
                {" "}
                <Typography sx={{ p: 1, textDecoration: "none" }}>
                  Upcoming Course / Blogs{" "}
                </Typography>
              </Link>
            </Popover>
            </div>
          </Link>

          <Link to="/TestPortal">
            <Typography
              className="hoverrr"
              sx={{ mt: -2 }}
            >
              <AssignmentIcon className="icon" />
              Test Portal
            </Typography>
          </Link>

          <Link to="/">
            <Typography
              className="hoverrr"
              sx={{ mt: -2 }}
            >
              <ForumIcon className="icon" />
              Chats
            </Typography>
          </Link>

          <Link to="/Analytics">
            <Typography             
              className="hoverrr"
              sx={{ mt: -2 }}
            >
              <SignalCellularAltIcon className="icon" />
              Analytics
            </Typography>
          </Link>

          <Link>
            <Typography
               onClick={handleClick} 
              className="hoverrr"
              sx={{ mt: -2 }}
            >
              <PersonIcon className="icon" /> People
            </Typography>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{ ml: 15 }}
            >
              <Link to="/User">
                {" "}
                <Typography sx={{ p: 1, textDecoration: "none" }}>
                  User
                </Typography>
              </Link>
              <Link to="/MyTeam">
                {" "}
                <Typography sx={{ p: 1 }}>My Team</Typography>
              </Link>
            </Popover>
          </Link>

          <Link to="/Testimonial">
            <Typography
              className="hoverrr"
              sx={{ mt: -2 }}
            >
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
