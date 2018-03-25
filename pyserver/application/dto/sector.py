#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from application.models.sector import Sector

class SectorDTO:
    def __init__(self, model):
        if model:
            self.id = model.id
            self.name = model.name

    def model(self):
        return Sector(self.id, self.name)

    #Создаем список объектов
    @staticmethod
    def create_list(models):
        return [SectorDTO(model) for model in models]

    def json(self):
        return {
            'id':self.id,
            'name':self.name,
        }

    def __repr__(self):
        return '<SectorDTO %r:%r>' % (self.id,self.name)