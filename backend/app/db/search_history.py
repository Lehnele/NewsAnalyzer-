from pydantic import BaseModel
import functools
from datetime import datetime
from typing import Iterable

from .db import db_client
from ..schema import AnalyzeTypes

fastapi_db = db_client.fastapi


def get_current_request_data(request_values: Iterable):
    """Function for get analyzer parameterms from request"""
    for value in request_values:
        if issubclass(type(value), BaseModel) and hasattr(value, "Config"):
            try:
                if value.Config.is_analyzer_params:
                    return value.dict()
            except AttributeError:
                continue
    return None


def add_in_search_history(analyze_type: AnalyzeTypes):
    def log_decorator_info(func):
        @functools.wraps(func)
        def log_decorator_wrapper(*args, **kwargs):
            response = func(*args, **kwargs)
            session_id = kwargs.pop("session_id")
            request_data = get_current_request_data(kwargs.values())
            if session_id is not None:
                history_instance = save_search_history_instance(
                    analyze_type, session_id, request_data, response.dict()
                )
                print(history_instance)
            return response

        return log_decorator_wrapper

    return log_decorator_info


def save_search_history_instance(
    analyze_type: AnalyzeTypes, session_id: str, request_data: dict, response_data: dict
):
    """function for form search history instance"""
    history_collection = fastapi_db.search_history
    history_instance = {
        "session_id": session_id,
        "date": datetime.now().strftime("%m-%d-%Y, %H:%M:%S"),
        "analyze_type": analyze_type,
        "request": request_data,
        "response": response_data,
    }
    history_instance = history_collection.insert_one(history_instance)
    return history_instance


def get_search_history(session_id: str):
    """Function for get all search history items for user in current session"""
    history_collection = fastapi_db.search_history
    history_items = history_collection.find(
        {"session_id": session_id}, {"_id": 0, "session_id": 0}
    )
    return [item for item in history_items]
