'use client';
import { useFetchData } from '../hooks/useFetchData';
import CustomAppBar from '../components/AppBar';
import EventCard from '../components/EventCard';
//import CityLegend from '../components/CityLegend';
import {Typography, Grid} from '@mui/material';

export default function HomePage() {
    const { data, error } = useFetchData({ city: 'pasadena' });

  return (
  <>  {/* ToDO: Look into </React.Fragment>*/}
    <CustomAppBar />

     <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          paddingTop: '20px',
          paddingLeft: '20px', // Add left padding to create buffer
          paddingRight: '20px', // Add right padding to create buffer
          paddingBottom: '20px' // Add bottom padding to create buffer
        }}
      >
      <Grid item>
                 <Typography variant="h4">~Upcoming Events~</Typography>
            </Grid>
      {/*  <CityLegend /> */}
      {error && (
        <Grid item>
            <Typography variant="body1" color="error">Error: {error}</Typography>
        </Grid>
      )}
      {!error && data ? (
        <>

            <Grid container spacing={2} justifyContent="center">
              {data.map((event, index) => (
                <Grid item key={index} style={{ width: '100%' }}>
                  <EventCard event={event} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Grid item>
            <Typography variant="body1">Loading...</Typography>
          </Grid>

      )}
    </Grid>
    </>
  );
}
