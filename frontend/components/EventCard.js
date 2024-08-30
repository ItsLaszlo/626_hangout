import { format } from 'date-fns'; //ToDo: Format dates
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

// Mapping of cities to colors
const cityColors = { // ToDo: make key type consistent
  Pasadena: '#00275D',
  Alhambra: '#92721B',
  San_Gabriel: '#E05000',
  Temple: '#C53469',
};

const EventCard = ({ event }) => {
  const barColor = cityColors[event.city]

  return (
    <Card
      variant="outlined"
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
        width: '100%',
        padding: '16px',
        boxSizing: 'border-box',
        position: 'relative',
        paddingLeft: '60px', // Add padding to make space for the bar
      }}
    >
      {/* Left Colored Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40px',
          height: '100%',
          backgroundColor: barColor,
        }}
      />

      {/* Date Section */}
      <CardContent style={{ flex: '0 0 150px' }}>
        <Typography variant="body1" component="p" style={{ fontWeight: 'bold' }}>
          {event.date}
        </Typography>
      </CardContent>

      {/* Event Details Section */}
      <CardContent style={{ flex: '1 1 auto', padding: '16px' }}>
        <Typography variant="h6" component="h2" style={{ fontWeight: 'bold' }}>
          {event.title}
        </Typography>
        <Typography variant="body2" component="p">
          {event.description}
        </Typography>
        <Typography variant="body2" style={{ fontWeight: 'bold' }} display="inline">
          Location:
        </Typography>
        <Typography variant="body2" component="span" display="inline">
          {event.location || "N/A; Click on [More Info] -->"}
        </Typography>
      </CardContent>

      {/* External Link Section */}
      <CardContent style={{ flex: '0 0 150px', textAlign: 'right' }}>
        <Button variant="contained" color="primary" href={event.url} target="_blank">
         <Typography variant="button" style={{ fontWeight: 'bold' }}>
            More Info
         </Typography>
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
