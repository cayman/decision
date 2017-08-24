from flask import jsonify, request, render_template

from application import app, db
from application.models import Sector, Company, Indicator, Value
from application.dto import SectorDTO, CompanyDTO, IndicatorDTO
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


@app.route('/companies',methods=['GET'])
def get_companies():
    currency_id = request.args.get('currency',1)
    indicator_ids = request.args.get('indicator','30,56,59,63,41,42').split(',',20)

    #sql
    _indicators  = Indicator.query.filter(Indicator.id.in_(indicator_ids)).all()
    _values  = Value.query.filter(Value.indicator_id.in_(indicator_ids))\
        .filter(Value.currency==currency_id).order_by(Value.indicator_id).all()


    companies={}
    sectors={}
    years = []

    for _value in _values:
        _company = _value.company

        if _company.id not in companies:
            _sector = _company.sector
            #создание DTO компании
            company = CompanyDTO(_company,_sector)
            #создание DTO сектора
            if _sector.id not in sectors:
                sectors[_sector.id] = SectorDTO(_sector)
            #добавление компании в сектор и список
            sectors[_sector.id].add_company(company)
            companies[_company.id] = company

        #добавление значения индикатора в компанию
        companies[_company.id].add_indicator(_value.indicator, _value)

        #формирование списка лет
        if _value.year not in years:
            years.append(_value.year)

    #for id, company in companies.items():
    #    print(company)
    #    print(company.indicators)

    return render_template("companies.html",
                           title = 'Список компаний',
                           user = user,
                           years = range(min(years),max(years)+1),
                           indicators = _indicators,
                           sectors=sectors)

@app.route('/companies/<int:company_id>',methods=['GET'])
def get_company(company_id):
    currency_id = request.args.get('currency',1)

    #sql
    _company = Company.query.get(company_id)
    _values = Value.query.filter(Value.company_id==company_id)\
        .filter(Value.currency==currency_id).order_by(Value.indicator_id).all()

    years = []

    #создание DTO компании
    company = CompanyDTO(_company,_company.sector)

    for _value in _values:
        #добавление значения индикатора
        company.add_indicator(_value.indicator, _value)

        #формирование списка лет
        if _value.year not in years:
            years.append(_value.year)

    #print(company)
    #print(company.indicators)

    return render_template("company.html",
                           title = 'Информация о компании',
                           user = user,
                           company = company,
                           years = range(min(years),max(years)))