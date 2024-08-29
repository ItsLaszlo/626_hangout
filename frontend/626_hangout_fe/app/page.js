// src/app/page.js

import { Button, Typography, Grid } from '@mui/material';

export default function HomePage() {
  return (
   <Grid container direction="column" alignItems="center" justifyContent="center" style={{  paddingTop: '20px' }}>
      <Grid item>
      <Typography variant="h1" component="h1">
        626 Hangout
      </Typography>
      </Grid>
      <Grid item>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
      </Grid>
   </Grid>

  );
}
