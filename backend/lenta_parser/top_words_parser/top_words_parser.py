import time

import requests
from bs4 import BeautifulSoup

from .words_analyzer import (
    split_text_to_words,
    count_words,
    get_only_nouns,
    get_only_verbs,
    get_words_in_normal_form,
)

start_url = "https://lenta.ru"
dynamic_url = "https://lenta.ru/parts/news/"


def collect_news_titles(url: str, items: int):
    """
    This function for collect news titles with pagination from lenta.ru
    """
    titles = []
    for i in range(items // 20):
        time.sleep(0.2)
        if i > 0:
            if i == 1:
                url += "2"
            else:
                url = url.replace(str(i), str(i + 1))
        print(url)
        response = requests.get(url=url)
        parsed_response = BeautifulSoup(response.text, "lxml")
        titles += [
            title.text
            for title in parsed_response.find_all("h3", "card-full-news__title")
        ]
    return titles


def collect_news_urls(url: str, items: int):
    """
    This function for collect all news_urls
    """
    news_urls = []
    for i in range(items // 20):
        time.sleep(0.2)
        if i > 0:
            if i == 1:
                url += "2"
            else:
                url = url.replace(str(i), str(i + 1))
        print(url)
        response = requests.get(url=url)
        parsed_response = BeautifulSoup(response.text, "lxml")
        news_urls += [
            start_url + title.attrs.get("href", url)
            for title in parsed_response.find_all("a", "card-full-news")
            if title.attrs.get("href", url).startswith("/")
        ]
    return news_urls


def collect_news_texts(news_links: list[str]):
    """
    This fucntion for collect news contents
    """
    content_texts = []
    for link in news_links:
        time.sleep(0.2)
        if link.startswith(start_url):
            response = requests.get(url=link)
            parsed_response = BeautifulSoup(response.text, "lxml")
            content_texts += [
                content.text
                for content in parsed_response.find_all("p", "topic-body__content-text")
            ]
        else:
            continue
    return content_texts


def lenta_analyzer(
    nouns: bool,
    verbs: bool,
    analyze_by: str,
    news_count: int,
    words_count: int,
    **kwargs
):
    """
    This function for collect data for analyzed
    """
    texts = []
    # collect news texts from titles or from news-content
    if analyze_by == "by_titles":
        texts = collect_news_titles(dynamic_url, news_count)
    if analyze_by == "by_texts":
        news_links = collect_news_urls(dynamic_url, news_count)
        texts = collect_news_texts(news_links)
    analyzed_words = split_text_to_words(texts)

    # get correct part of speech
    if verbs and not nouns:
        analyzed_words = get_only_verbs(analyzed_words)
    elif nouns and not verbs:
        analyzed_words = get_only_nouns(analyzed_words)
    else:
        analyzed_words = get_words_in_normal_form(analyzed_words)

    # count collected words
    counter = count_words(analyzed_words, words_count)
    if kwargs.get("percent", False):
        sum_of_words = sum(item[1] for item in counter)
        counter = [(word, round(count / sum_of_words * 100)) for word, count in counter]
    response = [{"label": word, "count": count} for word, count in counter]
    return response
