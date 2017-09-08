#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from flask import jsonify, request
from application import app, db

from application.requests.utils import ok,created, accepted, assertion_error, server_error, bad_request_error, not_found_error
from application.models.sector import Sector

from application.dto.sector import SectorDTO
from application.dto.company import CompanyDTO, CompanyLinkDTO



@app.route('/api/sectors',methods=['GET'])
def get_sectors():

    try:
        #sql
        _sectors  = Sector.query.all()
        sectors =  SectorDTO.create_list(_sectors)

        return ok(sectors)

    except Exception as e:
        return server_error(e)