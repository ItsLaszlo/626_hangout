import logging
import re
from urllib.parse import urlparse

#TODO: make this reusable for other city pages with similar format
def extract_events_sg(soup, city, city_url):
    """Extract and clean up event information from BeautifulSoup object for Temple City and San Gabriel"""
    event_div = soup.find('div', id=re.compile(r"^CID\d+"), class_="calendar")

    if not event_div:
        logging.warning("Event section not found.")
        return []

    li_events = event_div.find_all('li')
    events = []
    #TODO:map for replaceable characters
    for event in li_events:
        # clean date
        date_string = event.find(class_='date').text.strip()
        cleaned_date = date_string.replace('\xa0', ' ').replace('\u2009', ' ')

        location = event.find(class_='eventLocation').text.strip().replace('@ ', '') if event.find(class_='eventLocation') else ''

        # Handle date parsing if needed
        # Format date and time extraction based on actual data format
        # Example: start_time = datetime.strptime(cleaned_date, "%B %d, %Y, %I:%M %p")

        event_info = {
            'title': event.find('span').text.strip(),
            'date': cleaned_date,
            'description':event.find('p').text.strip(),
            'location': location,
            'city': city,
            'url': f"{parse_url(city_url)}{event.find('a').get('href')}"
        }
        events.append(event_info)

    return events

def parse_url(url):
    parsed_url = urlparse(url)
    # Extract the domain
    domain = f"{parsed_url.scheme}://{parsed_url.netloc}"
    return domain