import requests
import logging


def fetch_html_content(url):
    """Fetch HTML content from the given URL."""
    try:
        # Identify a User-Agent
        header = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'}
        response = requests.get(url,headers=header)
        response.raise_for_status()  # Raise an HTTPError for bad responses

        return response.text
    except requests.RequestException as e:
        logging.error(f"Error fetching URL {url}: {e}")
        return None