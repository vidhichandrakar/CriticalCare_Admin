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
import {
  Dropdown,
  DropdownMenuItem,
  DropdownNestedMenuItem,
} from "./HoverOpenSideBar/NestedDropdown";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/styles/makeStyles";

const theme = createTheme({
  palette: {
    ochre: {
      main: "#000",
      light: "#E9DB5D",
      dark: "#A29415",
      contrastText: "#242105",
    },
    fonts: {
      fontWeight: 600,
    },
  },
});
const useStyles = makeStyles({
  popOverRoot: {
    pointerEvents: "none"
  }
});

function SideBar({ openSidebarToggle, OpenSidebar }) {
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(false);
  let currentlyHovering = false;
  const styles = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleHover() {
    currentlyHovering = true;
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleCloseHover() {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose();
      }
    }, 50);
  }

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  //   console.log(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  // const handlePopoverOpen = (event) => {
  //   setAnchorE2(event.currentTarget);
  // };

  // const handlePopoverClose = () => {
  //   setAnchorE2(null);
  // };

  // const handleClick2 = (event) => {
  //   setAnchorE2(event.currentTarget);
  // };
  // const handleClose2 = () => {
  //   setAnchorE2(null);
  // };
  // const opens = Boolean(anchorE2);
  // const ids = opens ? "simple-popover" : undefined;

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
            <Typography className="hoverrr" sx={{ mt: -2 }}>
              <DashboardIcon className="icon" />
              DashBoard
            </Typography>
          </Link>

          <Link>
            <div>
              <Typography
              // onClick={handleClick2}
              // className="hoverrr"
              // sx={{ mt: -2 }}
              // aria-owns={opens ? 'mouse-over-popover' : undefined}
              // aria-haspopup="true"
              // onMouseOver={handlePopoverOpen}
              // onMouseOut={handlePopoverClose}
              >
                {/* <MenuBookIcon className="icon" />
              Courses */}
              </Typography>
              {/* <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',ml: 20, mt: -3 
              }}
              open={opens}
              anchorEl={anchorE2}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onRequestClose={handlePopoverClose}
              // disableRestoreFocus
              aria-hidden={!opens}
              elevation={8}
              // onOpen={handlePopoverOpen}
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
            </Popover> */}
              {/* <ThemeProvider theme={theme}>
              <DropdownNestedMenuItem
            label="Courses"
            rightIcon={<MenuBookIcon />}
            menu={[
              <DropdownMenuItem onClick={() => {}}>
                Top Long Course
              </DropdownMenuItem>,
              <DropdownMenuItem onClick={() => {}}>
                Top Short Course
              </DropdownMenuItem>,
              <DropdownMenuItem onClick={() => {}}>
                Top Crash Course
              </DropdownMenuItem>,
            ]}
          >

          </DropdownNestedMenuItem>
            </ThemeProvider> */}
            </div>
          </Link>

          <Link to="/TestPortal">
            <Typography className="hoverrr" sx={{ mt: -2 }}>
              <AssignmentIcon className="icon" />
              Test Portal
            </Typography>
          </Link>

          <Link to="/">
            <Typography className="hoverrr" sx={{ mt: -2 }}>
              <ForumIcon className="icon" />
              Chats
            </Typography>
          </Link>

          <Link to="/Analytics">
            <Typography className="hoverrr" sx={{ mt: -2 }}>
              <SignalCellularAltIcon className="icon" />
              Analytics
            </Typography>
          </Link>

          {/* <Link>
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
              <Link to="/User" className="textDecoration">
                {" "}
                <Typography sx={{ p: 1, textDecoration: "none" }}>
                  User
                </Typography>
              </Link>
              <Link to="/MyTeam" className="textDecoration">
                {" "}
                <Typography sx={{ p: 1 }}>My Team</Typography>
              </Link>
            </Popover>
          </Link> */}

          <Link to="/Testimonial">
            <Typography className="hoverrr" sx={{ mt: -2 }}>
              <PersonIcon className="icon" />
              Testimonial
            </Typography>
          </Link>
          <Link to="/Testimonial">
            <Typography className="hoverrr" sx={{ mt: -2 }}>
              <div>
                <Button
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  onMouseOver={handleClick}
                  onMouseLeave={handleCloseHover}
                  // className="hoverrr"
                >
                <PersonIcon className="icon" /> People
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  MenuListProps={{
                    onMouseEnter: handleHover,
                    // onMouseLeave: handleCloseHover,
                    style: { pointerEvents: "auto" },
                  }}
                  getContentAnchorEl={null}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                  PopoverClasses={{
                    root: styles.popOverRoot,
                  }}
                  sx={{m: 15}}
                > <MenuItem onClick={handleClose}> <Link to="/User" className="textDecoration">
                {" "}
                <Typography sx={{ p: 1, textDecoration: "none" }}>
                  User
                </Typography>
              </Link></MenuItem>
                  <MenuItem onClick={handleClose}> <Link to="/MyTeam" className="textDecoration">
                {" "}
                <Typography sx={{ p: 1 }}>My Team</Typography>
              </Link></MenuItem>
                 
                </Menu>
              </div>
            </Typography>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
