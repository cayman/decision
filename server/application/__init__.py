#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from flask import Flask
#from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

app.config.from_object('config.DevelopConfig')

#bcrypt = Bcrypt(app)
# инициализируем объект БД
db = SQLAlchemy(app)

import application.views

