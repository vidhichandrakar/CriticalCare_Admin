import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { styled } from "@mui/material/styles";
import { getTestBycourseId } from "../../ActionFactory/apiActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200, // Set the maximum height
      overflowY: "auto", // Enable scrolling for overflow
    },
  },
};

export default function ViewTestContents({
  viewTestDialog,
  courseId,
  setViewTestDialog,
}) {
  const [allTestDetails, setAllTestDetails] = useState([]);

  useEffect(() => {
    if (courseId) {
      getTestBycourseId({
        courseId: courseId,
        callBack: (response) => {
          setAllTestDetails(response.data);
        },
      });
    }
  }, []);
  return (
    <>
      <div>
        <BootstrapDialog
          className="PopUP"
          onClose={() => setViewTestDialog(false)}
          aria-labelledby="customized-dialog-title"
          open={viewTestDialog}
          PaperProps={{
            style: {
              width: "70%", // Set the width to 100%
              margin: "0", // Remove any default margins
            },
          }}
        >
          <DialogTitle
            sx={{ m: 0, p: 2, fontSize: "1rem" }}
            id="customized-dialog-title"
          ></DialogTitle>
          <Typography sx={{ mt: -2, ml: 3, fontWeight: 600 }}>
            View Added Test
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setViewTestDialog(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 10,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Divider sx={{ mt: 1 }} />
          <DialogContent>
            <Box className="TestinstructionBox">
              {allTestDetails?.length &&
                allTestDetails?.map((item, index) => (
                  <Box className="cardiologyEachBox">
                    <Box>
                      <Typography className="testHead">
                        <b>{item.test_name}</b>
                      </Typography>
                    </Box>
                    <Box style={{ cursor: "pointer" }}></Box>
                  </Box>
                ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                borderColor: "red",
                color: "red",
                textTransform: "none",
                marginRight: "12px",
                padding: "3px 0px",
              }}
              variant="outlined"
              onClick={() => setViewTestDialog(false)}
            >
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </>
  );
}
