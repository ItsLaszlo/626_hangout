import logging

def extract_events_sg(soup):
    """Extract and clean up event information from BeautifulSoup object."""
    event_div = soup.find('div', id="CID20")
    if not event_div:
        logging.warning("Event section not found.")
        return []

    li_events = event_div.find_all('li')
    events = []

    for event in li_events:
        date_string = event.find(class_='date').text.strip()
        cleaned_date = date_string.replace('\xa0', ' ').replace('\u2009', ' ')

        # Handle date parsing if needed
        # Format date and time extraction based on actual data format
        # Example: start_time = datetime.strptime(cleaned_date, "%B %d, %Y, %I:%M %p")

        event_info = {
            'city': "San Gabriel",
            'title': event.find('span').text.strip(),
            'date': cleaned_date,
            'url': f"https://www.sangabrielcity.com/{event.find('a').get('href')}"
        }
        events.append(event_info)

    return events
