import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import EventCard from './EventCard';

const EventListContainer = ({ events }) => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      width:'75%',
      textAlign: 'left'
    }}>
      <Typography variant="h5" sx={{ mb: 3, color: '#8B0000' }}>This month in the 626</Typography>
      <Stack sx={{ 
        display: 'flex', 
        flexWrap: 'column',
        justifyContent: 'flex-start'
      }}>
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </Stack>
    </Box>
  );
};

export default EventListContainer;