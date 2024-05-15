import { Box, Button, Typography, Divider } from "@mui/material";
import React, { useState } from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TextIncreaseRoundedIcon from "@mui/icons-material/TextIncreaseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Switch from '@mui/material/Switch';  


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function CreateQNS() {
  const [selectedValue, setSelectedValue] = useState("a");
  const [cqopened, setCqopen] = useState(false);
  
  const handleClickOpenCQ = () => {
    setCqopen(true);
  };
  const handleCloseDialogCQ = () => {
    setCqopen(false);
  };
  const handleChangeOption = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className="MainQnsBox">
      <div className="BoxHead">
        <Typography>
          <b>abcd - 1Questions</b>
        </Typography>
        <Button>
          {" "}
          <EditIcon />
          Edit Details{" "}
        </Button>
      </div>
      <div className="MarksBox">
        <StarBorderOutlinedIcon className="starIconss" />
        <Typography>Max. Section Marks: 4.00</Typography>
      </div>
      {/* <div className="QnsBoxs">
        <div className="MCQBox">
          <Typography sx={{ color: "rgba(0, 0, 0, 0.685)" }}>
            1. This is an MCQ question
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <div className="addingDeleteOptions mt1">
              <Radio
                checked={selectedValue === "a"}
                onChange={handleChangeOption}
                value="a"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 1</Typography>
            </div>

            <div className="addingDeleteOptions">
              <Radio
                checked={selectedValue === "b"}
                onChange={handleChangeOption}
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 2</Typography>
            </div>

            <div className="addingDeleteOptions">
              <Radio
                checked={selectedValue === "c"}
                onChange={handleChangeOption}
                value="c"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 3</Typography>
            </div>

            <div className="addingDeleteOptions">
              <Radio
                checked={selectedValue === "d"}
                onChange={handleChangeOption}
                value="d"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 4</Typography>
            </div>
          </RadioGroup>
          <Typography
            className="noBox"
            style={{ marginTop: "1%", marginLeft: "1%" }}
          >
            +4
          </Typography>
          <div className="AllBtnBox">
            <Box className="mr123">
              {" "}
              <EditIcon />
              <Typography>Edit</Typography>
            </Box>
            <Box>
              <ContentCopyIcon />
              <Typography>Copy</Typography>
            </Box>
            <Box>
              <TextIncreaseRoundedIcon /> <Typography>Edit MArks</Typography>
            </Box>
            <Box>
              <DeleteOutlineRoundedIcon />
              <Typography>Delete</Typography>
            </Box>
          </div>
        </div>
        <div className="MCQBox">
          <Typography sx={{ color: "rgba(0, 0, 0, 0.685)" }}>
            1. This is an MCQ question
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <div className="addingDeleteOptions mt1">
              <Radio
                checked={selectedValue === "a"}
                onChange={handleChangeOption}
                value="a"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 1</Typography>
            </div>

            <div className="addingDeleteOptions">
              <Radio
                checked={selectedValue === "b"}
                onChange={handleChangeOption}
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 2</Typography>
            </div>

            <div className="addingDeleteOptions">
              <Radio
                checked={selectedValue === "c"}
                onChange={handleChangeOption}
                value="c"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 3</Typography>
            </div>

            <div className="addingDeleteOptions">
              <Radio
                checked={selectedValue === "d"}
                onChange={handleChangeOption}
                value="d"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 4</Typography>
            </div>
          </RadioGroup>
          <Typography
            className="noBox"
            style={{ marginTop: "1%", marginLeft: "1%" }}
          >
            +4
          </Typography>
          <div className="AllBtnBox">
            <Box className="mr123">
              {" "}
              <EditIcon />
              <Typography>Edit</Typography>
            </Box>
            <Box>
              <ContentCopyIcon />
              <Typography>Copy</Typography>
            </Box>
            <Box>
              <TextIncreaseRoundedIcon /> <Typography>Edit MArks</Typography>
            </Box>
            <Box>
              <DeleteOutlineRoundedIcon />
              <Typography>Delete</Typography>
            </Box>
          </div>
        </div>
        <div className="MCQBox">
          <Typography sx={{ color: "rgba(0, 0, 0, 0.685)" }}>
            1. This is an MCQ question
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <div className="addingDeleteOptions mt1">
              <Radio
                checked={selectedValue === "a"}
                onChange={handleChangeOption}
                value="a"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 1</Typography>
            </div>

            <div className="addingDeleteOptions">
              <Radio
                checked={selectedValue === "b"}
                onChange={handleChangeOption}
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 2</Typography>
            </div>

            <div className="addingDeleteOptions">
              <Radio
                checked={selectedValue === "c"}
                onChange={handleChangeOption}
                value="c"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 3</Typography>
            </div>

            <div className="addingDeleteOptions">
              <Radio
                checked={selectedValue === "d"}
                onChange={handleChangeOption}
                value="d"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 4</Typography>
            </div>
          </RadioGroup>
          <Typography
            className="noBox"
            style={{ marginTop: "1%", marginLeft: "1%" }}
          >
            +4
          </Typography>
          <div className="AllBtnBox">
            <Box className="mr123">
              {" "}
              <EditIcon />
              <Typography>Edit</Typography>
            </Box>
            <Box>
              <ContentCopyIcon />
              <Typography>Copy</Typography>
            </Box>
            <Box>
              <TextIncreaseRoundedIcon /> <Typography>Edit MArks</Typography>
            </Box>
            <Box>
              <DeleteOutlineRoundedIcon />
              <Typography>Delete</Typography>
            </Box>
          </div>
        </div>
        <div className="MCQBox">
          <Typography sx={{ color: "rgba(0, 0, 0, 0.685)" }}>
            1. This is an MCQ question
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <div className="addingDeleteOptions mt1">
              <Radio
                checked={selectedValue === "a"}
                onChange={handleChangeOption}
                value="a"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 1</Typography>
            </div>

            <div className="addingDeleteOptions">
              <Radio
                checked={selectedValue === "b"}
                onChange={handleChangeOption}
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 2</Typography>
            </div>

            <div className="addingDeleteOptions">
              <Radio
                checked={selectedValue === "c"}
                onChange={handleChangeOption}
                value="c"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 3</Typography>
            </div>

            <div className="addingDeleteOptions">
              <Radio
                checked={selectedValue === "d"}
                onChange={handleChangeOption}
                value="d"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography>Option 4</Typography>
            </div>
          </RadioGroup>
          <Typography
            className="noBox"
            style={{ marginTop: "1%", marginLeft: "1%" }}
          >
            +4
          </Typography>
          <div className="AllBtnBox">
            <Box className="mr123">
              {" "}
              <EditIcon />
              <Typography>Edit</Typography>
            </Box>
            <Box>
              <ContentCopyIcon />
              <Typography>Copy</Typography>
            </Box>
            <Box>
              <TextIncreaseRoundedIcon /> <Typography>Edit MArks</Typography>
            </Box>
            <Box>
              <DeleteOutlineRoundedIcon />
              <Typography>Delete</Typography>
            </Box>
          </div>
        </div>
      </div> */}

      <div className='CReateBox'>
            <img
                style={{marginTop: "2%"}}
                src="https://cms.classplusapp.com/static/media/questionMark.fb6054ee.svg"
                width={100}
                height={100}
                className="gradingImage"
              />
                <Typography className='headofbox'>Let's add questions</Typography>
                <Typography className='paraofbox'>
                    You can use the <span style={{color: "#1a1a1ae3"}}>'Create Questionbs'</span> & <span style={{color: "#1a1a1ae3"}}>'Import Questions'</span> Panel on
                    left to add questions to a section 
                </Typography>
                <Box className="CreateBtnBox">
                    <Typography className='btnqns' onClick={handleClickOpenCQ}> Create Question</Typography>
                    <Typography style={{color: "rgba(71, 71, 71, 0.685)", fontSize: "0.9rem"}}>OR</Typography>
                    <Typography className='btnqns'>Import Questions</Typography>
                </Box>
            </div>
            <BootstrapDialog
            className="PopUP"
            onClose={handleCloseDialogCQ}
            aria-labelledby="customized-dialog-title"
            open={cqopened}
          >
            <DialogTitle
              sx={{ m: 0, p: 2, fontSize: "1rem" }}
              id="customized-dialog-title"
            >
           
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialogCQ}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
                borderBottom: "2px solid #eee"
              }}
            >
              <CloseIcon />
            </IconButton>

            <DialogContent dividers>
              <Box className="NumberBOx">
        <Box>
          <Typography>No of Questions</Typography>
        <TextField
          id="outlined-size-small"
          defaultValue="1"
          size="small"
        />
        </Box>
        <Box>
          <Typography>marks of Question</Typography>
        <TextField
          id="outlined-size-small"
          defaultValue="4"
          size="small"
        />
        </Box>
        </Box>
        
        <Box className="CheckBOx">
      <Checkbox {...label} />
      <Typography>Negative Marks</Typography>
        </Box>

              <Box className="PartialBOx">
                  <Typography>Partial Marking <span className="red">New</span></Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Off</Typography>
        <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>On</Typography>
      </Stack>
              </Box>
              

              <Box className="BulbBox"> 
                <Typography>
                  Now give  mark to your students even if they are partially correct!
                </Typography>
                <a href="#" style={{textDecoration: "none"}}>View Example</a>
              </Box>
            
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                className="AddSectionBtn"
              >
                Create Qns
              </Button>
            </DialogActions>
          </BootstrapDialog>

    </div>
  );
}

export default CreateQNS;
