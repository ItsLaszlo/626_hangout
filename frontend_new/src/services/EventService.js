export async function fetchEvents() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_READ_EVENT_API_URL;

    if (!baseUrl) {
      throw new Error("API URL is not defined in environment variables");
    }

    const res = await fetch(
      //make network request
      `${baseUrl}read_events?city=all`,
      { next: { revalidate: 10 } } // Revalidate once per day
    );
    if (!res.ok) {
      // If request fails HTTP status codes 4xx and 5xx
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
      // Creates a error obj and stops execution and sends error to catch block
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}
// Purpose: server side function to fetch event data from API
