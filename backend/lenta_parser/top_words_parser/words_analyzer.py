import re
import typing

import pymorphy2
from collections import Counter

from lenta_parser.top_words_parser.configuration import stop_terms

morph = pymorphy2.MorphAnalyzer(lang="ru")


def split_text_to_words(texts: list):
    """
    This function for collect list of news words and delete stop-words
    """
    text = ", ".join(texts)
    words = re.findall(r"(?u)\b\w\w+\b", text, flags=re.IGNORECASE)

    return (word for word in words if len(word) > 2)


def get_words_in_normal_form(words: typing.Iterable):
    """
    This function with Ml do word in normal form
    """
    words = (
        morph.parse(word)[0].normal_form
        for word in words
        if morph.parse(word)[0].tag.POS in {"INFN", "NOUN"} and
        morph.parse(word)[0].normal_form not in stop_terms
    )
    return words


def get_only_verbs(words: typing.Iterable):
    """
    This function collect only verbs
    """
    words = get_words_in_normal_form(words)
    verbs = [word for word in words if morph.parse(word)[0].tag.POS == "INFN"]
    return verbs


def get_only_nouns(words: typing.Iterable):
    """
    This function collect only verbs
    """
    words = get_words_in_normal_form(words)
    nouns = [word for word in words if morph.parse(word)[0].tag.POS == "NOUN"]
    return nouns


def count_words(words: list, limit: int):
    """
    This function for count words
    """
    words_counter = Counter(words)
    most_common_words = words_counter.most_common(limit)
    return most_common_words
