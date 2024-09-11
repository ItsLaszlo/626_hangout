import { format, parseISO } from 'date-fns';
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// Mapping of cities to colors
const cityColors = { // ToDo: make key type consistent
  Pasadena: '#00275D',
  Alhambra: '#92721B',
  San_Gabriel: '#E05000',
  Temple: '#C53469',
};

const EventCard = ({ event }) => {

  const cityColor = cityColors[event.city]
  const safeParseDate = (dateString) => {
    if (!dateString) return new Date();
    try {
      return parseISO(dateString);
    } catch (error) {
      console.error('Error parsing date:', error);
      return new Date();
    }
  };

const getLocationDisplay = () => {
  let cityName = event.city
   if (cityName === 'san_gabriel') {
      cityName = 'San Gabriel';
    }
  if (event?.location && event.location.trim() !== '') {
    if (event.city && !event.location.includes(cityName)) {
      // Append the city to the location if it's not already present
      return `${event.location}, ${cityName}`;
    }
    return event.location;
  } else if (event?.city) {
    return `${cityName} City`;
  } else {
    return 'Location TBA';
  }
};

  const startDate = safeParseDate(event?.startDate);
  const endDate = safeParseDate(event?.endDate);

  const formatDate = (date) => format(date, 'MMMM d');
  const formatTime = (date) => format(date, 'h:mm a');

  const dateString = formatDate(startDate);
  const timeString = `${formatTime(startDate)} - ${formatTime(endDate)}`;

  return (
    <Card
      sx={{
        display: 'flex',
        width: '100%',
        height: '125px',
        bgcolor: '#2D3A3A',
        color: 'white',
        mb: 2,
        overflow: 'visible'
      }}
    >
      {/* Event Details Section */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '70%'}}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mt:-2 }}>
          {event.title}
        </Typography>
        <Typography variant="caption">
          {event.description}
        </Typography>
      </CardContent>


      {/* Date and Location Section */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between', // Ensures space between top and bottom items
          height: '100%', // Full height to align top and bottom content
          p: .4, 
          textAlign: 'right',
          width:'20%'
        }}
      >
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="body2">{dateString}</Typography>
        <Typography variant="body2">{timeString}</Typography>
      </Box>
      <Box sx={{ textAlign: 'right', mt: 'auto' }}>
        <Typography variant="body2">{getLocationDisplay()}</Typography>
      </Box>
      </Box>
      
      {/* Divider */}
      <Box
        sx={{
          width: '4px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#E6DED1'
        }}
      />

    <Box sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '150px', // Take full width of the parent container
    p: 1, // Add padding around the button
  }}>
    <Button
      variant="contained"
      href={event.url}
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: cityColor,
        color: 'white',
        borderRadius: 0,
        border: '1px solid #E6DED1',
        p: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          bgcolor: cityColor,
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <OpenInNewIcon sx={{ fontSize: 60, alignItems:'center' }} />
        <Typography variant="button" sx={{ textAlign: 'center', mt: 1 }}>
          MORE INFO
        </Typography>
      </Box>
    </Button>
  </Box>
    </Card>
  );
};

export default EventCard;
