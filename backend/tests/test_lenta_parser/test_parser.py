import time

import pytest
import requests

from backend.app.lenta_parser.top_words_parser.top_words_parser import (
    collect_news_titles,
    dynamic_url,
    collect_news_urls,
    collect_news_texts,
)


class TestTopWordsParser:
    def test_collect_news_titles(self):
        titles = collect_news_titles(url=dynamic_url, items=40)
        assert len(titles) == 40

        for title in titles:
            assert type(title) is str

    def test_collect_news_urls(self):
        news_urls = collect_news_urls(dynamic_url, 20)
        for url in news_urls:
            response = requests.get(url)
            time.sleep(0.2)
            assert response.status_code == 200

    def test_collect_news_texts(self):
        news_urls = collect_news_urls(dynamic_url, 20)
        news_texts = collect_news_texts(news_urls)

        for text in news_texts:
            assert type(text) is str
