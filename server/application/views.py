#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from flask import jsonify, request, render_template
import locale

from application import app, db

import application.requests.sector
import application.requests.company
import application.requests.instrument
import application.requests.link

locale.setlocale(locale.LC_ALL, ('RU','UTF8'))

user = { 'nickname': 'Rustem' }

def accept_json():
    if request.args.get('json'):
        return True
    best = request.accept_mimetypes \
        .best_match(['application/json', 'text/html'])
    return best == 'application/json' and \
           request.accept_mimetypes[best] > request.accept_mimetypes['text/html']



@app.errorhandler(404)
def page_not_found(e):
    return jsonify(error=404, text=str(e)), 404

@app.errorhandler(500)
def page_not_found(e):
    return jsonify(error=500, text=str(e)), 500

@app.route('/')
@app.route('/index')
def index():
    posts = [ # список выдуманных постов
        {
            'author': { 'nickname': 'John' },
            'body': 'Beautiful day in Portland!'
        },
        {
            'author': { 'nickname': 'Susan' },
            'body': 'The Avengers movie was so cool!'
        }
    ]
    return render_template("index.html",
                           title = 'Home',
                           user = user,
                           posts = posts)







