import { Box, Button, Typography, Divider } from '@mui/material'
import React, { useState } from 'react'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TextIncreaseRoundedIcon from '@mui/icons-material/TextIncreaseRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';

function CreateQNS() {
    
  const [selectedValue, setSelectedValue] = useState("a");

  const handleChangeOption = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className='MainQnsBox'>
            <div className='BoxHead'>
                <Typography><b>abcd - 1Questions</b></Typography>
                <Button> <EditIcon />Edit Details </Button>
            </div>
            <div className='MarksBox'>
                <StarBorderOutlinedIcon className='starIconss'/> 
                <Typography>Max. Section Marks: 4.00</Typography>
            </div>
            {/* <div className='MCQBox'>
                <Typography sx={{color : "rgba(0, 0, 0, 0.685)"}}>1. This is an MCQ question</Typography>
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
                <Typography className='noBox' style={{marginTop: "1%", marginLeft: "1%"}}>+4</Typography>
                <div className='AllBtnBox'>
                    <Box className="mr123"> <EditIcon /><Typography>Edit</Typography></Box>
                    <Box ><ContentCopyIcon /><Typography>Copy</Typography></Box>
                    <Box><TextIncreaseRoundedIcon /> <Typography>Edit MArks</Typography></Box>
                    <Box><DeleteOutlineRoundedIcon /><Typography>Delete</Typography></Box>
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
                    <Typography className='btnqns'> Create Question</Typography>
                    <Typography style={{color: "rgba(71, 71, 71, 0.685)", fontSize: "0.9rem"}}>OR</Typography>
                    <Typography className='btnqns'>Import Questions</Typography>
                </Box>
            </div>
            
    </div>
  )
}

export default CreateQNS
