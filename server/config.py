import os
from dotenv import load_dotenv
load_dotenv()


class Config:
    STATIC_ROOT = os.getenv('STATIC_ROOT')