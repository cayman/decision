from application import db

class Sector(db.Model):
    __tablename__ = 'fa_sector'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))

    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return '<Sector %r>' % self.name

class Company(db.Model):
    __tablename__ = 'fa_company'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    sector_id = db.Column(db.Integer, db.ForeignKey('fa_sector.id'))
    sector = db.relationship('Sector',
                             backref=db.backref('fa_company', lazy='dynamic'))

    def __init__(self, id, name, sector):
        self.id = id
        self.name = name
        self.sector = sector

    def __repr__(self):
        return '<Company %r>' % self.name

class Indicator(db.Model):
    __tablename__ = 'fa_indicator'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    unit = db.Column(db.String(16))
    unit2 = db.Column(db.String(16))
    quantity = db.Column(db.String(8))


    def __init__(self, id, name, unit, unit2, quantity):
        self.id = id
        self.name = name
        self.unit = unit
        self.unit2 = unit2
        self.quantity = quantity

    def __repr__(self):
        return '<Indicator %r>' % self.name


class Value(db.Model):
    __tablename__ = 'fa_value'

    company_id = db.Column(db.Integer, db.ForeignKey('fa_company.id'), primary_key=True)
    year = db.Column(db.Integer, primary_key=True)
    currency = db.Column(db.Integer , primary_key=True)
    indicator_id = db.Column(db.Integer, db.ForeignKey('fa_indicator.id'), primary_key=True)
    indicator = db.relationship('Indicator',lazy='joined')
    value = db.Column(db.String(32))

    def __init__(self, company, year, currency, indicator, value):
        self.company = company
        self.year = year
        self.currency = currency
        self.indicator = indicator
        self.value = value

    def __repr__(self):
        return '<Value %r>' % self.value