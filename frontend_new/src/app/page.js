import Layout from '../components/layout';
import { fetchEvents } from '../services/EventService';
import EventsList from '../components/EventsList';
import SocialsComponent from '../components/SocialsComponent';

export default async function EventsPage() {
  let events = [];
  try {
    events = await fetchEvents();
  } catch (error) {
    console.error('Error in EventsPage:', error);
  }

  return (
    <Layout>
      <SocialsComponent />
      <h1>This month in the 626:</h1>
      <EventsList initialEvents={events} />
    </Layout>
  );
}
