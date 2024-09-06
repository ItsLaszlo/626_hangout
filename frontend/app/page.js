'use client';
import { useFetchData } from '../hooks/useFetchData';
import CustomAppBar from '../components/AppBar';
import EventCard from '../components/EventCard';
//import CityLegend from '../components/CityLegend';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; //ToDO: implement Gridv2

export default function HomePage() {
    const { data, error } = useFetchData({ city: 'all' });

  return (
  <>  {/* ToDO: Look into </React.Fragment>*/}
  <div style={{ backgroundColor: '#C9C5C5', height: '100vh' }}>  // ToDO: figure out color scheme. Too bright rn
    <CustomAppBar />

     <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          paddingTop: '20px',
          paddingLeft: '20px', // Add left padding to create buffers
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
            <Typography variant="body1">Loading...</Typography> // ToDo: Loading ends after failed
          </Grid> 

      )}
    </Grid>
    </div>
    </>
  );
}
