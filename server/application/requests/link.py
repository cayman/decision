#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from flask import jsonify, request
from application import app, db

from application.requests.utils import ok,created, accepted, assertion_error, server_error, bad_request_error, not_found_error
from application.dto.link import LinkDTO
from application.models.link import  Link


@app.route('/api/links',methods=['GET'])
def get_links():
    try:
        #sql
        _links  = Link.query.all()
        #dto
        links  = LinkDTO.create_list(_links)

        return ok(links)

    except Exception as e:
        return server_error(e)


@app.route('/api/links',methods=['POST'])
def create_links():
    link = LinkDTO(json=request.get_json())
    app.logger.debug(link)
    try:
        assert link.id>0,'wrong link.id'

        #sql
        _link = link.model();
        db.session.add(_link)
        db.session.commit()

        app.logger.debug('created id %r',_link.id)

        _link = Link.query.get(link.id)

        #dto
        link = LinkDTO(_link)
        app.logger.debug(link)
        return created(link)

    except AssertionError as e:
        app.logger.info(e)
        return assertion_error(e)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)

@app.route('/api/links/<int:link_id>',methods=['POST'])
def update_links(link_id):
    link = LinkDTO(json=request.get_json())
    app.logger.debug(link)
    try:
        assert link_id==link.id,'wrong link_id'

        #sql
        db.session.update(link.model())
        db.session.commit()

        _link = Link.query.get(link.id)

        #dto
        link = LinkDTO(_link)
        app.logger.debug(link)
        return accepted(link)

    except AssertionError as e:
        app.logger.info(e)
        return assertion_error(e)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)

