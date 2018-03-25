#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from wsgiref.handlers import CGIHandler
from application import app


CGIHandler().run(app)