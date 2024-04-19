import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

const SearchBar = ({mt, placeholder}) => {
  const [searchBarValue, setSearchBarValue] = useState("")
  const handlechangeSearchbar = (event) => {
    const Events = event.target.value
    if(Events.length >= 4){
      setSearchBarValue(Events)
      console.log(Events)
    }
  }
  return (
    
      
     <FormControl sx={{width: '23%', mt: mt,}} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            startAdornment={<InputAdornment sx={{mr:1}}><SearchIcon/></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight', 
            }}
            // sx={{ borderRadius: 30 }}
            className= "searchBar"
            placeholder= {placeholder}
            onChange={handlechangeSearchbar}
          />
          </FormControl>
    
   
  );
};

export default SearchBar;
