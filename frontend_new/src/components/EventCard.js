import { Card, CardContent, Typography, CardMedia } from "@mui/material";

export function EventCard({ event }) {
  const eventImageUrl = event.image_url
    ? event.image_url
    : `/images/${event.city}.jpg`;
  // Use default city logo if event image is not available
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <CardMedia
            component="img"
            image={eventImageUrl}
            alt="626 Hangout"
            sx={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              // maxWidth: '100%', // Limit the maximum width to 100%
              // maxHeight: '400px', // Set a maximum height (adjust as needed)
              // objectFit: 'contain', // Maintain aspect ratio
            }}
          />

          {/* Event Title */}
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            {event.title}
          </Typography>
        </a>

        {/* Event Details */}
        <Typography variant="body2" color="text.secondary" sx={{ py: 1.5 }}>
          {event.description}
        </Typography>
        <Typography sx={{ fontWeight: "bold" }} color="text.secondary">
          DATE: {event.date?.formatted || "Not available, check event page"}
        </Typography>
        <Typography
          sx={{ fontWeight: "bold" }}
          variant="body2"
          color="text.secondary"
        >
          LOCATION: {event.city || "Not available, check event page"}
        </Typography>
      </CardContent>
    </Card>
  );
}
// Purpose: Card component to display event info
