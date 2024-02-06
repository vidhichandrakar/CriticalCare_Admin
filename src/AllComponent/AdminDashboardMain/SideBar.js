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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import { Button } from "@mui/material";
// import makeStyles from "@mui/material/styles/makeStyles";
import SimpleMenu from "./SubMenu";

// const useStyles = makeStyles({
//   popOverRoot: {
//     pointerEvents: "none"
//   }
// });
function SideBar({ openSidebarToggle, OpenSidebar }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  // const styles = useStyles();
  const handlePopoverOpen = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorE2(null);
  };


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
  let currentlyHovering = false;
  // const styles = useStyles();

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
          <SimpleMenu/>
          {/* <div>
              <Typography
                className="hoverrr"
                // sx={{ mt: -2 }}

                aria-owns={anchorE2 ? "simple-menu" : undefined}
                aria-haspopup="true"
                onClick={handleClickNew}
                onMouseOver={handleClickNew}
                onMouseLeave={handleCloseHover}
              >
                <MenuBookIcon className="icon" />
                Courses
              </Typography>
              <Menu
                id="simple-menu"
                anchorEl={anchorE2}
                open={Boolean(anchorE2)}
                onClose={handleCloseNew}
                MenuListProps={{
                  onMouseEnter: handleHover,
                  onMouseLeave: handleCloseHover,
                  style: { pointerEvents: "auto" }
                }}
                getContentAnchorEl={null}
                PopoverClasses={{
                  root: styles.popOverRoot
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{ marginLeft: "8%" }}
              >
                <MenuItem onClick={() => console.log("enter")}>Profile</MenuItem>
                <MenuItem onClick={handleCloseNew}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
    </div> */}
          {/* <div  aria-owns={opens ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}>
            {console.log("opens",opens , anchorE2)}
              <Typography
                className="hoverrr"
                sx={{ mt: -2 }}
               
              >
              <MenuBookIcon className="icon" />
              Courses
            </Typography>
            <Popover
             id="mouse-over-popover"
             sx={{
               pointerEvents: 'none',
               ml: 20, mt: -3 
             }}
              open={opens}
              anchorEl={anchorE2}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              onMouseEnter={handlePopoverOpen}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Link to="/YourCourses" className="textDecoration" >
                {" "}
                <Typography className="textDecoration" sx={{ p: 1, textDecoration: "none",textDecorationLine: 'none', color: 'greys' }}>
                  My Courses
                </Typography>
              </Link>
              <Link to="/CreateCoupon" className="textDecoration" >
                {" "}
                <Typography sx={{ p: 1, textDecoration: "none" }}>
                  Manage Coupons
                </Typography>
              </Link >
              <Link to="/User" className="textDecoration" >
                {" "}
                <Typography sx={{ p: 1, textDecoration: "none" }}>
                  Category / Sub Catoggry
                </Typography>
              </Link>
              <Link to="/UpcomingCoursesMain" className="textDecoration" >
                {" "}
                <Typography sx={{ p: 1, textDecoration: "none" }}>
                  Upcoming Course / Blogs{" "}
                </Typography>
              </Link>
            </Popover>
            </div> */}
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
              sx={{ ml: 20, mt: -3 }}
            >
              <Link to="/User" className="textDecoration" >
                {" "}
                <Typography sx={{ p: 1, textDecoration: "none" }}>
                  User
                </Typography>
              </Link>
              <Link to="/MyTeam" className="textDecoration" >
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