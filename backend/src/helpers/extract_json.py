import json
import logging


def extract_json(json_path='backend/config/city_urls.json') -> dict:
    # Get the path to the project root
    try:
        with open(json_path, 'r') as file:
            json_content = json.load(file)
        return json_content
    except FileNotFoundError:
        logging.error(f'nothing found at {json_path}')
        return {}
    except json.JSONDecodeError:
        logging.error(f'Error decoding JSON from {json_path}')
        return {}

# ToDo: make this absolute instead of relative