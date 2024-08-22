from flask import Blueprint, jsonify, request
from collections import defaultdict
# import logging

from ..helpers.fetch_html import fetch_html
from ..helpers.parse_html import parse_html
from ..helpers.extract_events_sg import extract_events_sg
from ..helpers.extract_events_pas import extract_events_pas

# create blueprint for routes
sgv_event_api_bp = Blueprint('sgv_event_api_bp',__name__)

@sgv_event_api_bp.route("/")
def home():
    return "Welcome to 626 Hangout API!"
@sgv_event_api_bp.route('/<city>', methods=['GET'])
def get_city_events(city):
    """Scrape <city> site for events happening this month."""
    city_urls = {
        'san_gabriel': 'https://www.sangabrielcity.com/calendar.aspx?CID=20',
        'temple': 'https://www.ci.temple-city.ca.us/calendar.aspx?CID=23&Keywords=&startDate=&enddate=&',
        'alhambra': 'https://www.cityofalhambra.org/calendar.aspx?CID=14',
        'pasadena': 'https://www.cityofpasadena.net/events/list/?tribe_eventcategory%5B0%5D=257'
    }

    url = city_urls[city]
    html_text = fetch_html(url)
    html_soup = parse_html(html_text)
    if city == 'pasadena':
        event_list = extract_events_pas(html_soup)
    else:
        event_list = extract_events_sg(html_soup,city.title(),url)
    return jsonify(event_list)