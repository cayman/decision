from flask import jsonify, request, render_template

from application import app, db
from application.models import Sector, Company, Indicator, Value
from application.dto import SectorDTO, CompanyDTO, IndicatorDTO
import locale

locale.setlocale(locale.LC_ALL, ('RU','UTF8'))

user = { 'nickname': 'Rustem' }

def accept_json():
    if request.args.get('json'):
        return True
    best = request.accept_mimetypes \
        .best_match(['application/json', 'text/html'])
    return best == 'application/json' and \
           request.accept_mimetypes[best] > request.accept_mimetypes['text/html']

@app.template_filter('decimal')
def price_filter(value):
    return locale.format('%.4f', value, grouping=True).rstrip('0').rstrip(',')

@app.template_filter('price')
def price_filter(value):
    return locale.format('%f', value, grouping=True).rstrip('0').rstrip(',')

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


@app.route('/api/companies',methods=['GET'])
def get_companies():
    currency_id = request.args.get('currency',1)
    sector_ids = request.args.get('sector').split(',',10) if request.args.get('sector') else None
    indicator_ids = request.args.get('indicator','30,56,59,60,63,64,41,42,91').split(',',20)

    #sql
    filters = [Value.currency==currency_id,Company.hidden==0,Company.foreign==0,
               Value.indicator_id.in_(indicator_ids)]
    if sector_ids:
        filters.append(Company.sector_id.in_(sector_ids))

    _values  = Value.query.join(Company).filter(*filters).order_by(Value.indicator_id).all()

    companies={}
    indicators={}
    sectors={}
    years = set()

    for _value in _values:
        _company = _value.company

        if _company.id not in companies:
            _sector = _company.sector
            #создание DTO компании
            company = CompanyDTO(_company,_sector,_company.links)

            #создание DTO сектора
            if _sector.id not in sectors:
                sectors[_sector.id] = SectorDTO(_sector)
            #добавление компании в сектор и список
            sectors[_sector.id].add_company(company)
            companies[_company.id] = company

        #добавление значения индикатора в компанию
        companies[_company.id].add_indicator(_value.indicator, _value)

        #добавление индикатора в список
        if _value.indicator.id not in indicators:
            indicators[_value.indicator.id] = _value.indicator

        #формирование списка лет
        years.add(_value.year)

    #for id, company in companies.items():
    #    print(company)
    #    print(company.indicators)

    if accept_json():
        return jsonify([company.json() for company in companies.values()])

    return render_template("companies.html",
                           title = 'Список компаний',
                           user = user,
                           years = sorted(years),
                           indicators = indicators.values(),
                           sectors=sectors.values())


@app.route('/api/companies/<int:company_id>',methods=['GET'])
def get_company(company_id):
    currency_id = request.args.get('currency',1)

    #sql
    _company = Company.query.get(company_id)
    _values = Value.query.filter(Value.company_id==company_id)\
        .filter(Value.currency==currency_id).order_by(Value.indicator_id).all()

    #создание DTO компании
    company = CompanyDTO(_company,_company.sector,_company.links)

    for _value in _values:
        #добавление значения индикатора
        company.add_indicator(_value.indicator, _value)

    #print(company)
    #print(company.indicators)

    if accept_json():
        return jsonify(company.json())

    return render_template("company.html",
                           title = 'Информация о компании',
                           user = user,
                           company = company)