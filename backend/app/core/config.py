import os
from dotenv import load_dotenv

load_dotenv("../../.env.dev")

MONGO_HOST = os.getenv("MONGO_HOST", "db")
MONGO_PORT = int(os.getenv("MONGO_PORT", 27017))
MONGO_DB = os.getenv("MONGO_INITDB_DATABASE", "fastapi")

MONGODB_URL = f"mongodb://{MONGO_HOST}:{MONGO_PORT}/{MONGO_DB}"
