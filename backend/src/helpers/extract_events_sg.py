import logging
import re
from ..helpers.date_formatter import date_formatter
from ..helpers.parse_url import parse_url
def extract_events_sg(soup, city, city_url) -> list:
    """Extract and clean up event information from BeautifulSoup object for Temple City, San Gabriel, and Alhambra"""
    event_div = soup.find('div', id=re.compile(r"^CID\d+"), class_="calendar")

    if not event_div:
        logging.warning("Event section not found.")
        return []

    li_events = event_div.find_all('li')
    events = []
    for event in li_events:
        # clean date
        date_string = event.find(class_='date').text.strip()
        event_date = date_formatter(date_string)
        location = event.find(class_='eventLocation').text.strip().replace('@ ', '') if event.find(class_='eventLocation') else ''
        event_title = event.find('span').text.strip()

        event_info = {
            'title': event_title,
            'date': event_date,
            'description':event.find('p').text.strip(),
            'location': location,
            'city': city,
            'url': f"{parse_url(city_url)}{event.find('a').get('href')}"
        }
        events.append(event_info)

    return events
