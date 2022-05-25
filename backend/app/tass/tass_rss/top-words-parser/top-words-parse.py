import time
import requests
from bs4 import BeautifulSoup

base_url = "https://tass.ru/rss/v2.xml"
TASS_SLEEP_TIME = 0.05

headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Cookie": "__lhash_=225cdd5b9f877a60bb1b1aa6682ae9cb; tass_uuid=D9D79196-0F75-4DA0-A9CE-1348CE188388; __js_p_=726,1800,0,0; __jhash_=625; __jua_=Mozilla%2F5.0%20%28X11%3B%20Ubuntu%3B%20Linux%20x86_64%3B%20rv%3A99.0%29%20Gecko%2F20100101%20Firefox%2F99.0; __hash_=a992b43f2c30add5eb71f2e9afae2c89",
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0",
}

headers_for_news_text = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Cookie": "__lhash_=c568cc88f854585696a12dd6802395ae; tass_uuid=CBD8E71F-384F-4812-B8AD-7836176E04D0; top100_id=t1.2706484.299924704.1650533887575; t2_sid_2706484=s1.218958457.1650975085774.1650976187674.3.17.45.1; adtech_uid=bfcf23a9-9c95-40fe-947c-a30e61de39f1%3Atass.ru; user-id_1.0.5_lr_lruid=pQ8AAAAmYWL9BMeWAY34iwA%3D; __js_p_=480,1800,0,0; __jhash_=1050; __jua_=Mozilla%2F5.0%20%28X11%3B%20Ubuntu%3B%20Linux%20x86_64%3B%20rv%3A99.0%29%20Gecko%2F20100101%20Firefox%2F99.0; __hash_=4e28fb14772ee38f610ea7745dd8500b; newsListCounter=16",
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0",
}


def collect_new_titles(items: int):
    """
    This function for collect news titles from tass.ru(RSS)
    """
    titles = []
    response = requests.get(base_url, headers=headers)
    parsed_response = BeautifulSoup(response.text, "xml")
    for title in parsed_response.find_all("title"):
        titles += title
    return titles[::items]


def collect_news_urls(items: int):
    """
    This function for collect all news_urls
    """
    news_urls = []
    response = requests.get(base_url, headers=headers)
    parsed_response = BeautifulSoup(response.text, "xml")
    for url in parsed_response.find_all("guid"):
        news_urls += url
    return news_urls[::items]


def collect_news_texts(news_links: list[str]):
    """
    This fucntion for collect news contents
    """
    content_texts = []
    for link in news_links:
        response = requests.get(link, headers=headers_for_news_text)
        time.sleep(TASS_SLEEP_TIME)
        parsed_response = BeautifulSoup(response.text, "lxml")
        content_texts += [
            content.text.split("/ТАСС/.")[1]
            if "/ТАСС/." in content.text
            else content.text
            for content in parsed_response.find_all("div", "text-content")
        ]
    return content_texts
