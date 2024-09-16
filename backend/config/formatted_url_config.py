import datetime
from backend.src.helpers.extract_json import extract_json

def get_city_urls_formatted(city:str='all', number_of_days:int=30) -> str:
    """
    Insert date range into url query strings
    :param city:
    :param number_of_days:
    :return:
    """
    today = datetime.date.today()
    future_date = today + datetime.timedelta(days=number_of_days)
    city_urls = extract_json()
    formatted_urls = {
        'san_gabriel': f'{city_urls["san_gabriel"]}/calendar.aspx?CID=20&Keywords=&startDate={today.month}/{today.day}/{today.year}&enddate={future_date.month}/{future_date.day}/{future_date.year}',
        'temple': f'{city_urls["temple"]}/calendar.aspx?CID=23&Keywords=&startDate={today.month}/{today.day}/{today.year}&enddate={future_date.month}/{future_date.day}/{future_date.year}',
        'alhambra': f'{city_urls["alhambra"]}/calendar.aspx?Keywords=&startDate={today.month}/{today.day}/{today.year}&enddate={future_date.month}/{future_date.day}/{future_date.year}&CID=14&showPastEvents=false',
        'pasadena': f'{city_urls["pasadena"]}/events/list/?tribe_eventcategory%5B0%5D=257'
    }
    return formatted_urls[city]