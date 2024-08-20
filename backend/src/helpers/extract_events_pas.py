import logging
# from urllib.parse import urlparse


def extract_events_pas(soup):
    """Extract and clean up event information from BeautifulSoup object for Pasadena"""
    events_div = soup.find('div', class_="tribe-events-calendar-list")

    if not events_div:
        logging.warning("Event section not found.")
        return []

    li_events = events_div.find_all(class_='tribe-events-calendar-list__event-details')
    events = []
    #TODO:map for replaceable characters
    for event in li_events:
        # clean date
        date_string = event.find(class_='tribe-event-date-start').text.strip()
        cleaned_date = date_string.replace('\xa0', ' ').replace('\u2009', ' ')
        location = event.find(class_='tribe-events-calendar-list__event-venue-address').text.strip() if event.find(class_='tribe-events-calendar-list__event-venue-address') else ''

        event_info = {
            'title': event.find('h3').text.strip(),
            'date': cleaned_date,
            'description':event.find('p').text.strip(),
            'location': location,
            'city': 'Pasadena',
            'url': event.find('a').get('href')
        }
        events.append(event_info)

    return events

# def parse_url(url):
#     parsed_url = urlparse(url)
#     # Extract the domain
#     domain = f"{parsed_url.scheme}://{parsed_url.netloc}"
#     return domain