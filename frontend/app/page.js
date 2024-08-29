'use client';

import { useEffect, useState } from 'react';
import { fetchData } from '../utils/api';
import CustomAppBar from '../components/AppBar';
import {
    Button,
    Typography,
    Grid,
} from '@mui/material';


export default function HomePage() {
  const [data, setData] = useState(null); // fetched data
  const [error, setError] = useState(null); //error messages

  useEffect(() => { // Hook for data fetching
    const getData = async () => { // fetch data from API
      try {
        const params = { 'city': 'pasadena' }; // query parameters
        const result = await fetchData('626_hangout/events', params); // Use query parameters
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error); //ToDo: Find where this is logging to
        setError(error.message); // Set error message in state
      }
    };
    getData();
  }, []);

  return (
  <>  {/* ToDO: Look into </React.Fragment>*/}
    <CustomAppBar />
    <Grid container direction="column" alignItems="center" justifyContent="center" style={{ paddingTop: '20px' }}>
      <Grid item>
        {error ? (
          <Typography variant="body1" color="error">Error: {error}</Typography>
        ) : data ? (
          <Typography variant="body1">Data: {JSON.stringify(data)}</Typography>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Grid>
    </Grid>
    </>
  );
}
