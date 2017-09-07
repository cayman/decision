#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

import os
basedir = os.path.abspath(os.path.dirname(__file__))


host = os.environ.get('FDB_HOST', 'mysql1.justhost.ru')
database = os.environ.get('FDB_DATABASE', 'u2262s8598_fa')
user = os.environ.get('FDB_USER', 'u2262s8598_fa')
password = os.environ.get('FDB_PASSWORD', 'Bs2ROP9dp')

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