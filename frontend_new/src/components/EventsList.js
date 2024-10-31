"use client";

import { useState } from "react";
import { EventCard } from "./EventCard";
import CityFilter from "./CityFilter";
import { Typography } from "@mui/material";

export default function EventsList({ initialEvents }) {
  const [filteredEvents, setFilteredEvents] = useState(initialEvents);

  const handleFilterChange = (city) => {
    if (city === "All") {
      setFilteredEvents(initialEvents);
    } else {
      const filtered = initialEvents.filter((event) => event.city === city);
      setFilteredEvents(filtered);
    }
  };

  return (
    <>
      <Typography variant="h3">This month in the 626:</Typography>
      <CityFilter onFilterChange={handleFilterChange} />
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))
      ) : (
        <Typography variant="h4">No events found.</Typography>
      )}
    </>
  );
}
