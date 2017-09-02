import os
basedir = os.path.abspath(os.path.dirname(__file__))


user = os.environ.get('DB_USER', 'user')
password = os.environ.get('DB_PASSWORD', 'password')
host = os.environ.get('DB_HOST', 'localhost')
database = os.environ.get('DB_DATABASE', 'fa')

class Config(object):
    DEBUG = False
    CSRF_ENABLED = True
    WTF_CSRF_SECRET_KEY = 'dsofpkoasodksap'
    SECRET_KEY = 'zxczxasdsad'
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://{0}:{1}@{2}/{3}'.format(user, password, host, database)
    SQLALCHEMY_POOL_RECYCLE = 20
    SQLALCHEMY_POOL_SIZE = 5
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
    DEBUG = False

class DevelopConfig(Config):
    DEBUG = True
    ASSETS_DEBUG = True