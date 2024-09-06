import json
import os
from datetime import datetime
from backend.src.helpers.city_event_scrapers import scrape_city_events
from backend.src.helpers.date_formatter import datetime_serializer


def write_city_events(file_path:str,city_query_param:str):
    all_city_events = scrape_city_events(city_query_param)
    dir_name = 'data'
    os.makedirs(dir_name, exist_ok=True)

    with open(file_path, 'w') as f:
        json.dump(all_city_events, f,default=datetime_serializer, indent=2)
    return file_path


def load_city_events(file_path:str) -> list:
    with open(file_path, 'r') as file:
        all_city_events = json.load(file)
    return all_city_events


def check_city_events_file_exists(query_param:str) -> tuple:
    date = datetime.now().strftime("%Y-%m-%d")
    file_name = f'{date}_{query_param}_city_events.json'
    dir_name = 'data'
    file_path = os.path.join(dir_name,file_name)
    return os.path.exists(file_path), file_path



