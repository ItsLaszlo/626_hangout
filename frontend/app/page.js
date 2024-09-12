'use client';
import { useFetchData } from '../hooks/useFetchData';
import CustomAppBar from '../components/AppBar';
import EventCard from '../components/EventCard';
import EventListContainer from '../components/EventList';
import EventCarousel from '../components/EventCarousel';
import SocialCard from '../components/SocialCard';

// {/* //ToDO: Look into </React.Fragment> */}

import { Typography, Grid, Box, Container } from '@mui/material';
export default function HomePage() {
  const { data, error } = useFetchData({ city: 'all' });

  return (
    <>
      <Box sx={{ backgroundColor: '#E6DED1', minHeight: '100vh' }}>
        <CustomAppBar />

        <Container
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            pt: 2,
            pb: 2,
            px: 2,
          }}
        >
          {!error && data ? (
            <>
              <Box container mb={2}>
                <EventCarousel events={Object.values(data).slice(0, 4)} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Box sx={{ flexGrow: 1, mr: { md: 0 } }}>
                  <EventListContainer events={data} />
                </Box>
                {/* Divider */}
                <Box
                  sx={{
                    width: '400 px',
                    height: '100%',
                    alignItems: 'center',
                    bgcolor: '#24201F',
                  }}
                />
                <Box
                  sx={{
                    width: { xs: '100%', md: '20%' },
                    mt: { xs: 2, md: 0 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <SocialCard />
                </Box>
              </Box>
            </>
          ) : (
            <Typography variant="body1">
              {error ? 'Error loading data.' : 'Loading...'}
            </Typography>
          )}
        </Container>
      </Box>
    </>
  );
}
