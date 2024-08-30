from flask import Blueprint, jsonify, request
from collections import defaultdict
# import logging

from ..helpers.fetch_html import fetch_html_content
from ..helpers.parse_html import parse_html_content
from ..helpers.extract_events_sg import extract_events_sg
from ..helpers.extract_events_pas import extract_events_pas

# create blueprint for routes
sgv_event_api_bp = Blueprint('sgv_event_api_bp',__name__)

@sgv_event_api_bp.route("/", strict_slashes=False)
def home():
    return "Welcome to 626 Hangout API!"

# ToDo: Make a 404 route
@sgv_event_api_bp.route('/events', methods=['GET'],  strict_slashes=False)
def get_city_events():
    """Scrape <city> site for events happening this month."""
    city = request.args.get('city') #retrieve query parameter ToDO: create an if there is a query  parameter!!
    #ToDO: find extension to see git history
    city_urls = {
        'san_gabriel': 'https://www.sangabrielcity.com/calendar.aspx?CID=20',
        'temple': 'https://www.ci.temple-city.ca.us/calendar.aspx?CID=23&Keywords=&startDate=&enddate=09/30/2024', #ToDo: May have to specify enddate query
        'alhambra': 'https://www.cityofalhambra.org/calendar.aspx?CID=14',
        'pasadena': 'https://www.cityofpasadena.net/events/list/?tribe_eventcategory%5B0%5D=257'
    }

    all_events = []
    if city == 'all': # If city is empty get all events
        for city in city_urls:
            url = city_urls[city]
            html_text = fetch_html_content(url)
            html_soup = parse_html_content(html_text)
            if city == 'pasadena':
                all_events.extend(extract_events_pas(html_soup)) # ToDo:  optimize extending lists O(all_city_events)+O(City_specific_events)
            else:
                all_events.extend(extract_events_sg(html_soup,city.title(),url))
    else:
        url = city_urls[city]
        html_text = fetch_html_content(url)
        html_soup = parse_html_content(html_text)
        if city == 'pasadena':
            all_events = event_list = extract_events_pas(html_soup)
        else:
            all_events = event_list = extract_events_sg(html_soup, city.title(), url)


    return jsonify(all_events)
