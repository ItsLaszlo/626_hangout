export async function fetchEvents() {
  try {
    const res = await fetch(
      'http://127.0.0.1:5001/626_hangout/read_events?city=all', // ToDO: use ENV file
      { next: { revalidate: 86400 } } // Revalidate once per day
    );
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}
