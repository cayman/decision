from flask import jsonify, request, render_template

from application import app, db
from application.models import Company, Indicator, Value, Sector
from sqlalchemy import sql
import string

user = { 'nickname': 'Rustem' }



@app.route('/')
@app.route('/index')
def index():
    posts = [ # список выдуманных постов
        {
            'author': { 'nickname': 'John' },
            'body': 'Beautiful day in Portland!'
        },
        {
            'author': { 'nickname': 'Susan' },
            'body': 'The Avengers movie was so cool!'
        }
    ]
    return render_template("index.html",
                           title = 'Home',
                           user = user,
                           posts = posts)

class IndicatorDTO:
    def __init__(self, indicator_row, currency):
        self.years = {}
        self.id = indicator_row.id
        self.name = indicator_row.name
        self.unit = indicator_row.unit2 if indicator_row.unit2 and currency == 2 else indicator_row.unit
        self.digit = True

    def add(self, year, value):
        try:
            self.years[year] = float(value.replace(',', '.').replace(' ', '')) if(self.digit) else value
        except ValueError:
            print('error',value)
            self.digit = False
            self.years[year] = value

    def __repr__(self):
        return '<Indicator %r:%r - %r>' % (self.id,self.name,self.years)

class CompanyDTO:
    def __init__(self, company_row, sector_row):
        self.indicators = {}
        self.id = company_row.id
        self.name = company_row.name
        self.sector_id = sector_row.id
        self.sector = sector_row.name

    def add(self, indicator_row, year, value, currency):
        if indicator_row.id not in self.indicators:
            self.indicators[indicator_row.id] = IndicatorDTO(indicator_row,currency)
        self.indicators[indicator_row.id].add(year, value)

    def __repr__(self):
        return '<CompanyDTO %r:%r>' % (self.id,self.name)

class SectorDTO:
    def __init__(self, sector_row):
        self.companies = {}
        self.id = sector_row.id
        self.name = sector_row.name

    def add(self, company):
        if company.id not in self.companies:
            self.companies[company.id] = company

    def __repr__(self):
        return '<SectorDTO %r:%r>' % (self.id,self.name)

@app.route('/companies',methods=['GET'])
def get_companies():
    currency_id = request.args.get('currency',1)
    indicator_ids = request.args.get('indicator','30,56,59,63,41,42').split(',',20)

    #sql
    indicator_list  = Indicator.query.filter(Indicator.id.in_(indicator_ids)).all()
    value_list  = Value.query.filter(Value.indicator_id.in_(indicator_ids))\
        .filter(Value.currency==currency_id).order_by(Value.indicator_id).all()


    companies={}
    sectors={}
    years = []

    for value_row in value_list:
        #добавление сектора
        if value_row.company.sector.id not in sectors:
            sectors[value_row.company.sector.id] = SectorDTO(value_row.company.sector)

        #добавление компании
        if value_row.company.id not in companies:
            companies[value_row.company.id] = CompanyDTO(value_row.company,value_row.company.sector)
            sectors[value_row.company.sector.id].add(companies[value_row.company.id])

        #добавление значения индикатора
        companies[value_row.company.id].add(value_row.indicator, value_row.year, value_row.value, currency_id)

        #формирование списка лет
        if value_row.year not in years:
            years.append(value_row.year)

    #for id, company in companies.items():
    #    print(company)
    #    print(company.indicators)

    return render_template("companies.html",
                           title = 'Список компаний',
                           user = user,
                           years = range(min(years),max(years)+1),
                           indicators = indicator_list,
                           sectors=sectors,
                           companies = companies)

@app.route('/companies/<int:company_id>',methods=['GET'])
def get_company(company_id):
    currency_id = request.args.get('currency',1)

    #sql
    company_row = Company.query.get(company_id)
    value_list = Value.query.filter(Value.company_id==company_id)\
        .filter(Value.currency==currency_id).order_by(Value.indicator_id).all()

    years = []

    #создание компании
    company = CompanyDTO(company_row,company_row.sector)

    for value in value_list:
        #добавление значения индикатора
        company.add(value.indicator, value.year, value.value, 1)

        #формирование списка лет
        if value.year not in years:
            years.append(value.year)

    #print(company)
    #print(company.indicators)

    return render_template("company.html",
                           title = 'Информация о компании',
                           user = user,
                           company = company,
                           years = range(min(years),max(years)))