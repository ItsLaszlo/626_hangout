"use client";

import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const cities = ["All", "Alhambra", "Pasadena", "Temple", "San Gabriel"]; // Available cities

export default function CityFilter({ onFilterChange }) {
  const [selectedCity, setSelectedCity] = useState("All"); // local state

  const handleChange = (e) => {
    // handle selecting city
    const city = e.target.value;
    setSelectedCity(city); // set city in filter
    onFilterChange(city); // filter events by city specified
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="city-filter-label">Filter by city</InputLabel>
      <Select
        labelId="city-filter-label"
        id="city-filter"
        value={selectedCity}
        label="Filter by city"
        onChange={handleChange}
        sx={{
          "& .MuiSelect-select": {
            color: "text.secondary",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: (theme) => ({
              "& .MuiMenuItem-root": {
                color: "text.secondary",
              },
              "& .MuiMenuItem-root.Mui-selected": {
                bgcolor: "text.secondary",
                opacity: 0.2,
              },
              "& .MuiMenuItem-root:hover": {
                backgroundColor: "text.secondary",
                opacity: 0.1,
              },
            }),
          },
        }}
      >
        {cities.map((city) => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
// Purpose: Renders a dropdown of cities to filter events by. Envokes city selection back to parent/EventsList.js
