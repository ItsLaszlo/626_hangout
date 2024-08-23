[![Python CI](https://github.com/martham0/626_hangout/actions/workflows/python-app.yml/badge.svg)](https://github.com/martham0/626_hangout/actions/workflows/python-app.yml)
# 626 Hangout

<!-- ABOUT THE PROJECT -->
## About The Project
Compile a list of events happening in the 626 Area.
### Tracked city sites:
- [X] [Temple city](https://www.ci.temple-city.ca.us/calendar.aspx?CID=23&Keywords=&startDate=&enddate=&)
  - Pink: #c53469
- [X] [San Gabriel](https://www.sangabrielcity.com/calendar.aspx?CID=0&Keywords=&startDate=&enddate=&)
  - Orange: #e05000
- [X] [Pasadena](https://www.cityofpasadena.net/events/list/?tribe_eventcategory%5B0%5D=257)
  - Blue: #00275d
- [X] [Alhambra](https://www.cityofalhambra.org/calendar.aspx?CID=14)
  - Brown: #92721b
### Stretch:
- [ ] [Pasadena Convention center](https://www.visitpasadena.com/convention-center/full-event-calendar/)
- [ ] [Rosemead](https://www.cityofrosemead.org/contacts/city_communication/city_calendar)
- [ ] [Arcadia](https://www.arcadiaca.gov/calendar.php#recreation)
<!-- ROADMAP -->
## Roadmap
### MVP
- [ ] **Gather all events happening in the current month**
- [ ] **Gather all event data**
  - Date
  - Event Name
  - Location
  - Event Link
  - Description
- [ ] **Have a UI to see all events**
  - Provide a user interface to view the list of events.

### MVP+
- [ ] **Organize events by dates**
  - Sort and group events by date.

- [ ] **Pull up all events based on a date range**
  - Allow users to filter events by a specific date range.

- [ ] **See dates based on selected cities**
  - Filter events based on selected cities and display relevant dates.
- [ ] Implement AWS SDK
    - [ ] Set up RDS
    - [ ] Set up API Gateway
    - [ ] Move function into Lambda


### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [Requests](https://requests.readthedocs.io/en/latest/)
* [Beautifulsoup4](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
* [Python]()

<!-- GETTING STARTED -->
## Getting Started
  Navigate to backend directory
  Create a virtual environment and activate it
  ```python
  python -m venv myenv
  source myenv/bin/activate
  ```
  
  Install requirements:
  ```python
  pip install -r requirements.txt
  ```
  
  Run flask app
  ```python
  python3 src/main.py
  ```


### API:
  `http://127.0.0.1:5000/events?city=<city>`<br>
 
  **`<city>` options:**
  - `San_gabriel`
  - `Temple`
  - `Alhambra`
  - `Pasadena`

**CURL examples:**
```commandline
curl http://127.0.0.1:5001/626_hangout/events?city=pasadena
curl http://127.0.0.1:5001/626_hangout/events?city=temple
```


