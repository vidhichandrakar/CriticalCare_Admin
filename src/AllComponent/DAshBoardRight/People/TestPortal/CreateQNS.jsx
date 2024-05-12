import { Box, Button, Typography, Divider } from '@mui/material'
import React from 'react'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

function CreateQNS() {
  return (
    <div className='MainQnsBox'>
            <div className='BoxHead'>
                <Typography>abcd - 1Questions</Typography>
                <Button>Edit Details</Button>
            </div>
            <div className='MarksBox'>
                <StarBorderOutlinedIcon /> 
                <Typography>Max. Section MArks: 4.00</Typography>
            </div>
            < Box Divider />
            <div>
                <Typography>1. This is an MCQ question</Typography>
                <ul>
                    <li>Option 1</li>
                    <li>Option 2</li>
                    <li>Option 3</li>
                    <li>Option 4</li>
                </ul>
                <Typography>+4</Typography>
                <div>
                    <Button>Edit</Button>
                    <Button>Copy</Button>
                    <Button>Edit MArks</Button>
                    <Button>Delete</Button>
                </div>
            </div>
            
    </div>
  )
}

export default CreateQNS
