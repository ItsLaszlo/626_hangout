import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import Link from "next/link";

export function EventCard({ event }) {
  const eventImageUrl = event.image_url
    ? event.image_url
    : `/images/${event.city}.jpg`; // Use default image if event image is not available
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Link href={event.url} passHref legacyBehavior>
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <CardMedia
              component="img"
              image={eventImageUrl}
              // image="/images/mm_logo.jpg"
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
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {event.title}
            </Typography>
          </a>
        </Link>
        <Typography sx={{ mb: 1.5, fontWeight: "bold" }} color="text.secondary">
          {event.date.formatted}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
        <Typography
          sx={{ fontWeight: "bold" }}
          variant="body2"
          color="text.secondary"
        >
          Location: {event.city}
        </Typography>
      </CardContent>
    </Card>
  );
}
