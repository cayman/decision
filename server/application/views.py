from flask import jsonify, request, render_template

from application import app, db
from application.models import Sector, Company, CompanyLink, Indicator, Value, Link
from application.dto import SectorDTO, CompanyDTO, IndicatorDTO, LinkDTO
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


@app.errorhandler(404)
def page_not_found(e):
    return jsonify(error=404, text=str(e)), 404

@app.errorhandler(500)
def page_not_found(e):
    return jsonify(error=500, text=str(e)), 500

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

@app.route('/api/sectors',methods=['GET'])
def get_sectors():
    #sql
    _sectors  = Sector.query.all()
    sectors = [SectorDTO(sector).json() for sector in _sectors]
    return jsonify(sectors)




@app.route('/api/links',methods=['GET'])
def get_links():
    #sql
    _links  = Link.query.all()
    links  = [LinkDTO(link,link.company_url).json() for link in _links]
    return jsonify(links)


@app.route('/api/companies/<int:company_id>/links',methods=['POST'])
def create_link(company_id):

    link = request.get_json()
    print(link)
    #sql
    _companyLink = CompanyLink(company_id,int(link['id']),int(link['param']))
    db.session.add(_companyLink)
    db.session.commit()

    _companyLinks = CompanyLink.query.filter(CompanyLink.company_id == company_id).all()

    links = CompanyDTO.create_links(_companyLinks)

    return jsonify([link.json() for link in links])


@app.route('/api/companies/<int:company_id>/links/<int:link_id>',methods=['POST'])
def update_link(company_id,link_id):

    link = request.get_json()
    print(link)
    #sql
    _companyLink = CompanyLink(company_id,int(link['id']),int(link['param']))
    db.session.update(_companyLink)
    db.session.commit()

    _companyLinks = CompanyLink.query.filter(CompanyLink.company_id == company_id).all()

    links = CompanyDTO.create_links(_companyLinks)

    return jsonify([link.json() for link in links])


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
            company = CompanyDTO(_company,_sector)
            company.add_links(_company.links)

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
    company = CompanyDTO(_company,_company.sector)
    company.add_links(_company.links)

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