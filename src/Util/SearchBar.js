import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { TextField } from "@mui/material";

const SearchBar = ({ mt, placeholder }) => {
  const [searchBarValue, setSearchBarValue] = useState("");
  const handlechangeSearchbar = (event) => {
    const Events = event.target.value;
    if (Events.length >= 4) {
      setSearchBarValue(Events);
    }
  };
  return (
    <FormControl sx={{ width: "23%", mt: mt }} variant="outlined">
      <TextField
        id="outlined-adornment-weight"
        aria-describedby="outlined-weight-helper-text"
        InputProps={{
          "aria-label": "weight",

          startAdornment: (
            <InputAdornment sx={{ mr: 1 }}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        // sx={{ borderRadius: 30 }}
        className="searchBar"
        placeholder={placeholder}
        onChange={handlechangeSearchbar}
      />
    </FormControl>
  );
};

export default SearchBar;
