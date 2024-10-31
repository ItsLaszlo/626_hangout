import { fetchEvents } from "../services/EventService";
import EventsList from "../components/EventsList";
import SocialsComponent from "../components/SocialsComponent";
import { Typography } from "@mui/material";

export default async function EventsPage() {
  let events = [];
  // Data fetching
  try {
    events = await fetchEvents();
  } catch (error) {
    console.error("Error in EventsPage:", error);
    return (
      <div>
        <Typography variant="h2">Something went wrong</Typography>
        <Typography variant="body1">
          Unable to load events. Please try again later.
        </Typography>
      </div>
    );
  }

  return (
    <>
      <SocialsComponent />
      <EventsList initialEvents={events} />
    </>
  );
}
// Purpose: Fetch data and populate main page with the content
