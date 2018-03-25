#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from application import db


class InstrumentType(db.Model):
    __tablename__ = 'fa_instrument_type'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    short = db.Column(db.String(8))

    def __init__(self, id, name, short):
        self.id = id
        self.name = name
        self.short = short


    def __repr__(self):
        return '<InstrumentType %r:%r >' % (self.id, self.name)

class Instrument(db.Model):
    __tablename__ = 'fa_instrument'
    id = db.Column(db.Integer, primary_key=True)
    type_id = db.Column(db.Integer, db.ForeignKey('fa_instrument_type.id'))
    type = db.relationship('InstrumentType',lazy='joined')

    company_id = db.Column(db.Integer, db.ForeignKey('fa_company.id'))
    code = db.Column(db.String(8))

    links = db.relationship('InstrumentLink', lazy='joined')

    def __init__(self, id, type_id, company_id, code):
        self.id = id
        self.type_id = type_id
        self.company_id = company_id
        self.code = code

    def __repr__(self):
        return '<Instrument %r:%r for %r>' % (self.type_id,self.code, self.company_id)


class InstrumentLink(db.Model):
    __tablename__ = 'fa_instrument_link'

    instrument_id = db.Column(db.Integer, db.ForeignKey('fa_instrument.id'), primary_key=True)
    link_id = db.Column(db.Integer, db.ForeignKey('fa_link.id'), primary_key=True)
    id = db.Column(db.Integer)

    def __init__(self, instrument_id, link_id, id):
        self.instrument_id = instrument_id
        self.link_id = link_id
        self.id = id

    def __repr__(self):
        return '<InstrumentLink %r:%r>' % (self.company.id, self.id)

    @staticmethod
    def select_by(company_id):
        return InstrumentLink.query.join(Instrument).filter(Instrument.company_id == company_id).all()

