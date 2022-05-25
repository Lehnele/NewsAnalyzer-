import pytest

from ...app.server import app
from fastapi.testclient import TestClient


@pytest.fixture()
def api_client():
    return TestClient(app)


@pytest.fixture()
def top_words_data() -> dict:
    return {
        "source": 1,
        "analyze_by": "by_titles",
        "news_count": 20,
        "words_count": 10,
        "nouns": True,
        "verbs": True,
        "percent": False,
    }


def activity_parser_data(analyze_by: str) -> dict:
    return {"Source": 1, "AnalyzeBy": analyze_by}


def activity_by_categories_data(categories_ids: list) -> dict:
    return {"Source": 1, "AnalyzeBy": "by_day", "Categories": categories_ids}
