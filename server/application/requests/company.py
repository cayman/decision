#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
from flask import jsonify, request
from application import app, db

from application.models.sector import Sector
from application.models.company import Company, CompanyLink
from application.models.indicator import Indicator, Value

from application.dto.sector import SectorDTO
from application.dto.company import CompanyDTO, CompanyLinkDTO
from application.dto.indicator import IndicatorDTO


#COMPANY-------------------

@app.route('/api/companies',methods=['GET'])
def get_companies():
    currency_id = request.args.get('currency',1)
    sector_ids = request.args.get('sector').split(',',10) if request.args.get('sector') else None
    indicator_ids = request.args.get('indicator','30,56,59,60,63,64,41,42,91').split(',',20)

    #sql
    filters = [Value.currency==currency_id,Company.hidden==0,Company.foreign==0]
    if indicator_ids:
        filters.append(Value.indicator_id.in_(indicator_ids))
    if sector_ids:
        filters.append(Company.sector_id.in_(sector_ids))
    _values = Value.query.join(Company) \
        .filter(*filters) \
        .order_by(Value.indicator_id).all()

    #dto
    companies={}
    for _value in _values:
        _company = _value.company
        if _company.id not in companies:
            #добавление компании в список
            companies[_company.id] = CompanyDTO(_company)
        #добавление значения индикатора в компанию
        companies[_company.id].add_indicator(_value.indicator, _value)

    return jsonify([company.json() for company in companies.values()])


@app.route('/api/companies/<int:company_id>',methods=['GET'])
def get_company(company_id):
    currency_id = request.args.get('currency',1)

    #sql
    _company = Company.query.get(company_id)
    _values = Value.query.join(Company) \
        .filter(Value.currency==currency_id,Company.id==company_id) \
        .order_by(Value.indicator_id).all()

    #создание DTO компании
    company = CompanyDTO(_company)

    #dto
    for _value in _values:
        #добавление значения индикатора
        company.add_indicator(_value.indicator, _value)

    return jsonify(company.json())


#COMPANY_LINKS-------------------

@app.route('/api/companies/<int:company_id>/links',methods=['POST'])
def create_company_links(company_id):

    link = CompanyLinkDTO(json=request.get_json())
    print(link)
    assert company_id==link.company_id,'wrong company_id'
    #sql
    db.session.add(link.model())
    db.session.commit()
    _link = CompanyLink.query \
        .filter(CompanyLink.company_id == link.company_id) \
        .filter(CompanyLink.link_id == link.link_id).one()
    #dto
    link = CompanyLinkDTO(_link)

    return jsonify(link.json())


@app.route('/api/companies/<int:company_id>/links/<int:link_id>',methods=['POST'])
def update_company_links(company_id,link_id):

    link = CompanyLinkDTO(json=request.get_json())
    print(link)
    assert company_id==link.company_id,'wrong company_id'
    assert link_id==link.link_id,'wrong link_id'
    #sql
    db.session.update(link.model())
    db.session.commit()
    _link = CompanyLink.query \
        .filter(CompanyLink.company_id == link.company_id) \
        .filter(CompanyLink.link_id == link.link_id).one()
    #dto
    link = CompanyLinkDTO(_link)

    return jsonify(link.json())
