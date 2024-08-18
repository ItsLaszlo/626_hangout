import requests
import logging


def fetch_html(url):
    """Fetch HTML content from the given URL."""
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        return response.text
    except requests.RequestException as e:
        logging.error(f"Error fetching URL {url}: {e}")
        return None
