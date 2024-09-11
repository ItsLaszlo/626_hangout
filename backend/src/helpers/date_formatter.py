from datetime import datetime
import re
import unicodedata


def datetime_serializer(datetime_obj):
    if isinstance(datetime_obj, datetime):
        return datetime_obj.isoformat()
    raise TypeError(f"Type {type(datetime_obj)} not serializable")


def date_formatter(date_str: str) -> tuple:  # ToDO: look for a dateformatter func/library
    patterns = [
        # 'September 11, 2024, 6:30 AM - 8:30 AM'
        r'(\w+ \d{1,2}, \d{4}), (\d{1,2}:\d{2} [AP]M)\s*-?\s*(\d{1,2}:\d{2} [AP]M)',  # 3 groups
        # 'September 7, 2024 - September 8, 2024'
        r'(\w+ \d{1,2}, \d{4}) - (\w+ \d{1,2}, \d{4})',  # 2 groups
        # 'September 1, 2024, 8:00 AM - 1:00 PM'
        r'(\w+ \d{1,2}, \d{4}), (\d{1,2}:\d{2} [AP]M)\s*-?\s*(\d{1,2}:\d{2} [AP]M)',  # 3 groups
        # 'October 12 @ 12:00 pm'
        r'(\w+ \d{1,2}) @ (\d{1,2}:\d{2} [ap]m)',  # 2 groups,
        # September 20, 2024, All Day
        r'(\w+ \d{1,2}, \d{4}), All Day',
    ]
    normalized_date_str = unicodedata.normalize('NFKD', date_str)  # Normalizes Unicode characters
    normalized_date_str = re.sub(r'\s+', ' ', normalized_date_str)
    for i, pattern in enumerate(patterns):

        match = re.match(pattern, normalized_date_str)
        if match:

            groups = match.groups()

            if len(groups) == 3 and ':' in groups[1]:  # Single day with time range
                day_and_year = datetime.strptime(groups[0], '%B %d, %Y')  # date obj w/  month, date, and year
                start_time = datetime.strptime(groups[1], '%I:%M %p')
                end_time = datetime.strptime(groups[2], '%I:%M %p')
                # create new date_time obj w/ date and  start time
                start_date_time = day_and_year.replace(hour=start_time.hour,
                                                       minute=start_time.minute)
                end_date_time = day_and_year.replace(hour=end_time.hour, minute=end_time.minute)
            elif len(groups) == 2 and '-' in normalized_date_str:  # Date range
                start_date = datetime.strptime(groups[0], '%B %d, %Y')
                end_date = datetime.strptime(groups[1], '%B %d, %Y')
                start_date_time = start_date.replace(hour=0, minute=0)
                end_date_time = end_date.replace(hour=23,
                                                 minute=59)
            elif len(groups) == 2 and '@' in normalized_date_str:  # Single date and time
                current_year = datetime.now().year
                date_with_year = f'{groups[0]} {current_year}'
                start_date_time = datetime.strptime(f'{date_with_year} {groups[1]}', '%B %d %Y %I:%M %p')
                end_date_time = start_date_time.replace(hour=23, minute=59)
            elif len(groups) == 1 and 'All Day' in normalized_date_str:
                event_date = datetime.strptime((groups[0]), '%B %d, %Y')
                start_date_time = event_date.replace(hour=0, minute=0)
                end_date_time = event_date.replace(hour=23, minute=59)
            else:
                continue
            return start_date_time, end_date_time

    return ()

#ToDo: make it more readable right now: 2024-09-11T06:30:002024-09-11T08:30:00 

