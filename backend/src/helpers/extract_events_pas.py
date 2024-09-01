import logging
from ..helpers.date_formatter import date_formatter

def extract_events_pas(soup) -> list:
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
        event_date = date_formatter(date_string)

        location = event.find(class_='tribe-events-calendar-list__event-venue-address').text.strip() if event.find(class_='tribe-events-calendar-list__event-venue-address') else ''
        event_title = event.find('h3')

        event_info = {
            'title': event_title.text.strip(),
            'date': event_date,
            'description':event.find('p').text.strip(),
            'location': location,
            'city': 'Pasadena',
            'url': event_title.find('a').get('href')
        }
        events.append(event_info)

    return events

