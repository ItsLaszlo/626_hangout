import requests
from bs4 import BeautifulSoup

def parse_html(html_content):
    """Parse HTML content using BeautifulSoup."""
    return BeautifulSoup(html_content, 'html.parser')
