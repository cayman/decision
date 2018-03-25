#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from flask import jsonify, request, make_response
from application import app, db

from application.models.user import User

from application.dto.user import UserDTO



@app.route('/api/users',methods=['POST'])
def create_user():

    user = UserDTO(json=request.get_json())
    print(user)
    #assert company_id==instrument.company_id,'wrong company_id'

    _user = User.query.filter_by(email=user.email).first()
    if _user:
        responseObject = {
            'status': 'fail',
            'message': 'User already exists. Please Log in.',
        }
        return make_response(jsonify(responseObject)), 202


    #sql
    _sectors  = Sector.query.all()
    sectors =  SectorDTO.create_list(_sectors)
    return jsonify([sector.json() for sector in sectors])

