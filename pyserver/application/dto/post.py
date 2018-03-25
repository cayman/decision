#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from application.models.post import Post

class PostDTO:
    def __init__(self, model=None, json=None):
        if model:
            self.id = model.id
            self.company_id = model.company_id
            self.user_id = model.user_id
            self.text = model.text
            self.created = model.created
        if json:
            #todo assert
            self.id = json['id']
            self.company_id = json['companyId']
            self.user_id = json['userId']
            self.text = json['text']

    def model(self):
         return Post(self.company_id, self.user_id, self.text)

    #Создаем список объектов
    @staticmethod
    def create_list(models):
        return [PostDTO(model) for model in models]

    def json(self):
        return {
            'id':self.id,
            'companyId':self.company_id,
            'userId':self.user_id,
            'text':self.text,
            'created':self.created,
        }

    def __repr__(self):
        return '<PostDTO %r:%r=%r>' % (self.id, self.user_id,self.company_id)

