import requests
import logging
from bs4 import BeautifulSoup
from urllib.parse import urlparse


def fetch_html_content(url: str) -> str:
    """Fetch HTML content from the given URL."""
    try:
        # Identify a User-Agent
        header = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) '
                          'Chrome/125.0.0.0 Safari/537.36'}
        response = requests.get(url, headers=header)
        response.raise_for_status()  # Raise an HTTPError for bad responses

        return response.text
    except requests.RequestException as e:
        logging.error(f'Error fetching URL {url}: {e}')
        return ''


def parse_html_content(html_content: str) -> BeautifulSoup:
    """Parse HTML content using BeautifulSoup."""
    return BeautifulSoup(html_content, 'lxml')


def parse_url(url: str) -> str:
    parsed_url = urlparse(url)
    # Extract the domain
    domain = f'{parsed_url.scheme}://{parsed_url.netloc}'
    return domain
