from abc import ABC, abstractmethod
import logging
import re
from typing import Optional, List, Dict # what is this? Just for typing of output?
from dataclasses import dataclass
from bs4 import BeautifulSoup
import backend.src.helpers.web_scraper_utils as web_scraper_utils
from backend.src.helpers.extract_json import extract_json
from backend.config.formatted_url_config import get_city_urls_formatted

@dataclass
class EventInfo:
    title: str
    date: str
    time: str
    description: str
    location: str
    city: str
    url: str
    image_url: str

class BaseCityScraper(ABC):
    def __init__(self, home_url: str):
        self.home_url = home_url # what is home url? url city event list

    @abstractmethod
    def extract_events_list(self, parsed_html: BeautifulSoup) -> List[Dict]:
        """Extract list of events with their URLs from the main page"""
        pass

    @abstractmethod
    def extract_event_details(self, event_page_html: BeautifulSoup, event_url: str) -> EventInfo:
        """Extract information from individual event page"""
        pass

    def scrape_event_page(self, event_url: str) -> BeautifulSoup:
        """Fetch and parse individual event page"""
        event_html_text = web_scraper_utils.fetch_html_content(event_url)
        return web_scraper_utils.parse_html_content(event_html_text)

    def get_events(self, parsed_html: BeautifulSoup) -> List[EventInfo]:
        """Main method to get all events for a city"""
        events = []
        event_list = self.extract_events_list(parsed_html)
        
        for event in event_list:
            event_page_html = self.scrape_event_page(event['url'])
            event_info = self.extract_event_details(event_page_html, event['url'])
            events.append(event_info)
        
        return events

class CivicPlusScraper(BaseCityScraper):
    """Scraper for cities using CivicPlus platform (San Gabriel, Temple, Alhambra)"""
    
    def __init__(self, home_url: str, city_name: str):
        super().__init__(home_url) 
        #???? what is super?
        self.city_name = city_name

    def extract_events_list(self, parsed_html: BeautifulSoup) -> List[Dict]:
        event_div = parsed_html.find('div', id=re.compile(r"^CID\d+"), class_="calendar")
        if not event_div:
            logging.warning(f"Event section not found for {self.city_name}")
            return []

        events = []
        for event in event_div.find_all('li'):
            events.append({
                'title': event.find('span').text.strip(),
                'url': f"{self.home_url}{event.find('a').get('href')}"
            })
        return events

    def extract_event_details(self, event_page_html: BeautifulSoup, event_url: str) -> EventInfo:
        details = event_page_html.find('div', class_='detailSpecifics') # RENAME: location details
        description = event_page_html.find('div', {'itemprop': 'description'})
        
        # Extract location and time
        venue_name = details.find('div', attrs={"itemprop": "name"})
        venue_address = details.find('div', attrs={"itemprop": "address"})
        date_element = details.find('div', id="ctl00_ctl00_MainContent_ModuleContent_ctl00_ctl04_dateDiv")
        time_element = details.find('div', id="ctl00_ctl00_MainContent_ModuleContent_ctl00_ctl04_time")
        
        # Get image URL based on city-specific patterns
        image_url = self._get_image_url(event_page_html)

        return EventInfo(
            title=event_page_html.find('h1').text.strip(),
            date=date_element.text.strip() if date_element else '',
            time=time_element.find('div', class_='specificDetailItem').text.strip() if time_element else '',
            description=description.text.strip() if description else '',
            location=f"{venue_name.text.strip() if venue_name else ''}, {venue_address.text.strip() if venue_address else ''}",
            city=self.city_name,
            url=event_url,
            image_url=f"{self.home_url}{image_url}" if image_url else ''
        )

    def _get_image_url(self, event_page_html: BeautifulSoup) -> str:
        """Extract image URL using different patterns based on city"""
        if self.city_name == "Alhambra":
            image_div = event_page_html.find('div', attrs={'itemprop': 'description'})
            if not image_div:
                image_div = event_page_html.find('div', class_='specificDetailImage')
        else:
            image_div = event_page_html.find('div', class_='specificDetailImage')

        if image_div:
            img_tag = image_div.find('img')
            return img_tag['src'] if img_tag and 'src' in img_tag.attrs else ''
        return ''

class PasadenaScraper(BaseCityScraper):
    """Scraper for Pasadena's unique layout"""
    
    def extract_events_list(self, parsed_html: BeautifulSoup) -> List[Dict]:
        events_div = parsed_html.find('div', class_="tribe-events-calendar-list")
        if not events_div:
            logging.warning("Event section not found for Pasadena")
            return []

        events = []
        for event in events_div.find_all(class_='tribe-events-calendar-list__event-details'):
            title_element = event.find('h3')
            events.append({
                'title': title_element.text.strip(),
                'url': title_element.find('a').get('href')
            })
        return events

    def extract_event_details(self, event_page_html: BeautifulSoup, event_url: str) -> EventInfo:
        description = event_page_html.find(class_='tribe-events-single-event-description tribe-events-content')
        details = event_page_html.find('div', class_='tribe-events-meta-group tribe-events-meta-group-details')
        #DATE DETAILS ^

        # Extract location
        venue = event_page_html.find('dd', class_='tribe-venue')
        address = event_page_html.find('address', class_='tribe-events-address')
        location = f"{venue.text.strip() if venue else ''}\n{address.text.strip() if address else ''}"
        clean_location = re.sub(r',\s*CA.*$', '', location, flags=re.DOTALL).strip()

        # Extract image
        image_div = event_page_html.find('div', class_='tribe-events-event-image')
        image_url = ''
        if image_div:
            img_tag = image_div.find('img')
            image_url = img_tag['src'] if img_tag and 'src' in img_tag.attrs else ''
        print('\n***pasadena TITLE NAME CORRECT? \n',event_page_html.find('h1').text.strip())
        #HERE ^
        return EventInfo(
            title=event_page_html.find('h1').text.strip(), #prob wrong actually is 'h3'
            date=details.find('abbr', class_='tribe-events-abbr tribe-events-start-date published dtstart').text.strip(),
            time=details.find('div', class_='tribe-events-start-time').text.strip(),
            description=description.text.strip() if description else '',
            location=clean_location,
            city='Pasadena',
            url=event_url,
            image_url=image_url
        )

def get_city_scraper(city_name: str, city_urls: Dict[str, str]) -> BaseCityScraper:
    """Factory function to get appropriate scraper for each city"""
    if city_name == 'pasadena':
        return PasadenaScraper(city_urls[city_name])
    else:
        return CivicPlusScraper(city_urls[city_name], city_name.replace('_', ' ').title())

def scrape_city_events(city_name: str) -> List[EventInfo]:
    """Main function to scrape events for a specific city or all cities"""
    city_urls = extract_json()
    
    def scrape_single_city(city: str) -> List[EventInfo]:
        scraper = get_city_scraper(city, city_urls)
        city_html = web_scraper_utils.parse_html_content(
            web_scraper_utils.fetch_html_content(get_city_urls_formatted(city))
        )
        return scraper.get_events(city_html)

    if city_name == 'all':
        all_events = []
        for city in city_urls:
            if city != 'all':
                all_events.extend(scrape_single_city(city))
        return sorted(all_events, key=lambda x: x.date)
    else:
        return scrape_single_city(city_name)