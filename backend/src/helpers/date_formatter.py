from datetime import datetime
import re

def date_formatter (date_str):
    patterns = [
        # "September 11, 2024, 6:30 AM - 8:30 AM"
        r"(\w+ \d{1,2}, \d{4}), (\d{1,2}:\d{2} [AP]M) - (\d{1,2}:\d{2} [AP]M)", #3
        # "September 7, 2024 - September 8, 2024"
        r"(\w+ \d{1,2}, \d{4}) - (\w+ \d{1,2}, \d{4})", #2
        # "September 1, 2024, 8:00 AM - 1:00 PM"
        r"(\w+ \d{1,2}, \d{4}), (\d{1,2}:\d{2} [AP]M) - (\d{1,2}:\d{2} [AP]M)", #3
        # "October 12 @ 12:00 pm"
        r"(\w+ \d{1,2}) @ (\d{1,2}:\d{2} [ap]m)" # 2
    ]
    for pattern in patterns:
        match = re.match(pattern, date_str)

        if match:
            groups = match.groups()

            if len(groups) == 3 and ":" in groups[1]: # Single day with time range
                day_and_year = datetime.strptime(groups[0],"%B %d, %Y") # date obj w/  month, date, and year
                start_time = datetime.strptime(groups[1],"%I:%M %p")
                end_time = datetime.strptime(groups[2],"%I:%M %p")
                start_date_time = day_and_year.replace(hour=start_time.hour, minute=start_time.minute) # create new date_time obj w/ date and  start time
                end_date_time = day_and_year.replace(hour=end_time.hour, minute=end_time.minute)
            elif len(groups) == 2 and "-" in date_str: # Date range
                start_date = datetime.strptime(groups[0], "%B %d, %Y")
                end_date = datetime.strptime(groups[1], "%B %d, %Y")
                start_date_time = start_date.replace(hour=0, minute=0)
                end_date_time = end_date.replace(hour=23, minute=59) # ToDo: Not sure about setting the time for 24 hour. Does it need a time?
            elif len(groups) == 2 and "@" in date_str:  # Single date and time
                current_year = datetime.now().year
                date_with_year = f"{groups[0]} {current_year}"
                start_date_time = datetime.strptime(f"{date_with_year} {groups[1]}", "%B %d %Y %I:%M %p")
                end_date_time = start_date_time.replace(hour=23, minute=59)
            else:
                continue

            return (start_date_time, end_date_time) #ToDo: not sure if I want to return a (str,str) | I want the ability to sort and filter
    return None

# test
test_dates = [
    "September 11, 2024, 6:30 AM - 8:30 AM",
    "September 7, 2024 - September 8, 2024",
    "September 1, 2024, 8:00 AM - 1:00 PM",
    "October 12 @ 12:00 pm"
]

for date in test_dates:
    result = date_formatter(date)
    if result:
        print(f"Original: {date}")
        print(f"Parsed: {result[0]} to {result[1]}\n")
        print(f"TYPE: {type(date)}\n")
    else:
        print(f"Failed to parse: {date}\n")
