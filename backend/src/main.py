import sys
import os
import logging

# Add the project root directory to Python path
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, project_root)
from backend.src import create_app # ToDO: look into importing create_app why no file specified?


# Check logs directory exists
log_dir = os.path.join(os.path.dirname(__file__), '..', 'logs')
os.makedirs(log_dir, exist_ok=True)

# Set up logging
log_file = os.path.join(log_dir, 'project.log')
logging.basicConfig(filename=log_file, level=logging.ERROR) # ToDo:Look into best practice of logging log parametrs and domain for local host

app = create_app()


if __name__ == '__main__':
    print('Starting 626 hangout app on http://localhost:5001/626_hangout/...') # ToDo: change to localhost or delete
    app.run(debug=True, port=5001) # ToDo: use config for port
