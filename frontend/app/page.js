'use client';
import { useFetchData } from '../hooks/useFetchData';
import CustomAppBar from '../components/AppBar';
import {
    Button,
    Typography,
    Grid,
} from '@mui/material';


export default function HomePage() {
    const { data, error } = useFetchData({ city: 'pasadena' });

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
