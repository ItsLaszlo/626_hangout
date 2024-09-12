import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const EventCarousel = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 40000); // 40 seconds

    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index) => {
    // Add some kind of fade to next event
    setCurrentIndex(index);
  };

  const currentEvent = events[currentIndex];

  return (
    <Card
      sx={{
        minWidth: '100%',
        maxHeight: '300px',
        m: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box
        sx={{
          border: '8px solid #24201F',
          width: '75%',
        }}
      >
        <CardMedia
          component="img"
          image="/626_4.jpg"
          alt="626 Hangout"
          sx={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: '#24201F',
          width: '35%',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between', // Ensures space between top and bottom items
            // height: '100%', // Full height to align top and bottom content
            p: 1.5,
            textAlign: 'left',
            color: 'white',
          }}
        >
          <Typography variant="h5" component="div">
            {currentEvent.title}
          </Typography>
          <Typography variant="body2" color="white">
            {currentEvent.date} | {currentEvent.time}
          </Typography>

          <Box
            sx={{
              mt: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {/* ToDO: Pull this out to it's own component? */}
            <Box
              sx={{
                width: '100%',
                height: '4px',
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#E6DED1',
              }}
            />
            <Typography variant="body2" color="white">
              {currentEvent.location}{' '}
              {/*ToDO: fix location to default to city  */}
            </Typography>
            <Box
              sx={{
                bottom: 16,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              {events.map((_, index) => (
                <FiberManualRecordIcon
                  key={index}
                  onClick={() => handleDotClick(index)}
                  sx={{
                    fontSize: 12,
                    color: index === currentIndex ? 'red' : 'white',
                    cursor: 'pointer',
                    '&:hover': { color: 'red' },
                  }}
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default EventCarousel;
