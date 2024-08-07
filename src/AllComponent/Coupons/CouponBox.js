import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import RestoreFromTrashSharpIcon from "@mui/icons-material/RestoreFromTrashSharp";
import HistorySharpIcon from "@mui/icons-material/HistorySharp";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Divider from '@mui/material/Divider'; 


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-backdrop": { backgroundColor: "red !important" },
}));

const CouponBox = () => {
  const arrayColumn = [1, 2, 3, 4, 5, 6, 7, 8];
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showDetailFlag, setShowDetailFlag] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [personName, setPersonName] = useState([]);

  const handleShowDetail = (value) => {
    setShowDetail(value);
    setShowDetailFlag(!showDetailFlag);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ids = open ? "simple-popover" : undefined;

  const boxOpen = Boolean(anchorEl);
  const id = boxOpen ? "simple-popover" : undefined;

  const handleClickOpen = () => {
    setOpenSecond(true);
  };
  const handleClickClose = () => {
    setOpenSecond(false);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = ["Oliver Hansen", "Van Henry"];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      {arrayColumn.map((data) => (
        <Box>
          <Box className="courseMainCoupon">
            <div
              className="formMainCoupon"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Box className="couponLeftBox">
                <Typography className="discount">₹ 8000 OFF</Typography>
                <Box className="yellowBox">
                  {" "}
                  <Typography style={{ marginBottom: "8%" }}>
                    <b>DISCOUNT10</b>
                  </Typography>{" "}
                </Box>
              </Box>
              <Box className="verticalDividerOne"></Box>

              <Box className="flexcol width60 jcsb">
                <div className="flexrow">
                  <Box className="DiscountBox">
                    <Typography>DISCOUNT</Typography>
                    <Box className="flexrow mt-2">
                      <Typography sx={{fontSize: "0.9rem"}}>Created by 360 Critical care</Typography>
                      <Box>
                        <CircleIcon className="circleIcon" />
                      </Box>
                      <Typography sx={{fontSize: "0.9rem"}} className="UsedText">Public Coupon</Typography>
                    </Box>
                  </Box>
                  <Box className="couponLastBox">
                    <h6
                      style={{
                        color: "white",
                        backgroundColor: "red",
                        padding: 5,
                        marginRight: "16%",
                      }}
                    >
                      EXPIRED
                    </h6>
                    <MoreVertIcon
                      aria-describedby={id}
                      variant="contained"
                      sx={{ cursor: "pointer" }}
                      onClick={handleClick}
                    />
                  </Box>
                </div>

                <div className="flexrow">
                  <Box className="couponRightBox flexrow">
                    <Typography sx={{fontSize: "0.9rem"}}>2023/08/27, 05:39 am - 2023/08/29, 06:30 pm</Typography>
                    <Box className="verticalDividerTwo"></Box>
                    <Typography sx={{fontSize: "0.9rem"}}className="UsedText">Used 1 times</Typography>
                  </Box>

                  <Box>
                    <Stack spacing={2} direction="row">
                      <Button
                        variant="text"
                        className="showDetailsButton"
                        onClick={() => handleShowDetail(data)}
                      >
                        {showDetail === data && showDetailFlag === true
                          ? "Hide Details"
                          : "Show Details"}
                      </Button>
                    </Stack>
                  </Box>
                </div>
              </Box>
            </div>
          </Box>

          {showDetail === data && showDetailFlag === true ? (
            <div className="completeCouponInfo">
              <div className="couponInfoHeading">
                <p>Coupon Information</p>
              </div>

              <div className="completeCouponInfoBoxes">
                <Box className="couponInfoBoxes">
                  <p>Total Eligible Students</p>
                  <h3>All Students</h3>
                </Box>
                <Box className="couponInfoBoxes">
                  <p>Total Assigned Courses</p>
                  <Box className="numberAndButton">
                    <h3>1</h3>
                    <Button
                      className="editButton"
                      variant="text"
                      disabled={true}
                    >
                      View
                    </Button>
                  </Box>
                </Box>

                {/* START OF EDIT BUTTON */}

                <Box className="couponInfoBoxes">
                  <p>Overall Usage Limit</p>
                  <Box className="numberAndButton">
                    <h3>1</h3>
                    <Button
                      className="editButton"
                      variant="text"
                      onClick={handleClickOpen}
                    >
                      Edit
                    </Button>

                    <Dialog
                      onClose={handleClickClose}
                      aria-labelledby="customized-dialog-title"
                      open={openSecond}
                      className="couponBackDrop"
                    >
                      <DialogTitle
                        sx={{ m: 0, p: 2 }}
                        id="customized-dialog-title"
                      >
                        Edit coupon details
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleClickClose}
                        sx={{
                          position: "absolute",
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogContent dividers>
                        <p className="makeFirstHeadCenter">₹ 8,000 OFF</p>
                        <Box className="popUpDiscount">DISCOUNT</Box>

                        <Box>
                          <h4 className="overallUseageLimit">
                            Overall usage limit
                          </h4>
                          <Box>
                            <FormControl
                              sx={{
                                m: 1,
                                width: 550,
                                height: 50,
                                padding: -20,
                              }}
                            >
                              <InputLabel id="demo-multiple-name-label">
                                1
                              </InputLabel>
                              <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                              >
                                {names.map((name) => (
                                  <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, personName, theme)}
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="Check, if you want to set number of times to unlimited"
                            />
                          </FormGroup>
                          <Box>
                            <p className="lastParaGreyColor">
                              Overall usage cannot be less than the number of
                              instances already used by students (1)
                            </p>
                          </Box>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          autoFocus
                          onClick={handleClickClose}
                          className="makingThisButtonBlue"
                        >
                          Save changes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                </Box>

                <Box className="couponInfoBoxes">
                  <p>Usage Per Student</p>
                  <Box className="numberAndButton">
                    <h3>1</h3>
                    <Button
                      className="editButton"
                      variant="text"
                      onClick={handleClickOpen}
                    >
                      Edit
                    </Button>

                    <BootstrapDialog
                      onClose={handleClickClose}
                      aria-labelledby="customized-dialog-title"
                      open={openSecond}
                    >
                      <DialogTitle
                        sx={{ m: 0, p: 2 }}
                        id="customized-dialog-title"
                      >
                        Edit coupon details
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleClickClose}
                        sx={{
                          position: "absolute",
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogContent dividers>
                        <p className="makeFirstHeadCenter">₹ 8,000 OFF</p>
                        <Box className="popUpDiscount">DISCOUNT</Box>

                        <Box>
                          <h4 className="overallUseageLimit">
                            Overall usage limit
                          </h4>
                          <Box>
                            <FormControl
                              sx={{
                                m: 1,
                                width: 550,
                                height: 50,
                                padding: -20,
                              }}
                            >
                              <InputLabel id="demo-multiple-name-label">
                                1
                              </InputLabel>
                              <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                              >
                                {names.map((name) => (
                                  <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, personName, theme)}
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="Check, if you want to set number of times to unlimited"
                            />
                          </FormGroup>
                          <Box>
                            <p className="lastParaGreyColor">
                              Overall usage cannot be less than the number of
                              instances already used by students (1)
                            </p>
                          </Box>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          autoFocus
                          onClick={handleClickClose}
                          className="makingThisButtonBlue"
                        >
                          Save changes
                        </Button>
                      </DialogActions>
                    </BootstrapDialog>
                  </Box>
                </Box>

                <Box className="couponInfoBoxes">
                  <p>Min Order value</p>
                  <Box className="numberAndButton">
                    <h3>₹ 1</h3>
                    <Button
                      className="editButton"
                      variant="text"
                      onClick={handleClickOpen}
                    >
                      Edit
                    </Button>

                    <BootstrapDialog
                      onClose={handleClickClose}
                      aria-labelledby="customized-dialog-title"
                      open={openSecond}
                    >
                      <DialogTitle
                        sx={{ m: 0, p: 2 }}
                        id="customized-dialog-title"
                      >
                        Edit coupon details
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleClickClose}
                        sx={{
                          position: "absolute",
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogContent dividers>
                        <p className="makeFirstHeadCenter">₹ 8,000 OFF</p>
                        <Box className="popUpDiscount">DISCOUNT</Box>

                        <Box>
                          <h4 className="overallUseageLimit">
                            Overall usage limit
                          </h4>
                          <Box>
                            <FormControl
                              sx={{
                                m: 1,
                                width: 550,
                                height: 50,
                                padding: -20,
                              }}
                            >
                              <InputLabel id="demo-multiple-name-label">
                                1
                              </InputLabel>
                              <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                              >
                                {names.map((name) => (
                                  <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, personName, theme)}
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="Check, if you want to set number of times to unlimited"
                            />
                          </FormGroup>
                          <Box>
                            <p className="lastParaGreyColor">
                              Overall usage cannot be less than the number of
                              instances already used by students (1)
                            </p>
                          </Box>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          autoFocus
                          onClick={handleClickClose}
                          className="makingThisButtonBlue"
                        >
                          Save changes
                        </Button>
                      </DialogActions>
                    </BootstrapDialog>
                  </Box>
                </Box>
              </div>
            </div>
          ) : null}
        </Box>
      ))}
      <Popover
        sx={{ m: -7, mt: 0.7 }}
        id={ids}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {/* <Box sx={{ p: 1, mt: -1, mr: 5 ,display: "flex" }}> */}
        <Box  className="EditButton" sx={{ p: 1}}>

          {" "}
          <NoteAltOutlinedIcon className="coloricon"/>
          <Typography sx={{ml: 1}}> Details</Typography>
        </Box>
        <Divider/>
        <Box className="EditButton" sx={{ p: 1}} >
          {" "}
          <HistorySharpIcon  className="coloricon"/>
          <Typography sx={{ml: 1}}> View Edit History</Typography>
        </Box>
        <Divider/>
        {/* <Box sx={{ p: 1, mt: -1, mr: 5,display: "flex" }}> */}
        <Box className="EditButton" sx={{ p: 1}}>

          {" "}
          <RestoreFromTrashSharpIcon className="DeleteRed"/> 
          <Typography sx={{ml: 1}} className="DeleteRed"> Delete</Typography>
        </Box>
      </Popover>
    </div>
  );
};

export default CouponBox;
