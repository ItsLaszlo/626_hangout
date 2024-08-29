import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const CustomAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          626 Hangout
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
