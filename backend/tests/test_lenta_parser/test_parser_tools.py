import pytest

from app.lenta_parser.top_words_parser.words_analyzer import (
    split_texts_to_words,
    get_words_in_normal_form,
    get_only_nouns,
    get_only_verbs,
    count_words,
)
from backend.app.config_tools.configuration import stop_terms


class TestTopWordsParserTools:
    def test_split_text_to_words(self, random_text):
        words = split_texts_to_words([random_text])
        for word in words:
            assert len(word) >= 3

    def test_get_words_in_normal_form(self, py_morphy, random_text):
        words_in_normal_form = list(
            get_words_in_normal_form(split_texts_to_words([random_text]))
        )
        for word in words_in_normal_form:
            assert word not in stop_terms
            assert word == py_morphy.parse(word)[0].normal_form

    def test_get_only_verbs(self, py_morphy, random_text):
        words = get_only_verbs(split_texts_to_words([random_text]))
        for word in words:
            assert py_morphy.parse(word)[0].tag.POS in {"INFN", "VERB"}

    def test_get_only_nouns(self, py_morphy, random_text):
        words = get_only_nouns(split_texts_to_words([random_text]))
        for word in words:
            assert py_morphy.parse(word)[0].tag.POS == "NOUN"

    def test_get_most_common_words(self, random_text):
        words = split_texts_to_words([random_text])
        counter = count_words(words, 5)

        assert type(counter) is list
        assert type(counter[0][0]) is str
        assert type(counter[0][1]) is int
