#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from application import db

class Sector(db.Model):
    __tablename__ = 'fa_sector'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))

    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return '<Sector %r:%r>' % (self.id,self.name)






