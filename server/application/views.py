from flask import jsonify, request, render_template

from application import app
from application.models import Company, Indicator, Value, Sector

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
    companies = Company.query.all()

    #print(companies)
    return render_template("companies.html",
                           title = 'Список компаний',
                           user = user,
                           companies = companies)

@app.route('/companies/<int:company_id>',methods=['GET'])
def get_company(company_id):
    company = Company.query.get(company_id)
    print(company)
    values = Value.query.filter_by(company_id=company_id,currency=1).all()

    years = []
    indicators = {}
    for value in values:
        if value.indicator_id in indicators:
            indicator = indicators[value.indicator_id]
        else:
            indicators[value.indicator_id] = indicator = {
                'id':value.indicator_id,
                'name':value.indicator.name,
                'years':{}
            }

        if value.year not in indicator['years']:
            indicator['years'][value.year]=value.value

        if value.year not in years:
            years.append(value.year)



    #print(values)
    return render_template("company.html",
                           title = 'Информация о компании',
                           user = user,
                           company = company,
                           years = range(min(years),max(years)),
                           indicators = indicators)