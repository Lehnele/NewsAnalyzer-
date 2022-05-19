from typing import List

from pydantic import BaseModel
from pydantic.utils import to_camel


class TopWordsRequestSchema(BaseModel):
    source: int
    nouns: bool
    percent: bool
    verbs: bool
    analyze_by: str
    words_count: int
    news_count: int

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True


class TopWordsResponseSchema(BaseModel):
    label: str
    count: int


class ListTopWordsResponseSchema(BaseModel):
    words_count: int
    items: List[TopWordsResponseSchema]


class ActivityRequestSchema(BaseModel):
    source: int
    analyze_by: str

    class Config:
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


class CategoryCountSchema(BaseModel):
    label: str
    count: int


class ListCategoryCountResponseSchema(BaseModel):
    analyzed_period: str
    items: List[CategoryCountSchema]
