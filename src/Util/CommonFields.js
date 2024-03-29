import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";

export const commonTextField =({className,inputClassName,labels},Option={
  sx:{},handleInput:()=>{}, value:'',
  type:""
})=>{
  const {sx,handleInput,type,value} = Option;
  return(
    <TextField
    inputProps={{ className: inputClassName }}
    fullWidth
    size="small"
    placeholder={labels}
    id="fullWidth"
    sx={sx}
    className={className}
    value={value}
    onChange={(event)=> {
      console.log("value  event",value, event);
      handleInput(event.target.value,type)}}
  />
  )
}
export const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}
export const commonSelect =({placeholder,menuItemList,className},Option={handleInput:()=>{},categoryValue:{},type:""})=>{
  const{handleInput,categoryValue,type} = Option;
  return(
    <Select
    displayEmpty
    size="small"
    renderValue={() => {
      return <em className={className}>{categoryValue?categoryValue.label:placeholder}</em>;
    }}
    inputProps={{ "aria-label": "Without label" }}
    value={categoryValue?.label}
    onChange={(event)=> handleInput(event.target.value,type)}
  >
   {menuItemList.map(menu=><MenuItem value={menu}>{menu.label}</MenuItem>)} 
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