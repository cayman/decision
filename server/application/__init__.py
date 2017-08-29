#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_assets import Environment, Bundle

app = Flask(__name__)

jinja_options = app.jinja_options.copy()
jinja_options.update(dict(
    block_start_string='{%',
    block_end_string='%}',
    variable_start_string='{$',
    variable_end_string='$}',
    comment_start_string='{#',
    comment_end_string='}>',
))
app.jinja_options = jinja_options

app.config.from_object('config.DevelopConfig')
# инициализируем объект БД
db = SQLAlchemy(app)
# инициализируем JS
assets = Environment(app)
js = Bundle('js/api.js',
            'js/message.js',
            'js/table.js',
            'js/sidebar.js',
            'js/home.js',
            'js/company.js',
            'js/companies.js',
            'js/app.js',
            filters='jsmin', output='gen/packed.js')
assets.register('js_bundle', js)

import application.views
import application.models

