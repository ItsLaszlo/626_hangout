import requests
from bs4 import BeautifulSoup
from datetime import datetime


# Fetch the HTML content
# san_gabriel_url = 'https://www.sangabrielcity.com/calendar.aspx?CID=20'
san_gabriel_url = 'https://www.sangabrielcity.com/calendar.aspx?CID=20&showPastEvents=true'
response = requests.get(san_gabriel_url)
html_content = response.text
    # TODO:check for successful response/fetch

# Parse html
soup = BeautifulSoup(html_content, 'html.parser')

# Find all events under the event section
event_div = soup.find('div', id="CID20")
    #TODO:handle event section if empty/missing
li_events = event_div.find_all('li')

#clean up data
event_names = []
for event in li_events:
    # TODO: clean up date function
    # Format date
    date_string = (event.find(class_='date').text.strip())
    print(date_string)
    cleaned_date = date_string.replace('\xa0', ' ').replace('\u2009', ' ')
    #TODO: Handle time ranges and ALL Day
    # start_string, end_string = cleaned_date.split(' - ')
    # start_time = datetime.strptime(start_string, "%B %d, %Y, %I:%M %p")
    # end_time = datetime.strptime(end_string, "%I:%M %p")
    # store down info
    event_info = {'city':"San Gabriel", 'title': event.find('span').text.strip(), 'date': cleaned_date, 'url': f"https://www.sangabrielcity.com/{event.find('a').get('href')}"}
    event_names.append(event_info)



print(event_names[0])

# San Gabriel events
