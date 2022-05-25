import json

from .db import db_client


fastapi_db = db_client.fastapi


def set_initial_data_sources() -> None:
    """Function for initialize sources fixture"""
    with open("/backend/app/db/initial_data.json", "r") as initial_file:
        initial_data = json.load(initial_file)
    sources_collection = fastapi_db.sources_collection
    sources_collection.insert_many(initial_data)
    print(f"data")
