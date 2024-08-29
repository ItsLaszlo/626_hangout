// src/components/EventCard.js
import { Card, CardContent, Typography, CardActions, Button, CardHeader } from '@mui/material';
import { format } from 'date-fns'; //ToDo: Format dates

const EventCard = ({ event }) => {
  return (
    <Card variant="outlined" style={{ maxWidth: 345, margin: '20px' }}>
      <CardHeader
        title={event.title}
        subheader={event.date}
      />
      <CardContent>
        <Typography variant="h6" component="h2">
          City: {event.city}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {event.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Location: {event.location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={event.url} target="_blank" rel="noopener noreferrer">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
