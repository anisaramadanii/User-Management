import React from "react";
import TextField from "@mui/material/TextField";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <TextField
      label="Search by name or email"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      sx={{ mb: 2 }}
    />
  );
};

export default SearchBar;