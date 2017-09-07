#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from wsgiref.handlers import CGIHandler
from application import app


CGIHandler().run(app)