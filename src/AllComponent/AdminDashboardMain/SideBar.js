// import React from "react";
// import { Link } from "react-router-dom";
// import Logo from "../../Media/Logo.png";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import ForumIcon from "@mui/icons-material/Forum";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
// import PersonIcon from "@mui/icons-material/Person";
// import Popover from "@mui/material/Popover";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import SimpleMenu from "./SubMenu";
// import { useState } from "react";


// function SideBar({ openSidebarToggle, OpenSidebar }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [anchorE2, setAnchorE2] = useState(null);
//   const [anchorE3, setAnchorE3] = useState(null);
//   const handlePopoverOpen = (event) => {
//     setAnchorE2(event.currentTarget);
//   };

//   const handlePopoverClose = () => {
//     setAnchorE2(null);
//   };
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//     console.log(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleClickCourse = (event) => {
//     setAnchorE3(event.currentTarget);
//     console.log(event.currentTarget);
//   };
//   const handleCloseCourse = () => {
//     setAnchorE3(null);
//   };
//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;
//   const Courseopen = Boolean(anchorE3);
//   const idss = Courseopen ? "simple-popover" : undefined;


//   const handleClick2 = (event) => {
//     setAnchorE2(event.currentTarget);
//   };
//   const handleClose2 = () => {
//     setAnchorE2(null);
//   };
//   const opens = Boolean(anchorE2);
//   const ids = opens ? "simple-popover" : undefined;
//   let currentlyHovering = false;

//   function handleClickNew(event) {
//     if (anchorE2 !== event.currentTarget) {
//       setAnchorE2(event.currentTarget);
//     }
//   }

//   function handleHover() {
//     currentlyHovering = true;
//   }

//   function handleCloseNew() {
//     setAnchorE2(null);
//   }

//   function handleCloseHover() {
//     currentlyHovering = false;
//     setTimeout(() => {
//       if (!currentlyHovering) {
//         handleCloseNew();
//       }
//     }, 50);
//   }
//   return (
//     <aside
//       id="sidebar"
//       className={openSidebarToggle ? "sidebar-responsive" : ""}
//     >
//       <div className="Sider-Box">
//         <div className="sidebar-title">
//           <div className="sidebar-brand">
//             <img src={Logo} className="SideBarLogo" />
//           </div>
//           <span className="icon close_icon" onClick={OpenSidebar}>
//             X
//           </span>
//         </div>

//         <div className="sidebar-list sidebar-list-item BottomLine">
//           <Link to="/">
//             <Typography
//               className="hoverrr"
//               sx={{ mt: 1 }}
//             >
//               <DashboardIcon className="icon" />
//               DashBoard
//             </Typography>
//           </Link>

//           <Link>
//             <Typography
//                onClick={handleClickCourse} 
//               className="hoverrr"
//               sx={{ mt: -2 }}
//             >
//              <MenuBookIcon className="icon" />
//                 Courses
//             </Typography>

//             <Popover
//               id={idss}
//               open={Courseopen}
//               anchorEl={anchorE3}
//               onClose={handleCloseCourse}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               sx={{ ml: 20, mt: -3 }}
//             >
//              <Link to="/YourCourses" className="textDecoration" >
//                 <Typography className="textDecoration" sx={{ p: 1, textDecoration: "none",textDecorationLine: 'none', color: 'greys' }}>
//                   My Courses
//                 </Typography>
//               </Link>
//               <Link to="/CreateCoupon" className="textDecoration" >
//                 <Typography sx={{ p: 1, textDecoration: "none" }}>
//                   Manage Coupons
//                 </Typography>
//               </Link >
//               <Link to="/User" className="textDecoration" >
//                 {" "}
//                 <Typography sx={{ p: 1, textDecoration: "none" }}>
//                   Category / Sub Catoggry
//                 </Typography>
//               </Link>
//               <Link to="/UpcomingCoursesMain" className="textDecoration" >
//                 {" "}
//                 <Typography sx={{ p: 1, textDecoration: "none" }}>
//                   Upcoming Course / Blogs{" "}
//                 </Typography>
//               </Link>
            
//             </Popover>
//           </Link>
          
//           <Link to="/TestPortal">
//             <Typography
//               className="hoverrr"
//               sx={{ mt: -2 }}
//             >
//               <AssignmentIcon className="icon" />
//               Test Portal
//             </Typography>
//           </Link>

