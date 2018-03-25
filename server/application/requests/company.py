#!/usr/bin/env python
# -*- coding: UTF-8 -*-
from flask import jsonify, request, make_response
from application import app, db

from application.requests.utils import get_args, ok,created, accepted, assertion_error, server_error, bad_request_error, not_found_error
from application.models.sector import Sector
from application.models.company import Company, CompanyLink
from application.models.indicator import Indicator, Value

from application.dto.sector import SectorDTO
from application.dto.company import CompanyDTO, CompanyLinkDTO
from application.dto.indicator import IndicatorDTO


#COMPANY-------------------

@app.route('/api/companies',methods=['GET'])
def get_companies():
    currency_id = request.args.get('currency',1, type=int)
    app.logger.debug('currency_id = %r',currency_id)
    sector_ids = get_args('sector')
    app.logger.debug('sectorIds = %r',sector_ids)
    indicator_ids = get_args('indicator','30,56,59,60,63,64,41,42,91')
    app.logger.debug('indicatorIds = %r',indicator_ids)
    try:
        assert currency_id in [1,2],'Wrong currency_id'

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

        return ok(companies)

    except AssertionError as e:
        return assertion_error(e)

    except Exception as e:
        return server_error(e)


@app.route('/api/companies/<int:company_id>',methods=['GET'])
def get_company(company_id):
    currency_id = request.args.get('currency',1, type=int)
    app.logger.debug('currency_id = %r',currency_id)
    try:
        assert currency_id in [1,2],'Wrong currency_id'

        #sql
        _company = Company.query.get(company_id)
        if not _company:
            app.logger.info('Company not found %r',company_id)
            return not_found_error('Company not found')

        else:
            _values = Value.query.join(Company) \
                .filter(Value.currency==currency_id,Company.id==company_id) \
                .order_by(Value.indicator_id).all()

            #создание DTO компании
            company = CompanyDTO(_company)

            #dto
            for _value in _values:
                #добавление значения индикатора
                company.add_indicator(_value.indicator, _value)

            return ok(company)

    except AssertionError as e:
        app.logger.info(e)
        return assertion_error(e)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)


#COMPANY_LINKS-------------------

@app.route('/api/companies/<int:company_id>/links',methods=['POST'])
def create_company_links(company_id):
    link = CompanyLinkDTO(json=request.get_json())
    app.logger.debug(link)
    try:
        assert company_id==link.company_id,'Wrong company_id'
        #sql
        _company = Company.query.get(company_id)
        if not _company:
            app.logger.info('Company not found %r',company_id)
            return not_found_error('Company not found')

        else:
            db.session.add(link.model())
            db.session.commit()
            _link = CompanyLink.query \
                .filter(CompanyLink.company_id == link.company_id) \
                .filter(CompanyLink.link_id == link.link_id).one()
            #dto
            link = CompanyLinkDTO(_link)
            app.logger.debug(link)
            return created(link)

    except AssertionError as e:
        app.logger.info(e)
        return assertion_error(e)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)


@app.route('/api/companies/<int:company_id>/links/<int:link_id>',methods=['POST'])
def update_company_links(company_id,link_id):
    link = CompanyLinkDTO(json=request.get_json())
    app.logger.debug(link)
    try:
        assert company_id==link.company_id,'Wrong companyId'
        assert link_id==link.link_id,'Wrong linkId'
        #sql
        _company = Company.query.get(company_id)
        if not _company:
            app.logger.info('Company not found %r',company_id)
            return not_found_error('Company not found')

        else:
            _link = CompanyLink.query\
                .filter(CompanyLink.company_id == company_id)\
                .filter(CompanyLink.link_id == link_id).one()

            if not _company:
                app.logger.info('CompanyLink not found %r:%r',company_id,link_id)
                return not_found_error('CompanyLink not found')
            else:
                _link.id = link.id
                db.session.commit()

                #dto
                link = CompanyLinkDTO(_link)
                app.logger.debug(link)
                return accepted(link)

    except AssertionError as e:
        app.logger.info(e)
        return assertion_error(e)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)