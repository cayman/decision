#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from application.dto.indicator import IndicatorDTO
from application.dto.instrument import InstrumentDTO
from application.models.company import CompanyLink

class CompanyLinkDTO:
    def __init__(self, model=None, json=None):
        if model:
            self.id = model.id
            self.company_id = model.company_id
            self.link_id = model.link_id
        if json:
            #todo assert
            self.id = json['id']
            self.company_id = json['companyId']
            self.link_id = json['linkId']

    def model(self):
        return CompanyLink(self.company_id, self.link_id, self.id)

    def json(self):
        return {
            'id':self.id,
            'companyId':self.company_id,
            'linkId':self.link_id,
        }

    def __repr__(self):
        return '<CompanyLinkDTO %r:%r=%r>' % (self.link_id, self.company_id,self.id)


class CompanyDTO:
    def __init__(self, model=None, json=None):
        self.__years = set()
        self.__indicators = {}
        if model:
            self.id = model.id
            self.name = model.name
            self.sector_id = model.sector_id
            self.hidden = model.hidden
            self.foreign = model.foreign
            if model.sector:
                self.sector_name = model.sector.name
            if model.links:
                params = {'id':self.id,'companyId':self.id}
                self.links = [CompanyLinkDTO(link) for link in model.links]
                self.instruments = [InstrumentDTO(instrument) for instrument in model.instruments]
        if json:
            self.id = json['id']
            self.name = json['name']
            self.sector_id = json['sectorId'],
            self.hidden = json['hidden'],
            self.foreign = json['foreign']

     #Добавляем новое значение индикатора
    def add_indicator(self, indicator_row, value_row):
        if indicator_row.id not in self.__indicators:
            #Саоздает объект Индикатора
            self.__indicators[indicator_row.id] = IndicatorDTO(indicator_row,value_row.currency)
        #Добавляем год в индикатор
        self.__indicators[indicator_row.id].add(value_row.year, value_row.value)
        self.__years.add(value_row.year)


    #Упорядоченный список лет
    @property
    def years(self):
        return sorted(self.__years)


    #Упорядоченный по ключу список индикаторов
    @property
    def indicators(self):
        return [self.__indicators[key] for key in sorted(self.__indicators.keys())]

    #Вес компании
    @property
    def weight(self):
        return sum([indicator.weight for indicator in self.__indicators.values()])/len(self.__indicators)

    def json(self):
        return {
            'id':self.id,
            'name':self.name,
            'sectorId':self.sector_id,
            'sectorName':self.sector_name,
            'hidden':self.hidden,
            'foreign':self.foreign,
            'links':[link.json() for link in self.links],
            'instruments':[instrument.json() for instrument in self.instruments],
            'years':self.years,
            'indicators':[indicator.json() for indicator in self.indicators],
            'weight':self.weight,
        }

    def __repr__(self):
        return '<CompanyDTO %r:%r>' % (self.id,self.name)

