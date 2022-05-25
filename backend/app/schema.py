from datetime import datetime
from typing import List, Union
from enum import Enum

from pydantic import BaseModel
from pydantic.utils import to_camel


class AnalyzeTypes(Enum):
    TOP_WORDS = "TOP_WORDS"
    ACTIVITY = "ACTIVITY"
    ACTIVITY_BY_CATEGORY = "ACTIVITY_BY_CATEGORY"


class TopWordsRequestSchema(BaseModel):
    source: int
    nouns: bool
    percent: bool
    verbs: bool
    analyze_by: str
    words_count: int
    news_count: int

    class Config:
        is_analyzer_params = True
        alias_generator = to_camel
        allow_population_by_field_name = True


class TopWordsResponseSchema(BaseModel):
    label: str
    count: int


class ListTopWordsResponseSchema(BaseModel):
    news_count: int
    items: List[TopWordsResponseSchema]


class ActivityRequestSchema(BaseModel):
    source: int
    analyze_by: str

    class Config:
        is_analyzer_params = True
        alias_generator = to_camel
        allow_population_by_field_name = True


class ActivityResponseSchema(BaseModel):
    analyzed_period: str
    items: List[TopWordsResponseSchema]


class CategoryItemSchema(BaseModel):
    id: int
    name: str


class ListCategoriesResponseSchema(BaseModel):
    __root__: List[CategoryItemSchema]


class CategoryActivityRequestSchema(ActivityRequestSchema):
    categories: List[int]

    class Config:
        is_analyzer_params = True
        alias_generator = to_camel
        allow_population_by_field_name = True


class CategoryCountSchema(BaseModel):
    label: str
    count: int


class ListCategoryCountResponseSchema(BaseModel):
    analyzed_period: str
    items: List[CategoryCountSchema]


class SearchHistoryItem(BaseModel):
    date: Union[str, datetime]
    analyze_type: str
    request: Union[None, dict]
    response: Union[None, dict]

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True


class ListSearchHistoryResponseSchema(BaseModel):
    __root__: List[SearchHistoryItem]
