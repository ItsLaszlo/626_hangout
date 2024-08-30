from bs4 import BeautifulSoup

def parse_html_content(html_content):
    """Parse HTML content using BeautifulSoup."""
    return BeautifulSoup(html_content, 'lxml')
