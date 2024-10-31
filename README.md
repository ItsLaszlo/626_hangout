[![Python CI](https://github.com/martham0/626_hangout/actions/workflows/python-ci.yml/badge.svg)](https://github.com/martham0/626_hangout/actions/workflows/python-ci.yml)
# 626 Hangout

<!-- ABOUT THE PROJECT -->
## About The Project
Local event aggregator for cities in the 626 (San Gabriel Valley).

### Tracked city sites:
- [X] [Temple city](https://www.ci.temple-city.ca.us/)
  - Pink: #c53469
- [X] [San Gabriel](https://www.sangabrielcity.com/)
  - Orange: #e05000
- [X] [Pasadena](https://www.cityofpasadena.net)
  - Blue: #00275d
- [X] [Alhambra](https://www.cityofalhambra.org)
  - Brown: #92721b
### Stretch:
- [ ] [Pasadena Convention center](https://www.visitpasadena.com/convention-center/full-event-calendar/)
- [ ] [Rosemead](https://www.cityofrosemead.org/contacts/city_communication/city_calendar)
- [ ] [Arcadia](https://www.arcadiaca.gov/calendar.php#recreation)
<!-- ROADMAP -->
## Roadmap
### MVP
- [X] **Gather all events happening in the current month**
- [X] **Gather all event data**
  - Date
  - Event Name
  - Location
  - Event Link
  - Description
  - Event photo
- [X] **Have a UI to see all events**
  - Provide a user interface to view the list of events.
#### Frontend
- [ ] Refactor FE 
- [ ] Resize photos 
- [ ] Reformat description 
- [ ] reorginze socials bar
  -  Move social bar next to event cards
- [ ] Add back carousel 

### MVP+
- [X] **Organize events by dates**
  - Sort and group events by date.

- [ ] **Pull up all events based on a date range**
  - Allow users to filter events by a specific date range.

- [X] **Filter by city**
  - Filter events based on selected cities and display relevant dates.
- [ ] Implement AWS SDK
    - [ ] Set up RDS
    - [ ] Set up API Gateway
    - [ ] Move function into Lambda
### Frontend
- [ ] Fix color scheme of text
- [ ] redesign Banner
- [ ] Finalize banner

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [Requests](https://requests.readthedocs.io/en/latest/)
* [Beautifulsoup4](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
* [Python]()

<!-- GETTING STARTED -->
## Getting Started
### Backend
  Navigate to backend directory
  Create a virtual environment and activate it
  ```python
  python3 -m venv myenv
  source myenv/bin/activate
  ```
  
  Install requirements:
  ```python
  pip3 install -r requirements.txt
  ```
  
  Run flask app
  ```python
  python3 backend/src/main.py
  ```


### API:
  `http://localhost:5001/events?city=<city>`<br>
 
  **`<city>` options:**
  - `San_gabriel`
  - `Temple`
  - `Alhambra`
  - `Pasadena`

**CURL examples:**
```commandline
curl http://localhost:5001/626_hangout/events?city=pasadena 
curl -X POST http://localhost:5001/626_hangout/scrape_events \
     -H "Content-Type: application/json" \
     -d '{"city": "all"}'
```
### Frontend
```bash
npm run dev
```
