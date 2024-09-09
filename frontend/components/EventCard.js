import { format, parseISO } from 'date-fns';
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
        bgcolor: '#2D3A3A',
        color: 'white',
        mb: 2,
        overflow: 'visible'
      }}
    >
      {/* Event Details Section */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {event.title}
        </Typography>
        <Typography variant="body2">
          {event.description}
        </Typography>
      </CardContent>

      {/* Date Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2, textAlign: 'right' }}>
        <Typography variant="body2">{dateString}</Typography>
        <Typography variant="body2">{timeString}</Typography>
        <Typography variant="body2">{getLocationDisplay()}</Typography>

  
      </Box>

      <Button 
        variant="contained" 
        href={event.url}
        sx={{ 
          bgcolor: cityColor, 
          color: 'white',
          borderRadius: 0,
          px: 2,
          '&:hover': {
            bgcolor: cityColor,
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ArrowUpwardIcon sx={{ mr: 1 }} />
          <Typography variant="button">
            MORE INFO
          </Typography>
          
        </Box>
      </Button>
      
    </Card>

    //   {/* <CardContent style={{ flex: '0 0 150px' }}>
    //     <Typography variant="body1" component="p" style={{ fontWeight: 'bold' }}>
    //       {event.date}
    //     </Typography>
    //     <Typography variant="body2" style={{ fontWeight: 'bold' }} display="inline">
    //       Location:
    //     </Typography>
    //     <Typography variant="body2" component="span" display="inline">
    //       {event.location || "N/A; Click on [More Info] -->"}
    //     </Typography>
    //   </CardContent> */}


    //   {/* External Link Section */}
    // //   <CardContent style={{ flex: '0 0 150px', textAlign: 'right' }}>
    // //     <Button variant="contained" color="primary" href={event.url} target="_blank">
    // //      <Typography variant="button" style={{ fontWeight: 'bold' }}>
    // //         More Info
    // //      </Typography>
    // //     </Button>
    // //   </CardContent>
    // // </Card>
  );
};

export default EventCard;
