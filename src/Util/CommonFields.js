import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";

export const commonTextField =({className,inputClassName,labels},Option={
  sx:{},handleInput:()=>{}
})=>{
  const {sx,handleInput} = Option;
  return(
    <TextField
    inputProps={{ className: inputClassName }}
    fullWidth
    size="small"
    placeholder={labels}
    id="fullWidth"
    sx={sx}
    className={className}
    onChange={(event)=> handleInput(event.target.value,"name")}
  />
  )
}

export const commonSelect =({placeholder,menuItemList,className})=>{
  return(
    <Select
    displayEmpty
    size="small"
    renderValue={() => {
      return <em className={className}>{placeholder}</em>;
    }}
    inputProps={{ "aria-label": "Without label" }}
  >
   {menuItemList.map(menu=><MenuItem value={menu.id}>{menu.label}</MenuItem>)} 
  </Select>
  )
}

export const CommonTypography =({fontWeight,sx,label},Option={className:""})=>{
  const {className} = Option;
  return( <Typography fontWeight={fontWeight} sx={sx} className={className}>
  {label}
</Typography>)
}

export const commonButton =({handleTrackerPage,className,label})=>{
  return (
    <Button
    variant="contained"
    className={className}
    onClick={handleTrackerPage}
  >
    {label}
  </Button>
  )
}