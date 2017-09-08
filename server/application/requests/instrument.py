#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from flask import jsonify, request
from application import app, db

from application.requests.utils import get_args, ok,created, accepted, assertion_error, server_error, bad_request_error, not_found_error
from application.models.company import Company
from application.models.instrument import Instrument, InstrumentType, InstrumentLink
from application.dto.instrument import InstrumentDTO, InstrumentTypeDTO, InstrumentLinkDTO



@app.route('/api/instrument_types',methods=['GET'])
def get_instrument_types():
    try:
        #sql
        _types  = InstrumentType.query.all()
        #dto
        types  = InstrumentTypeDTO.create_list(_types)

        return ok(types)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)


#INSTRUMENTS-------------------

@app.route('/api/companies/<int:company_id>/instruments',methods=['GET'])
def get_company_instruments(company_id):
    type_ids = get_args('type')
    app.logger.debug('typeIds = %r',type_ids)
    try:
        _company = Company.query.get(company_id)
        if not _company:
            app.logger.info('Company not found %r',company_id)
            return not_found_error('Company not found')

        else:
            filters = [Instrument.company_id == company_id]
            if type_ids:
                filters.append(Instrument.type_id.in_(type_ids))
            _instruments = Instrument.query.filter(*filters) \
                .order_by(Instrument.type_id).all()

            #dto
            instruments = InstrumentDTO.create_list(_instruments)

            return ok(instruments)

    except AssertionError as e:
        app.logger.info(e)
        return assertion_error(e)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)

@app.route('/api/instruments',methods=['GET'])
def get_instruments():
    sector_ids = get_args('sector')
    app.logger.debug('sectorIds = %r',sector_ids)
    type_ids = get_args('type')
    app.logger.debug('typeIds = %r',type_ids)
    try:
        #sql
        filters = [Instrument.type_id.in_(type_ids)] if type_ids else []
        if sector_ids:
            filters.append(Company.sector_id.in_(sector_ids))
            _instruments =  Instrument.query.join(Company) \
                .filter(*filters) \
                .order_by(Instrument.type_id).all()
        else:
            _instruments =  Instrument.query.filter(*filters) \
                .order_by(Instrument.type_id).all()

        #dto
        instruments = InstrumentDTO.create_list(_instruments)

        return ok(instruments)

    except AssertionError as e:
        app.logger.info(e)
        return assertion_error(e)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)


@app.route('/api/companies/<int:company_id>/instruments',methods=['POST'])
def create_instrument(company_id):
    instrument = InstrumentDTO(json=request.get_json())
    app.logger.debug(instrument)
    try:
        assert company_id==instrument.company_id,'wrong company_id'

        #sql
        _company = Company.query.get(company_id)
        if not _company:
            app.logger.info('Company not found %r',company_id)
            return not_found_error('Company not found')

        else:
            db.session.add(instrument.model())
            db.session.commit()

            _instrument = Instrument.query \
                .filter(Instrument.company_id == company_id) \
                .filter(Instrument.id == instrument.id).one()

            #dto
            instrument = InstrumentDTO(_instrument)
            app.logger.debug(instrument)
            return created(instrument)

    except AssertionError as e:
        app.logger.info(e)
        return assertion_error(e)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)



@app.route('/api/instruments/<int:instrument_id>',methods=['POST'])
def update_instrument(instrument_id):
    instrument = InstrumentDTO(json=request.get_json())
    app.logger.debug(instrument)
    try:
        assert instrument_id==instrument.id,'Wrong instrumentId'

        #sql
        _instrument = Instrument.query.get(instrument_id)
        if not _instrument:
            app.logger.info('Instrument not found %r',instrument_id)
            return not_found_error('instrument not found')

        else:
            db.session.update(instrument.model())
            db.session.commit()

            _instrument = Instrument.query.get(instrument_id)

            #dto
            instrument = InstrumentDTO(_instrument)
            app.logger.debug(instrument)
            return accepted(instrument)

    except AssertionError as e:
        app.logger.info(e)
        return assertion_error(e)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)




#INSTRUMENT_LINKS-------------------

@app.route('/api/instrument/<int:instrument_id>/links',methods=['POST'])
def create_instrument_links(instrument_id):
    link = InstrumentLinkDTO(json=request.get_json())
    app.logger.debug(link)
    try:
        assert instrument_id==link.instrument_id,'Wrong instrument_id'

        #sql
        _instrument = Instrument.query.get(instrument_id)
        if not _instrument:
            app.logger.info('Instrument not found %r',instrument_id)
            return not_found_error('instrument not found')

        else:
            db.session.add(link.model())
            db.session.commit()

            _link = InstrumentLink.query. \
                filter(InstrumentLink.instrument_id == link.instrument_id). \
                filter(InstrumentLink.link_id == link.link_id).one()

            #dto
            link = InstrumentLinkDTO(_link)
            app.logger.debug(link)
            return created(link)

    except AssertionError as e:
        app.logger.info(e)
        return assertion_error(e)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)

@app.route('/api/instrument/<int:instrument_id>/links/<int:link_id>',methods=['POST'])
def update_instrument_links(instrument_id,link_id=None):
    link = InstrumentLinkDTO(json=request.get_json())
    app.logger.debug(link)
    try:
        print(link)
        assert instrument_id==link.instrument_id,'wrong instrument_id'
        assert link_id==link.link_id,'wrong link_id'

        #sql
        _instrument = InstrumentLink.query.get(instrument_id)
        if not _instrument:
            app.logger.info('Instrument not found %r',instrument_id)
            return not_found_error('instrument not found')

        else:
            db.session.update(link.model())
            db.session.commit()

            _link = InstrumentLink.query. \
                filter(InstrumentLink.instrument_id == link.instrument_id). \
                filter(InstrumentLink.link_id == link.link_id).one()

            #dto
            link = InstrumentLinkDTO(_link)
            app.logger.debug(link)
            return accepted(link)

    except AssertionError as e:
        app.logger.info(e)
        return assertion_error(e)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)
