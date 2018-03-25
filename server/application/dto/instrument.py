#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from application.models.instrument import Instrument, InstrumentLink, InstrumentType

class InstrumentLinkDTO:
    def __init__(self, model=None, json=None):
        if model:
            self.id = model.id
            self.instrument_id = model.instrument_id
            self.link_id = model.link_id
        if json:
            #todo assert
            self.id = json['id']
            self.instrument_id = json['instrumentId']
            self.link_id = json['linkId']

    def model(self):
        return InstrumentLink(self.instrument_id, self.link_id, self.id)

    def json(self):
        return {
            'id':self.id,
            'instrumentId':self.instrument_id,
            'linkId':self.link_id,
        }

    def __repr__(self):
        return '<InstrumentLinkDTO %r:%r=%r>' % (self.link_id, self.instrument_id,self.id)



class InstrumentTypeDTO:
    def __init__(self, model=None, json=None):
        if model:
            self.id = model.id
            self.name = model.name
            self.short = model.short
        if json:
            #todo assert
            self.id = json['id']
            self.name = json['name']
            self.short = json['short']

    def model(self):
        return InstrumentType(self.id, self.name, self.short)


    #Создаем список объектов
    @staticmethod
    def create_list(models):
        return [InstrumentTypeDTO(model) for model in models]

    def json(self):
        return {
            'id':self.id,
            'name':self.name,
            'short':self.short,
        }

    def __repr__(self):
        return '<InstrumentTypeDTO %r:%r>' % (self.id,self.name)

class InstrumentDTO():
    def __init__(self, model=None, json=None):
        self.__links = []
        if model:
            self.id = model.id
            self.code = model.code
            self.type_id = model.type_id
            self.company_id = model.company_id

            if model.type:
                self.type_name = model.type.name
                self.type_short = model.type.short

            if model.links:
                self.__links = [InstrumentLinkDTO(link) for link in model.links]
        if json:
            #todo assert
            self.id = json['id']
            self.code = json['code']
            self.type_id = json['typeId']
            self.company_id = json['companyId']


    def model(self):
        return Instrument(self.id, self.type_id, self.company_id, self.code)

        #Создаем ссылки
    @staticmethod
    def create_list(models):
        return [InstrumentDTO(model) for model in  models]

    @property
    def links(self):
        return self.__links

    def json(self):
        return {
            'id':self.id,
            'code':self.code,
            'typeId':self.type_id,
            'typeName':self.type_name,
            'typeShort':self.type_short,
            'companyId':self.company_id,
            'links':[link.json() for link in self.__links]
        }

    def __repr__(self):
        return '<InstrumentDTO %r:%r>' % (self.id,self.code)

