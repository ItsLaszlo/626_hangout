'use client';

import { useState } from 'react';
import { EventCard } from './EventCard';
import CityFilter from './CityFilter';

export default function EventsList({ initialEvents }) {
  const [filteredEvents, setFilteredEvents] = useState(initialEvents);

  const handleFilterChange = (city) => {
    if (city === 'All') {
      setFilteredEvents(initialEvents);
    } else {
      const filtered = initialEvents.filter((event) => event.city === city);
      setFilteredEvents(filtered);
    }
  };

  return (
    <>
      <CityFilter onFilterChange={handleFilterChange} />
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))
      ) : (
        <p>No events found.</p>
      )}
    </>
  );
}
