import logging
import re
from backend.src.helpers.date_formatter import date_formatter


def extract_events_san_gabriel(parsed_html: 'BeautifulSoup', city:str, home_url) -> list:
    """Extract and clean up event information from BeautifulSoup object for Temple City, San Gabriel, and Alhambra"""

    event_div = parsed_html.find('div', id=re.compile(r"^CID\d+"), class_="calendar")
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
            'url': f"{home_url}{event.find('a').get('href')}"
        }
        events.append(event_info)

    return events

def extract_events_temple(parsed_html:'BeautifulSoup', home_url:str) -> list: #ToDO: fix parsed_html type it is BeautifulSoup Obj
    return extract_events_san_gabriel(parsed_html, 'temple', home_url)

def extract_events_alhambra(parsed_html: 'BeautifulSoup', home_url:str) -> list:
    return extract_events_san_gabriel(parsed_html, 'alhambra', home_url )

def extract_events_pasadena(parsed_html: 'BeautifulSoup') -> list:
    """Extract and clean up event information from BeautifulSoup object for Pasadena"""
    events_div = parsed_html.find('div', class_="tribe-events-calendar-list")
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


