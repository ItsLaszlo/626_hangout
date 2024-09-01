from urllib.parse import urlparse

def parse_url(url):
    parsed_url = urlparse(url)
    # Extract the domain
    domain = f"{parsed_url.scheme}://{parsed_url.netloc}"
    return domain