'use client';
import { useFetchData } from '../hooks/useFetchData';
import CustomAppBar from '../components/AppBar';
import EventCard from '../components/EventCard';
import {Typography, Grid} from '@mui/material';


export default function HomePage() {
    const { data, error } = useFetchData({ city: 'pasadena' });

  return (
  <>  {/* ToDO: Look into </React.Fragment>*/}
    <CustomAppBar />
    <Grid container direction="column" alignItems="center" justifyContent="center" style={{ paddingTop: '20px' }}>
      {error && (
        <Grid item>
            <Typography variant="body1" color="error">Error: {error}</Typography>
        </Grid>
      )}
      {!error && data ? (
        <>
            <Grid item>
                 <Typography variant="h4">Events</Typography>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
              {data.map((event, index) => (
                <Grid item key={index}>
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
