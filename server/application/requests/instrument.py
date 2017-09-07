#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from flask import jsonify, request
from application import app, db

from application.models.company import Company
from application.models.instrument import Instrument, InstrumentType, InstrumentLink
from application.dto.instrument import InstrumentDTO, InstrumentTypeDTO, InstrumentLinkDTO



@app.route('/api/instrument_types',methods=['GET'])
def get_instrument_types():
    #sql
    _types  = InstrumentType.query.all()
    #dto
    types  = InstrumentTypeDTO.create_list(_types)

    return jsonify([type.json() for type in types])



#INSTRUMENTS-------------------

@app.route('/api/companies/<int:company_id>/instruments',methods=['GET'])
def get_company_instruments(company_id):
    type_ids = request.args.get('type').split(',',10)  if request.args.get('type') else None

    #sql
    filters = [Instrument.company_id == company_id]
    if type_ids:
        filters.append(Instrument.type_id.in_(type_ids))
    _instruments = Instrument.query.filter(*filters) \
        .order_by(Instrument.type_id).all()

    #dto
    instruments = InstrumentDTO.create_list(_instruments)

    return jsonify([instrument.json() for instrument in instruments])


@app.route('/api/instruments',methods=['GET'])
def get_instruments():
    sector_ids = request.args.get('sector').split(',',10) if request.args.get('sector') else None
    type_ids = request.args.get('type').split(',',10)  if request.args.get('type') else None

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

    return jsonify([instrument.json() for instrument in instruments])


@app.route('/api/companies/<int:company_id>/instruments',methods=['POST'])
def create_instrument(company_id):

    instrument = InstrumentDTO(json=request.get_json())
    print(instrument)
    assert company_id==instrument.company_id,'wrong company_id'

    #sql
    db.session.add(instrument.model())
    db.session.commit()

    _instrument = Instrument.query \
        .filter(Instrument.company_id == company_id) \
        .filter(Instrument.id == instrument.id).one()

    #dto
    instrument = InstrumentDTO(_instrument)

    return jsonify(instrument.json())

@app.route('/api/instruments/<int:instrument_id>',methods=['POST'])
def update_instrument(instrument_id):

    instrument = InstrumentDTO(json=request.get_json())
    print(instrument)
    assert instrument_id==instrument.id,'wrong instrument_id'

    #sql
    db.session.update(instrument.model())
    db.session.commit()

    _instrument = Instrument.query.get(instrument_id)

    #dto
    instrument = InstrumentDTO(_instrument)

    return jsonify(instrument.json())





#INSTRUMENT_LINKS-------------------

@app.route('/api/instrument/<int:instrument_id>/links',methods=['POST'])
def create_instrument_links(instrument_id):

    link = InstrumentLinkDTO(json=request.get_json())
    print(link)
    assert instrument_id==link.instrument_id,'wrong instrument_id'

    #sql
    db.session.add(link.model())
    db.session.commit()

    _link = InstrumentLink.query. \
        filter(InstrumentLink.instrument_id == link.instrument_id). \
        filter(InstrumentLink.link_id == link.link_id).one()

    #dto
    link = InstrumentLinkDTO(_link)

    return jsonify(link.json())

@app.route('/api/instrument/<int:instrument_id>/links/<int:link_id>',methods=['POST'])
def update_instrument_links(instrument_id,link_id=None):

    link = InstrumentLinkDTO(json=request.get_json())
    print(link)
    assert instrument_id==link.instrument_id,'wrong instrument_id'
    assert link_id==link.link_id,'wrong link_id'

    #sql
    db.session.update(link.model())
    db.session.commit()

    _link = InstrumentLink.query. \
        filter(InstrumentLink.instrument_id == link.instrument_id). \
        filter(InstrumentLink.link_id == link.link_id).one()

    #dto
    link = InstrumentLinkDTO(_link)

    return jsonify(link.json())