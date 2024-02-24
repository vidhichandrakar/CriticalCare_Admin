import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";

import { Link } from "react-router-dom";

import MenuBookIcon from "@mui/icons-material/MenuBook";
// import { Button } from "@mui/material";
// import makeStyles from "@mui/styles/makeStyles";
// const useStyles = makeStyles({
//   popOverRoot: {
//     pointerEvents: "none"
//   }
// });

function SimpleMenu() {
  let currentlyHovering = false;
  // const styles = useStyles();

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

  return (
    <div>
      <Typography
        className="hoverrr"
        sx={{ mt: -2 }}
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseOver={handleClick}
        onMouseLeave={handleCloseHover}
      >
        <MenuBookIcon className="icon" />
        Courses
      </Typography>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          onMouseEnter: handleHover,
          onMouseLeave: handleCloseHover,
          style: { pointerEvents: "auto" },
        }}
        getContentAnchorEl={null}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        // sx={{ ml: 5, }}
      >
         <Link to="/YourCourses" className="textDecoration">
            {" "}
            <Typography
              className="textDecoration"
              sx={{
                p: 1,
                textDecoration: "none",
                textDecorationLine: "none",
                color: "greys",
              }}
            >
              My Courses
            </Typography>
          </Link>
          <Link to="/Banner" className="textDecoration">
            {" "}
            <Typography
              className="textDecoration"
              sx={{
                p: 1,
                textDecoration: "none",
                textDecorationLine: "none",
                color: "greys",
              }}
            >
              Banner
            </Typography>
          </Link>
          {" "}
          <Link to="/Coupon" className="textDecoration">
            {" "}
            <Typography
              className="textDecoration"
              sx={{
                p: 1,
                textDecoration: "none",
                textDecorationLine: "none",
                color: "greys",
              }}
            >
              Coupons
            </Typography>
          </Link>
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
         
      </Menu>
    </div>
  );
}

export default SimpleMenu;
