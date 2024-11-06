"use client";

import { useState } from "react";
import { EventCard } from "./EventCard";
import CityFilter from "./CityFilter";
import { Box, Typography } from "@mui/material";

export default function EventsList({ initialEvents }) {
  // manage filtered events state
  const [filteredEvents, setFilteredEvents] = useState(initialEvents);

  const handleFilterChange = (city) => {
    // updates state based on selected city
    if (city === "All") {
      setFilteredEvents(initialEvents);
    } else {
      const filtered = initialEvents.filter((event) => event.city === city);
      setFilteredEvents(filtered);
    }
  };

  return (
    // Renders:
    <Box>
      {/* Header Section*/}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3">This month in the 626:</Typography>
        <CityFilter onFilterChange={handleFilterChange} />
      </Box>

      {/* Event Section */}
      <Box>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.url} event={event} />
          ))
        ) : (
          <Typography variant="h4" sx={{ py: 4 }}>
            No events found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
// Purpose: Parent component/container that displays event-related components
// - Handles filer logic based on cityselection
