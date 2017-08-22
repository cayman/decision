#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config.from_object('config.DevelopConfig')
# инициализируем объект БД
db = SQLAlchemy(app)


import application.views
import application.models

