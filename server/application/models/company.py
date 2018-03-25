#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from application import db

class Company(db.Model):
    __tablename__ = 'fa_company'

    id = db.Column(db.Integer, primary_key=True)
    hidden = db.Column(db.Integer)
    foreign = db.Column(db.Integer)
    name = db.Column(db.String(256))
    sector_id = db.Column(db.Integer, db.ForeignKey('fa_sector.id'))
    sector = db.relationship('Sector', lazy='joined')

    links = db.relationship('CompanyLink', lazy='joined')
    instruments = db.relationship('Instrument', lazy='joined')

    def __init__(self, id, name, sector_id, hidden, foreign):
        self.id = id
        self.name = name
        self.sector = sector_id
        self.hidden = hidden
        self.foreign = foreign

    def __repr__(self):
        return '<Company %r:%r>' % (self.id,self.name)

class CompanyLink(db.Model):
    __tablename__ = 'fa_company_link'

    company_id = db.Column(db.Integer, db.ForeignKey('fa_company.id'), primary_key=True)
    link_id = db.Column(db.Integer, db.ForeignKey('fa_link.id'), primary_key=True)
    id = db.Column(db.Integer)

    def __init__(self, company_id, link_id, id):
        self.company_id = company_id
        self.link_id = link_id
        self.id = id

    def __repr__(self):
        return '<CompanyLink %r:%r = %r>' % (self.company_id, self.link_id, self.id)


