import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';


const SocialCard = () => {

  
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, color: '#8B0000' }}>Community Socials</Typography>

    <Card
      sx={{
        display: 'flex',
        width: '100%',
        height: '125px',
        bgcolor: '#24201F',
        color: 'white',
        mb: 2,
        overflow: 'clip',
        justifyContent:'center'
      }}
      >
      {/* Event Details Section */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70%', justifyContent: 'center'}}>
        <Typography variant='h3' component='div' sx={{ fontWeight: 'bold', mt:-2 , textAlign: 'center'}}>
          <a href='https://www.reddit.com/r/sgv/'>
            r/sgv
            </a>
        </Typography>
      </CardContent>


    </Card>
      </Box>
  );
};

export default SocialCard;
