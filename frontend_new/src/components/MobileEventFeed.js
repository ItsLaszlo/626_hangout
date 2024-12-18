"use client";

import { useState } from "react";
import { EventCard } from "./EventCard";
import CityFilter from "./CityFilter";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import AdBanner from "./AdBanner";

// New component to handle mobile feed with interleaved ads
const MobileEventFeed = ({ events, ads }) => {
  // Calculate how often to show ads (every 3 events)
  const combinedContent = events.reduce((acc, event, index) => {
    acc.push(<EventCard key={event.url} event={event} />);

    // Insert ad after every 3 events
    if ((index + 1) % 3 === 0 && ads?.[Math.floor(index / 3)]) {
      acc.push(
        <Box key={`ad-${index}`} sx={{ my: 1 }}>
          <AdBanner index={Math.floor(index / 3) + 1} />
        </Box>
      );
    }
    return acc;
  }, []);

  return <>{combinedContent}</>;
};

export default function EventsList({ initialEvents, adColumn }) {
  const [filteredEvents, setFilteredEvents] = useState(initialEvents);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const handleFilterChange = (city) => {
    if (city === "All") {
      setFilteredEvents(initialEvents);
    } else {
      const filtered = initialEvents.filter((event) => event.city === city);
      setFilteredEvents(filtered);
    }
  };

  // Extract ads from adColumn prop - assuming adColumn contains AdBanner components
  const ads = React.Children.toArray(adColumn?.props?.children || []);

  return (
    <Box>
      {/* Header Section*/}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          This month in the 626:
        </Typography>
        <CityFilter onFilterChange={handleFilterChange} />
      </Box>

      {/* Event Section */}
      <Box>
        {filteredEvents.length > 0 ? (
          isMobile ? (
            // Mobile: Events with interleaved ads
            <MobileEventFeed events={filteredEvents} ads={ads} />
          ) : (
            // Desktop: Just events (ads handled by ResponsiveLayout)
            filteredEvents.map((event) => (
              <EventCard key={event.url} event={event} />
            ))
          )
        ) : (
          <Typography variant="h4" sx={{ py: 4 }}>
            No events found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
