import uuid
from typing import Optional

from fastapi import FastAPI, Cookie
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .db.set_initial_data import set_initial_data_sources
from .db.search_history import add_in_search_history, get_search_history
from .lenta_parser.activity_parser.activity_parser import (
    activity_lenta_parser,
    category_lenta_parser,
)
from .lenta_parser.activity_parser.activity_parser_tools import (
    categories_dict,
)
from .lenta_parser.top_words_parser.top_words_parser import lenta_analyzer
from .schema import (
    AnalyzeTypes,
    TopWordsRequestSchema,
    ListTopWordsResponseSchema,
    ActivityRequestSchema,
    ActivityResponseSchema,
    ListCategoriesResponseSchema,
    CategoryActivityRequestSchema,
    ListCategoryCountResponseSchema,
    ListSearchHistoryResponseSchema,
)
from .services import get_current_period

# set_initial_data_sources()
app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
    "localhost:3000",
    "docker-react"
    ]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/top-words")
@add_in_search_history(analyze_type=AnalyzeTypes.TOP_WORDS.value)
def get_top_words_api(
    top_words_schema: TopWordsRequestSchema, session_id: Optional[str] = Cookie(None)
) -> ListTopWordsResponseSchema:
    """
    API для получения топ слов по выбранному источнику и количеству новостей
    """
    if top_words_schema.source == 1:
        response = {
            "news_count": top_words_schema.news_count,
            "items": lenta_analyzer(**top_words_schema.dict()),
        }
    else:
        response = {
            "news_count": top_words_schema.news_count,
            "items": lenta_analyzer(**top_words_schema.dict()),
        }

    return ListTopWordsResponseSchema.parse_obj(response)


@app.post("/period-activity")
@add_in_search_history(analyze_type=AnalyzeTypes.ACTIVITY.value)
def get_period_activity_api(
    activity_schema: ActivityRequestSchema, session_id: Optional[str] = Cookie(None)
) -> ActivityResponseSchema:
    """
    API для получения активности по новостям за выбранный период
    """
    period = get_current_period(activity_schema.analyze_by)
    parsed_data = activity_lenta_parser(**activity_schema.dict())
    response = {
        "analyzed_period": f"{period}",
        "items": [
            {"label": time_period, "count": count}
            for time_period, count in parsed_data.items()
        ],
    }

    return ActivityResponseSchema(**response)


@app.get("/categories-list")
def get_categories_list() -> ListCategoriesResponseSchema:
    """
    API получения списка категорий для отображения в форме поиска
    """
    response = [
        {"id": category, "name": categories_dict[category]["label"]}
        for category in categories_dict
    ]
    return ListCategoriesResponseSchema.parse_obj(response)


@app.post("/category-activity")
@add_in_search_history(analyze_type=AnalyzeTypes.ACTIVITY_BY_CATEGORY.value)
def get_category_activity(
    category_activity_schema: CategoryActivityRequestSchema,
    session_id: Optional[str] = Cookie(None),
) -> ListCategoryCountResponseSchema:
    """
    API для получения активности по категориям по выбранному периуду и категориям
    """
    period = get_current_period(category_activity_schema.analyze_by)
    response = {
        "analyzed_period": f"{period}",
        "items": [
            {"label": category, "count": count}
            for category, count in category_lenta_parser(
                **category_activity_schema.dict()
            ).items()
        ],
    }
    return ListCategoryCountResponseSchema(**response)


@app.get("/get_search_history")
def get_test_db(session_id: Optional[str] = Cookie(None)):
    search_history_items = get_search_history(session_id)

    return ListSearchHistoryResponseSchema.parse_obj(search_history_items)


@app.get("/set-session-cookie")
def create_cookie():
    content = {"message": "Come to the dark side, we have cookies"}
    response = JSONResponse(content=content)
    session_id = uuid.uuid4()
    response.set_cookie(key="session_id", value=f"{session_id}")
    return response
