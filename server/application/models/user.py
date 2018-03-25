#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from application import app, db


class User(db.Model):
    """ User Model for storing user related details """
    __tablename__ = 'fa_user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    name = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(128), nullable=False)
   # registered_on = db.Column(db.DateTime, nullable=False)
   # admin = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, email, name, password, admin=False):
        self.email = email
        self.name = name
        self.password = password
       # self.password = bcrypt.generate_password_hash(password, app.config.get('BCRYPT_LOG_ROUNDS')
       # ).decode()
       # self.registered_on = datetime.datetime.now()
       # self.admin = admin