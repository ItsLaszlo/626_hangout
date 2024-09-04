from flask import Blueprint, jsonify, request
import backend.src.helpers.web_scraper_utils as web_scraper_utils
from backend.src.helpers.extract_json_urls import extract_json_city_urls
from backend.src.helpers.extract_events import extract_events_san_gabriel, extract_events_pasadena, extract_events_temple, extract_events_alhambra
from backend.config.formatted_url_config import get_city_urls_formatted

# create blueprint for routes
sgv_event_api_bp = Blueprint('sgv_event_api_bp',__name__)

@sgv_event_api_bp.route("/", strict_slashes=False)
def home():
    return "Welcome to 626 Hangout API!"

@sgv_event_api_bp.route('/events', methods=['GET'],  strict_slashes=False)
def get_events():
    """Scrape <city> site for events happening this month."""
    city = request.args.get('city') #retrieve query parameter
    city_urls = extract_json_city_urls() # open city_urls.json in read mode #ToDO: messy usage using in several different place but can be narrowed down to one place to use. Not sure if function is actually needed
    print('city urls', city_urls)
    if city in city_urls or city == 'all':
        return jsonify(get_city_events(city,city_urls))
    else:
        return jsonify({"error": f"[ {city} ] is not an available city to gather events from."}), 404




def get_city_events(city_name:str,city_urls:dict)-> list:
    """Scrape <city> site for events happening this month."""
    def process_city(city_name_to_process: str):
        city_url = get_city_urls_formatted(city_name_to_process)
        city_html_text = web_scraper_utils.fetch_html_content(city_url)
        city_html_soup = web_scraper_utils.parse_html_content(city_html_text)
        return city_html_soup

    if city_name == 'pasadena':
        parsed_html = process_city(city_name)
        return extract_events_pasadena(parsed_html)
    elif city_name == 'san_gabriel':
        parsed_html = process_city(city_name)
        return extract_events_san_gabriel(parsed_html,city_name,city_urls[city_name])
    elif city_name == 'alhambra':
        parsed_html = process_city(city_name)
        return extract_events_alhambra(parsed_html, city_urls[city_name])
    elif city_name == 'temple':
        parsed_html = process_city(city_name)
        return extract_events_alhambra(parsed_html, city_urls[city_name])
    else:
        all_events = []
        extraction_functions = {
            'pasadena': extract_events_pasadena,
            'san_gabriel': extract_events_san_gabriel,
            'alhambra': extract_events_alhambra,
            'temple': extract_events_temple
        }
        for city in city_urls:
            parsed_html = process_city(city)
            if city in extraction_functions:
                extraction_func = extraction_functions[city]
                if city == 'pasadena':
                    events = extraction_func(parsed_html)
                elif city == 'san_gabriel':
                    events = extraction_func(parsed_html, city, city_urls[city])
                else:  # alhambra and temple
                    events = extraction_func(parsed_html, city_urls[city])
                all_events.extend(events) # ToDo:  optimize

    return all_events