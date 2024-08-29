'use client';

import { Button, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchData } from '../utils/api';

export default function HomePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const getData = async () => {
      try {
        const params = { 'city': 'pasadena' }; // Example query parameters
        const result = await fetchData('626_hangout/events', params); // Use query parameters
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Set error message in state
      }
    };
    getData();
  }, []);

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" style={{ paddingTop: '20px' }}>
      <Grid item>
        <Typography variant="h1" component="h1">
          626 Hangout
        </Typography>
      </Grid>
      <Grid item>
        {error ? (
          <Typography variant="body1" color="error">Error: {error}</Typography>
        ) : data ? (
          <Typography variant="body1">Data: {JSON.stringify(data)}</Typography>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary">
          Click Me
        </Button>
      </Grid>
    </Grid>
  );
}
