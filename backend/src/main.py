from helpers.fetch_html import fetch_html
from helpers.parse_html import parse_html
from helpers.extract_events_sg import extract_events_sg
import logging


def main():
    """Main function to fetch, parse, and extract event data."""
    # Fetch the HTML content
    san_gabriel_url = 'https://www.sangabrielcity.com/calendar.aspx?CID=20&showPastEvents=true'
    # san_gabriel_url = 'https://www.sangabrielcity.com/calendar.aspx?CID=20'
    html_text = fetch_html(san_gabriel_url)

    # Parse html
    html_soup = parse_html(html_text)
    event_list = extract_events_sg(html_soup)


    print(event_list[0])


if __name__ == "__main__":
    logging.basicConfig(filename='../logs/project.log', level=logging.INFO)
    main()

# San Gabriel events
