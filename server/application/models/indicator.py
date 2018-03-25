#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from application import db

class Indicator(db.Model):
    __tablename__ = 'fa_indicator'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    unit = db.Column(db.String(16))
    unit2 = db.Column(db.String(16))
    quantity = db.Column(db.String(8))


    def __init__(self, id, name, unit, unit2, quantity):
        self.id = id
        self.name = name
        self.unit = unit
        self.unit2 = unit2
        self.quantity = quantity

    def __repr__(self):
        return '<Indicator %r:%r>' % (self.id,self.name)



class Value(db.Model):
    __tablename__ = 'fa_value'

    company_id = db.Column(db.Integer, db.ForeignKey('fa_company.id'), primary_key=True)
    company = db.relationship('Company',lazy='joined')
    year = db.Column(db.Integer, primary_key=True)
    currency = db.Column(db.Integer, primary_key=True)
    indicator_id = db.Column(db.Integer, db.ForeignKey('fa_indicator.id'), primary_key=True)
    indicator = db.relationship('Indicator',lazy='joined')
    value = db.Column(db.String(32))

    def __init__(self, company, year, currency, indicator, value):
        self.company = company
        self.year = year
        self.currency = currency
        self.indicator = indicator
        self.value = value

    def __repr__(self):
        return '<Year%r:%r for %r >' % (self.year, self.value, self.indicator)

    @staticmethod
    def select_by(currency_id=0,company_id=None, sector_ids=None,indicator_ids=None):
        filters = [Value.currency==currency_id]
        if company_id:
            filters.append(Company.id==company_id)
        else:
            filters.append(Company.hidden==0,Company.foreign==0)
        if indicator_ids:
            filters.append(Value.indicator_id.in_(indicator_ids))
        if sector_ids:
            filters.append(Company.sector_id.in_(sector_ids))
        return Value.query.join(Company).filter(*filters).order_by(Value.indicator_id).all()


