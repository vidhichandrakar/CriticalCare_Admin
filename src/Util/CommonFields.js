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

export const commonSelect =({placeholder,menuItemList,className},Option={handleInput:()=>{},categoryValue:''})=>{
  const{handleInput,categoryValue} = Option;
  console.log("categoryValue",categoryValue);
  return(
    <Select
    displayEmpty
    size="small"
    renderValue={() => {
      return <em className={className}>{categoryValue?categoryValue:placeholder}</em>;
    }}
    inputProps={{ "aria-label": "Without label" }}
    value={categoryValue}
    onChange={(event)=> handleInput(event.target.value,"category")}
  >
   {menuItemList.map(menu=><MenuItem value={menu.label}>{menu.label}</MenuItem>)} 
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