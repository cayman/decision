#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask import Flask
#from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS

app = Flask(__name__)
app.debug = True

app.config.from_object('config.DevelopConfig')

#bcrypt = Bcrypt(app)
# инициализируем объект БД
db = SQLAlchemy(app)

import application.views

