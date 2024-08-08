import requests
from bs4 import BeautifulSoup
import re
sangabriel_url = 'https://www.sangabrielcity.com/calendar.aspx?CID=20'
response = requests.get(sangabriel_url)
html_content = response.text

soup = BeautifulSoup(html_content, 'html.parser')
regex = re.compile(r'^eventTitle_')
a_tags = soup.find_all('a', id=regex)
event_names = []
for a_tag in a_tags:
    span_tag = a_tag.find('span')
    if span_tag:
        event_names.append(span_tag.text.strip())

print(event_names)
