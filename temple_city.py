import requests
from bs4 import BeautifulSoup
import re
temple_url = 'https://www.ci.temple-city.ca.us/calendar.aspx?CID=23&Keywords=&startDate=&enddate=&'
response = requests.get(temple_url)
html_content = response.text

soup = BeautifulSoup(html_content, 'html.parser')
title_regex = re.compile(r'^eventTitle') # Title of events
title_a_tags = soup.find_all('a', id=title_regex)
event_names = {}

for a_tag in title_a_tags:
    span_tag = a_tag.find('span')
    if span_tag:
        event_names[span_tag.text.strip()] = {'date':soup.find('a', class_ ='date').text.strip() }

print(event_names)

# Rosemead events
