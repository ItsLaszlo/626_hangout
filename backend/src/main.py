from src import create_app
import logging


logging.basicConfig(filename='logs/project.log', level=logging.INFO)
app = create_app()


if __name__ == "__main__":
    print("Starting 626 hangout app on http://127.0.0.1:5001/events/...")
    app.run(debug=True, port=5001)

# San Gabriel events
