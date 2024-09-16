import logging
import re
from backend.src.helpers.date_formatter import date_formatter
from backend.config.formatted_url_config import get_city_urls_formatted
import backend.src.helpers.web_scraper_utils as web_scraper_utils
from backend.src.helpers.extract_json import extract_json


def scrape_events_san_gabriel(parsed_html: 'BeautifulSoup', city: str, home_url) -> list:
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


def scrape_events_temple(parsed_html: 'BeautifulSoup', home_url: str) -> list:
    return scrape_events_san_gabriel(parsed_html, 'Temple', home_url)


def scrape_events_alhambra(parsed_html: 'BeautifulSoup', home_url: str) -> list:
    return scrape_events_san_gabriel(parsed_html, 'Alhambra', home_url)


def scrape_events_pasadena(parsed_html: 'BeautifulSoup') -> list:
    """Extract and clean up event information from BeautifulSoup object for Pasadena"""
    events_div = parsed_html.find('div', class_="tribe-events-calendar-list")
    if not events_div:
        logging.warning("Event section not found.")
        return []

    li_events = events_div.find_all(class_='tribe-events-calendar-list__event-details')
    events = []

    for event in li_events:
        # clean date
        date_string = event.find(class_='tribe-event-date-start').text.strip()
        event_date = date_formatter(date_string)

        location = event.find(class_='tribe-events-calendar-list__event-venue-address').text.strip() if event.find(class_='tribe-events-calendar-list__event-venue-address') else ''
        clean_location = location.replace(', CA, United States', '').strip()
        event_title = event.find('h3')

        event_info = {
            'title': event_title.text.strip(),
            'date': event_date,
            'description': event.find('p').text.strip(),
            'location': clean_location,
            'city': 'Pasadena',
            'url': event_title.find('a').get('href')
        }
        events.append(event_info)

    return events


def scrape_city_events(city_name: str) -> list: # ToDo: organize events by date earliest -latest
    """Scrape <city> site for events happening this month."""
    city_urls = extract_json()

    def process_city(city_name_to_process: str) -> 'BeautifulSoup':
        city_url = get_city_urls_formatted(city_name_to_process)
        city_html_text = web_scraper_utils.fetch_html_content(city_url)
        city_html_soup = web_scraper_utils.parse_html_content(city_html_text)
        return city_html_soup

    if city_name == 'pasadena':
        parsed_html = process_city(city_name)
        return scrape_events_pasadena(parsed_html)
    elif city_name == 'san_gabriel':
        parsed_html = process_city(city_name)
        return scrape_events_san_gabriel(parsed_html, 'San Gabriel', city_urls[city_name])
    elif city_name == 'alhambra':
        parsed_html = process_city(city_name)
        return scrape_events_alhambra(parsed_html, city_urls[city_name])
    elif city_name == 'temple':
        parsed_html = process_city(city_name)
        return scrape_events_temple(parsed_html, city_urls[city_name])
    elif city_name == 'all':
        all_events = []
        extraction_functions = {
            'pasadena': scrape_events_pasadena,
            'san_gabriel': scrape_events_san_gabriel,
            'alhambra': scrape_events_alhambra,
            'temple': scrape_events_temple
        }
        for city in city_urls:
            if city == 'all':
                continue

            parsed_html = process_city(city)
            if city in extraction_functions:
                extraction_func = extraction_functions[city]
                if city == 'pasadena':
                    events = extraction_func(parsed_html)
                elif city == 'san_gabriel':
                    events = extraction_func(parsed_html, city, city_urls[city])
                else:  # alhambra and temple
                    events = extraction_func(parsed_html, city_urls[city])
                all_events.extend(events)  # ToDo:  optimize

        return all_events
