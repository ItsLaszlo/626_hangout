import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Checkbox } from '@mui/material';

const cityColors = {
  Pasadena: '#00275D',
  Alhambra: '#92721B',
  'San Gabriel': '#E05000',
  'Temple City': '#C53469',
};

const CityLegend = ({ selectedCities, onCityChange }) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: '10px 20px',
        margin: '20px 0',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {Object.entries(cityColors).map(([city, color]) => (
          <Grid item key={city} style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={selectedCities.includes(city)}
              onChange={() => onCityChange(city)}
              style={{ color: color }}
            />
            <Box
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: color,
                marginRight: '10px',
              }}
            />
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              {city}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default CityLegend;