//           <Link to="/">
//             <Typography
//               className="hoverrr"
//               sx={{ mt: -2 }}
//             >
//               <ForumIcon className="icon" />
//               Chats
//             </Typography>
//           </Link>

//           <Link to="/Analytics">
//             <Typography             
//               className="hoverrr"
//               sx={{ mt: -2 }}
//             >
//               <SignalCellularAltIcon className="icon" />
//               Analytics
//             </Typography>
//           </Link>

         
//           <Link>
//             <Typography
//                onClick={handleClick} 
//               className="hoverrr"
//               sx={{ mt: -2 }}
//             >
//               <PersonIcon className="icon" /> People
//             </Typography>
//             <Popover
//               id={id}
//               open={open}
//               anchorEl={anchorEl}
//               onClose={handleClose}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               sx={{ ml: 20, mt: -3 }}
//             >
//               <Link to="/User" className="textDecoration" >
//                 {" "}
//                 <Typography sx={{ p: 1, textDecoration: "none" }}>
//                   User
//                 </Typography>
//               </Link>
//               <Link to="/MyTeam" className="textDecoration" >
//                 {" "}
//                 <Typography sx={{ p: 1 }}>My Team</Typography>
//               </Link>
//             </Popover>
//           </Link>

//           <Link to="/Testimonial">
//             <Typography
//               className="hoverrr"
//               sx={{ mt: -2 }}
//             >
//               <PersonIcon className="icon" />
//               Testimonial
//             </Typography>
//           </Link>
          
          
          
//         </div>
//       </div>
//     </aside>
//   );
// }

// export default SideBar;







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
import SimpleMenu from "./SubMenu";
import { useState } from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


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
   const [openCollapse, setOpenCollapse] = React.useState(true);
   const [openPeople, setOpenPeople] = React.useState(true);

   const handleClickCollapse = () => {
     setOpenCollapse(!openCollapse);
   };
   const handleClickPeople = () => {
     setOpenPeople(!openPeople);
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
              sx={{ mt: 1 }}
            >
              <DashboardIcon className="icon" />
              DashBoard
            </Typography>
          </Link>

      <Link>
         <ListItemButton onClick={handleClickCollapse} className="listButton">
           <MenuBookIcon className="blueHoverIcon"/>
         <ListItemText primary="Courses" className="coursesHead"/>
         {openCollapse ? <ExpandLess /> : <ExpandMore />}
       </ListItemButton>

       <Collapse in={openCollapse} timeout="auto" unmountOnExit>
         <List component="div">
           <ListItemButton 
            className="listItems">

             <Link to="/YourCourses" className="textDecoration" >
              <ul type="disc" className="myCoursess">
                <li><Typography className="textDecoration" sx={{ textDecoration: "none",
                color: 'greys' }}>
                  My Courses
                </Typography></li>
                </ul>
              </Link>
              <Link to="/CreateCoupon" className="textDecoration" >
              <ul type="disc" className="manageCoupons">
                <li><Typography sx={{textDecoration: "none" }}>
                  Manage Coupons
                </Typography></li>
                </ul>
              </Link >
              <Link to="/User" className="textDecoration" >
              <ul type="disc">
                <li><Typography sx={{ textDecoration: "none" }}>
                  Category / Sub Catoggry
                </Typography></li>
                </ul>
              </Link>
              <Link to="/UpcomingCoursesMain" className="textDecoration" >
              <ul type="disc">
                <li><Typography sx={{ pl: -20, textDecoration: "none" }}>
                  Upcoming Course / Blogs{" "}
                </Typography></li>
                </ul>
              </Link>

         </ListItemButton>
         </List>
       </Collapse>
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
         <ListItemButton onClick={handleClickPeople} className="listButton">
         <PersonIcon/>
         <ListItemText primary="People" className="coursesHead"/>
         {openPeople ? <ExpandLess /> : <ExpandMore />}
       </ListItemButton>

       <Collapse in={openPeople} timeout="auto" unmountOnExit>
         <List component="div">
           <ListItemButton 
            className="listItems">
              
              <Link to="/User" className="textDecoration" >
              <ul type="disc" className="userCollapse">
                 <li><Typography sx={{ textDecoration: "none" }}>
                   User
                 </Typography></li>
                 </ul>
               </Link>
               <Link to="/MyTeam" className="textDecoration" >
               <ul type="disc" className="myTeamCollapse"> 
                 <li><Typography>My Team</Typography></li>
                 </ul>
               </Link>

         </ListItemButton>
         </List>
       </Collapse>
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