#!/usr/bin/env python
# -*- coding: UTF-8 -*-

class Indicator():
	def __init__(self,name,unit):
		self.name = name
		self.unit = unit
		self.values = []
		
	def add(self,period,value):
		self.values.append({'period':period,'value':value})
		
	def full(self):
		return {'name':self.name,'unit':self.unit,'values':self.values}
