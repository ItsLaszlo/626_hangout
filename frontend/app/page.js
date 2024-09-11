'use client';
import { useFetchData } from '../hooks/useFetchData';
import CustomAppBar from '../components/AppBar';
import EventCard from '../components/EventCard';
import EventListContainer from '../components/EventList';
import EventCarousel from '../components/EventCarousel';
//import CityLegend from '../components/CityLegend';
import { Typography, Grid } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2'; //ToDO: implement Gridv2
// {/* //ToDO: Look into </React.Fragment> */}
export default function HomePage() {
    const { data, error } = useFetchData({ 'city': 'all' });

  return (
  <>  
  
  <div style={{ backgroundColor: '#E6DED1', height: '100%'}}> 
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
      {!error && data ? (
        <>
            <Grid container m='auto' justifyContent="center">
            <EventCarousel events= {Object.values(data).slice(0, 4)}/>
            </Grid>
            
            <Grid container spacing={2} justifyContent="left">
               <EventListContainer events={data} />
            </Grid>
          </>
        ) : (
          <Grid item>
            <Typography variant="body1">Loading...</Typography> 
            {/* ToDo: Account for failing to Load */}
          </Grid> 

      )}
    </Grid>
    </div>
    </>
  );
}
