from flask import Flask
from flask_cors import CORS
from backend.src.routes.events import sgv_event_api_bp

def create_app() -> Flask:
    # Initialize server
    app = Flask(__name__)
    CORS(app)

    # Register routes
    app.register_blueprint(sgv_event_api_bp, url_prefix='/626_hangout')

    return app
