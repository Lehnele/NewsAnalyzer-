from pymongo import MongoClient
from ..core.config import MONGODB_URL

db_client = MongoClient(MONGODB_URL)
