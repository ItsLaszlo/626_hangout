import Layout from '../components/layout';
import { fetchEvents } from '../services/EventService';
import { EventCard } from '../components/EventCard';

export default async function EventsPage() {
  let events = [];
  try {
    events = await fetchEvents();
  } catch (error) {
    console.error('Error in EventsPage:', error);
  }

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length > 0 ? (
        events.map((event) => <EventCard key={event.id} event={event} />)
      ) : (
        <p>No events found.</p>
      )}
    </Layout>
  );
}
