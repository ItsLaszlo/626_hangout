import json
import os
import logging

def extract_json_city_urls() -> dict:
    # Get the path to the project root
    json_path = os.path.join('backend', 'config', 'city_urls.json')
    print('json_path:', json_path)
    try:
        with open(json_path, 'r') as file:
            urls = json.load(file)
        return urls
    except FileNotFoundError:
        logging.error(f"city_urls.json not found at {json_path}")
        return {}
    except json.JSONDecodeError:
        logging.error(f"Error decoding JSON from {json_path}")
        return {}
