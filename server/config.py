#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import os
basedir = os.path.abspath(os.path.dirname(__file__))


host = os.environ.get('FDB_HOST', 'localhost')
database = os.environ.get('FDB_DATABASE', 'fdb_database')
user = os.environ.get('FDB_USER', 'fdb_user')
password = os.environ.get('FDB_PASSWORD', 'fdb_password')

class Config(object):
    DEBUG = True
    CSRF_ENABLED = False
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