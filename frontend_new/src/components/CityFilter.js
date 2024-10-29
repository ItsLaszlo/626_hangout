'use client';

import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const cities = ['All', 'Alhambra', 'Pasadena', 'Temple', 'San Gabriel'];

export default function CityFilter({ onFilterChange }) {
  const [selectedCity, setSelectedCity] = useState('All');
  const theme = useTheme();

  const handleChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    onFilterChange(city);
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
          '& .MuiSelect-select': {
            color: theme.palette.text.secondary,
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              '& .MuiMenuItem-root': {
                color: theme.palette.text.secondary,
              },
              '& .MuiMenuItem-root.Mui-selected': {
                backgroundColor: `${theme.palette.text.secondary}20`,
              },
              '& .MuiMenuItem-root:hover': {
                backgroundColor: `${theme.palette.text.secondary}10`,
              },
            },
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
