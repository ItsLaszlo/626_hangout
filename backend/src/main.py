from helpers.fetch_html import fetch_html
from helpers.parse_html import parse_html
from helpers.extract_events_sg import extract_events_sg
import logging


def main():
    """Main function to fetch, parse, and extract event data."""
    # Fetch the HTML content
    san_gabriel_url = ['San Gabriel','https://www.sangabrielcity.com/calendar.aspx?CID=20']
    temple_url = ['Temple','https://www.ci.temple-city.ca.us/calendar.aspx?CID=23&Keywords=&startDate=&enddate=&']
# Dates range with events
    # san_gabriel_url = ['San Gabriel','https://www.sangabrielcity.com/calendar.aspx?Keywords=&startDate=07/01/2024&enddate=08/31/2024&CID=20&showPastEvents=true']
    # temple_url = ['Temple','https://www.ci.temple-city.ca.us/calendar.aspx?Keywords=&startDate=07/01/2024&enddate=08/31/2024&CID=23&showPastEvents=true']
    city_urls = [san_gabriel_url,temple_url]
    city_events = {}
    for city,url in city_urls:
        print('city url:\n',city)
        html_text = fetch_html(url)
        # Parse html
        html_soup = parse_html(html_text)
        #extract event info from parsed html
        event_list = extract_events_sg(html_soup,city,url)
        city_events [city] = event_list
    # print(city_events.keys())
    # print(city_events)



if __name__ == "__main__":
    logging.basicConfig(filename='logs/project.log', level=logging.INFO)
    #TODO:look up cpu usage
    main()

# San Gabriel events
