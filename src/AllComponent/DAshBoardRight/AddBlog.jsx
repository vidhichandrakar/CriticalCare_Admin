import React, { useState, useEffect } from "react";
import SideBar from "../AdminDashboardMain/SideBar";
import {
    deleteBlog,
  getBlogs,
} from "../ActionFactory/apiActions";
import "../../App.css"
import Header from "../Courses/Header";
import { Box, Button, Typography } from "@mui/material";
import Popover from '@mui/material/Popover';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DailogBox } from "../../Util/CommonFields";

const AddBlog = () => {
  const [blogCards, setBlogCards] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openId, setOpenId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
 


  useEffect(() => {
    // setLoaderState(true);
    console.log("hello")
    getBlogs({
      callBack: (response) => {
        const userCallBack = response?.data;
        console.log (response.data, "res")
        setBlogCards(userCallBack);
      },
    });
  }, []);
   const handleDeleteClick = (id) => {
    //   if (!openId) {
    //     // toast.error("Please select a category to delete.");
    //     return;
    //   }
      handleClose();
      setIsOpen(true);
      setOpenId(id)
    };
  
    const handleConfirmDelete = () => {
      handleDelete();
      setIsOpen(false);
    };
  
    const handleCancelDelete = () => {
      setIsOpen(false);
    };

    const handleDelete = () => {
    //   if (!openId) {
    //     // toast.error("No category selected for deletion");
    //     return;
    //   }
  
      deleteBlog({
        bloglist_id: openId, // Ensure the correct field name is used
        callBack: () => {
        //   toast.success("Category deleted successfully!");
          getBlogs({
            callBack: (response) => {
              const userCallBack = response?.data;
              setBlogCards(userCallBack);
            },
          });
          handleClose();
        },
        error: (error) => {
        //   toast.error(error.message || "Failed to delete category");
          console.error("Delete Error: ", error);
        },
      });
    };


  
  return (
    <div className="grid-container">
      <Header
        Heading={"Blogs"}
        subHeading={"Only published test are shown here"}
      />
      <SideBar />
      <div className="main-container"> <Box sx={{width:"100%"}}>
          <Box className="PopularCourseBox">
        {blogCards.map((item) => {
            return (
              <Box key={item.id} className="PopularCardBox">
               <Box sx={{display:"flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Typography className="Para1 wrap-text-100" sx={{ mt: 1 }}>
                  {item.title}
                </Typography>
                <Box sx={{display:"flex", flexDirection: "row"}}>
                
                  <Box
                    className="redDeleteofTestPortal blueBlockUser"
                    // onClick={handleEdit}
                    // onClick={() => handleEdit("Category")}
                  >
                    <EditIcon sx={{cursor: "pointer"}} />
                   
                  </Box><Box
                    className="redDeleteofTestPortal redDelete"
                    onClick={() => {handleDeleteClick(item.bloglist_id)}}
                    sx={{ color: "red" }}
                  >
                    {" "}
                    <DeleteIcon sx={{cursor: "pointer"}} />
                  </Box>
                  </Box>
                </Box>
              {item.image_url != null ? (
                <img src={item.image_url} className="Cardimgs" />
              ) : (
                <img  className="Cardimgs" />
              )}
              <Box sx={{mt:1}}>  
                <Typography className="Para2">
                  {item.description}
                </Typography>
              </Box>
            </Box>

            );
          })}
        </Box>
      </Box>
        <DailogBox
              isOpen={isOpen}
              handleConfirmDelete={handleConfirmDelete}
              handleDeleteClick={handleDeleteClick}
              handleCancelDelete={handleCancelDelete}
            />
      </div>
   
    </div>
  );
};

export default AddBlog;