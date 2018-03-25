#!/usr/bin/env python
# -*- coding: UTF-8 -*-

def get_floaf(value):
    return float(value.replace(',', '.').replace(' ', ''))

class IndicatorDTO:
    def __init__(self, indicator_row, currency):
        self.years = {}
        self.__weight = 0
        self.id = indicator_row.id
        self.name = indicator_row.name
        self.unit = indicator_row.unit2 if indicator_row.unit2 and currency == 2 else indicator_row.unit
        self.quantity = indicator_row.quantity
        self.digit = True


    #Добавляем новое значение индикатора
    def add(self, year, value):
        try:
            if self.digit:
                _value = get_floaf(value)

                if _value>0:
                    self.__weight += 1
                elif _value<0:
                    self.__weight -= len(self.years) if len(self.years)>2 else 3

                self.years[year] = _value
            else:
                self.years[year] = value

        except ValueError:
            print('error',value)
            self.digit = False
            self.years[year] = value

    #Вес индикатора
    @property
    def weight(self):
        return self.__weight

    def json(self):
        return {
            'id':self.id,
            'name':self.name,
            'unit':self.unit,
            'quantity':self.quantity,
            'digit':self.digit,
            'years':self.years,
            'weight':self.weight,
        }

    def __repr__(self):
        return '<Indicator %r:%r - %r>' % (self.id,self.name,self.years)
