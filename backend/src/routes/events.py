from flask import Blueprint, jsonify, request
from backend.src.helpers.extract_json_urls import extract_json_city_urls
from backend.src.helpers.city_events import check_city_events_file_exists, write_city_events, load_city_events

# create blueprint for routes
sgv_event_api_bp = Blueprint('sgv_event_api_bp',__name__)

@sgv_event_api_bp.route('/', strict_slashes=False)
def home() -> tuple:
    return jsonify({'message': 'Welcome to 626 Hangout API!'}), 200

@sgv_event_api_bp.route('/read_events', methods=['GET'],  strict_slashes=False)
def read_events() -> tuple:
    city_query_param = request.args.get('city')  # retrieve query parameter

    city_events_file_present, file_path = check_city_events_file_exists(city_query_param)
    if city_events_file_present:
        return jsonify(load_city_events(file_path)), 200
    else:
        return jsonify(f'No events have been scraped for [{city_query_param}]'),400

@sgv_event_api_bp.route('/scrape_events', methods=['POST'],  strict_slashes=False) #TOdo: not sure this is a get
def scrape_events() -> tuple:
    """Scrape <city> site for events happening this month."""
    data = request.get_json()

    if not data:
        return jsonify({"error": "No JSON data provided in request body"}), 400
    city_data = data.get('city') #retrieve query parameter
    city_urls = extract_json_city_urls() # open city_urls.json in read mode

    if city_data in city_urls:
        city_events_file_present, file_path = check_city_events_file_exists(city_data) # check if city_query_param has been scraped today
        if not city_events_file_present:
            write_city_events(file_path,city_data)

        return jsonify( {'status': 'success', 'message': f'{city_data} city has been scraped'}), 201 # ToDo: not completely accurate status code does not always scrape
    return jsonify({'error': f'[ {city_data} ] is not an available city to scrape events for.'}), 404




