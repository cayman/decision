#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from application import db

class Post(db.Model):
    __tablename__ = 'fa_post'

    id = db.Column(db.Integer,autoincrement=True,  primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('fa_company.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('fa_user.id'), nullable=False)
    text = db.Column(db.String(4096), nullable=False)
    created = db.Column(db.TIMESTAMP, nullable=False)

    def __init__(self, company_id, user_id, text):
        self.company_id = company_id
        self.user_id = user_id
        self.text= text

    def __repr__(self):
        return '<Blog %r:%r for %r>' % (self.id,self.company_id,self.user_id)






