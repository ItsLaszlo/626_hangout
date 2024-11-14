import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Box,
  Modal,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

export function EventCard({ event }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); //check if mobile

  const eventImageUrl = event.image_url
    ? event.image_url
    : `/images/${event.city}.jpg`;
  console.log("event.image_url:", event.image_url, event.city, eventImageUrl);
  const handleCardClick = (e) => {
    // Opens modal on mobile card click or desktop image click
    if (isMobile || e.target.classList.contains("event-image")) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          mb: { xs: 1, sm: 2 },
          width: "100%",
          maxWidth: 800,
          bgcolor: "tertiary.main",
          flexDirection: { xs: "column", sm: "row" }, // xs: mobile sm: talets and bigger
          transition: (theme) =>
            theme.transitions.create(["transform", "box-shadow"], {
              duration: theme.transitions.duration.standard,
            }),
          "&:hover": {
            transform: { xs: "none", sm: "translateY(-4px)" },
            boxShadow: (theme) => theme.shadows[4],
          },
          cursor: { xs: "pointer", sm: "default" },
        }}
        onClick={handleCardClick}
      >
        {/* Image Container */}
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", sm: 300 },
            height: { xs: 150, sm: "auto" },
            overflow: "hidden",
            borderRight: {
              xs: "none",
              sm: (theme) => `1px solid ${theme.palette.divider}`,
            },
            borderBottom: {
              xs: (theme) => `1px solid ${theme.palette.divider}`,
              sm: "none",
            },
            cursor: { xs: "pointer", sm: "zoom-in" }, // Add this line
          }}
        >
          <CardMedia
            component="img"
            className="event-image"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              // transition: "transform 0.3s ease",
            }}
            image={eventImageUrl}
            alt={event.title || "Event image"}
          />
        </Box>
        {/* Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <CardContent
            sx={{
              flex: "1 0 auto",
              p: { xs: 1.5, sm: 3 },
              pb: { xs: 1.5, sm: 0 },
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                mb: { xs: 1, sm: 2 },
                fontSize: { xs: "1rem", sm: "1.5rem" },
              }}
            >
              {event.title}
            </Typography>

            {/* Description - Only show on desktop */}
            {!isMobile && (
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                }}
              >
                {event.description}
              </Typography>
            )}
          </CardContent>

          <Box
            sx={{
              p: { xs: 1.5, sm: 3 },
              pt: { xs: 0, sm: 2 },
            }}
          >
            {/* Date and Location */}
            <Typography
              variant="body2"
              sx={{
                color: "secondary.main",
                fontWeight: "bold",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                mb: { xs: 0, sm: 0.5 },
              }}
            >
              {event.date?.formatted || "Not available"}
            </Typography>

            {/* City - Only show on desktop */}
            {!isMobile && (
              <Typography
                variant="body2"
                sx={{
                  color: "secondary.main",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                {event.location || "Not available"}
              </Typography>
            )}
            {isMobile && (
              <Box
                sx={{
                  display: "flex", // Changed from inline-flex
                  justifyContent: "center", // Add this
                  alignItems: "center",
                  gap: 0.5,
                  color: "secondary.main",
                  fontSize: "0.75rem",
                  width: "100%", // Add this
                  mt: 1, // Optional: adds some margin top
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: "secondary.main",
                  }}
                />
                Tap for details
                <Box // Added second dot
                  component="span"
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: "secondary.main",
                  }}
                />
              </Box>
            )}

            {/* Learn More Button - Only show on desktop */}
            {!isMobile && (
              <Button
                variant="outlined"
                color="secondary"
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: 40,
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                  },
                }}
              >
                Learn More
              </Button>
            )}
          </Box>
        </Box>
      </Card>

      {/* Enhanced Mobile Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "auto",
            maxHeight: "90vh",
            bgcolor: { xs: "background.paper", sm: "transparent" },
            borderRadius: { xs: 1, sm: 0 },
            overflow: "auto",
            outline: "none",
          }}
        >
          {/* Close button for sm */}

          <Box
            onClick={() => setIsModalOpen(false)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              bgcolor: { xs: "white", sm: "rgba(0,0,0,0.5)" },
              color: { xs: "black", sm: "white" },
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            ✕
          </Box>

          {/* Modal Content */}
          <Box
            sx={{
              width: "100%",
              bgcolor: { xs: "black", sm: "transparent" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: { xs: "75%", sm: "100%" }, // Added this Box wrapper
              }}
            >
              <img
                src={eventImageUrl}
                alt={event.title}
                style={{
                  width: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Box>
          </Box>

          {/* Only show event details on mobile */}
          {isMobile && (
            <Box sx={{ p: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                {event.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "secondary.main",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                {event.date?.formatted} • {event.city}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mb: 3,
                }}
              >
                {event.description}
              </Typography>

              <Button
                variant="outlined"
                color="secondary"
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                sx={{
                  borderRadius: 40,
                  borderWidth: 2,
                  py: 1,
                  "&:hover": {
                    borderWidth: 2,
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
