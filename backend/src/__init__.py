from flask import Flask
from flask_cors import CORS
from .routes.events import sgv_event_api_bp

def create_app():
    # Initialize Flask app
    app = Flask(__name__)

    ## Enable CORS if frontend and backend are on different domains
    # CORS(app)

    # Register routes
    app.register_blueprint(sgv_event_api_bp, url_prefix='/events')

    return app
