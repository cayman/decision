#!/usr/bin/python3
# -*- coding: utf-8 -*-

from flask import jsonify, request, make_response
from application import app

def get_args(name,default = None):
    line = request.args.get(name,default)
    if not line:
       return None
    args = line.split(',',10)
    return [int(arg) for arg in args]

def ok(dto):
    if isinstance(dto,dict):
        response = [item.json() for item in dto.values()]
    elif isinstance(dto,list):
        response = [item.json() for item in dto]
    else:
        response = dto.json()

    return make_response(jsonify(response)), 200

def created(dto):
    response = dto.json()
    return make_response(jsonify(response)), 201

def accepted(dto):
    return make_response(jsonify(response)), 202


def not_found_error(message):
    response = {
        'status': 'fail',
        'message': message
    }
    return make_response(jsonify(response)), 404

def assertion_error(e):
    response = {
        'status': 'error',
        'message': 'Assertion error occurred. Please try again.',
        'error': str(e)
    }
    return make_response(jsonify(response)), 400


def bad_request_error(e):
    response = {
        'status': 'error',
        'message': 'Assertion error occurred. Please try again.',
        'error': str(e)
    }
    return make_response(jsonify(response)), 400

def server_error(e):
    response = {
        'status': 'fail',
        'message': 'Some error occurred. Please try again.',
        'error': str(e)
    }
    return make_response(jsonify(response)), 500