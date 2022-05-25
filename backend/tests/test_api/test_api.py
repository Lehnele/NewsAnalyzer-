import pytest
from ...app.schema import (
    ListTopWordsResponseSchema,
    ActivityResponseSchema,
    ListCategoryCountResponseSchema, ListSearchHistoryResponseSchema,
)
from ..fixtures.client_fixtures import (
    activity_parser_data,
    activity_by_categories_data,
)


class TestParsersApi:
    def test_top_words(self, api_client, top_words_data):
        response = api_client.post("/top-words", json=top_words_data)
        assert response.status_code == 200
        assert ListTopWordsResponseSchema(**response.json())

    @pytest.mark.parametrize("analyze_by", ["by_day", "by_week", "by_month"])
    def test_activity_parser(self, api_client, analyze_by):
        response = api_client.post(
            "/period-activity", json=activity_parser_data(analyze_by)
        )
        assert response.status_code == 200
        assert ActivityResponseSchema(**response.json())

    def test_activity_by_category_parser(self, api_client):
        categories_ids = [category["id"] for category in api_client.get("/categories-list").json()]
        data = activity_by_categories_data(categories_ids)
        response = api_client.post("/category-activity", json=data)
        assert response.status_code == 200
        assert ListCategoryCountResponseSchema(**response.json())


class TestSearchHistoryApi:
    """Test for search history api"""
    def test_search_history_api(self, api_client, top_words_data):
        set_cookie_response = api_client.get("/set-session-cookie")
        assert set_cookie_response.status_code == 200
        assert api_client.get("session_id") is not None
        test_response_from_analyze_api = api_client.post("/top-words", json=top_words_data)
        api_client.post("/top-words", json=top_words_data)
        api_client.post("/top-words", json=top_words_data)
        api_client.post("/top-words", json=top_words_data)

        history_response = api_client.get("/get_search_history")
        assert history_response.status_code == 200
        assert len(history_response.json()) == 4
        assert ListSearchHistoryResponseSchema.parse_obj(history_response.json())
        assert history_response.json()[0]["Request"] == top_words_data
        assert history_response.json()[0]["Response"] == test_response_from_analyze_api.json()


