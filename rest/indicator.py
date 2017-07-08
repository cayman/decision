#!/usr/bin/env python
# -*- coding: UTF-8 -*-

class Indicator():
	def __init__(self,name,unit,value):
		self.name = name
		self.unit = unit
		self.value = value
		
	def full(self):
		return {'name':self.name,'unit':self.unit,'value':self.value}
