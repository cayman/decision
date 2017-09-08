#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from application.models.link import Link

class LinkDTO(Link):
    def __init__(self, model, json=None):

        if model:
            self.id = model.id
            self.name = model.name
            self.icon = model.icon
            self.url = model.url
            self.search_url = model.search_url
            self.company_url = model.company_url
            self.instrument_url = model.instrument_url
        if json:
            #todo assert
            self.id = json['id']
            self.name = json['name']
            self.icon = json['icon']
            self.url = json['url']
            self.search_url = json['searchUrl']
            self.company_url = json['companyUrl']
            self.instrument_url = json['instrumentUrl']

    def json(self):
        return {
            'id':self.id,
            'name':self.name,
            'icon':self.icon,
            'url':self.url,
            'searchUrl': self.search_url,
            'companyUrl': self.company_url,
            'instrumentUrl': self.instrument_url,
        }

    def model(self):
        return Link(self.id, self.name, self.icon, self.url, self.search_url, self.company_url, self.instrument_url)

    #Создаем список объектов
    @staticmethod
    def create_list(models,params=None):
        return [LinkDTO(model,params) for model in models]


    def __repr__(self):
        return '<LinkDTO %r:%r>' % (self.id,self.url)
